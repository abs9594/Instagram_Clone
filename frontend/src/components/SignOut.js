import React, { useContext } from "react";
import { Button } from "@mui/material";
import LogoutIcon from '@mui/icons-material/Logout';
import AppContext from "../contexts/app-context";

const SignOut = () => {

    const appContext = useContext(AppContext);

    const handleSignOut = (event) => {
        event.preventDefault();

        if (!window.confirm("Do you really want to Sign Out ?")) return;

        appContext.setAuthToken(null);
        window.sessionStorage.setItem("authToken", "");

        appContext.setAuthTokenType(null);
        window.sessionStorage.setItem("authTokenType", "");

        appContext.setUsername(null);
        window.sessionStorage.setItem("username", "");

        appContext.setUserId(null);
        window.sessionStorage.setItem("userId", "");
    };

    return (
        <div style={{ display: "flex", alignItems: "center", padding: "10px" }}>
            <Button style={{ color: "white" }} onClick={handleSignOut}>
                Sign Out<LogoutIcon style={{ color: "white" }} />
            </Button>
        </div>
    );
};

export default SignOut;
