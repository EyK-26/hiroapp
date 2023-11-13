import React, { useReducer } from "react";
import { createRoot } from "react-dom/client";
import App from "./hiroapp/App";
import { BrowserRouter } from "react-router-dom";
import reducer from "./hiroapp/store/Reducer";
import Context from "./hiroapp/context/Context";

export default function HiroApp() {
    const [contextValue, setContextValue] = useReducer(reducer, {
        theme: "light",
        user: null,
        messages: {
            success: {},
            errors: {},
        },
    });

    return (
        <BrowserRouter>
            <Context.Provider
                value={{ state: contextValue, dispatch: setContextValue }}
            >
                <App />
            </Context.Provider>
        </BrowserRouter>
    );
}

const container = document.getElementById("root");
const root = createRoot(container);
root.render(
    <React.StrictMode>
        <HiroApp />
    </React.StrictMode>
);
