export { default } from "next-auth/middleware";

export const config = {
  matcher: ["/reservation/manage", "/hello"],
};
