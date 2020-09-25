export const initialState = {
  products: [],
  copyData: [],
  categories: ["Books", "Clothes", "Bags", "Mobiles"],
};

const reducer = (state, action) => {
  switch (action.type) {
    case "FETCH_PRODUCT":
      return {
        ...state,
        products: action.payload,
        copyData: action.payload,
      };

    case "ADD_PRODUCT":
      return {
        ...state,
        products: [...state.copyData, action.item],
        copyData: [...state.copyData, action.item],
      };

    case "EDIT_PRODUCT":
      return {
        ...state,
        products: action.payload,
        copyData: action.payload,
      };

    case "FILTER_PRODUCT":
      return {
        ...state,
        products: action.payload,
      };

    case "RESET":
      return {
        ...state,
        products: state.copyData,
      };

    default:
      return state;
  }
};

export default reducer;
