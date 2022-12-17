import React from "react";
import styled from "styled-components";
import { AccessToken } from "../../../common/user-service/airhub-user-service";
import { Theme } from "../../style/theme";
import { LoginForm } from "./login-form";
import { useNavigate } from "react-router-dom";

import FileServiceConfig from "../../../common/file-service/config";
import FormServiceConfig from "../../../common/form-service/config";
import Cookies from "universal-cookie";
import { generateFileHref } from "../../util/ui";
const cookies = new Cookies();

const StyledRoot = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const StyledFormWrapper = styled.div`
  width: 600px;
  background: ${Theme.color.secondary};
  border-radius: 10px;
`;

const LoginPage = React.memo(() => {
  const navigate = useNavigate();

  const handleLogin = React.useCallback((accessToken: AccessToken) => {
    cookies.set("token", accessToken.token, {
      expires: new Date(accessToken.expiredAt),
    });

    // file-service-cookie
    cookies.set(FileServiceConfig.COOKIE.TOKEN, accessToken.token, {
      expires: new Date(accessToken.expiredAt),
      path: "/",
    });
    cookies.set(
      FileServiceConfig.COOKIE.CLIENT,
      process.env.REACT_APP_FILE_SERVICE_CLIENTID,
      {
        expires: new Date(accessToken.expiredAt),
        path: "/",
      }
    );

    // form-service-cookie
    cookies.set(FormServiceConfig.COOKIE.TOKEN, accessToken.token, {
      expires: new Date(accessToken.expiredAt),
      path: "/",
    });
    cookies.set(
      FormServiceConfig.COOKIE.CLIENT,
      process.env.REACT_APP_FORM_SERVICE_CLIENTID,
      {
        expires: new Date(accessToken.expiredAt),
        path: "/",
      }
    );

    navigate(generateFileHref());
  }, []);

  return (
    <StyledRoot>
      <StyledFormWrapper>
        <LoginForm handleLogin={handleLogin} />
      </StyledFormWrapper>
    </StyledRoot>
  );
});

export default LoginPage;
