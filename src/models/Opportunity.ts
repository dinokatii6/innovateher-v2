import mongoose, { Schema, type Document } from 'mongoose'

export interface IOpportunity extends Document {
  title: string
  description: string
  type: 'gig' | 'residency' | 'grant' | 'audition' | 'collaboration' | 'other'
  location: string
  compensation: string
  deadline: Date | null
  contactInfo: string
  createdAt: Date
}

const OpportunitySchema = new Schema<IOpportunity>(
  {
    title: { type: String, required: true, maxlength: 200 },
    description: { type: String, required: true, maxlength: 2000 },
    type: {
      type: String,
      enum: ['gig', 'residency', 'grant', 'audition', 'collaboration', 'other'],
      default: 'gig',
    },
    location: { type: String, required: true },
    compensation: { type: String, default: '' },
    deadline: { type: Date, default: null },
    contactInfo: { type: String, required: true, maxlength: 500 },
  },
  { timestamps: true }
)

OpportunitySchema.index({ createdAt: -1 })
OpportunitySchema.index({ type: 1, createdAt: -1 })
OpportunitySchema.index({ title: 'text', description: 'text' })

export default mongoose.models.Opportunity || mongoose.model<IOpportunity>('Opportunity', OpportunitySchema)
