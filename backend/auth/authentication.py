from fastapi import APIRouter, Depends, HTTPException
from fastapi.security import OAuth2PasswordRequestForm
from sqlalchemy.orm.session import Session
from db.db import get_db
from db.user import User
from db.hashing import Hash
from auth.oauth2 import create_access_token

router = APIRouter(tags=["authentication"])


@router.post("/login")
def login(request: OAuth2PasswordRequestForm = Depends(), db: Session = Depends(get_db)):
    user = db.query(User).filter_by(username=request.username).first()
    if not user:
        raise HTTPException(status_code=404, detail="Invalid Credentials")
    if not Hash.verify(request.password, user.password):
        raise HTTPException(status_code=404, detail="Invalid Password")

    access_token = create_access_token({"username": user.username})

    return {
        "access_token": access_token,
        "token_type": "bearer",
        "user_id": user.id,
        "username": user.username
    }
