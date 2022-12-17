export const EVENT = {
  //FILE_VIEWER
  FILE_VIEWER_INIT: "file-service:file-viewer:init",
  FILE_VIEWER_DATA_CHANGE: "file-service:file-viewer:data-change",
  FILE_VIEWER_SAVE: "file-service:file-viewer:save",
  FILE_VIEWER_SAVE_TEMPLATE: "file-service:file-viewer:save-template",

  //FILE_PICKER
  FILE_PICKER_CLOSE: "file-service:file-picker:close",
  FILE_PICKER_SELECT_OVER: "file-service:file-picker:select-over",

  //FILE_UPLOADER
  FILE_UPLOADER_UPLOAD: "file-service:file-uploader:upload",
};

export const SPAEventGenerator = (event, uid) => `${event}-${uid}`;
