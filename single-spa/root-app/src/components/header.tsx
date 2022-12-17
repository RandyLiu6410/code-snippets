import React, { useMemo } from "react";
import styled from "styled-components";
import { Theme } from "../style/theme";
import clsx from "clsx";
import { generateViewerServiceHref, generateFileHref } from "../util/ui";

const HeaderWrapper = styled.div`
  height: 48px;
  width: 100%;
  background: ${Theme.color.secondary};
  display: flex;
`;

const StyledLinkWrapper = styled.div`
  color: ${Theme.color.white};
  height: 100%;
  display: flex;
  align-items: center;
  padding: 0px 8px;
  :hover {
    color: ${Theme.color.secondary};
    background: ${Theme.color.gray};
  }
  &.selected {
    color: ${Theme.color.secondary};
    background: ${Theme.color.gray};
    border: none !important;
  }
`;

const StyledLink = styled.a`
  text-decoration: none;
  color: inherit;
`;

export const Header = React.memo(() => {
  return (
    <HeaderWrapper>
      <StyledLinkWrapper
        className={clsx(null, {
          selected: window.location.pathname.startsWith("/main/file"),
        })}
      >
        <StyledLink href={generateFileHref()}>檔案總管</StyledLink>
      </StyledLinkWrapper>
      <StyledLinkWrapper
        className={clsx(null, {
          selected: window.location.pathname.startsWith("/main/viewer"),
        })}
      >
        <StyledLink href={generateViewerServiceHref()}>模型總管</StyledLink>
      </StyledLinkWrapper>
    </HeaderWrapper>
  );
});

import ReactDOM from "react-dom";
import singleSpaReact from "single-spa-react";
export const HeaderParcel = singleSpaReact({
  React,
  ReactDOM,
  rootComponent: Header,
});
