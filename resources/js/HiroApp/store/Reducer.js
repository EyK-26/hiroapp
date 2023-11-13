export default function reducer(state, action) {
    switch (action.type) {
        case "products/set":
            return {
                ...state,
                products: action.payload,
                productsLoading: false,
            };
        default:
            return state;
    }
}
