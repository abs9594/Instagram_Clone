import React, { useContext, useState } from 'react';
import { Button } from '@mui/material';
import classes from "./ImageUpload.module.css";
import http from '../../http';
import AppContext from '../../contexts/app-context';

const ImageUpload = () => {
    const [caption, setCaption] = useState(null);
    const [image, setImage] = useState(null);
    const appContext = useContext(AppContext);

    const handleImageChange = (event) => {
        event.preventDefault();
        if (event.target.files[0]) {
            setImage(event.target.files[0])
        }
    };

    const createPost = (imageUrl) => {
        const data = {
            "image_url": imageUrl,
            "image_url_type": "relative",
            "caption": caption,
            "creator_id": appContext.userId
        }

        http.post("post/create", data, { "Authorization": appContext.authTokenType + " " + appContext.authToken })
            .then(response => {
                if (response.ok) {
                    return response.json();
                }
                throw response;
            })
            .then(() => window.location.reload())
            .catch(error => console.log(error))
    };

    const handleImageUpload = (event) => {
        event.preventDefault();
        const formData = new FormData();
        formData.append("image", image);
        http.postForm("post/image/upload", formData, { "Authorization": appContext.authTokenType + " " + appContext.authToken })
            .then(response => {
                if (response.ok) {
                    return response.json();
                }
                throw response;
            })
            .then(data => createPost(data.file_path))
            .catch(error => console.log(error))
            .finally(() => {
                setCaption(null);
                setImage(null);
                document.getElementById("fileInput").value = null;
            });
    };


    return (
        <React.Fragment>
            <div className={classes.imageUpload}>
                {!appContext.authToken ? "Plase Login to create a new post" :
                    <div className={classes.imageUpload}>
                        <input type="text"
                            placeholder="enter caption"
                            onChange={(event) => setCaption(event.target.value)}
                        />
                        <input type="file"
                            accept="image/png, image/jpeg"
                            id="fileInput"
                            onChange={(event) => handleImageChange(event)}
                        />
                        <Button variant="outlined" color="primary" onClick={handleImageUpload}>Create New Post</Button>
                    </div>
                }
            </div>
        </React.Fragment>
    );
}

export default ImageUpload;