from datetime import datetime

from pydantic import BaseModel, ConfigDict
from pydantic.alias_generators import to_camel


class ProductSchema(BaseModel):
    model_config = ConfigDict(
        from_attributes=True,
        alias_generator=to_camel,
        populate_by_name=True,
    )

    id: int
    name: str
    description: str | None = None
    category: str | None = None
    version: str | None = None
    vendor_id: int
    created_at: datetime
    updated_at: datetime


class VendorSchema(BaseModel):
    model_config = ConfigDict(
        from_attributes=True,
        alias_generator=to_camel,
        populate_by_name=True,
    )

    id: int
    name: str
    category: str
    description: str | None = None
    website: str | None = None
    created_at: datetime
    updated_at: datetime


class VendorDetailSchema(VendorSchema):
    products: list[ProductSchema] = []


class VendorListResponse(BaseModel):
    data: list[VendorSchema]


class VendorDetailResponse(BaseModel):
    data: VendorDetailSchema
