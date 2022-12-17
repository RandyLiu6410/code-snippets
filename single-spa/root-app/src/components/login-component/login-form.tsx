import React from "react";
import styled from "styled-components";
import { Theme } from "../../style/theme";
import { useMutation } from "@apollo/client";
import { LOGIN_MUTATION } from "../../api/user-service/login";
import * as _ from "lodash";
import { EMAIL_REGEX } from "../../util/ui";
import { AccessToken } from "../../../common/user-service/airhub-user-service";

export const StyledRoot = styled.div`
  padding: 16px;
`;

export const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const StyledTextField = styled.input`
  border: none;
  border-radius: 4px;
  margin-bottom: 16px;
  min-height: 2rem;
  width: 100%;
  padding: 4px 8px;
`;

export const StyledTitle = styled.h1`
  color: ${Theme.color.white};
`;

export const StyledSubmitButton = styled.button`
  border: none;
  background: ${Theme.color.primary};
  border-radius: 4px;
  cursor: pointer;
  font-size: 12px;
  padding: 4px 16px;
  color: ${Theme.color.secondary};
  :hover {
    color: ${Theme.color.white};
  }
  :disabled {
    background: ${Theme.color.gray};
    cursor: not-allowed;
  }
`;

interface Form {
  email?: string;
  password?: string;
}

interface LoginFormProps {
  handleLogin?: (accessToken: AccessToken) => void;
}

export const LoginForm = React.memo<LoginFormProps>(({ handleLogin }) => {
  const [mutateLogin, { data, loading, error }] = useMutation<{
    login: AccessToken;
  }>(LOGIN_MUTATION);

  const [form, setForm] = React.useState<Form>({});
  const login = React.useCallback(
    async (e) => {
      e.preventDefault();

      if (!form.email || !form.password) return;
      await mutateLogin({
        variables: {
          platformId: +process.env.REACT_APP_USER_SERVICE_PLATFORMID,
          ...form,
        },
      });
    },
    [form]
  );

  const submittable = React.useMemo(() => {
    if (!form.email || !form.password) return false;
    if (!EMAIL_REGEX.test(form.email)) return false;
    return true;
  }, [form]);

  React.useEffect(() => {
    if (data && data.login) {
      localStorage.setItem("pipeline-user", JSON.stringify(data.login.user));
      handleLogin(data.login);
    }
  }, [data]);

  return (
    <StyledRoot>
      <StyledForm onSubmit={login}>
        <StyledTitle>登入</StyledTitle>
        <StyledTextField
          placeholder="Email"
          onChange={(e) => {
            e.preventDefault();
            e.persist();
            if (!e.target) return;
            setForm((prev) => ({
              ...prev,
              email: e.target.value,
            }));
          }}
          value={form.email ?? ""}
        />
        <StyledTextField
          placeholder="密碼"
          type="password"
          onChange={(e) => {
            e.preventDefault();
            e.persist();
            if (!e.target) return;
            setForm((prev) => ({
              ...prev,
              password: e.target.value,
            }));
          }}
          value={form.password ?? ""}
        />
        <StyledSubmitButton disabled={!submittable || loading} type="submit">
          確定
        </StyledSubmitButton>
      </StyledForm>
    </StyledRoot>
  );
});
