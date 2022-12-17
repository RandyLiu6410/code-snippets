export const EMAIL_REGEX =
  /^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z]+$/;

export const generateFileHref = () => {
  const locale = "zh-TW";
  const clientId = process.env.REACT_APP_FILE_SERVICE_CLIENTID;
  const folderId = process.env.REACT_APP_FILE_SERVICE_FOLDERID;

  return `/main/file/${locale}/home/${clientId}/files?source=files&folderId=${folderId}`;
};

export const generateViewerServiceHref = () => {
  return `/main/viewer/standalone/fileManager/${process.env.REACT_APP_VIEWER_SERVICE_CLIENT_ID}`;
};
