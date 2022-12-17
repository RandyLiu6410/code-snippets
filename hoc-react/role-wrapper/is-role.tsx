import * as React from "react";
import { useApolloClient } from "@apollo/client";
import { Query } from "@apollo/client/react/components";
import {
  Backdrop,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
} from "@mui/material";
import { Auth0RoleName } from "../../common/models-v2";
import { GraphQLResponse } from "../utils/graphql-util";
import { useFetchUser } from "../lib/user";
import { useRouter } from "next/router";
import { queryMyRole } from "../lib/gql/user";

export const useMyRoles = () => {
  const client = useApolloClient();
  const [state, setState] = React.useState<{
    myRoles: Auth0RoleName[];
    isAdmin: boolean;
  }>({ myRoles: [], isAdmin: false });

  const update = async () => {
    const { data }: GraphQLResponse<Auth0RoleName[], "myRoles"> =
      await client.query({
        query: queryMyRole,
      });
    if (data?.myRoles) {
      setState({
        myRoles: data.myRoles,
        isAdmin: data.myRoles.includes(Auth0RoleName.Admin),
      });
    }
  };

  React.useEffect(() => {
    update();
  }, []);

  return state;
};

export interface IsRoleProps {
  role: Auth0RoleName;
  unauthorized?: React.ReactElement;
  setIsRoleResult?: (result: boolean) => void;
}

export const IsRole = React.memo<React.PropsWithChildren<IsRoleProps>>(
  ({ role, unauthorized, setIsRoleResult, children }) => {
    const { user, loading } = useFetchUser({ required: true });
    const client = useApolloClient();
    if (client && user) {
      return (
        <Query client={client} query={queryMyRole}>
          {({ data, loading }: GraphQLResponse<Auth0RoleName[], "myRoles">) => {
            if (data && !loading) {
              if (
                !!data.myRoles &&
                (data.myRoles.includes(role) ||
                  data.myRoles.includes(Auth0RoleName.Admin))
              ) {
                setIsRoleResult && setIsRoleResult(true);
                return <>{children}</>;
              } else {
                setIsRoleResult && setIsRoleResult(false);
                return unauthorized ? <>{unauthorized}</> : null;
              }
            }
            return null;
          }}
        </Query>
      );
    } else {
      if (loading) {
        return null;
      } else {
        return unauthorized ? <>{unauthorized}</> : null;
      }
    }
  }
);

export const IsOrg = React.memo<
  React.PropsWithChildren<Pick<IsRoleProps, "unauthorized" | "setIsRoleResult">>
>(({ ...props }) => (
  <IsRole role={Auth0RoleName.OrganizationOwner} {...props} />
));

export const IsAdmin = React.memo<
  React.PropsWithChildren<Pick<IsRoleProps, "unauthorized" | "setIsRoleResult">>
>(({ ...props }) => <IsRole role={Auth0RoleName.Admin} {...props} />);

export const Unauthorized = React.memo(() => {
  const router = useRouter();
  return (
    <Backdrop open={true}>
      <Dialog open={true}>
        <DialogTitle>{"Unauthorized"}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            You are unauthorized to enter this page.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => router.back()} color="primary">
            Go Back
          </Button>
        </DialogActions>
      </Dialog>
    </Backdrop>
  );
});
