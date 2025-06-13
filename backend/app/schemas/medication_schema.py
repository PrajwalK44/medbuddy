from pydantic import BaseModel, Field
from typing import Optional, Literal

class MedicationSchema(BaseModel):
    user_id: str = Field(..., description="Reference to the user who owns this medication")  # Added user reference
    name: str = Field(..., min_length=1, description="Name of the medication")
    dosage: str = Field(..., description="Dosage information (e.g., '500mg')")
    frequency: str = Field(..., description="Frequency of intake (e.g., 'twice a day')")
    time: str = Field(..., description="Scheduled time for intake (e.g., '08:00 AM')")
    instructions: str = Field(..., description="Additional instructions for intake")
    status: Literal['taken', 'missed', 'upcoming'] = Field(..., description="Current medication status")
    refill_date: Optional[str] = Field(None, description="Date for the next refill, if applicable")
    low_supply: Optional[bool] = Field(False, description="Indicates if the medication is running low")
    notification: Optional[bool] = Field(False)