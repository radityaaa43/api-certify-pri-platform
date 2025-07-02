import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, XCircle, Clock, Award } from "lucide-react";

const RecentActivity = () => {
  const activities = [
    {
      id: 1,
      type: "validation_completed",
      message: "Fund Transfer validation completed for PT Fintech Solutions",
      status: "success",
      time: "2 minutes ago",
      icon: CheckCircle
    },
    {
      id: 2,
      type: "certificate_issued",
      message: "Certificate issued for Payment Gateway integration",
      status: "info",
      time: "15 minutes ago",
      icon: Award
    },
    {
      id: 3,
      type: "validation_failed",
      message: "Account Inquiry validation failed - 2 test cases",
      status: "error",
      time: "1 hour ago",
      icon: XCircle
    },
    {
      id: 4,
      type: "validation_pending",
      message: "New validation session started for Balance Check API",
      status: "warning",
      time: "3 hours ago",
      icon: Clock
    },
    {
      id: 5,
      type: "partner_request",
      message: "New partner validation request from CV Digital Banking",
      status: "info",
      time: "5 hours ago",
      icon: Clock
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "success": return "text-success";
      case "error": return "text-destructive";
      case "warning": return "text-warning";
      case "info": return "text-info";
      default: return "text-muted-foreground";
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "success": return "default";
      case "error": return "destructive";
      case "warning": return "secondary";
      case "info": return "outline";
      default: return "secondary";
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Activity</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {activities.map((activity) => {
            const Icon = activity.icon;
            return (
              <div key={activity.id} className="flex items-start gap-3 p-3 rounded-lg hover:bg-muted/50 transition-colors">
                <Icon className={`h-4 w-4 mt-1 ${getStatusColor(activity.status)}`} />
                <div className="flex-1 space-y-1">
                  <p className="text-sm font-medium leading-relaxed">
                    {activity.message}
                  </p>
                  <div className="flex items-center gap-2">
                    <Badge variant={getStatusBadge(activity.status) as any} className="text-xs">
                      {activity.type.replace('_', ' ')}
                    </Badge>
                    <span className="text-xs text-muted-foreground">
                      {activity.time}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};

export default RecentActivity;