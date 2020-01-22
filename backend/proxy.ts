const generateProxy = build => {
  switch (build) {
    case "dev":
      return "localhost";
    case "beta":
      return "mcav.org";
  }
};

module.exports = generateProxy;
