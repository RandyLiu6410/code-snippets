const config = {
  COOKIE: {
    TOKEN: "flow-service-token",
    CLIENT: "flow-service-clientId",
    EXPIRES: "5d",
  },
  REQUEST: {
    HEADER: {
      AUTHORIZATION: "authorization",
      CLIENT: "flow-service-clientId",
    },
    TOKEN_FUNC: function (value) {
      return `Bearer ${value}`;
    },
  },
};

export default config;
