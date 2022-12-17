import React from "react";
import styled from "styled-components";
import { Layout } from "../layout";
import FileService from "./file-service";

const StyledRoot = styled.div`
  width: 100vw;
  height: calc(100vh - 48px);
  display: flex;
  &.hide-header {
    height: 100vh;
  }
`;

const StyledFileServiceWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 100%;

  .file-viewer-wrapper {
    #app {
      width: 100vw;
      display: flex;
    }
  }
`;

const FileServicePage = React.memo(() => {
  return (
    <Layout>
      <StyledRoot>
        <StyledFileServiceWrapper>
          <FileService height={"calc(100vh - 48px)"} />
        </StyledFileServiceWrapper>
      </StyledRoot>
    </Layout>
  );
});

export default FileServicePage;
