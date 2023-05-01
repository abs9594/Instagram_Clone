from fastapi import HTTPException
from sqlalchemy.orm.session import Session
from routers.schemas import UserBase
from db.models import User
from db.hashing import Hash


def create_user(db: Session, user_data: UserBase):
    new_user = User(
        username=user_data.username,
        email=user_data.email,
        password=Hash.encrypt(user_data.password)
    )
    db.add(new_user)
    db.commit()
    db.refresh(new_user)
    return new_user


def get_user_by_username(db: Session, username: str):
    user = db.query(User).filter_by(username=username).first()
    if not user:
        raise HTTPException(status_code=404, detail=f"user with {username} not found")
    return user
