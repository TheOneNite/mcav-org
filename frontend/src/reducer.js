const reducer = (state, action) => {
  if (action.type === "loadFits") {
    return { ...state, fitList: action.fitList };
  }
  if (action.type === "loadDocs") {
    return { ...state, docList: action.docList };
  }
  return { ...state };
};

export default reducer;
