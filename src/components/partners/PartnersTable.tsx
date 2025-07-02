import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Plus, Edit, Trash2, Eye, PlayCircle } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const PartnersTable = () => {
  const partners = [
    {
      id: "1",
      name: "PT Fintech Solutions",
      email: "tech@fintech.co.id",
      products: ["Fund Transfer", "Account Inquiry"],
      status: "validated",
      lastValidation: "2024-01-15"
    },
    {
      id: "2", 
      name: "CV Digital Banking",
      email: "api@digitalbank.id",
      products: ["Payment Gateway"],
      status: "in_progress",
      lastValidation: "2024-01-14"
    },
    {
      id: "3",
      name: "PT Payment Processor",
      email: "integration@payprocess.com",
      products: ["Fund Transfer", "Payment Gateway", "Balance Check"],
      status: "validated",
      lastValidation: "2024-01-12"
    },
    {
      id: "4",
      name: "Startup Wallet",
      email: "dev@startwallet.id",
      products: ["Transaction History"],
      status: "pending",
      lastValidation: null
    },
    {
      id: "5",
      name: "Enterprise Solutions Ltd",
      email: "api@enterprise.co.id",
      products: ["Account Inquiry", "Balance Check"],
      status: "failed",
      lastValidation: "2024-01-10"
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "validated": return "default";
      case "in_progress": return "secondary";
      case "pending": return "outline";
      case "failed": return "destructive";
      default: return "secondary";
    }
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Partners</CardTitle>
        <Button className="gap-2">
          <Plus className="h-4 w-4" />
          Add Partner
        </Button>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Partner Name</TableHead>
              <TableHead>Contact Email</TableHead>
              <TableHead>Products</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Last Validation</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {partners.map((partner) => (
              <TableRow key={partner.id}>
                <TableCell className="font-medium">{partner.name}</TableCell>
                <TableCell className="text-muted-foreground">{partner.email}</TableCell>
                <TableCell>
                  <div className="flex flex-wrap gap-1">
                    {partner.products.map((product, idx) => (
                      <Badge key={idx} variant="outline" className="text-xs">
                        {product}
                      </Badge>
                    ))}
                  </div>
                </TableCell>
                <TableCell>
                  <Badge variant={getStatusColor(partner.status) as any}>
                    {partner.status.replace('_', ' ')}
                  </Badge>
                </TableCell>
                <TableCell className="text-muted-foreground">
                  {partner.lastValidation || "Never"}
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <Button variant="ghost" size="icon" title="Start Validation">
                      <PlayCircle className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" title="View Details">
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" title="Edit Partner">
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" title="Delete Partner">
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

export default PartnersTable;