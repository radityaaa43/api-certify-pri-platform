import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { createProductSchema } from "@/lib/validations";
import { productsApi } from "@/services/api";
import { useMutation } from "@/hooks/useApi";
import LoadingSpinner from "@/components/common/LoadingSpinner";
import { z } from "zod";

interface CreateProductDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess?: () => void;
}

type CreateProductForm = z.infer<typeof createProductSchema>;

const CreateProductDialog = ({ open, onOpenChange, onSuccess }: CreateProductDialogProps) => {
  const { toast } = useToast();
  
  const form = useForm({
    resolver: zodResolver(createProductSchema),
    defaultValues: {
      name: "",
    },
  });

  const createProductMutation = useMutation((data: any) => productsApi.create(data), {
    onSuccess: (data) => {
      toast({
        title: "Product Created",
        description: `${data.name} has been created successfully.`,
      });
      form.reset();
      onOpenChange(false);
      onSuccess?.();
    },
    onError: (error) => {
      toast({
        title: "Failed to Create Product",
        description: error,
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: any) => {
    createProductMutation.mutate(data as CreateProductForm);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create New Product</DialogTitle>
        </DialogHeader>
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Product Name</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="e.g. Fund Transfer"
                      {...field}
                      disabled={createProductMutation.loading}
                    />
                  </FormControl>
                  <p className="text-xs text-muted-foreground">
                    Enter a descriptive name for the API product
                  </p>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <div className="flex justify-end gap-2">
              <Button 
                type="button" 
                variant="outline" 
                onClick={() => onOpenChange(false)}
                disabled={createProductMutation.loading}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={createProductMutation.loading}>
                {createProductMutation.loading ? (
                  <>
                    <LoadingSpinner size="sm" className="mr-2" />
                    Creating...
                  </>
                ) : (
                  "Create Product"
                )}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateProductDialog;