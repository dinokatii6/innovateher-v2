import { z } from 'zod'

export const ratingSchema = z.object({
  venueId: z.string().min(1),
  safety: z.number().int().min(1).max(5),
  fairPay: z.number().int().min(1).max(5),
  respect: z.number().int().min(1).max(5),
  comment: z.string().max(500).optional().default(''),
})

export const incidentSchema = z.object({
  venueId: z.string().min(1),
  type: z.enum(['harassment', 'unsafe_conditions', 'nonpayment', 'discrimination', 'other']),
  severity: z.enum(['low', 'medium', 'high', 'critical']),
  description: z.string().min(10).max(2000),
  dateOfIncident: z.string().transform((s) => new Date(s)),
})

export const tipSchema = z.object({
  body: z.string().min(1).max(280),
  category: z.enum(['safety', 'pay', 'opportunity', 'general']).optional().default('general'),
})

export const opportunitySchema = z.object({
  title: z.string().min(1).max(200),
  description: z.string().min(10).max(2000),
  type: z.enum(['gig', 'residency', 'grant', 'audition', 'collaboration', 'other']).optional().default('gig'),
  location: z.string().min(1),
  compensation: z.string().optional().default(''),
  deadline: z.string().nullable().optional().default(null),
  contactInfo: z.string().min(1).max(500),
})

export const checkinSchema = z.object({
  sessionId: z.string().min(1),
  venueName: z.string().min(1),
  durationMinutes: z.number().int().min(15).max(720),
})
