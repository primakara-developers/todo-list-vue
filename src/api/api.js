import { $fetch } from "ohmyfetch";

const apiFetch = $fetch.create({
  baseURL: "https://shrouded-refuge-36665.herokuapp.com/api",
});

export default apiFetch;
