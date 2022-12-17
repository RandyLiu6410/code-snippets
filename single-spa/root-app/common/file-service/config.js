const config = {
  COOKIE: {
    TOKEN: 'file-service-token',
    CLIENT: 'file-service-clientId',
    EXPIRES: '5d',
    BUCKET_NAME: 'bucket-name',
  },
  REQUEST: {
    HEADER: {
      AUTHORIZATION: 'authorization',
      BUCKET_NAME: 'bucket-name',
      CLIENT: 'file-service-clientId',
    },
    TOKEN_FUNC: function (value) {
      return `Bearer ${value}`;
    },
  },
  FOLDER: {
    COMPONENT: '構件總表',
    TEMPLATE: '範本',
  },
  FILETYPE: {
    oword: {
      title: 'OWord',
      value: 'oword',
      ext: '.oword',
    },
    osheet: {
      title: 'OSheet',
      value: 'osheet',
      ext: '.osheet',
    },
    oform: {
      title: 'OForm',
      value: 'oform',
      ext: '.oform',
    },
  },
};

export default config;
