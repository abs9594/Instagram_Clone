from fastapi.routing import APIRouter
from fastapi import Depends
from sqlalchemy.orm.session import Session
from db.comment import get_all as get_all_comment, create as create_comment
from db.db import get_db
from auth.oauth2 import get_current_user
from routers.schemas import CommentBase, UserAuth

router = APIRouter(prefix="/comment",
                   tags=["comment"])


@router.get("/all/{post_id}")
def get_all(post_id: int, db: Session = Depends(get_db)):
    return get_all_comment(db, post_id)


@router.post("/create")
def create(data: CommentBase, db: Session = Depends(get_db), current_user: UserAuth = Depends(get_current_user)):
    return create_comment(db, data)
