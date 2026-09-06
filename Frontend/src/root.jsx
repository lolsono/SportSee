import {
    Links,
    Meta,
    Outlet,
    Scripts,
    ScrollRestoration,
} from "react-router";

import "../public/Styles/index.css";
import { AuthProvider } from "./context/ContextAuth.jsx";

export default function Root() {
    return (
        <html lang="fr">
            <head>
                <meta charSet="utf-8" />
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1"
                />
                <Meta />
                <Links />
            </head>

            <body>
                <AuthProvider>
                    <Outlet />
                </AuthProvider>

                <ScrollRestoration />
                <Scripts />
            </body>
        </html>
    );
}
