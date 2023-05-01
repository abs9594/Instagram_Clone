import React from "react";
import classes from "../App/App.module.css";
import Layout from "../components/Layout";
import { AppContextProvider } from "../contexts/app-context";

function App() {
   return (
      <AppContextProvider>
         <div className={classes.app}>
            <Layout />
         </div>
      </AppContextProvider>
   )
};
export default App;
