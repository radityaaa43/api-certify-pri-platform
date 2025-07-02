import { api, PaginatedResponse } from '@/lib/api-client';
import {
  Product,
  TestCase,
  Partner,
  ValidationSession,
  ValidationResult,
  PartnerRequest,
  Certification,
  CreateProductForm,
  CreateTestCaseForm,
  CreatePartnerForm,
  CreateValidationSessionForm,
  CreatePartnerRequestForm,
} from '@/types';

// Products API
export const productsApi = {
  getAll: () => api.get<Product[]>('/api/validator/products'),
  
  create: (data: CreateProductForm) => 
    api.post<Product>('/api/validator/products', data),
  
  update: (id: string, data: Partial<Product>) => 
    api.put<Product>(`/api/validator/products/${id}`, data),
  
  delete: (id: string) => 
    api.delete(`/api/validator/products/${id}`),
};

// Test Cases API
export const testCasesApi = {
  getAll: (params?: { product_id?: string; page?: number; limit?: number }) => 
    api.get<PaginatedResponse<TestCase>>('/api/validator/test-cases', params),
  
  create: (data: CreateTestCaseForm) => 
    api.post<TestCase>('/api/validator/test-cases', data),
  
  update: (id: string, data: Partial<TestCase>) => 
    api.put<TestCase>(`/api/validator/test-cases/${id}`, data),
  
  delete: (id: string) => 
    api.delete(`/api/validator/test-cases/${id}`),
};

// Partners API
export const partnersApi = {
  getAll: (params?: { page?: number; limit?: number; status?: string }) => 
    api.get<PaginatedResponse<Partner>>('/api/validator/partners', params),
  
  create: (data: CreatePartnerForm) => 
    api.post<Partner>('/api/validator/partners', data),
  
  update: (id: string, data: Partial<Partner>) => 
    api.put<Partner>(`/api/validator/partners/${id}`, data),
  
  delete: (id: string) => 
    api.delete(`/api/validator/partners/${id}`),
  
  bindProduct: (partnerId: string, productId: string) => 
    api.post('/api/validator/partner-products', { partner_id: partnerId, product_id: productId }),
};

// Validation Sessions API
export const validationSessionsApi = {
  getAll: (params?: { partner_id?: string; page?: number; limit?: number }) => 
    api.get<PaginatedResponse<ValidationSession>>('/api/validator/validation-sessions', params),
  
  create: (data: CreateValidationSessionForm) => 
    api.post<ValidationSession>('/api/validator/validation-sessions', data),
  
  getResults: (sessionId: string) => 
    api.get<ValidationResult[]>(`/api/validator/validation-sessions/${sessionId}/results`),
  
  retry: (sessionId: string) => 
    api.post(`/api/validator/validation-sessions/${sessionId}/retry`),
};

// Partner Requests API
export const partnerRequestsApi = {
  getAll: (params?: { status?: string; page?: number; limit?: number }) => 
    api.get<PaginatedResponse<PartnerRequest>>('/api/validator/partner-requests', params),
  
  submit: (data: CreatePartnerRequestForm) => 
    api.post<PartnerRequest>('/api/public/partner-requests', data),
  
  approve: (id: string, reviewedBy: string) => 
    api.post(`/api/validator/partner-requests/${id}/approve`, { reviewed_by: reviewedBy }),
  
  reject: (id: string, reviewedBy: string, reason?: string) => 
    api.post(`/api/validator/partner-requests/${id}/reject`, { reviewed_by: reviewedBy, reason }),
};

// Certificates API
export const certificatesApi = {
  getAll: (params?: { partner_name?: string; page?: number; limit?: number }) => 
    api.get<PaginatedResponse<Certification>>('/api/certificates', params),
  
  verify: (certId: string) => 
    api.get<Certification>(`/api/certificates/verify?cert_id=${certId}`),
  
  download: (certId: string) => 
    api.get(`/api/certificates/${certId}/download`, { responseType: 'blob' }),
  
  revoke: (certId: string) => 
    api.patch(`/api/certificates/${certId}/revoke`),
};

// Dashboard API
export const dashboardApi = {
  getOverview: () => 
    api.get<{
      totalProducts: number;
      totalPartners: number;
      activeSessions: number;
      certificatesIssued: number;
      recentActivity: Array<{
        id: string;
        type: string;
        description: string;
        timestamp: string;
        status: string;
      }>;
    }>('/api/validator/dashboard/overview'),
};