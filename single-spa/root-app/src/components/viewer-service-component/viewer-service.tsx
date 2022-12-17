import Parcel from "single-spa-react/parcel";
import React from "react";
import { v4 as uuidv4 } from "uuid";

declare global {
  interface Window {
    System: any;
  }
}

interface ViewerServiceProps {
  height?: string | number;
}
export const ViewerService = React.memo<ViewerServiceProps>(
  ({ height = "100vh" }) => {
    return (
      //@ts-ignore
      <Parcel
        config={window.System.import("@onework/viewer-service").then(
          (ns) => ns.SPAFileManagerParcel
        )}
        wrapWith="div"
        wrapStyle={{
          height: height,
          display: "flex",
        }}
      />
    );
  }
);

export default ViewerService;
