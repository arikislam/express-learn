const queryParams = (allowedParams, query) => allowedParams.reduce((acc, param) => {
  if (query[param]) {
    acc[param] = query[param];
  }
  return acc;
}, {});

module.exports = { queryParams };
