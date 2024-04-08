import { Link } from "react-router-dom";

// context api
import { Context } from "../../context/UserContext"
import { useContext } from "react";

// styles
import styles from './Navbar.module.css'

// logo
import Logo from '../../assets/img/logo.png'

export default function Navbar() {

    const { authenticated, logout } = useContext(Context)

    return (
        <nav className={styles.navbar}>
            <Link to="/"><div className={styles.navbar_logo}>
                <img src={Logo} alt="Get A Pet" />
                <h2>Get A Pet</h2>
            </div></Link>
            <ul>
                <li>
                    <Link to="/">Adotar</Link>
                </li>
                {authenticated ? (
                    <>
                        <li>
                            <Link to="/pet/myadoptions">Minhas Adoções</Link>
                        </li>
                        <li>
                            <Link to="/pet/mypets">Meus Pets</Link>
                        </li>
                        <li>
                            <Link to="/user/profile">Perfil</Link>
                        </li>
                        <li className={styles.btn_exit} onClick={logout}>Sair</li>
                    </>
                ) : (
                    <>
                        <li>
                            <Link to="/login">Entrar</Link>
                        </li>
                        <li>
                            <Link to="/register">Cadastrar</Link>
                        </li>
                    </>
                )
                }
            </ul>
        </nav>
    )
}