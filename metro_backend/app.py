from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routes.userRoute import router as UserRouter
from routes.serviceRoute import router as ServiceRouter

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def root():
    return {"Message": "Hello World!!!"}

app.include_router(router=UserRouter)
app.include_router(router=ServiceRouter)