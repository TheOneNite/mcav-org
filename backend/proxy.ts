const generateProxy = build => {
  switch (build) {
    case "dev":
      return "localhost";
    case "beta":
      return "compayn.space:3000";
  }
};

module.exports = generateProxy;
