import { redirect } from "react-router";
import { authCookie } from "../cookies.server";

export async function action() {
    const cookie = await authCookie.serialize("", {
        maxAge: 0,
    });

    return redirect("/", {
        headers: {
            "Set-Cookie": cookie,
        },
    });
}
