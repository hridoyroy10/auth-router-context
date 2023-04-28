import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../Context/UserContext";



const Header = () => {
    const { user, logOut } = useContext(AuthContext);
    console.log(user)
    const handleSingOut = () => {
        logOut()
            .then(() => {

            })
            .catch(error => console.error(error))
    }

    return (
        <div>
            <div className="navbar bg-primary text-primary-content gap-11">
                <Link className="btn btn-ghost normal-case text-xl" to='/'>DaisyUi</Link>
                <Link className="btn btn-ghost normal-case text-xl" to='/'>Home</Link>
                <Link className="btn btn-ghost normal-case text-xl" to='/login'>Login</Link>
                <Link className="btn btn-ghost normal-case text-xl" to='/register'>Register</Link>
                {
                    user?.photoURL && <img className="rounded-full" src={user.photoURL} alt="" srcset="" />
                }
                {user?.displayName && <p>{user.displayName}</p>}
                {user?.email && <span>{user.email}</span>}
                <br />
                {user?.email?
                    <button onClick={handleSingOut} className=" btn-sm">Sing Out</button>
                    :
                    <Link to='/register'>
                        <button className=" btn-sm">Log In</button>
                    </Link>
                }
            </div>
        </div>
    );
};

export default Header;