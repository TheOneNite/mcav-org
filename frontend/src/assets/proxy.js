//const devURL = "http://localhost:4000";
//const devURL = "http://mcav.org";
const devURL = "https://compayn.space:8080";

export const proxyBuilder = build => {
  switch (build) {
    case "redirect-beta":
      return "https://compayn.space";
    case "server-beta":
      return "https://compayn.space:8080";
    default:
      return "https://localhost:8080";
  }
};
export default devURL;
