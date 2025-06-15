// User Types
export type UserRole = "general" | "patient" | "caregiver";

export interface UserSchema {
  name: string;
  email: string;
  phone: string;
  password: string;
  role: UserRole;
}

// Patient Types
export interface EmergencyContact {
  emergencyName: string;
  emergencyRelation: string;
  emergencyPhone: string;
}

export interface Physician {
  physicianName: string;
  physicianPhone: string;
  hospital: string;
}

export interface MedicalInfo {
  allergies?: string[];
  conditions?: string[];
  bloodType?: string;
  physician?: Physician;
}

export interface NotificationPreferences {
  push: boolean;
}

export interface HealthGoal {
  title: string;
}

export interface Appointment {
  title: string;
  date: string;
  time: string;
}

export interface PatientProfileSchema {
  dateOfBirth: string;
  gender: string;
  emergencyContact?: EmergencyContact;
  medicalInfo?: MedicalInfo;
  notificationPreferences?: NotificationPreferences;
  healthGoals?: HealthGoal[];
  appointments?: Appointment[];
  fcm_token?: string;
}

// Caregiver Types
export interface CaregiverProfileSchema {
  age: number;
  gender: string;
  relation_to_patient?: string;
  experience?: number;
  certifications?: string[];
  patients_assigned?: string;
  fcm_token?: string;
}

// Medication Types
export type MedicationStatus = "taken" | "missed" | "upcoming";

export interface MedicationSchema {
  user_id: string;
  name: string;
  dosage: string;
  frequency: string;
  time: string;
  instructions: string;
  status: MedicationStatus;
  refill_date?: string;
  low_supply?: boolean;
  notification?: boolean;
}

// Notification Types
export interface NotificationSchema {
  patient_id: string;
  caregiver_id?: string;
  medication_name: string;
  title: string;
  body: string;
  timestamp: string;
  status: string;
}
