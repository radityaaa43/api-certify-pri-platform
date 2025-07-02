import { useState } from "react";
import Header from "@/components/layout/Header";
import Sidebar from "@/components/layout/Sidebar";
import DashboardStats from "@/components/dashboard/DashboardStats";
import RecentActivity from "@/components/dashboard/RecentActivity";
import ProductsTable from "@/components/products/ProductsTable";
import PartnersTable from "@/components/partners/PartnersTable";
import ValidationSessionsTable from "@/components/validation/ValidationSessionsTable";
import TestCasesTable from "@/components/test-cases/TestCasesTable";
import PartnerRequestsTable from "@/components/partner-requests/PartnerRequestsTable";
import CertificatesTable from "@/components/certificates/CertificatesTable";

const Index = () => {
  const [activeTab, setActiveTab] = useState("dashboard");

  const renderContent = () => {
    switch (activeTab) {
      case "dashboard":
        return (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold tracking-tight">Dashboard</h2>
              <p className="text-muted-foreground">
                Overview of API validation activities and system status
              </p>
            </div>
            <DashboardStats />
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <RecentActivity />
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Quick Actions</h3>
                <div className="grid grid-cols-2 gap-4">
                  <button 
                    onClick={() => setActiveTab("validation-sessions")}
                    className="p-4 bg-card border rounded-lg hover:bg-accent transition-colors text-left"
                  >
                    <h4 className="font-medium">Start Validation</h4>
                    <p className="text-sm text-muted-foreground">Begin new validation session</p>
                  </button>
                  <button 
                    onClick={() => setActiveTab("partner-requests")}
                    className="p-4 bg-card border rounded-lg hover:bg-accent transition-colors text-left"
                  >
                    <h4 className="font-medium">Review Requests</h4>
                    <p className="text-sm text-muted-foreground">Check partner applications</p>
                  </button>
                </div>
              </div>
            </div>
          </div>
        );
      case "products":
        return (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold tracking-tight">API Products</h2>
              <p className="text-muted-foreground">
                Manage API products and their configurations
              </p>
            </div>
            <ProductsTable />
          </div>
        );
      case "test-cases":
        return (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold tracking-tight">Test Cases</h2>
              <p className="text-muted-foreground">
                Define validation rules for API endpoints
              </p>
            </div>
            <TestCasesTable />
          </div>
        );
      case "partner-requests":
        return (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold tracking-tight">Partner Requests</h2>
              <p className="text-muted-foreground">
                Review and approve partner validation requests
              </p>
            </div>
            <PartnerRequestsTable />
          </div>
        );
      case "certificates":
        return (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold tracking-tight">Certificates</h2>
              <p className="text-muted-foreground">
                Manage issued API integration certificates
              </p>
            </div>
            <CertificatesTable />
          </div>
        );
      case "partners":
        return (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold tracking-tight">Partners</h2>
              <p className="text-muted-foreground">
                Manage partner integrations and their validation status
              </p>
            </div>
            <PartnersTable />
          </div>
        );
      case "validation-sessions":
        return (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold tracking-tight">Validation Sessions</h2>
              <p className="text-muted-foreground">
                Monitor and manage API validation processes
              </p>
            </div>
            <ValidationSessionsTable />
          </div>
        );
      default:
        return (
          <div className="flex items-center justify-center h-64">
            <p className="text-muted-foreground">
              {activeTab.replace('-', ' ')} section coming soon...
            </p>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="flex h-[calc(100vh-4rem)]">
        <Sidebar activeTab={activeTab} onTabChange={setActiveTab} />
        <main className="flex-1 p-6 overflow-y-auto">
          {renderContent()}
        </main>
      </div>
    </div>
  );
};

export default Index;
