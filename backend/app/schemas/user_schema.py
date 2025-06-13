from pydantic import BaseModel, EmailStr, Field, constr
from typing import Optional, Literal, Union
from app.schemas.caregiver_schema import CaregiverProfileSchema
from app.schemas.patient_schema import PatientProfileSchema

class UserSchema(BaseModel):
    name: constr(min_length=2, max_length=50)
    email: EmailStr
    phone: constr(min_length=10, max_length=15)
    password: constr(min_length=6)
    role: Literal["general", "patient", "caregiver"] = "general"  # Default role before updating


class ProfileSchema(BaseModel):
    role: Literal["patient", "caregiver"]
    profile: Union[PatientProfileSchema, CaregiverProfileSchema]
