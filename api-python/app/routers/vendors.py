from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.orm import selectinload

from app.database import get_session
from app.models.vendor import Vendor
from app.schemas.vendor import VendorDetailResponse, VendorDetailSchema, VendorListResponse, VendorSchema

router = APIRouter()


@router.get("/api/vendors", response_model=VendorListResponse)
async def list_vendors(session: AsyncSession = Depends(get_session)):
    result = await session.execute(select(Vendor))
    vendors = result.scalars().all()
    return {"data": [VendorSchema.model_validate(v) for v in vendors]}


@router.get("/api/vendors/{vendor_id}", response_model=VendorDetailResponse)
async def get_vendor(vendor_id: int, session: AsyncSession = Depends(get_session)):
    result = await session.execute(
        select(Vendor).options(selectinload(Vendor.products)).where(Vendor.id == vendor_id)
    )
    vendor = result.scalar_one_or_none()
    if not vendor:
        raise HTTPException(status_code=404, detail="Vendor not found")
    return {"data": VendorDetailSchema.model_validate(vendor)}
