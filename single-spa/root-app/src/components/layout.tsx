import React from "react";
import styled from "styled-components";
import { Header } from "./header";

const LayoutWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

interface LayoutProps {
  hideHeader?: boolean;
  children: React.ReactNode;
}
export const Layout = React.memo<LayoutProps>(({ hideHeader, children }) => {
  return (
    <LayoutWrapper>
      {!hideHeader && <Header />}

      {children}
    </LayoutWrapper>
  );
});
