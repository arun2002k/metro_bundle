from pydantic import BaseModel
from typing import Optional

class User(BaseModel):
    id: str
    email: str
    avatar: str
    name: str

    class Config:
        schema_extra = {
            "example": {
                "id": "Random ID",
                "email": "Random Email",
                "avatar": "Random Image Url",
                "name": "Random Name",
            }
        }