from pydantic import BaseModel, Field
from typing import Optional

class CaregiverProfileSchema(BaseModel):
    age: int = Field(..., gt=18, lt=100)  # Caregiver must be an adult
    gender: str
    relation_to_patient: Optional[str] = None
    experience: Optional[int] = 0  # Years of experience
    certifications: Optional[list[str]] = []
    patients_assigned: Optional[str]  # Single assigned patient ID
    fcm_token: Optional[str] = Field()
