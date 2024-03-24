from fastapi import APIRouter
from database import db
from models.userModel import User


router = APIRouter(prefix="/user", tags=["User"])

@router.post("/add-user")
async def add_user(data: User):
    result = await db.create_user(data)
    faceValues = await db.processImage(data.id, data.avatar)
    return {"Inserted": result, "Face Inserted": faceValues}


@router.get("/get-user")
async def get_user(id: str):
    return await db.get_user(id)
