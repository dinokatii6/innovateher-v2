import mongoose, { Schema, type Document } from 'mongoose'

export interface IVenue extends Document {
  name: string
  address: string
  city: string
  category: 'bar' | 'club' | 'theater' | 'gallery' | 'studio' | 'outdoor' | 'other'
  avgSafety: number
  avgFairPay: number
  avgRespect: number
  totalRatings: number
  totalIncidents: number
  createdAt: Date
}

const VenueSchema = new Schema<IVenue>(
  {
    name: { type: String, required: true },
    address: { type: String, required: true },
    city: { type: String, required: true },
    category: {
      type: String,
      enum: ['bar', 'club', 'theater', 'gallery', 'studio', 'outdoor', 'other'],
      default: 'other',
    },
    avgSafety: { type: Number, default: 0 },
    avgFairPay: { type: Number, default: 0 },
    avgRespect: { type: Number, default: 0 },
    totalRatings: { type: Number, default: 0 },
    totalIncidents: { type: Number, default: 0 },
  },
  { timestamps: true }
)

VenueSchema.index({ city: 1 })
VenueSchema.index({ name: 'text', city: 'text' })

export default mongoose.models.Venue || mongoose.model<IVenue>('Venue', VenueSchema)
