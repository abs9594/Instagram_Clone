from datetime import datetime
from sqlalchemy.orm.session import Session
from routers.schemas import CommentBase
from db.models import Comment


def create(db: Session, data: CommentBase):
    new_comment = Comment(
        text=data.text,
        username=data.username,
        post_id=data.post_id,
        timestamp=datetime.now()
    )
    db.add(new_comment)
    db.commit()
    db.refresh(new_comment)
    return new_comment


def get_all(db: Session, post_id: int):
    return db.query(Comment).filter_by(post_id=post_id).all()
