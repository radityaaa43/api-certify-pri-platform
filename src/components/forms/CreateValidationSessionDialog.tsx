import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { createValidationSessionSchema } from "@/lib/validations";
import { validationSessionsApi } from "@/services/api";
import { useMutation } from "@/hooks/useApi";
import LoadingSpinner from "@/components/common/LoadingSpinner";
import { z } from "zod";

interface CreateValidationSessionDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  partners: Array<{ id: string; name: string }>;
  products: Array<{ id: string; name: string }>;
  onSuccess?: () => void;
}

type CreateValidationSessionForm = z.infer<typeof createValidationSessionSchema>;

const CreateValidationSessionDialog = ({ 
  open, 
  onOpenChange, 
  partners, 
  products, 
  onSuccess 
}: CreateValidationSessionDialogProps) => {
  const { toast } = useToast();
  
  const form = useForm({
    resolver: zodResolver(createValidationSessionSchema),
    defaultValues: {
      partner_id: "",
      product_id: "",
      date_from: "",
      date_to: "",
    },
  });

  const createMutation = useMutation((data: any) => validationSessionsApi.create(data), {
    onSuccess: () => {
      toast({ title: "Validation Session Started", description: "Validation session created successfully." });
      form.reset();
      onOpenChange(false);
      onSuccess?.();
    },
  });

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Start Validation Session</DialogTitle>
        </DialogHeader>
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(createMutation.mutate)} className="space-y-4">
            <FormField
              control={form.control}
              name="partner_id"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Partner</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select partner" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {partners.map((partner) => (
                        <SelectItem key={partner.id} value={partner.id}>
                          {partner.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="product_id"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Product</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select product" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {products.map((product) => (
                        <SelectItem key={product.id} value={product.id}>
                          {product.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="date_from"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Start Date</FormLabel>
                    <FormControl>
                      <Input type="datetime-local" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="date_to"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>End Date</FormLabel>
                    <FormControl>
                      <Input type="datetime-local" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            
            <div className="flex justify-end gap-2">
              <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
                Cancel
              </Button>
              <Button type="submit" disabled={createMutation.loading}>
                {createMutation.loading ? <LoadingSpinner size="sm" className="mr-2" /> : null}
                Start Session
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateValidationSessionDialog;