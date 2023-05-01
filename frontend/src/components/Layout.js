import React, { useState, useEffect } from "react";
import http from "../http";
import Navbar from "./Navbar/Navbar";
import Post from "./post/post";
import ImageUpload from "./ImageUpload/ImageUpload";

const Layout = () => {
   const [posts, setPosts] = useState([]);

   useEffect(() => {
      http.get("post/all")
         .then(response => {
            if (response.ok) return response.json()
            throw response
         })
         .then(data => setPosts(data))
         .catch(error => {
            console.error(error)
            alert(error)
         })
   }, [])

   return (
      <React.Fragment>
         <Navbar />
         <ImageUpload />
         {
            posts.map((post, index) => (<Post key={index} post={post} />))
         }
      </React.Fragment>

   )
};

export default Layout;

