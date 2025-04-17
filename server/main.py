from fastapi import FastAPI
from server.core.database import engine, Base
from server.models.user import User
from server.models.data import Data
from server.schema.user import UserCreate, UserResponse
from server.schema.data import DataCreate
from server.routes import user, data  # Import your routers here

# Create the tables in the database
Base.metadata.create_all(bind=engine)

# Initialize the FastAPI app
app = FastAPI()

# Include the routers
app.include_router(user.router, prefix="/users", tags=["users"])
app.include_router(data.router, prefix="/data", tags=["data"])

# Define a home route
@app.get("/")
def home():
    return {"message": "Hello World"}
