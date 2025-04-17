from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import Annotated, List

from server.models.data import Data
from server.schema.data import DataCreate, DataOut
from server.core.database import get_db

router = APIRouter(
    prefix="/api/data",
    tags=["data"]
)

# Create data
@router.post("/", response_model=DataOut, status_code=status.HTTP_201_CREATED)
async def create_data(
    data_in: DataCreate,
    db: Annotated[Session, Depends(get_db)]
):
    db_data = Data(**data_in.dict())
    db.add(db_data)
    db.commit()
    db.refresh(db_data)
    return db_data

# Get all data entries
@router.get("/", response_model=List[DataOut])
async def get_all_data(db: Annotated[Session, Depends(get_db)]):
    return db.query(Data).all()

# Get data by ID
@router.get("/{data_id}", response_model=DataOut)
async def get_data(data_id: int, db: Annotated[Session, Depends(get_db)]):
    db_data = db.query(Data).filter(Data.id == data_id).first()
    if not db_data:
        raise HTTPException(status_code=404, detail="Data not found")
    return db_data

# Update data
@router.put("/{data_id}", response_model=DataOut)
async def update_data(
    data_id: int,
    data_update: DataCreate,
    db: Annotated[Session, Depends(get_db)]
):
    db_data = db.query(Data).filter(Data.id == data_id).first()
    if not db_data:
        raise HTTPException(status_code=404, detail="Data not found")

    for key, value in data_update.dict().items():
        setattr(db_data, key, value)

    db.commit()
    db.refresh(db_data)
    return db_data

# Delete data
@router.delete("/{data_id}")
async def delete_data(data_id: int, db: Annotated[Session, Depends(get_db)]):
    db_data = db.query(Data).filter(Data.id == data_id).first()
    if not db_data:
        raise HTTPException(status_code=404, detail="Data not found")

    db.delete(db_data)
    db.commit()
    return {"message": f"Data with ID {data_id} deleted successfully"}
