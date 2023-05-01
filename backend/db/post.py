from fastapi import HTTPException
from datetime import datetime
from sqlalchemy.orm.session import Session
from db.models import Post
from routers.schemas import PostBase


def create_post(db: Session, post_data: PostBase):
    new_post = Post(
        image_url=post_data.image_url,
        image_url_type=post_data.image_url_type,
        caption=post_data.caption,
        timestamp=datetime.now(),
        user_id=post_data.creator_id)
    db.add(new_post)
    db.commit()
    db.refresh(new_post)
    return new_post


def get_all(db: Session):
    return db.query(Post).order_by(Post.timestamp.desc()).all()


def delete_post(id: int, db: Session, current_user_id: int):
    post = db.query(Post).filter_by(id=id).first()
    if not post:
        raise HTTPException(status_code=404, detail="Post with {id} not found")
    if post.user_id != current_user_id:
        raise HTTPException(status_code=401, detail="Only post creator can delete a post")

    db.delete(post)
    db.commit()

    return "post deleted successfully"
