import { createCookie } from "react-router";

export const authCookie = createCookie("token", {
    httpOnly: true,
    sameSite: "lax",
    path: "/",
});
