from pydantic import BaseModel, Field, EmailStr
from typing import Optional, List, Dict

class EmergencyContact(BaseModel):
    emergencyName: str
    emergencyRelation: str
    emergencyPhone: str

class Physician(BaseModel):
    physicianName: str
    physicianPhone: str
    hospital: str

class MedicalInfo(BaseModel):
    allergies: Optional[List[str]] = []
    conditions: Optional[List[str]] = []
    bloodType: Optional[str] = None
    physician: Optional[Physician] = None

class NotificationPreferences(BaseModel):
    push: bool

class HealthGoal(BaseModel):
    title: str

class Appointment(BaseModel):
    title: str
    date: str  # Can be changed to `datetime` if strict date parsing is needed
    time: str

class PatientProfileSchema(BaseModel):
    dateOfBirth: str  # Can be converted to `date` if needed
    gender: str
    emergencyContact: Optional[EmergencyContact] = None
    medicalInfo: Optional[MedicalInfo] = None
    notificationPreferences: Optional[NotificationPreferences] = None
    healthGoals: Optional[List[HealthGoal]] = []
    appointments: Optional[List[Appointment]] = []
    fcm_token: Optional[str] = Field(None)