import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { mockProducts } from "@/data/mockData";

interface CreateTestCaseDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  selectedProductId?: string;
}

const CreateTestCaseDialog = ({ open, onOpenChange, selectedProductId }: CreateTestCaseDialogProps) => {
  const [formData, setFormData] = useState({
    product_id: selectedProductId || "",
    endpoint_path: "",
    method: "",
    case_type: "",
    expected_input: "",
    expected_output: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation
    if (!formData.product_id || !formData.endpoint_path || !formData.method || !formData.case_type) {
      toast({
        title: "Validation Error",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    // Validate JSON
    try {
      if (formData.expected_input) JSON.parse(formData.expected_input);
      if (formData.expected_output) JSON.parse(formData.expected_output);
    } catch (error) {
      toast({
        title: "Invalid JSON",
        description: "Expected input and output must be valid JSON.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const productName = mockProducts.find(p => p.id === formData.product_id)?.name;
    
    toast({
      title: "Test Case Created",
      description: `Test case for ${productName} - ${formData.endpoint_path} has been created.`,
    });
    
    setFormData({
      product_id: selectedProductId || "",
      endpoint_path: "",
      method: "",
      case_type: "",
      expected_input: "",
      expected_output: "",
    });
    setIsSubmitting(false);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Create New Test Case</DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="product">Product *</Label>
              <Select
                value={formData.product_id}
                onValueChange={(value) => setFormData(prev => ({ ...prev, product_id: value }))}
                disabled={isSubmitting}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select product" />
                </SelectTrigger>
                <SelectContent>
                  {mockProducts.map(product => (
                    <SelectItem key={product.id} value={product.id}>
                      {product.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="method">HTTP Method *</Label>
              <Select
                value={formData.method}
                onValueChange={(value) => setFormData(prev => ({ ...prev, method: value }))}
                disabled={isSubmitting}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select method" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="GET">GET</SelectItem>
                  <SelectItem value="POST">POST</SelectItem>
                  <SelectItem value="PUT">PUT</SelectItem>
                  <SelectItem value="DELETE">DELETE</SelectItem>
                  <SelectItem value="PATCH">PATCH</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="endpoint">Endpoint Path *</Label>
              <Input
                id="endpoint"
                placeholder="/api/v1/example"
                value={formData.endpoint_path}
                onChange={(e) => setFormData(prev => ({ ...prev, endpoint_path: e.target.value }))}
                disabled={isSubmitting}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="case_type">Case Type *</Label>
              <Select
                value={formData.case_type}
                onValueChange={(value) => setFormData(prev => ({ ...prev, case_type: value }))}
                disabled={isSubmitting}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="POSITIVE">Positive (Success)</SelectItem>
                  <SelectItem value="NEGATIVE">Negative (Error)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="expected_input">Expected Input (JSON)</Label>
            <Textarea
              id="expected_input"
              placeholder='{"field": "value"}'
              value={formData.expected_input}
              onChange={(e) => setFormData(prev => ({ ...prev, expected_input: e.target.value }))}
              disabled={isSubmitting}
              rows={4}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="expected_output">Expected Output (JSON)</Label>
            <Textarea
              id="expected_output"
              placeholder='{"status": "success"}'
              value={formData.expected_output}
              onChange={(e) => setFormData(prev => ({ ...prev, expected_output: e.target.value }))}
              disabled={isSubmitting}
              rows={4}
            />
          </div>
          
          <div className="flex justify-end gap-2">
            <Button 
              type="button" 
              variant="outline" 
              onClick={() => onOpenChange(false)}
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Creating..." : "Create Test Case"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateTestCaseDialog;