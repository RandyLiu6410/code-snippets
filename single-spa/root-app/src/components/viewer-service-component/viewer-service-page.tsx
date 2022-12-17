import React from "react";
import styled from "styled-components";
import { OSheetContainer } from "../file-service-component/osheet-container";
import { Layout } from "../layout";
import clsx from "clsx";
import ViewerService from "./viewer-service";
import { getOsheetByModelId } from "@onework/file-service"; // from single-spa: @onework/file-service: utilities
import { useLocation } from "react-router-dom";

const OPEN_BIM_EVENT = "OPEN_BIM_EVENT";

const StyledRoot = styled.div`
  width: 100vw;
  height: calc(100vh - 48px);
  display: flex;
  &.hide-header {
    height: 100vh;
  }
`;

const StyledViewerServiceWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  &.open-osheet {
    width: 50%;
  }
`;

const StyledOSheetServiceWrapper = styled.div`
  position: relative;
  width: 50%;
  height: 100%;
`;

const ViewerServicePage = React.memo(() => {
  const [osheetOpen, setOsheetOpen] = React.useState(false);
  const [osheetFileId, setOsheetFileId] = React.useState<string>();
  const [bimFile, setBimFile] = React.useState<any | undefined>();

  const hideHeader = React.useMemo(() => !!bimFile, [bimFile]);

  React.useEffect(() => {
    (async () => {
      if (bimFile) {
        const getOsheetByModelIdRes = await getOsheetByModelId({
          modelId: bimFile.id,
        });

        if (getOsheetByModelIdRes.data) {
          setOsheetFileId(getOsheetByModelIdRes.data.id);
          setOsheetOpen(true);
        } else {
          setOsheetFileId(undefined);
          setOsheetOpen(false);
        }
      } else {
        setOsheetOpen(false);
      }
    })();
  }, [bimFile]);

  const handleOpenBimEvent = async (e: any) => {
    setBimFile(e.detail);
  };

  React.useEffect(() => {
    document.addEventListener(OPEN_BIM_EVENT, handleOpenBimEvent);

    return () => {
      document.removeEventListener(OPEN_BIM_EVENT, handleOpenBimEvent);
    };
  }, []);

  return (
    <Layout hideHeader={hideHeader}>
      <StyledRoot
        className={clsx(null, {
          "hide-header": hideHeader,
        })}
      >
        <StyledViewerServiceWrapper
          className={clsx(null, {
            "open-osheet": osheetOpen,
          })}
        >
          <ViewerService height={hideHeader ? "100vh" : "calc(100vh - 48px)"} />
        </StyledViewerServiceWrapper>
        {osheetOpen && (
          <StyledOSheetServiceWrapper>
            <OSheetContainer fileId={osheetFileId} />
          </StyledOSheetServiceWrapper>
        )}
      </StyledRoot>
    </Layout>
  );
});

export default ViewerServicePage;
