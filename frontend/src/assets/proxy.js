//const devURL = "http://localhost:4000";
//const devURL = "http://mcav.org";
const devURL = "http://compayn.space:8080";

export const proxyBuilder = build => {
  switch (build) {
    case "redirect-beta":
      return "http://compayn.space:3000";
    case "server-beta":
      return "http://compayn.space:8080";
  }
};
export default devURL;
