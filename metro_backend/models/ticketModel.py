from pydantic import BaseModel

class Ticket(BaseModel):
    id: str
    userId: str
    fromStation: str
    toStation: str
    date: str

    class Config:
        schema_extra = {
            "example": {
                "id": "",
                "userId": "",
                "fromStation": "",
                "toStation": "",
                "date": "",
            }
        }