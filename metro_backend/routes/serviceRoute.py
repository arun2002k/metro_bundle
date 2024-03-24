from fastapi import APIRouter
from database import db
from models.ticketModel import Ticket

router = APIRouter(prefix="/services", tags=["Services"])

@router.post("/book-ticket")
async def bookTicket(data: Ticket):
    result = await db.book_ticket(data)
    return {"Is Booked": result}
