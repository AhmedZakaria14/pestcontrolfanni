import { pgTable, text, timestamp, integer } from 'drizzle-orm/pg-core';

export const bookings = pgTable('bookings', {
  id: text('id').primaryKey(),
  name: text('name').notNull(),
  phone: text('phone').notNull(),
  service: text('service').notNull(),
  area: text('area'),
  notes: text('notes'),
  status: text('status').notNull().default('new'),
  source: text('source'),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});

export const warranties = pgTable('warranties', {
  id: text('id').primaryKey(),
  code: text('code').notNull().unique(),
  customerName: text('customer_name').notNull(),
  customerPhone: text('customer_phone'),
  serviceType: text('service_type').notNull(),
  propertyAddress: text('property_address').notNull(),
  city: text('city'),
  issueDate: text('issue_date').notNull(),
  expiryDate: text('expiry_date').notNull(),
  durationYears: integer('duration_years').default(3),
  status: text('status').notNull().default('active'),
  technicianName: text('technician_name'),
  pesticideDetails: text('pesticide_details'),
  notes: text('notes'),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});
