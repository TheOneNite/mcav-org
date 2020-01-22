const generateProxy = build => {
  switch (build) {
    case "dev":
      return "localhost";
  }
};

module.exports = generateProxy;
