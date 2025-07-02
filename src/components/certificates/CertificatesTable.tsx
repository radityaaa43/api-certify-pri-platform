import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Download, QrCode, Eye, RotateCcw, Award } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { mockCertifications } from "@/data/mockData";
import { useToast } from "@/hooks/use-toast";

const CertificatesTable = () => {
  const { toast } = useToast();

  const handleDownload = (certId: string, partnerName: string) => {
    toast({
      title: "Certificate Downloaded",
      description: `Certificate for ${partnerName} has been downloaded successfully.`,
    });
  };

  const handleViewQR = (certId: string) => {
    toast({
      title: "QR Code Generated",
      description: "QR code for certificate verification has been generated.",
    });
  };

  const handleRevoke = (certId: string, partnerName: string) => {
    toast({
      title: "Certificate Revoked",
      description: `Certificate for ${partnerName} has been revoked.`,
      variant: "destructive",
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "ISSUED": return "default";
      case "REVOKED": return "destructive";
      default: return "secondary";
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Award className="h-5 w-5" />
          Issued Certificates
          <Badge variant="secondary" className="ml-2">
            {mockCertifications.filter(c => c.status === "ISSUED").length} active
          </Badge>
        </CardTitle>
        <p className="text-sm text-muted-foreground">
          Manage and track issued API integration certificates
        </p>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Certificate ID</TableHead>
              <TableHead>Partner</TableHead>
              <TableHead>Product</TableHead>
              <TableHead>Issue Date</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Verification URL</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {mockCertifications.map((cert) => (
              <TableRow key={cert.cert_uuid}>
                <TableCell className="font-mono text-sm">
                  {cert.cert_uuid}
                </TableCell>
                <TableCell className="font-medium">
                  {cert.partner_name}
                </TableCell>
                <TableCell>
                  <Badge variant="outline">
                    {cert.product_name}
                  </Badge>
                </TableCell>
                <TableCell className="text-muted-foreground text-sm">
                  {new Date(cert.issue_date).toLocaleDateString()}
                </TableCell>
                <TableCell>
                  <Badge variant={getStatusColor(cert.status) as any}>
                    {cert.status}
                  </Badge>
                </TableCell>
                <TableCell className="text-muted-foreground text-sm font-mono">
                  <a 
                    href={cert.verification_url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="hover:underline hover:text-primary"
                  >
                    {cert.verification_url.split('?')[0] + '?cert_id=' + cert.cert_uuid.slice(-8)}
                  </a>
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      title="View Certificate"
                    >
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      title="Show QR Code"
                      onClick={() => handleViewQR(cert.cert_uuid)}
                    >
                      <QrCode className="h-4 w-4" />
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      title="Download Certificate"
                      onClick={() => handleDownload(cert.cert_uuid, cert.partner_name)}
                    >
                      <Download className="h-4 w-4" />
                    </Button>
                    {cert.status === "ISSUED" && (
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        title="Revoke Certificate"
                        onClick={() => handleRevoke(cert.cert_uuid, cert.partner_name)}
                        className="text-red-600 hover:text-red-700 hover:bg-red-50"
                      >
                        <RotateCcw className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        {mockCertifications.length === 0 && (
          <div className="text-center py-8">
            <Award className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground">No certificates issued yet</p>
            <p className="text-sm text-muted-foreground mt-2">
              Certificates will appear here after successful validations
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default CertificatesTable;