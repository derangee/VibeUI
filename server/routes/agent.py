from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from pydantic import BaseModel
from typing import Optional
import httpx
import os
from server.core.database import get_db
from server.models.comp_list import Component
from server.models.user import User
from server.agent.customize import ComponentCustomizationAgent

# Define the schema for incoming requests
class CustomizationRequest(BaseModel):
    user_id: str
    component_name: str
    component_code: str
    user_prompt: str
    
# Define the schema for responses
class CustomizationResponse(BaseModel):
    modified_code: str
    explanation: str

# Create a router for the customization endpoints
router = APIRouter(tags=["customization"])

# The actual endpoint that processes customization requests
@router.post("/customize", response_model=CustomizationResponse)
async def customize_component(
    data: CustomizationRequest, 
    db: Session = Depends(get_db)
):
    # Validate that the user exists
    user = db.query(User).filter(User.user_id == data.user_id).first()
    if not user:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="User not found"
        )
    
    try:
        # 1. Fetch context from your internal API
        try:
            async with httpx.AsyncClient() as client:
                context_response = await client.get(f"http://127.0.0.1:8000/data/1")
            
            if context_response.status_code != 200:
                # If we can't fetch specific user data, use default data
                print(f"[API] Warning: Could not fetch data for user ID {user.id}, using fallback data")
                brand_data = {
                    "brand_name": "VibeUI",
                    "brand_description": "Modern UI component library",
                    "industry": "Technology",
                    "brand_style": "modern",
                    "brand_vibe": "Professional but approachable",
                    "primary_color": "#9333ea",  # purple-600
                    "secondary_color": "#7e22ce",  # purple-700
                    "accent_color": "#a855f7"  # purple-500
                }
            else:
                # 2. Parse the brand data context
                brand_data = context_response.json()
        except Exception as e:
            print(f"[API] Error fetching brand data: {str(e)}, using fallback data")
            # Fallback to default brand data if fetch fails
            brand_data = {
                "brand_name": "VibeUI",
                "brand_description": "Modern UI component library",
                "industry": "Technology",
                "brand_style": "modern",
                "brand_vibe": "Professional but approachable",
                "primary_color": "#9333ea",  # purple-600
                "secondary_color": "#7e22ce",  # purple-700
                "accent_color": "#a855f7"  # purple-500
            }
        
        # 3. Initialize and run the component customization agent
        print(f"[API] Initializing component customization agent for {data.component_name}")
        agent = ComponentCustomizationAgent(
            component_code=data.component_code,
            user_prompt=data.user_prompt,
            brand_data=brand_data
        )
        
        result = agent.plan_and_act()
        
        # Check if the agent encountered an error
        if result.get("status") == "error":
            raise HTTPException(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                detail=result.get("error", "Unknown error during customization")
            )
            
        # Get the modified code from the agent
        modified_code = result.get("modified_code", data.component_code)
        explanation = result.get("explanation", "Component customized based on brand guidelines")
        
        # 4. Save the customized component to the database
        new_component = Component(
            uid=user.id,
            user_id=user.user_id,
            component_name=f"{data.component_name}_customized",
            code=modified_code
        )
        
        db.add(new_component)
        db.commit()
        db.refresh(new_component)
        
        return CustomizationResponse(
            modified_code=modified_code,
            explanation=explanation
        )
        
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Error customizing component: {str(e)}"
        )

# Add an endpoint to get all customized components for a user
@router.get("/customized/{user_id}", response_model=list[dict])
async def get_customized_components(user_id: str, db: Session = Depends(get_db)):
    components = db.query(Component).filter(Component.user_id == user_id).all()
    
    return [
        {
            "component_id": comp.component_id,
            "component_name": comp.component_name,
            "created_at": comp.created_at,
            "code_preview": comp.code[:100] + "..." if len(comp.code) > 100 else comp.code
        } 
        for comp in components
    ]