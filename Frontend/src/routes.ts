import {
    type RouteConfig,
    index,
    route,
} from "@react-router/dev/routes";

export default [
    index("./pages/Login.tsx"),

    route("login", "./pages/Login.tsx", {
        id: "login-page",
    }),

    route("loading", "./pages/Loading.jsx"),

    route("homePage", "./pages/HomePage.jsx"),

    route("dashboard", "./pages/Dashboard.jsx"),

    route("*", "./pages/Error404.jsx"),

    route("api/login", "./routes/api.login.jsx"),

    route("api/user-activity", "./routes/api.user-activity.jsx"),

    route("api/user", "./routes/api.user-info.jsx"),

    route("api/logout", "./routes/api.logout.jsx"),

] satisfies RouteConfig;
