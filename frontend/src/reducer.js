const reducer = (state, action) => {
  if (action.type === "loadFits") {
    return { ...state, fitList: action.fitList };
  }
  if (action.type === "loadDocs") {
    return { ...state, docList: action.docList };
  }
  switch (action.type) {
    case "login":
      return { ...state, loginStatus: true, userData: action.userData };
    default:
      return { ...state };
  }
};

export default reducer;
