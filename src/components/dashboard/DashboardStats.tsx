import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Package, Users, PlayCircle, Award, TrendingUp, CheckCircle } from "lucide-react";

const DashboardStats = () => {
  const stats = [
    {
      title: "Total Products",
      value: "12",
      icon: Package,
      change: "+2 this month",
      color: "text-info"
    },
    {
      title: "Active Partners",
      value: "47",
      icon: Users,
      change: "+8 this month",
      color: "text-primary"
    },
    {
      title: "Validation Sessions",
      value: "156",
      icon: PlayCircle,
      change: "+23 this week",
      color: "text-warning"
    },
    {
      title: "Certificates Issued",
      value: "89",
      icon: Award,
      change: "+12 this week",
      color: "text-success"
    },
    {
      title: "Success Rate",
      value: "94.2%",
      icon: TrendingUp,
      change: "+2.1% improvement",
      color: "text-success"
    },
    {
      title: "Test Cases Passed",
      value: "1,247",
      icon: CheckCircle,
      change: "+187 this week",
      color: "text-success"
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {stats.map((stat, index) => {
        const Icon = stat.icon;
        return (
          <Card key={index} className="hover:shadow-md transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {stat.title}
              </CardTitle>
              <Icon className={`h-4 w-4 ${stat.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground mt-1">
                {stat.change}
              </p>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};

export default DashboardStats;