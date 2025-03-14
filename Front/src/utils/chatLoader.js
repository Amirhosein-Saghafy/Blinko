import { GET_ALL_CHATS } from "../constant/urls";

function loader({ params }) {
  return fetch(GET_ALL_CHATS + "/" + params.id, {
    credentials: "include",
  }).then((response) => response.json());
}

export default loader;
