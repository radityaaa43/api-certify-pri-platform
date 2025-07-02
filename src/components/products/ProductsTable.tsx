import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Plus, Edit, Trash2, Eye } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const ProductsTable = () => {
  const products = [
    {
      id: "1",
      name: "Fund Transfer",
      endpoints: 4,
      testCases: 24,
      partners: 12,
      status: "active"
    },
    {
      id: "2",
      name: "Account Inquiry",
      endpoints: 2,
      testCases: 16,
      partners: 8,
      status: "active"
    },
    {
      id: "3",
      name: "Payment Gateway",
      endpoints: 6,
      testCases: 32,
      partners: 15,
      status: "active"
    },
    {
      id: "4",
      name: "Balance Check",
      endpoints: 1,
      testCases: 8,
      partners: 5,
      status: "maintenance"
    },
    {
      id: "5",
      name: "Transaction History",
      endpoints: 3,
      testCases: 18,
      partners: 7,
      status: "active"
    }
  ];

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>API Products</CardTitle>
        <Button className="gap-2">
          <Plus className="h-4 w-4" />
          Add Product
        </Button>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Product Name</TableHead>
              <TableHead>Endpoints</TableHead>
              <TableHead>Test Cases</TableHead>
              <TableHead>Partners</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {products.map((product) => (
              <TableRow key={product.id}>
                <TableCell className="font-medium">{product.name}</TableCell>
                <TableCell>{product.endpoints}</TableCell>
                <TableCell>{product.testCases}</TableCell>
                <TableCell>{product.partners}</TableCell>
                <TableCell>
                  <Badge 
                    variant={product.status === "active" ? "default" : "secondary"}
                  >
                    {product.status}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <Button variant="ghost" size="icon">
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon">
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default ProductsTable;