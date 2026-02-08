import mongoose from 'mongoose'
import dotenv from 'dotenv'
dotenv.config({ path: '.env.local' })

const MONGODB_URI = process.env.MONGODB_URI
if (!MONGODB_URI) {
  console.error('Set MONGODB_URI in .env.local')
  process.exit(1)
}

async function seed() {
  await mongoose.connect(MONGODB_URI!)

  const db = mongoose.connection.db!

  // Clear existing data
  await db.collection('venues').deleteMany({})
  await db.collection('venueratings').deleteMany({})
  await db.collection('tips').deleteMany({})
  await db.collection('opportunities').deleteMany({})
  console.log('Cleared existing data')

  const venues = await db.collection('venues').insertMany([
    { name: 'The Blue Note Lounge', address: '123 Jazz Ave', city: 'Austin', category: 'bar', avgSafety: 4.2, avgFairPay: 3.8, avgRespect: 4.5, totalRatings: 12, totalIncidents: 1, createdAt: new Date(), updatedAt: new Date() },
    { name: 'Starlight Theater', address: '456 Broadway St', city: 'Nashville', category: 'theater', avgSafety: 4.8, avgFairPay: 4.5, avgRespect: 4.9, totalRatings: 28, totalIncidents: 0, createdAt: new Date(), updatedAt: new Date() },
    { name: 'Underground Gallery', address: '789 Art Blvd', city: 'Portland', category: 'gallery', avgSafety: 3.5, avgFairPay: 2.8, avgRespect: 3.9, totalRatings: 8, totalIncidents: 3, createdAt: new Date(), updatedAt: new Date() },
    { name: 'The Velvet Room', address: '321 Club Lane', city: 'Chicago', category: 'club', avgSafety: 2.9, avgFairPay: 3.2, avgRespect: 2.8, totalRatings: 15, totalIncidents: 5, createdAt: new Date(), updatedAt: new Date() },
    { name: 'Harmony Studios', address: '555 Music Row', city: 'Nashville', category: 'studio', avgSafety: 4.9, avgFairPay: 4.7, avgRespect: 4.8, totalRatings: 22, totalIncidents: 0, createdAt: new Date(), updatedAt: new Date() },
    { name: 'Riverside Amphitheater', address: '100 River Rd', city: 'Austin', category: 'outdoor', avgSafety: 4.0, avgFairPay: 3.5, avgRespect: 4.1, totalRatings: 10, totalIncidents: 2, createdAt: new Date(), updatedAt: new Date() },
    { name: 'The Red Curtain', address: '88 Theater Pl', city: 'New York', category: 'theater', avgSafety: 3.8, avgFairPay: 4.0, avgRespect: 3.7, totalRatings: 35, totalIncidents: 4, createdAt: new Date(), updatedAt: new Date() },
    { name: 'Echo Chamber', address: '42 Sound St', city: 'Los Angeles', category: 'studio', avgSafety: 4.5, avgFairPay: 3.0, avgRespect: 4.2, totalRatings: 18, totalIncidents: 1, createdAt: new Date(), updatedAt: new Date() },
    { name: 'Canvas & Cork', address: '200 Wine Way', city: 'Portland', category: 'gallery', avgSafety: 4.6, avgFairPay: 4.3, avgRespect: 4.7, totalRatings: 14, totalIncidents: 0, createdAt: new Date(), updatedAt: new Date() },
    { name: 'The Neon Stage', address: '77 Bright Blvd', city: 'Las Vegas', category: 'club', avgSafety: 3.2, avgFairPay: 4.1, avgRespect: 3.0, totalRatings: 20, totalIncidents: 6, createdAt: new Date(), updatedAt: new Date() },
  ])
  console.log(`Seeded ${venues.insertedCount} venues`)

  await db.collection('tips').insertMany([
    { body: 'Always get payment terms in writing before your first gig at a new venue.', category: 'pay', upvotes: 24, createdAt: new Date(), updatedAt: new Date() },
    { body: 'The Blue Note pays on time every time. One of the best in Austin.', category: 'pay', upvotes: 18, createdAt: new Date(), updatedAt: new Date() },
    { body: 'Never leave your drink unattended at The Velvet Room. Several reports of issues.', category: 'safety', upvotes: 42, createdAt: new Date(), updatedAt: new Date() },
    { body: 'Starlight Theater has amazing green room accommodations and respectful staff.', category: 'general', upvotes: 31, createdAt: new Date(), updatedAt: new Date() },
    { body: 'New open mic night at Canvas & Cork — great exposure for visual artists!', category: 'opportunity', upvotes: 15, createdAt: new Date(), updatedAt: new Date() },
    { body: 'Keep your own records of hours worked. Some venues "forget" overtime.', category: 'pay', upvotes: 37, createdAt: new Date(), updatedAt: new Date() },
    { body: 'Share the safety check-in feature with friends before late-night gigs.', category: 'safety', upvotes: 29, createdAt: new Date(), updatedAt: new Date() },
    { body: 'Portland galleries are generally great for fair compensation. Support local!', category: 'general', upvotes: 12, createdAt: new Date(), updatedAt: new Date() },
  ])
  console.log('Seeded 8 tips')

  await db.collection('opportunities').insertMany([
    { title: 'Jazz Singer Needed — Weekend Residency', description: 'Looking for a jazz vocalist for Friday and Saturday night sets. Must have own repertoire. Professional sound system provided. Great tips from regulars.', type: 'gig', location: 'Austin, TX', compensation: '$200/night + tips', deadline: new Date('2026-03-15'), contactInfo: 'Email: bookings@bluenotelounge.com', createdAt: new Date(), updatedAt: new Date() },
    { title: 'Women in Music Grant 2026', description: 'Annual grant supporting emerging women musicians. Covers recording costs, marketing, and distribution. Open to all genres.', type: 'grant', location: 'Nationwide', compensation: '$5,000 grant', deadline: new Date('2026-04-01'), contactInfo: 'Apply at womeninmusic.org/grants', createdAt: new Date(), updatedAt: new Date() },
    { title: 'Gallery Exhibition — Emerging Artists', description: 'Canvas & Cork seeking submissions for spring exhibition. Theme: "Unseen Voices." All visual media welcome.', type: 'collaboration', location: 'Portland, OR', compensation: '60% commission on sales', deadline: new Date('2026-03-01'), contactInfo: 'Submit portfolio to art@canvasandcork.com', createdAt: new Date(), updatedAt: new Date() },
    { title: 'Theater Ensemble Auditions', description: 'Starlight Theater holding open auditions for spring production. Looking for actors, singers, and dancers. All experience levels welcome.', type: 'audition', location: 'Nashville, TN', compensation: 'Equity minimum + housing stipend', deadline: new Date('2026-02-28'), contactInfo: 'Sign up at starlighttheater.com/auditions', createdAt: new Date(), updatedAt: new Date() },
    { title: 'Artist-in-Residence Program', description: '3-month residency at Harmony Studios. Private studio space, recording time, and mentorship included.', type: 'residency', location: 'Nashville, TN', compensation: 'Studio access + $1,500/month stipend', deadline: new Date('2026-05-01'), contactInfo: 'harmonystudios.com/residency', createdAt: new Date(), updatedAt: new Date() },
    { title: 'DJ Needed for Weekend Events', description: 'The Neon Stage looking for female DJs for our new women-forward night. EDM, house, and pop welcome.', type: 'gig', location: 'Las Vegas, NV', compensation: '$300/night', deadline: null, contactInfo: 'DM @neonstage on Instagram', createdAt: new Date(), updatedAt: new Date() },
  ])
  console.log('Seeded 6 opportunities')

  await mongoose.disconnect()
  console.log('Done! Database seeded successfully.')
}

seed().catch((e) => {
  console.error(e)
  process.exit(1)
})
