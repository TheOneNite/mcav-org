const generateProxy = build => {
  switch (build) {
    case "dev":
      return "localhost";
    case "beta":
      return "dev.compayn.space";
  }
};

module.exports = generateProxy;
