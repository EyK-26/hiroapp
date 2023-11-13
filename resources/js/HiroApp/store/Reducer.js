export default function reducer(state, action) {
    console.log(
        "action type: ",
        action.type,
        "action_payload: ",
        action.payload
    );
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
                    errors: action.payload,
                },
            };
        case "success/add":
            return {
                ...state,
                messages: {
                    ...state.messages,
                    success: action.payload,
                },
            };
        default:
            return state;
    }
}
