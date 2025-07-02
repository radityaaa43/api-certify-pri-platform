import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Plus, Edit, Trash2, Eye, Filter } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";
import { getTestCasesWithProducts, mockProducts } from "@/data/mockData";
import CreateTestCaseDialog from "@/components/forms/CreateTestCaseDialog";

const TestCasesTable = () => {
  const [selectedProduct, setSelectedProduct] = useState<string>("all");
  const [showCreateDialog, setShowCreateDialog] = useState(false);
  const testCases = getTestCasesWithProducts();
  
  const filteredTestCases = selectedProduct === "all" 
    ? testCases 
    : testCases.filter(tc => tc.product_id === selectedProduct);

  const getMethodColor = (method: string) => {
    switch (method) {
      case "GET": return "bg-blue-100 text-blue-800";
      case "POST": return "bg-green-100 text-green-800";
      case "PUT": return "bg-orange-100 text-orange-800";
      case "DELETE": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getCaseTypeColor = (type: string) => {
    return type === "POSITIVE" ? "default" : "secondary";
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Test Cases</CardTitle>
          <p className="text-sm text-muted-foreground mt-1">
            Manage test cases for API validation
          </p>
        </div>
        <div className="flex gap-2">
          <Select value={selectedProduct} onValueChange={setSelectedProduct}>
            <SelectTrigger className="w-48">
              <Filter className="mr-2 h-4 w-4" />
              <SelectValue placeholder="Filter by product" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Products</SelectItem>
              {mockProducts.map(product => (
                <SelectItem key={product.id} value={product.id}>
                  {product.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Button className="gap-2" onClick={() => setShowCreateDialog(true)}>
            <Plus className="h-4 w-4" />
            Add Test Case
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Product</TableHead>
              <TableHead>Endpoint</TableHead>
              <TableHead>Method</TableHead>
              <TableHead>Case Type</TableHead>
              <TableHead>Created By</TableHead>
              <TableHead>Created At</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredTestCases.map((testCase) => (
              <TableRow key={testCase.id}>
                <TableCell className="font-medium">
                  {testCase.product_name}
                </TableCell>
                <TableCell className="font-mono text-sm">
                  {testCase.endpoint_path}
                </TableCell>
                <TableCell>
                  <Badge className={getMethodColor(testCase.method)}>
                    {testCase.method}
                  </Badge>
                </TableCell>
                <TableCell>
                  <Badge variant={getCaseTypeColor(testCase.case_type) as any}>
                    {testCase.case_type}
                  </Badge>
                </TableCell>
                <TableCell className="text-muted-foreground text-sm">
                  {testCase.created_by}
                </TableCell>
                <TableCell className="text-muted-foreground text-sm">
                  {new Date(testCase.created_at).toLocaleDateString()}
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <Button variant="ghost" size="icon" title="View Details">
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" title="Edit Test Case">
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" title="Delete Test Case">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        
        {filteredTestCases.length === 0 && (
          <div className="text-center py-8">
            <p className="text-muted-foreground">No test cases found</p>
            <Button className="mt-4 gap-2" onClick={() => setShowCreateDialog(true)}>
              <Plus className="h-4 w-4" />
              Create your first test case
            </Button>
          </div>
        )}
      </CardContent>
      <CreateTestCaseDialog 
        open={showCreateDialog} 
        onOpenChange={setShowCreateDialog}
        products={mockProducts}
        onSuccess={() => {/* Refresh data */}}
      />
    </Card>
  );
};

export default TestCasesTable;