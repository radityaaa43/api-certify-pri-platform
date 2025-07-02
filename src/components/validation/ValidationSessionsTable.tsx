import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Plus, Eye, Download, RotateCcw } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import CreateValidationSessionDialog from "@/components/forms/CreateValidationSessionDialog";
import { mockProducts } from "@/data/mockData";

const ValidationSessionsTable = () => {
  const [showCreateDialog, setShowCreateDialog] = useState(false);
  
  
  const sessions = [
    {
      id: "1",
      partner: "PT Fintech Solutions",
      product: "Fund Transfer",
      dateRange: "2024-01-10 to 2024-01-15",
      status: "completed",
      testCasesPassed: 24,
      testCasesTotal: 24,
      certificateIssued: true,
      createdAt: "2024-01-15 14:30"
    },
    {
      id: "2",
      partner: "CV Digital Banking", 
      product: "Payment Gateway",
      dateRange: "2024-01-12 to 2024-01-14",
      status: "running",
      testCasesPassed: 18,
      testCasesTotal: 32,
      certificateIssued: false,
      createdAt: "2024-01-14 09:15"
    },
    {
      id: "3",
      partner: "Enterprise Solutions Ltd",
      product: "Account Inquiry",
      dateRange: "2024-01-08 to 2024-01-10",
      status: "failed",
      testCasesPassed: 14,
      testCasesTotal: 16,
      certificateIssued: false,
      createdAt: "2024-01-10 16:45"
    },
    {
      id: "4",
      partner: "PT Payment Processor",
      product: "Balance Check",
      dateRange: "2024-01-11 to 2024-01-12",
      status: "completed",
      testCasesPassed: 8,
      testCasesTotal: 8,
      certificateIssued: true,
      createdAt: "2024-01-12 11:20"
    },
    {
      id: "5",
      partner: "Startup Wallet",
      product: "Transaction History",
      dateRange: "2024-01-13 to 2024-01-14",
      status: "pending",
      testCasesPassed: 0,
      testCasesTotal: 18,
      certificateIssued: false,
      createdAt: "2024-01-13 08:00"
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed": return "default";
      case "running": return "secondary";
      case "pending": return "outline";
      case "failed": return "destructive";
      default: return "secondary";
    }
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Validation Sessions</CardTitle>
        <Button className="gap-2" onClick={() => setShowCreateDialog(true)}>
          <Plus className="h-4 w-4" />
          Start New Session
        </Button>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Partner</TableHead>
              <TableHead>Product</TableHead>
              <TableHead>Date Range</TableHead>
              <TableHead>Test Cases</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Certificate</TableHead>
              <TableHead>Created</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sessions.map((session) => (
              <TableRow key={session.id}>
                <TableCell className="font-medium">{session.partner}</TableCell>
                <TableCell>{session.product}</TableCell>
                <TableCell className="text-muted-foreground text-sm">
                  {session.dateRange}
                </TableCell>
                <TableCell>
                  <span className={session.testCasesPassed === session.testCasesTotal ? "text-success" : "text-muted-foreground"}>
                    {session.testCasesPassed}/{session.testCasesTotal}
                  </span>
                </TableCell>
                <TableCell>
                  <Badge variant={getStatusColor(session.status) as any}>
                    {session.status}
                  </Badge>
                </TableCell>
                <TableCell>
                  {session.certificateIssued ? (
                    <Badge variant="default" className="gap-1">
                      <Download className="h-3 w-3" />
                      Issued
                    </Badge>
                  ) : (
                    <span className="text-muted-foreground text-sm">Not issued</span>
                  )}
                </TableCell>
                <TableCell className="text-muted-foreground text-sm">
                  {session.createdAt}
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <Button variant="ghost" size="icon" title="View Results">
                      <Eye className="h-4 w-4" />
                    </Button>
                    {session.status === "failed" && (
                      <Button variant="ghost" size="icon" title="Retry Validation">
                        <RotateCcw className="h-4 w-4" />
                      </Button>
                    )}
                    {session.certificateIssued && (
                      <Button variant="ghost" size="icon" title="Download Certificate">
                        <Download className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
      <CreateValidationSessionDialog
        open={showCreateDialog}
        onOpenChange={setShowCreateDialog}
        partners={sessions.map(s => ({ id: s.id, name: s.partner }))}
        products={mockProducts}
        onSuccess={() => {/* Refresh data */}}
      />
    </Card>
  );
};

export default ValidationSessionsTable;