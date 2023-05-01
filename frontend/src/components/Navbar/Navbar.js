import React, { useContext, useEffect } from "react";
import classes from "../Navbar/Navbar.module.css";
import SignUp from "../SignUp/SignUp";
import SignIn from "../SignIn/SignIn";
import AppContext from "../../contexts/app-context";
import SignOut from "../SignOut";

const Navbar = () => {

    const appContext = useContext(AppContext);

    useEffect(() => {
        appContext.setAuthToken(window.sessionStorage.getItem("authToken"));
        appContext.setAuthTokenType(window.sessionStorage.getItem("authTokenType"));
        appContext.setUsername(window.sessionStorage.getItem("username"));
        appContext.setUserId(window.sessionStorage.getItem("userId"));
    });

    return (
        <React.Fragment>
            <div className={classes.navBar}>
                <div>
                    <img className={classes.navBarLogo} src="data:image/png;base64,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" alt="instagram" />
                </div>
                {appContext.username ?
                    <div style={{ display: "flex", alignItems: "center" }}>
                        <p style={{ color: "white", paddingRight: "20px" }}>Hello <strong>{appContext.username}</strong></p>
                        <SignOut />
                    </div>
                    :
                    <div style={{ display: "flex", alignItems: "center" }}>
                        <SignIn />
                        <SignUp />
                    </div>}
            </div>
        </React.Fragment>

    );
};

export default Navbar;