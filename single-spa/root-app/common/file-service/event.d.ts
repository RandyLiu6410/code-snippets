export namespace EVENT {
  const FILE_VIEWER_INIT: string;
  const FILE_VIEWER_DATA_CHANGE: string;
  const FILE_VIEWER_SAVE: string;
  const FILE_VIEWER_SAVE_TEMPLATE: string;
  const FILE_PICKER_CLOSE: string;
  const FILE_PICKER_SELECT_OVER: string;
  const FILE_UPLOADER_UPLOAD: string;
}
export function SPAEventGenerator(event: any, uid: any): string;
