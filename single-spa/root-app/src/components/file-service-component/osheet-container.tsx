import Parcel from "single-spa-react/parcel";
import React from "react";
import { v4 as uuidv4 } from "uuid";

declare global {
  interface Window {
    System: any;
  }
}

interface OSheetContainerProps {
  fileId: string;
  versionId?: string;
}
export const OSheetContainer = React.memo<OSheetContainerProps>(
  ({ fileId, versionId }) => {
    const eventId = uuidv4();

    return (
      //@ts-ignore
      <Parcel
        config={window.System.import("@onework/file-service").then(
          (ns) => ns.OSheetContainerParcel
        )}
        wrapWith="div"
        _eventId={eventId}
        _fileId={fileId}
        _versionId={versionId}
        _locale="zh-TW"
      />
    );
  }
);
