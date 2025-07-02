import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, XCircle, AlertTriangle, Clock } from "lucide-react";
import { mockValidationResults, mockTestCases } from "@/data/mockData";

interface ValidationResultsDialogProps {
  sessionId: string | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const ValidationResultsDialog = ({ sessionId, open, onOpenChange }: ValidationResultsDialogProps) => {
  if (!sessionId) return null;

  const results = mockValidationResults.filter(r => r.session_id === sessionId);
  const testCases = mockTestCases;
  
  const passedCount = results.filter(r => r.is_pass).length;
  const failedCount = results.filter(r => !r.is_pass).length;
  const totalExpected = testCases.length;

  const getStatusIcon = (isPassed: boolean) => {
    return isPassed ? (
      <CheckCircle className="h-4 w-4 text-green-600" />
    ) : (
      <XCircle className="h-4 w-4 text-red-600" />
    );
  };

  const getStatusColor = (isPassed: boolean) => {
    return isPassed ? "default" : "destructive";
  };

  const getMethodColor = (method: string) => {
    switch (method) {
      case "GET": return "bg-blue-100 text-blue-800";
      case "POST": return "bg-green-100 text-green-800";
      case "PUT": return "bg-orange-100 text-orange-800";
      case "DELETE": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Validation Results - Session {sessionId}</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* Summary Cards */}
          <div className="grid grid-cols-3 gap-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  Passed
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="text-2xl font-bold text-green-600">{passedCount}</div>
                <p className="text-xs text-muted-foreground">
                  {totalExpected > 0 ? Math.round((passedCount / totalExpected) * 100) : 0}% success rate
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                  <XCircle className="h-4 w-4 text-red-600" />
                  Failed
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="text-2xl font-bold text-red-600">{failedCount}</div>
                <p className="text-xs text-muted-foreground">
                  {failedCount > 0 ? `${failedCount} test cases need attention` : "All tests passed"}
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                  <Clock className="h-4 w-4 text-orange-600" />
                  Coverage
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="text-2xl font-bold">{results.length}/{totalExpected}</div>
                <p className="text-xs text-muted-foreground">
                  Test cases executed
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Results List */}
          <Card>
            <CardHeader>
              <CardTitle>Detailed Results</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {results.map((result) => {
                  const testCase = testCases.find(tc => tc.id === result.test_case_id);
                  return (
                    <div 
                      key={result.id} 
                      className={`p-4 rounded-lg border ${result.is_pass ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'}`}
                    >
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-3">
                          {getStatusIcon(result.is_pass)}
                          <div>
                            <h4 className="font-medium text-sm">{result.endpoint_path}</h4>
                            <p className="text-xs text-muted-foreground">Log ID: {result.log_id}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge className={getMethodColor(result.method)}>
                            {result.method}
                          </Badge>
                          <Badge variant={result.case_type === "POSITIVE" ? "default" : "secondary"}>
                            {result.case_type}
                          </Badge>
                          <Badge variant={getStatusColor(result.is_pass) as any}>
                            {result.is_pass ? "PASS" : "FAIL"}
                          </Badge>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <p className="font-medium text-muted-foreground mb-1">Email:</p>
                          <p className="font-mono">{result.email}</p>
                        </div>
                        <div>
                          <p className="font-medium text-muted-foreground mb-1">Timestamp:</p>
                          <p>{new Date(result.created_at).toLocaleString()}</p>
                        </div>
                      </div>
                      
                      <div className="mt-3">
                        <p className="font-medium text-muted-foreground mb-1">Validation Result:</p>
                        <p className={`text-sm ${result.is_pass ? 'text-green-700' : 'text-red-700'}`}>
                          {result.reason}
                        </p>
                      </div>

                      {testCase && (
                        <div className="mt-3 pt-3 border-t border-gray-200">
                          <p className="font-medium text-muted-foreground mb-2">Expected Behavior:</p>
                          <div className="grid grid-cols-2 gap-4 text-xs">
                            <div>
                              <p className="font-medium mb-1">Input Schema:</p>
                              <pre className="bg-gray-100 p-2 rounded text-xs overflow-x-auto">
                                {JSON.stringify(testCase.expected_input, null, 2)}
                              </pre>
                            </div>
                            <div>
                              <p className="font-medium mb-1">Output Schema:</p>
                              <pre className="bg-gray-100 p-2 rounded text-xs overflow-x-auto">
                                {JSON.stringify(testCase.expected_output, null, 2)}
                              </pre>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

              {results.length === 0 && (
                <div className="text-center py-8">
                  <AlertTriangle className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground">No validation results found</p>
                  <p className="text-sm text-muted-foreground mt-2">
                    This session may still be running or has no test data
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ValidationResultsDialog;