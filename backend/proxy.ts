const generateProxy = build => {
  switch (build) {
    case "dev":
      return "localhost";
    case "beta":
      return "compayn.space";
  }
};

module.exports = generateProxy;
