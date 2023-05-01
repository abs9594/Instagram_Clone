from fastapi import APIRouter, Depends
from sqlalchemy.orm.session import Session
from routers.schemas import UserBase, UserDisplay
from db.db import get_db
from db import user

router = APIRouter(
    prefix="/user",
    tags=["user"]
)


@router.post("/create", response_model=UserDisplay)
def create_user(user_data: UserBase, db: Session = Depends(get_db)) -> str:
    return user.create_user(db, user_data)
