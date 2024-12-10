import { Link } from "react-router-dom";
import { auth } from "../config/firebase"; 
import {useAuthState} from "react-firebase-hooks/auth";
import { signOut } from "firebase/auth";
import { FaPlus } from "react-icons/fa";

const Navbar = () => {

    const [user] = useAuthState(auth);

    const signUserOut = async () => {
        await signOut(auth);
    }
     
    
    return ( 
        <div className="w-full flex flex-col items-center h-[13vh] overflow-visible">
        <div className="z-50 w-[99%] flex items-center bg-yellow-400 rounded-xl relative p-4 top-2 border-2 border-rose-900 bg-opacity-90 backdrop-blur-sm">
            <Link to={"/"}>
            <div className="text-[30px] ml-[20px] text-white font-extrabold absolute">SMAPP</div>
            <div className="text-[32px] ml-[16.4px] text-rose-900 font-extrabold">SMAPP</div>
            </Link>
            
            <div className="ml-auto gap-3 flex font-bold">
                
            <div className="flex gap-3 underline text-rose-900 mr-8">
                <Link to={"/"}>Home</Link>
                {!user ? <Link to={"/login"}>Login</Link> :
                <button onClick={signUserOut}>Log Out</button>}
            </div>
            

            <div className="flex gap-2">   
                {user ? <img src={user?.photoURL || null} height="25" width="25" className="rounded-full"/> : <div className="w-0"></div>}
                <p>{user?.displayName}</p>
            </div>

            </div>
        </div>
        {user && <div className=" z-0 bg-yellow-200 border-2 border-rose-900 w-fit p-4 mr-4 ml-auto rounded-b-xl animate-dropDown">
            <Link to={"/post"} className="flex items-center gap-2">
                <FaPlus />
                Create Post
            </Link>
            
        </div>}
        </div>
     );
}
 
export default Navbar;