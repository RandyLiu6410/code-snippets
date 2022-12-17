import { RouterProvider } from "react-router-dom";
import { router } from "./routes";
import { ApolloProvider } from "@apollo/client";
import { client } from "./api/user-service/apollo-client";

export default function Root() {
  return (
    <ApolloProvider client={client}>
      <RouterProvider router={router} />
    </ApolloProvider>
  );
}
