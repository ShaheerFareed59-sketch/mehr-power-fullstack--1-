from datetime import datetime
from typing import Optional
from pydantic import BaseModel, EmailStr, Field, field_validator


class QuoteRequest(BaseModel):
    name: str = Field(min_length=2, max_length=80)
    email: EmailStr
    phone: str = Field(min_length=7, max_length=20)
    city: str = Field(min_length=2, max_length=60)
    category: Optional[str] = None
    message: Optional[str] = Field(default=None, max_length=1000)

    @field_validator("phone")
    @classmethod
    def phone_looks_valid(cls, v: str) -> str:
        digits = "".join(ch for ch in v if ch.isdigit())
        if len(digits) < 7:
            raise ValueError("Phone number must contain at least 7 digits.")
        return v

    @field_validator("category")
    @classmethod
    def category_is_known(cls, v: Optional[str]) -> Optional[str]:
        allowed = {"solar-panels", "lithium-batteries", "generators", None, ""}
        if v not in allowed:
            raise ValueError(f"Unknown category '{v}'.")
        return v or None


class QuoteRecord(QuoteRequest):
    id: str
    received_at: datetime


class QuoteResponse(BaseModel):
    ok: bool
    id: str
    received_at: datetime


class LoadSheddingWindow(BaseModel):
    area: str
    daily_hours: int
    typical_windows: list[str]
