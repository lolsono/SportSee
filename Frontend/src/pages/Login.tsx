import '../../public/Styles/login.css'
import { useNavigate } from "react-router";
import { useState } from "react";
import { useAuth } from '../context/ContextAuth';
import Logo from '../../public/Images/Logo.svg';
import Background_picture from '../../public/Images/Background_picture.svg';

function Login() {

    const navigate = useNavigate();
    const { login } = useAuth();

    const [error, setError] = useState("");

    async function getForms(formData) {
        const email = formData.get("email");
        const password = formData.get("password");

        const result = await login(email, password);

        if (result) {
            navigate("/logOn");
            return;
        }

        setError("Identifiant incorrect !");
    }
    
    return (
        <div className="login-container">

            <div className="left-content">
                <img src={Logo} alt="logo" />

                <form className="login-form" action={getForms}>
                    <h2>Transformez vos stats en résultats</h2>
                    <p>Se connecter</p>

                    {error && (
                        <p className="login-error">
                            {error}
                        </p>
                    )}

                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input
                            type="name"
                            id="email"
                            name="email"
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="password">Mot de passe</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                        />
                    </div>

                    <button type="submit">
                        Se connecter
                    </button>

                    <p className='forget-password'>Mot de passe oublié ?</p>
                </form>
            </div>

            <div className="right-content">
                <img
                    src={Background_picture}
                    alt="background"
                />
                <p>Analysez vos performances en un clin d’œil, suivez vos progrès et atteignez vos objectifs.</p>
            </div>

        </div>
    )

}

export default Login;