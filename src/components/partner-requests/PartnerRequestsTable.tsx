import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Check, X, Eye, Clock, AlertCircle } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { mockPartnerRequests, mockProducts } from "@/data/mockData";
import { useToast } from "@/hooks/use-toast";

const PartnerRequestsTable = () => {
  const { toast } = useToast();
  
  const handleApprove = (id: string, partnerName: string) => {
    toast({
      title: "Partner Request Approved",
      description: `${partnerName} has been approved and can now proceed with validation.`,
    });
  };

  const handleReject = (id: string, partnerName: string) => {
    toast({
      title: "Partner Request Rejected", 
      description: `${partnerName}'s request has been rejected.`,
      variant: "destructive",
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "PENDING": return "secondary";
      case "APPROVED": return "default";
      case "REJECTED": return "destructive";
      default: return "secondary";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "PENDING": return <Clock className="h-3 w-3" />;
      case "APPROVED": return <Check className="h-3 w-3" />;
      case "REJECTED": return <X className="h-3 w-3" />;
      default: return <AlertCircle className="h-3 w-3" />;
    }
  };

  const getProductName = (productId: string) => {
    return mockProducts.find(p => p.id === productId)?.name || "Unknown Product";
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          Partner Validation Requests
          <Badge variant="secondary" className="ml-2">
            {mockPartnerRequests.filter(r => r.status === "PENDING").length} pending
          </Badge>
        </CardTitle>
        <p className="text-sm text-muted-foreground">
          Review and approve partner validation requests
        </p>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Partner Name</TableHead>
              <TableHead>Contact Email</TableHead>
              <TableHead>Requested Product</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Notes</TableHead>
              <TableHead>Created At</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {mockPartnerRequests.map((request) => (
              <TableRow key={request.id}>
                <TableCell className="font-medium">
                  {request.partner_name}
                </TableCell>
                <TableCell className="text-muted-foreground">
                  {request.contact_email}
                </TableCell>
                <TableCell>
                  <Badge variant="outline">
                    {getProductName(request.requested_product_id)}
                  </Badge>
                </TableCell>
                <TableCell>
                  <Badge 
                    variant={getStatusColor(request.status) as any}
                    className="gap-1"
                  >
                    {getStatusIcon(request.status)}
                    {request.status}
                  </Badge>
                </TableCell>
                <TableCell className="max-w-xs">
                  <p className="text-sm text-muted-foreground truncate" title={request.notes}>
                    {request.notes}
                  </p>
                </TableCell>
                <TableCell className="text-muted-foreground text-sm">
                  {new Date(request.created_at).toLocaleDateString()}
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <Button variant="ghost" size="icon" title="View Details">
                      <Eye className="h-4 w-4" />
                    </Button>
                    {request.status === "PENDING" && (
                      <>
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          title="Approve Request"
                          onClick={() => handleApprove(request.id, request.partner_name)}
                          className="text-green-600 hover:text-green-700 hover:bg-green-50"
                        >
                          <Check className="h-4 w-4" />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          title="Reject Request"
                          onClick={() => handleReject(request.id, request.partner_name)}
                          className="text-red-600 hover:text-red-700 hover:bg-red-50"
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </>
                    )}
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        {mockPartnerRequests.length === 0 && (
          <div className="text-center py-8">
            <AlertCircle className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground">No partner requests found</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default PartnerRequestsTable;