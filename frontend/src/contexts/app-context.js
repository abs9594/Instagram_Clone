import React, { useState } from "react";

const AppContext = React.createContext(null);

const AppContextProvider = (props) => {
    const [authToken, setAuthToken] = useState("");
    const [authTokenType, setAuthTokenType] = useState("");
    const [userId, setUserId] = useState("");
    const [username, setUsername] = useState("");

    return (
        <AppContext.Provider value={{
            authToken,
            setAuthToken,
            authTokenType,
            setAuthTokenType,
            userId,
            setUserId,
            username,
            setUsername
        }} >
            {props.children}
        </AppContext.Provider>
    )
};

export { AppContextProvider };

export default AppContext;
