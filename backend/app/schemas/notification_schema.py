from pydantic import BaseModel, Field
from datetime import datetime
from typing import Optional

class NotificationSchema(BaseModel):
    patient_id: str = Field(..., description="The ID of the patient who missed the medication")
    caregiver_id: Optional[str] = Field(None, description="The ID of the caregiver who was notified")
    medication_name: str = Field(..., description="Name of the missed medication")
    title: str = Field(..., description="Title of the notification")
    body: str = Field(..., description="Body content of the notification")
    timestamp: datetime = Field(default_factory=datetime.utcnow, description="Time when the notification was sent")
    status: str = Field(default="pending", description="Notification status (sent, failed, pending, etc.)")
