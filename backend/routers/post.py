from fastapi import APIRouter, Depends, UploadFile
from fastapi.exceptions import HTTPException
from sqlalchemy.orm.session import Session
from routers.schemas import PostBase, PostDisplay, UserAuth
from auth.oauth2 import get_current_user
from db import post
from db.db import get_db
from typing import List
import string
import shutil
import random

router = APIRouter(
    prefix="/post",
    tags=["post"]
)

image_url_types = ["absolute", "relative"]


@router.post("/create", response_model=PostDisplay)
def create_post(post_data: PostBase, db: Session = Depends(get_db), current_user: UserAuth = Depends(get_current_user)):
    if post_data.image_url_type not in image_url_types:
        raise HTTPException(status_code=422, detail="'image_url_type' is not valid")
    return post.create_post(db, post_data)


@router.get("/all", response_model=List[PostDisplay])
def all_posts(db: Session = Depends(get_db)) -> List[PostDisplay]:
    return post.get_all(db)


@router.post("/image/upload")
def upload_image(image: UploadFile, current_user: UserAuth = Depends(get_current_user)):
    random_string = "_" + "".join(random.choices(string.ascii_letters, k=7)) + "."
    new_filename = random_string.join(image.filename.split("."))
    path = f"images/{new_filename}"
    with open(path, "w+b") as buffer:
        shutil.copyfileobj(image.file, buffer)
    return {"file_path": path}


@router.delete("/delete/{id}")
def delete_post(id: int, db: Session = Depends(get_db), current_user: UserAuth = Depends(get_current_user)):
    return post.delete_post(id, db, current_user.id)
