import React, { useReducer } from "react";
import reducer from "./store/Reducer";
import { BrowserRouter } from "react-router-dom";
import Context from "./context/Context";
import Router from "./router/Router";

const App = () => {
    const [contextValue, setContextValue] = useReducer(reducer, {
        theme: "light",
        user: null,
        messages: {
            messages: [],
            errors: [],
        },
    });

    return (
        <BrowserRouter>
            <Context.Provider
                value={{ state: contextValue, dispatch: setContextValue }}
            >
                <Router />
            </Context.Provider>
        </BrowserRouter>
    );
};
export default App;
