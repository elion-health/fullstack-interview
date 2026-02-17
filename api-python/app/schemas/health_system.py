from datetime import datetime

from pydantic import BaseModel, ConfigDict
from pydantic.alias_generators import to_camel


class HealthSystemSchema(BaseModel):
    model_config = ConfigDict(
        from_attributes=True,
        alias_generator=to_camel,
        populate_by_name=True,
    )

    id: int
    name: str
    location: str
    description: str | None = None
    created_at: datetime
    updated_at: datetime


class HealthSystemListResponse(BaseModel):
    data: list[HealthSystemSchema]


class HealthSystemDetailResponse(BaseModel):
    data: HealthSystemSchema
