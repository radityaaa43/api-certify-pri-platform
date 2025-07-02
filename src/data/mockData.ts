import { 
  Product, 
  TestCase, 
  Partner, 
  PartnerProduct, 
  ValidationSession, 
  ValidationResult, 
  PartnerRequest, 
  Certification,
  ProductWithStats,
  PartnerWithProducts,
  ValidationSessionWithDetails,
  TestCaseWithProduct
} from '@/types';

// Mock Products
export const mockProducts: Product[] = [
  { id: "1", name: "Fund Transfer" },
  { id: "2", name: "Account Inquiry" },
  { id: "3", name: "Payment Gateway" },
  { id: "4", name: "Balance Check" },
  { id: "5", name: "Transaction History" },
];

// Mock Test Cases
export const mockTestCases: TestCase[] = [
  {
    id: "1",
    product_id: "1",
    endpoint_path: "/api/v1/transfer",
    method: "POST",
    case_type: "POSITIVE",
    expected_input: { amount: 100000, destination_account: "1234567890" },
    expected_output: { status: "success", transaction_id: "TXN12345" },
    created_by: "qa_engineer@bri.co.id",
    created_at: "2024-01-10T10:00:00Z"
  },
  {
    id: "2", 
    product_id: "1",
    endpoint_path: "/api/v1/transfer",
    method: "POST",
    case_type: "NEGATIVE",
    expected_input: { amount: -100, destination_account: "invalid" },
    expected_output: { status: "error", error_code: "INVALID_AMOUNT" },
    created_by: "qa_engineer@bri.co.id",
    created_at: "2024-01-10T10:05:00Z"
  },
  {
    id: "3",
    product_id: "2",
    endpoint_path: "/api/v1/account/inquiry",
    method: "GET",
    case_type: "POSITIVE",
    expected_input: { account_number: "1234567890" },
    expected_output: { status: "success", account_name: "John Doe", balance: 1000000 },
    created_by: "qa_engineer@bri.co.id",
    created_at: "2024-01-10T11:00:00Z"
  }
];

// Mock Partners
export const mockPartners: Partner[] = [
  {
    id: "1",
    name: "PT Fintech Solutions",
    contact_email: "tech@fintech.co.id",
    status: "COMPLETED",
    created_at: "2024-01-01T08:00:00Z"
  },
  {
    id: "2",
    name: "CV Digital Banking",
    contact_email: "api@digitalbank.id", 
    status: "VALIDATION_IN_PROGRESS",
    created_at: "2024-01-05T09:00:00Z"
  },
  {
    id: "3",
    name: "PT Payment Processor",
    contact_email: "integration@payprocess.com",
    status: "COMPLETED",
    created_at: "2024-01-03T10:00:00Z"
  },
  {
    id: "4",
    name: "Startup Wallet",
    contact_email: "dev@startwallet.id",
    status: "APPROVED",
    created_at: "2024-01-08T11:00:00Z"
  },
  {
    id: "5",
    name: "Enterprise Solutions Ltd",
    contact_email: "api@enterprise.co.id",
    status: "UNVERIFIED", 
    created_at: "2024-01-10T12:00:00Z"
  }
];

// Mock Partner Products (bindings)
export const mockPartnerProducts: PartnerProduct[] = [
  { id: "1", partner_id: "1", product_id: "1" },
  { id: "2", partner_id: "1", product_id: "2" },
  { id: "3", partner_id: "2", product_id: "3" },
  { id: "4", partner_id: "3", product_id: "1" },
  { id: "5", partner_id: "3", product_id: "3" },
  { id: "6", partner_id: "3", product_id: "4" },
  { id: "7", partner_id: "4", product_id: "5" },
  { id: "8", partner_id: "5", product_id: "2" },
  { id: "9", partner_id: "5", product_id: "4" },
];

// Mock Validation Sessions  
export const mockValidationSessions: ValidationSession[] = [
  {
    id: "1",
    partner_id: "1",
    product_id: "1",
    date_from: "2024-01-10T00:00:00Z",
    date_to: "2024-01-15T23:59:59Z",
    status: "DONE",
    created_by: "qa_manager@bri.co.id",
    created_at: "2024-01-15T14:30:00Z"
  },
  {
    id: "2",
    partner_id: "2",
    product_id: "3", 
    date_from: "2024-01-12T00:00:00Z",
    date_to: "2024-01-14T23:59:59Z",
    status: "RUNNING",
    created_by: "qa_manager@bri.co.id",
    created_at: "2024-01-14T09:15:00Z"
  },
  {
    id: "3",
    partner_id: "5",
    product_id: "2",
    date_from: "2024-01-08T00:00:00Z", 
    date_to: "2024-01-10T23:59:59Z",
    status: "FAILED",
    created_by: "qa_manager@bri.co.id",
    created_at: "2024-01-10T16:45:00Z"
  },
  {
    id: "4",
    partner_id: "3",
    product_id: "4",
    date_from: "2024-01-11T00:00:00Z",
    date_to: "2024-01-12T23:59:59Z", 
    status: "DONE",
    created_by: "qa_manager@bri.co.id",
    created_at: "2024-01-12T11:20:00Z"
  },
  {
    id: "5",
    partner_id: "4",
    product_id: "5",
    date_from: "2024-01-13T00:00:00Z",
    date_to: "2024-01-14T23:59:59Z",
    status: "PENDING", 
    created_by: "qa_manager@bri.co.id",
    created_at: "2024-01-13T08:00:00Z"
  }
];

