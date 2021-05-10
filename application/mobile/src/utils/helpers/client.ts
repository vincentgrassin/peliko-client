import { createClient } from "urql";

export const client = createClient({
  url: "http://192.168.43.22:4000/graphql"
});
