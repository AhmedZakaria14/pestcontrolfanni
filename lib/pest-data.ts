export interface Warranty {
  id: string;
  code: string;
  customerName: string;
  customerPhone?: string;
  serviceType: string;
  propertyAddress: string;
  city?: string;
  issueDate: string;
  expiryDate: string;
  durationYears?: number;
  status: 'active' | 'expired' | 'pending';
  technicianName?: string;
  pesticideDetails?: string;
  notes?: string;
  createdAt: string;
  updatedAt?: string;
}

export interface Booking {
  id: string;
  name: string;
  phone: string;
  service: string;
  area?: string;
  notes?: string;
  status: 'new' | 'contacted' | 'scheduled' | 'completed' | 'cancelled';
  source?: string;
  createdAt: string;
  updatedAt?: string;
}
