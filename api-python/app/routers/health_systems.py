from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from app.database import get_session
from app.models.health_system import HealthSystem
from app.schemas.health_system import HealthSystemDetailResponse, HealthSystemListResponse, HealthSystemSchema

router = APIRouter()


@router.get("/api/health-systems", response_model=HealthSystemListResponse)
async def list_health_systems(session: AsyncSession = Depends(get_session)):
    result = await session.execute(select(HealthSystem))
    systems = result.scalars().all()
    return {"data": [HealthSystemSchema.model_validate(s) for s in systems]}


@router.get("/api/health-systems/{system_id}", response_model=HealthSystemDetailResponse)
async def get_health_system(system_id: int, session: AsyncSession = Depends(get_session)):
    result = await session.execute(select(HealthSystem).where(HealthSystem.id == system_id))
    system = result.scalar_one_or_none()
    if not system:
        raise HTTPException(status_code=404, detail="Health system not found")
    return {"data": HealthSystemSchema.model_validate(system)}
