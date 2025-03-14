import { GET_ALL_CHATS } from "../constant/urls";

function loader() {
  return fetch(GET_ALL_CHATS, { credentials: "include" }).then((response) =>
    response.json()
  );
}

export default loader;
