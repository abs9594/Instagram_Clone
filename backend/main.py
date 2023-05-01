from fastapi import FastAPI
from db.db import engine, Base
from routers import user, post, comment
from auth import authentication
from fastapi.staticfiles import StaticFiles
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()
app.include_router(user.router)
app.include_router(post.router)
app.include_router(authentication.router)
app.include_router(comment.router)

origins = ["http://localhost:3000"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_headers=["*"],
    allow_methods=["*"],
    allow_credentials=True
)

app.mount("/images", StaticFiles(directory="images"), name="images")

Base.metadata.create_all(engine)
