import '../../public/Styles/login.css'
import authUser from '../API/auth.js'

function Login() {

    function getForms (formData) {
        const email = formData.get("email");
        const password = formData.get("password");
        console.log(email, password);
    }

    return (
        <div className="login-container">

            <div className="left-content">
                <img src="/Images/Logo.svg" alt="logo" />

                <form className="login-form" action={getForms}>
                    <h2>Transformez vos stats en résultats</h2>
                    <p>Se connecter</p>

                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
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
                    src="/Images/Background_picture.svg"
                    alt="background"
                />
                <p>Analysez vos performances en un clin d’œil, suivez vos progrès et atteignez vos objectifs.</p>
            </div>

        </div>
    )

}

export default Login;