// Mock Validation Results
export const mockValidationResults: ValidationResult[] = [
  {
    id: "1",
    session_id: "1",
    test_case_id: "1", 
    endpoint_path: "/api/v1/transfer",
    method: "POST",
    email: "tech@fintech.co.id",
    log_id: "LOG_001",
    is_pass: true,
    reason: "All validations passed successfully",
    case_type: "POSITIVE",
    created_at: "2024-01-15T14:35:00Z"
  },
  {
    id: "2",
    session_id: "1",
    test_case_id: "2",
    endpoint_path: "/api/v1/transfer", 
    method: "POST",
    email: "tech@fintech.co.id",
    log_id: "LOG_002",
    is_pass: true,
    reason: "Error handling validated correctly",
    case_type: "NEGATIVE",
    created_at: "2024-01-15T14:36:00Z"
  },
  {
    id: "3",
    session_id: "3",
    test_case_id: "3",
    endpoint_path: "/api/v1/account/inquiry",
    method: "GET", 
    email: "api@enterprise.co.id",
    log_id: "LOG_003",
    is_pass: false,
    reason: "Response format does not match expected schema",
    case_type: "POSITIVE",
    created_at: "2024-01-10T16:50:00Z"
  }
];

// Mock Partner Requests
export const mockPartnerRequests: PartnerRequest[] = [
  {
    id: "1",
    partner_name: "Mega Fintech Corp",
    contact_email: "integration@megafintech.id",
    requested_product_id: "1",
    notes: "We want to integrate Fund Transfer API for our mobile banking application",
    status: "PENDING",
    created_at: "2024-01-14T10:30:00Z"
  },
  {
    id: "2",
    partner_name: "Digital Wallet Pro",
    contact_email: "tech@digitalwallet.co.id",
    requested_product_id: "3", 
    notes: "Payment Gateway integration for e-commerce platform",
    status: "APPROVED",
    reviewed_by: "qa_manager@bri.co.id",
    reviewed_at: "2024-01-13T15:20:00Z",
    created_at: "2024-01-12T14:15:00Z"
  },
  {
    id: "3",
    partner_name: "Startup Banking",
    contact_email: "api@startupbank.id",
    requested_product_id: "2",
    notes: "Account inquiry service for our fintech app",
    status: "REJECTED",
    reviewed_by: "qa_manager@bri.co.id", 
    reviewed_at: "2024-01-11T09:45:00Z",
    created_at: "2024-01-10T08:30:00Z"
  }
];

// Mock Certifications
export const mockCertifications: Certification[] = [
  {
    cert_uuid: "CERT_001",
    session_id: "1",
    partner_name: "PT Fintech Solutions",
    product_name: "Fund Transfer",
    issue_date: "2024-01-15T15:00:00Z",
    cert_file_url: "/certificates/CERT_001.pdf",
    verification_url: "https://pri.co.id/cert/verify?cert_id=CERT_001",
    status: "ISSUED",
    created_at: "2024-01-15T15:00:00Z"
  },
  {
    cert_uuid: "CERT_002",
    session_id: "4", 
    partner_name: "PT Payment Processor",
    product_name: "Balance Check",
    issue_date: "2024-01-12T12:00:00Z",
    cert_file_url: "/certificates/CERT_002.pdf",
    verification_url: "https://pri.co.id/cert/verify?cert_id=CERT_002",
    status: "ISSUED",
    created_at: "2024-01-12T12:00:00Z"
  }
];

// Derived data with stats
export const getProductsWithStats = (): ProductWithStats[] => {
  return mockProducts.map(product => {
    const testCases = mockTestCases.filter(tc => tc.product_id === product.id).length;
    const partnerBindings = mockPartnerProducts.filter(pp => pp.product_id === product.id);
    const endpoints = new Set(mockTestCases.filter(tc => tc.product_id === product.id).map(tc => tc.endpoint_path)).size;
    
    return {
      ...product,
      endpoints,
      testCases,
      partners: partnerBindings.length,
      status: testCases > 0 ? "active" : "maintenance"
    };
  });
};

export const getPartnersWithProducts = (): PartnerWithProducts[] => {
  return mockPartners.map(partner => {
    const partnerBindings = mockPartnerProducts.filter(pp => pp.partner_id === partner.id);
    const products = partnerBindings.map(pb => {
      const product = mockProducts.find(p => p.id === pb.product_id);
      return product?.name || "";
    }).filter(Boolean);
    
    const lastSession = mockValidationSessions
      .filter(vs => vs.partner_id === partner.id)
      .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())[0];
    
    return {
      ...partner,
      products,
      lastValidation: lastSession ? lastSession.created_at.split('T')[0] : undefined
    };
  });
};

export const getValidationSessionsWithDetails = (): ValidationSessionWithDetails[] => {
  return mockValidationSessions.map(session => {
    const partner = mockPartners.find(p => p.id === session.partner_id);
    const product = mockProducts.find(p => p.id === session.product_id);
    const results = mockValidationResults.filter(r => r.session_id === session.id);
    const testCases = mockTestCases.filter(tc => tc.product_id === session.product_id);
    const certificate = mockCertifications.find(c => c.session_id === session.id);
    
    return {
      ...session,
      partner_name: partner?.name || "",
      product_name: product?.name || "",
      testCasesPassed: results.filter(r => r.is_pass).length,
      testCasesTotal: testCases.length,
      certificateIssued: !!certificate
    };
  });
};

export const getTestCasesWithProducts = (): TestCaseWithProduct[] => {
  return mockTestCases.map(testCase => {
    const product = mockProducts.find(p => p.id === testCase.product_id);
    return {
      ...testCase,
      product_name: product?.name || ""
    };
  });
};