import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { createPartnerSchema } from "@/lib/validations";
import { partnersApi } from "@/services/api";
import { useMutation } from "@/hooks/useApi";
import LoadingSpinner from "@/components/common/LoadingSpinner";
import { z } from "zod";

interface CreatePartnerDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  products: Array<{ id: string; name: string }>;
  onSuccess?: () => void;
}

type CreatePartnerForm = z.infer<typeof createPartnerSchema>;

const CreatePartnerDialog = ({ open, onOpenChange, products, onSuccess }: CreatePartnerDialogProps) => {
  const { toast } = useToast();
  
  const form = useForm({
    resolver: zodResolver(createPartnerSchema),
    defaultValues: {
      name: "",
      contact_email: "",
      products: [],
    },
  });

  const createMutation = useMutation((data: any) => partnersApi.create(data), {
    onSuccess: () => {
      toast({ title: "Partner Created", description: "Partner created successfully." });
      form.reset();
      onOpenChange(false);
      onSuccess?.();
    },
  });

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Create Partner</DialogTitle>
        </DialogHeader>
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(createMutation.mutate)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Partner Name</FormLabel>
                  <FormControl>
                    <Input placeholder="PT Fintech Solutions" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="contact_email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Contact Email</FormLabel>
                  <FormControl>
                    <Input type="email" placeholder="contact@company.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="products"
              render={() => (
                <FormItem>
                  <FormLabel>Bind to Products</FormLabel>
                  <div className="space-y-2">
                    {products.map((product) => (
                      <FormField
                        key={product.id}
                        control={form.control}
                        name="products"
                        render={({ field }) => (
                          <FormItem className="flex items-center space-x-3 space-y-0">
                            <FormControl>
                              <Checkbox
                                checked={field.value?.includes(product.id)}
                                onCheckedChange={(checked) => {
                                  const updatedProducts = checked
                                    ? [...(field.value || []), product.id]
                                    : field.value?.filter((id) => id !== product.id) || [];
                                  field.onChange(updatedProducts);
                                }}
                              />
                            </FormControl>
                            <FormLabel className="font-normal">{product.name}</FormLabel>
                          </FormItem>
                        )}
                      />
                    ))}
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <div className="flex justify-end gap-2">
              <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
                Cancel
              </Button>
              <Button type="submit" disabled={createMutation.loading}>
                {createMutation.loading ? <LoadingSpinner size="sm" className="mr-2" /> : null}
                Create Partner
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default CreatePartnerDialog;