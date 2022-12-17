import Parcel from "single-spa-react/parcel";
import React from "react";
import { v4 as uuidv4 } from "uuid";

declare global {
  interface Window {
    System: any;
  }
}

interface FileServiceProps {
  height?: string | number;
}
export const FileService = React.memo<FileServiceProps>(
  ({ height = "100vh" }) => {
    return (
      //@ts-ignore
      <Parcel
        config={window.System.import("@onework/file-service").then(
          (ns) => ns.FileServiceParcel
        )}
        wrapWith="div"
        wrapClassName="file-viewer-wrapper"
        wrapStyle={{
          height: height,
          display: "flex",
        }}
      />
    );
  }
);

export default FileService;
