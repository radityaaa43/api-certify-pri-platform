// Core entity types based on the ERD

export interface Product {
  id: string;
  name: string;
  created_at?: string;
}

export interface TestCase {
  id: string;
  product_id: string;
  endpoint_path: string;
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
  case_type: 'POSITIVE' | 'NEGATIVE';
  expected_input: Record<string, any>;
  expected_output: Record<string, any>;
  created_by: string;
  created_at: string;
}

export interface Partner {
  id: string;
  name: string;
  contact_email: string;
  status: 'UNVERIFIED' | 'APPROVED' | 'VALIDATION_IN_PROGRESS' | 'COMPLETED';
  created_at: string;
}

export interface PartnerProduct {
  id: string;
  partner_id: string;
  product_id: string;
}

export interface ValidationSession {
  id: string;
  partner_id: string;
  product_id: string;
  date_from: string;
  date_to: string;
  status: 'PENDING' | 'RUNNING' | 'DONE' | 'FAILED';
  created_by: string;
  created_at: string;
}

export interface ValidationResult {
  id: string;
  session_id: string;
  test_case_id: string;
  endpoint_path: string;
  method: string;
  email: string;
  log_id: string;
  is_pass: boolean;
  reason: string;
  case_type: 'POSITIVE' | 'NEGATIVE';
  created_at: string;
}

export interface PartnerRequest {
  id: string;
  partner_name: string;
  contact_email: string;
  requested_product_id: string;
  notes: string;
  status: 'PENDING' | 'APPROVED' | 'REJECTED';
  reviewed_by?: string;
  reviewed_at?: string;
  created_at: string;
}

export interface Certification {
  cert_uuid: string;
  session_id: string;
  partner_name: string;
  product_name: string;
  issue_date: string;
  cert_file_url: string;
  verification_url: string;
  status: 'ISSUED' | 'REVOKED';
  created_at: string;
}

// Extended types for UI components
export interface ProductWithStats extends Product {
  endpoints: number;
  testCases: number;
  partners: number;
  status: string;
}

export interface PartnerWithProducts extends Partner {
  products: string[];
  lastValidation?: string;
}

export interface ValidationSessionWithDetails extends ValidationSession {
  partner_name: string;
  product_name: string;
  testCasesPassed: number;
  testCasesTotal: number;
  certificateIssued: boolean;
}

export interface TestCaseWithProduct extends TestCase {
  product_name: string;
}

// Form types
export interface CreateProductForm {
  name: string;
}

export interface CreateTestCaseForm {
  product_id: string;
  endpoint_path: string;
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
  case_type: 'POSITIVE' | 'NEGATIVE';
  expected_input: string; // JSON string
  expected_output: string; // JSON string
}

export interface CreatePartnerForm {
  name: string;
  contact_email: string;
  products: string[];
}

export interface CreateValidationSessionForm {
  partner_id: string;
  product_id: string;
  date_from: string;
  date_to: string;
}

export interface CreatePartnerRequestForm {
  partner_name: string;
  contact_email: string;
  requested_product_id: string;
  notes: string;
}