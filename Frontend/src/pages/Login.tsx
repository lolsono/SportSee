import "../../public/Styles/login.css";

import { Form, redirect, useActionData, } from "react-router";
import Logo from "../../public/Images/Logo.svg";
import Background_picture from "../../public/Images/Background_picture.svg";
import AuthServices from "../services/AuthServices.server";

export async function action({ request }) {
    const formData = await request.formData();

    const email = formData.get("email");
    const password = formData.get("password");

    const userLogged = await AuthServices(email, password);

    if (!userLogged.authenticated) {
        return {
            error: "Identifiant incorrect !",
        };
    }

    return redirect("/homePage", {
        headers: {
            "Set-Cookie": userLogged.cookie,
        },
    });
}

export default function Login() {
    const actionData = useActionData();

    return (
        <div className="login-container">

            <div className="left-content">

                <img src={Logo} alt="logo" />

                <Form
                    method="post"
                    className="login-form"
                >
                    <h2>Transformez vos stats en résultats</h2>
                    <p>Se connecter</p>

                    {actionData?.error && (
                        <p className="login-error">
                            {actionData.error}
                        </p>
                    )}

                    <div className="form-group">
                        <label htmlFor="email">
                            Email
                        </label>

                        <input
                            type="name"
                            id="email"
                            name="email"
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="password">
                            Mot de passe
                        </label>

                        <input
                            type="password"
                            id="password"
                            name="password"
                            required
                        />
                    </div>

                    <button type="submit">
                        Se connecter
                    </button>

                    <p className="forget-password">
                        Mot de passe oublié ?
                    </p>
                </Form>

            </div>

            <div className="right-content">

                <img
                    src={Background_picture}
                    alt="background"
                />

                <p>
                    Analysez vos performances en un clin d’œil,
                    suivez vos progrès et atteignez vos objectifs.
                </p>

            </div>

        </div>
    );
}
