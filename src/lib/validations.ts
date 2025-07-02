import { z } from 'zod';

// Product validation schemas
export const createProductSchema = z.object({
  name: z.string()
    .min(1, 'Product name is required')
    .min(3, 'Product name must be at least 3 characters')
    .max(100, 'Product name must not exceed 100 characters')
    .regex(/^[a-zA-Z0-9\s\-_]+$/, 'Product name can only contain letters, numbers, spaces, hyphens, and underscores'),
});

export const updateProductSchema = createProductSchema.partial();

// Test Case validation schemas
export const createTestCaseSchema = z.object({
  product_id: z.string().uuid('Invalid product ID'),
  endpoint_path: z.string()
    .min(1, 'Endpoint path is required')
    .regex(/^\//, 'Endpoint path must start with /')
    .max(200, 'Endpoint path must not exceed 200 characters'),
  method: z.enum(['GET', 'POST', 'PUT', 'DELETE', 'PATCH'], {
    errorMap: () => ({ message: 'Invalid HTTP method' }),
  }),
  case_type: z.enum(['POSITIVE', 'NEGATIVE'], {
    errorMap: () => ({ message: 'Case type must be either POSITIVE or NEGATIVE' }),
  }),
  expected_input: z.string()
    .min(1, 'Expected input is required')
    .refine((val) => {
      try {
        JSON.parse(val);
        return true;
      } catch {
        return false;
      }
    }, 'Expected input must be valid JSON'),
  expected_output: z.string()
    .min(1, 'Expected output is required')
    .refine((val) => {
      try {
        JSON.parse(val);
        return true;
      } catch {
        return false;
      }
    }, 'Expected output must be valid JSON'),
});

export const updateTestCaseSchema = createTestCaseSchema.partial().omit({ product_id: true });

// Partner validation schemas
export const createPartnerSchema = z.object({
  name: z.string()
    .min(1, 'Partner name is required')
    .min(2, 'Partner name must be at least 2 characters')
    .max(100, 'Partner name must not exceed 100 characters'),
  contact_email: z.string()
    .min(1, 'Contact email is required')
    .email('Invalid email address')
    .max(255, 'Email must not exceed 255 characters'),
  products: z.array(z.string().uuid('Invalid product ID'))
    .min(1, 'At least one product must be selected'),
});

export const updatePartnerSchema = createPartnerSchema.partial().omit({ products: true });

// Validation Session schemas
export const createValidationSessionSchema = z.object({
  partner_id: z.string().uuid('Invalid partner ID'),
  product_id: z.string().uuid('Invalid product ID'),
  date_from: z.string()
    .min(1, 'Start date is required')
    .datetime('Invalid date format'),
  date_to: z.string()
    .min(1, 'End date is required')
    .datetime('Invalid date format'),
}).refine((data) => {
  const startDate = new Date(data.date_from);
  const endDate = new Date(data.date_to);
  return startDate < endDate;
}, {
  message: 'End date must be after start date',
  path: ['date_to'],
});

// Partner Request schemas
export const createPartnerRequestSchema = z.object({
  partner_name: z.string()
    .min(1, 'Partner name is required')
    .min(2, 'Partner name must be at least 2 characters')
    .max(100, 'Partner name must not exceed 100 characters'),
  contact_email: z.string()
    .min(1, 'Contact email is required')
    .email('Invalid email address')
    .max(255, 'Email must not exceed 255 characters'),
  requested_product_id: z.string().uuid('Invalid product ID'),
  notes: z.string()
    .max(1000, 'Notes must not exceed 1000 characters')
    .optional()
    .default(''),
});

// Certificate verification schema
export const verifyCertificateSchema = z.object({
  cert_id: z.string()
    .min(1, 'Certificate ID is required')
    .uuid('Invalid certificate ID format'),
});

// Search and filter schemas
export const paginationSchema = z.object({
  page: z.number().min(1, 'Page must be at least 1').default(1),
  limit: z.number().min(1, 'Limit must be at least 1').max(100, 'Limit must not exceed 100').default(10),
});

export const partnerFilterSchema = paginationSchema.extend({
  status: z.enum(['UNVERIFIED', 'APPROVED', 'VALIDATION_IN_PROGRESS', 'COMPLETED']).optional(),
  search: z.string().optional(),
});

export const testCaseFilterSchema = paginationSchema.extend({
  product_id: z.string().uuid().optional(),
  case_type: z.enum(['POSITIVE', 'NEGATIVE']).optional(),
  method: z.enum(['GET', 'POST', 'PUT', 'DELETE', 'PATCH']).optional(),
});

export const validationSessionFilterSchema = paginationSchema.extend({
  partner_id: z.string().uuid().optional(),
  status: z.enum(['PENDING', 'RUNNING', 'DONE', 'FAILED']).optional(),
  date_from: z.string().datetime().optional(),
  date_to: z.string().datetime().optional(),
});

// Type exports  
export type CreateProductForm = z.infer<typeof createProductSchema>;
export type UpdateProductForm = z.infer<typeof updateProductSchema>;
export type CreateTestCaseForm = z.infer<typeof createTestCaseSchema>;
export type UpdateTestCaseForm = z.infer<typeof updateTestCaseSchema>;
export type CreatePartnerForm = z.infer<typeof createPartnerSchema>;
export type UpdatePartnerForm = z.infer<typeof updatePartnerSchema>;
export type CreateValidationSessionForm = z.infer<typeof createValidationSessionSchema>;
export type CreatePartnerRequestForm = z.infer<typeof createPartnerRequestSchema>;
export type VerifyCertificateForm = z.infer<typeof verifyCertificateSchema>;
export type PaginationParams = z.infer<typeof paginationSchema>;
export type PartnerFilterParams = z.infer<typeof partnerFilterSchema>;
export type TestCaseFilterParams = z.infer<typeof testCaseFilterSchema>;
export type ValidationSessionFilterParams = z.infer<typeof validationSessionFilterSchema>;