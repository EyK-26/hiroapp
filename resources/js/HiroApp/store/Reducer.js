export default function reducer(state, action) {
    console.log("state: ", state, "action: ", action);
    switch (action.type) {
        case "theme/set":
            return {
                ...state,
                theme: action.payload,
            };
        case "user/set":
            return {
                ...state,
                user: action.payload,
            };
        case "error/add":
            return {
                ...state,
                messages: {
                    ...state.messages,
                    errors: [...state.messages.errors, action.payload],
                },
            };
        case "success/add":
            return {
                ...state,
                messages: {
                    ...state.messages,
                    messages: [...state.messages.messages, action.payload],
                },
            };
        default:
            return state;
    }
}
