from fastapi import FastAPI
from app.api.incident import router as incident_router
from app.api.user import router as user_router
from app.api.auth import router as auth_router
from fastapi.middleware.cors import CORSMiddleware


app = FastAPI(
    title="AutoSEC AI",
    version="1.0.0"
)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(user_router)
app.include_router(auth_router)
app.include_router(incident_router)


@app.get("/")
def root():
    return {
        "message": "Welcome to AutoSEC AI"
    }