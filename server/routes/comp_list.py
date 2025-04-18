from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from server.core.database import get_db
from server.models.comp_list import Component
from server.schema.comp_list import ComponentCreate, ComponentOut

router = APIRouter(tags=["component"])  # no prefix

# POST /component - Create a new component
@router.post("/component", response_model=ComponentOut)
def create_component(data: ComponentCreate, db: Session = Depends(get_db)):
    component = Component(**data.dict())
    db.add(component)
    db.commit()
    db.refresh(component)
    return component

# GET /component - Get all components
@router.get("/component", response_model=list[ComponentOut])
def get_all_components(db: Session = Depends(get_db)):
    return db.query(Component).all()

# GET /component/{component_id} - Get a specific component
@router.get("/component/{component_id}", response_model=ComponentOut)
def get_component(component_id: int, db: Session = Depends(get_db)):
    component = db.query(Component).filter(Component.component_id == component_id).first()
    if not component:
        raise HTTPException(status_code=404, detail="Component not found")
    return component

# GET /component/uid/{uid} - Get a specific component by uid
@router.get("/component/uid/{uid}", response_model=ComponentOut)
def get_component_by_uid(uid: int, db: Session = Depends(get_db)):
    component = db.query(Component).filter(Component.uid == uid).first()
    if not component:
        raise HTTPException(status_code=404, detail="Component not found")
    return component

# GET /component/user/{user_id} - Get a specific component by user_id
@router.get("/component/user/{user_id}", response_model=ComponentOut)
def get_component_by_user_id(user_id: str, db: Session = Depends(get_db)):
    component = db.query(Component).filter(Component.user_id == user_id).first()
    if not component:
        raise HTTPException(status_code=404, detail="Component not found")
    return component


# PUT /component/{component_id} - Update a component
@router.put("/component/{component_id}", response_model=ComponentOut)
def update_component(component_id: int, data: ComponentCreate, db: Session = Depends(get_db)):
    component = db.query(Component).filter(Component.component_id == component_id).first()
    if not component:
        raise HTTPException(status_code=404, detail="Component not found")
    
    for key, value in data.dict().items():
        setattr(component, key, value)

    db.commit()
    db.refresh(component)
    return component

# DELETE /component/{component_id} - Delete a component
@router.delete("/component/{component_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_component(component_id: int, db: Session = Depends(get_db)):
    component = db.query(Component).filter(Component.component_id == component_id).first()
    if not component:
        raise HTTPException(status_code=404, detail="Component not found")
    
    db.delete(component)
    db.commit()
    return
