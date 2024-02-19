export default function isAuthenticated() {
  const jwtCookie = document.cookie
    .split(";")
    .find((cookie) => cookie.trim().startsWith("jwt="));

  console.log(jwtCookie);

  return jwtCookie !== undefined;
}
