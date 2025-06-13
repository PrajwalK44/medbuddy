export interface Medication {
  id: string;
  name: string;
  dosage: string;
  frequency: string;
  time: string;
  instructions?: string;
  status: 'taken' | 'missed' | 'upcoming';
  refillDate?: string;
  lowSupply?: boolean;
  dueToday?: boolean;
}

export interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

export interface AdherenceData {
  date: string;
  rate: number;
  medications: {
    name: string;
    taken: boolean;
    time: string;
  }[];
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  caregivers: {
    id: string;
    name: string;
    relationship: string;
    email: string;
    phone?: string;
    notificationPreference: 'email' | 'sms' | 'both';
  }[];
}

export interface AIInsight {
  id: string;
  type: 'pattern' | 'improvement' | 'risk' | 'achievement';
  title: string;
  description: string;
  date: Date;
  severity?: 'low' | 'medium' | 'high';
  relatedMedications?: string[];
}