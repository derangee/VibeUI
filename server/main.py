from fastapi import FastAPI
from server.core.database import engine, Base
from server.models.user import User
from server.models.data import Data
from server.models.comp_list import Component
from server.schema.user import UserCreate, UserResponse
from server.schema.data import DataCreate
from server.schema.comp_list import ComponentCreate, ComponentOut
from server.routes import user, data , comp_list, agent  # Import your routers here
from fastapi.middleware.cors import CORSMiddleware
# Create the tables in the database
Base.metadata.create_all(bind=engine)

# Initialize the FastAPI app
app = FastAPI()
# Allow requests from your frontend (localhost:3000)
origins = [
    "http://localhost:5173",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,  # or use ["*"] to allow all (not recommended in production)
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
# Correct router usage
app.include_router(user.router, prefix="/users", tags=["users"])
app.include_router(data.router, prefix="/data", tags=["data"])
app.include_router(comp_list.router)  # ✅ No prefix = clean routes like /component
app.include_router(agent.router, prefix="/api")

# Define a home route
@app.get("/")
def home():
    return {"message": "Hello World"}
