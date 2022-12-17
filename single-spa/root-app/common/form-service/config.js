const config = {
  COOKIE: {
    TOKEN: "form-service-token",
    CLIENT: "form-service-clientId",
    EXPIRES: "5d",
  },
  REQUEST: {
    HEADER: {
      AUTHORIZATION: "authorization",
      CLIENT: "form-service-clientId",
    },
    TOKEN_FUNC: function (value) {
      return `Bearer ${value}`;
    },
  },
};

export default config;
