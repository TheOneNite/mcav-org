import devURL from "./proxy.js";

const getDoctrines = async id => {
  if (id === undefined) {
    const res = await fetch(devURL + "/doctrines");
    let bod = await res.text();
    bod = JSON.parse(bod);
    if (bod.success) {
      return bod.docList;
    }
    alert("error loading doctrines");
    return;
  } else {
    const res = await fetch(devURL + "/doctrines?id=" + id);
    let bod = await res.text();
    bod = JSON.parse(bod);
    if (bod.success) {
      return bod.docList;
    }
  }
};
const getFitSingle = async id => {
  const res = await fetch(devURL + "/fit-single?id=" + id);
  let bod = await res.text();
  bod = JSON.parse(bod);
  if (bod.success) {
    return bod.fit;
  }
};
const getFits = async () => {
  const res = await fetch(devURL + "/fits");
  let bod = await res.text();
  bod = JSON.parse(bod);
  if (bod.success) {
    let fitList = bod.fitList;
    return fitList;
  }
};

export { getDoctrines, getFits, getFitSingle };
