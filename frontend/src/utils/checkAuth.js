import Cookies from "js-cookie";

export default function checkAuth() {
  const jwtCookie = Cookies.get("jwt");

  console.log(jwtCookie);

  return jwtCookie !== undefined;
}
