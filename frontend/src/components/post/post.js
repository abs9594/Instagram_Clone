import React, { useContext, useEffect, useState } from "react";
import { Avatar, Button } from "@mui/material";
import classes from "./post.module.css";
import { BASE_URL } from "../../constants";
import http from "../../http";
import AppContext from "../../contexts/app-context";

const Post = ({ post }) => {
    const [imageURL, setImageURL] = useState(null);
    const [comments, setComments] = useState(post.comments);
    const [newComment, setNewComment] = useState("");
    const appContext = useContext(AppContext);

    useEffect(() => {
        if (post.image_url_type === "absolute") setImageURL(post.image_url);
        else setImageURL(`${BASE_URL}/${post.image_url}`);
    }, [post],);

    const handleDelete = (event) => {
        event.preventDefault();
        if (!window.confirm("Do you really want to delete this post ?")) return;
        http.delete(`post/delete/${post.id}`, { "Authorization": appContext.authTokenType + " " + appContext.authToken })
            .then(response => {
                if (response.ok) {
                    return response.json();
                }
                throw response;
            })
            .then(() => window.location.reload())
            .catch(error => console.log(error))
    };

    const postComment = (event) => {
        event.preventDefault();
        const data = {
            "username": appContext.username,
            "text": newComment,
            "post_id": post.id
        }
        http.post("comment/create", data, { "Authorization": appContext.authTokenType + " " + appContext.authToken })
            .then(response => {
                if (response.ok) {
                    setNewComment("");
                    getAllComments()
                    return response.json();
                }
                throw response;
            })
            .catch(error => console.log(error))
    };

    const getAllComments = () => {
        http.get(`comment/all/${post.id}`)
            .then(response => {
                if (response.ok) {
                    return response.json();
                }
                throw response;
            })
            .then(data => {
                setComments(data)
            })
            .catch(error => console.log(error))
    }
    return (
        <div className={classes.post}>
            <div className={classes.postHeader}>
                <Avatar alt={post.user.username} src="" />
                <div className={classes.postHeaderInfo}>
                    <h3>{post.user.username}</h3>
                    {post.user.id===appContext.userId?<Button variant="contained" color="error" onClick={(event)=>handleDelete(event)}>DELETE</Button>:null}
                </div>
            </div>
            <img className={classes.postImage} src={imageURL} alt="picure" />
            <h4 className={classes.postCaption}>{post.caption}</h4>
            <div className={classes.postComments}>
                {comments.map((comment, index) => (
                    <p key={index}>
                        <strong>{comment.username}</strong>:{comment.text}
                    </p>
                ))}
            </div>
            <div>
                {
                    appContext.authToken ? <div>
                        <form className={classes.newCommentBox}>
                            <input className={classes.newComment}
                                type="text"
                                placeholder="add a comment"
                                value={newComment}
                                onChange={(event) => setNewComment(event.target.value)}
                            />

                            <button className={classes.newCommentButton}
                                type="submit"
                                disabled={!newComment}
                                onClick={(event) => postComment(event)}
                            >add</button>
                        </form>
                    </div> : null
                }
            </div>
        </div>
    )
};

export default Post;
