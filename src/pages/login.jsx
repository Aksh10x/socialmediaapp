import { provider, auth } from "../config/firebase";
import { signInWithPopup } from "firebase/auth";
import { useNavigate } from "react-router-dom";

const Login = () => {

    const navigate = useNavigate();

    const SignInGoogle = async () => {
        const result = await signInWithPopup(auth, provider); 
        console.log(result);
        navigate("/");
    };


    return ( 
        <div className="flex flex-col justify-center items-center w-full h-[87vh]">
        <div className="max-w-[400px] w-[90%] h-[300px] flex flex-col justify-center items-center gap-6 bg-yellow-200 rounded-xl border-2 border-rose-900 shadow-yellow-400 shadow-inner">
            <h1 className="font-bold text-2xl text-gray-900">Sign In with Google</h1>
            <button onClick={SignInGoogle} className="bg-yellow-400 px-2 py-4 rounded-lg border-[2.7px] text-lg font-extrabold text-white border-rose-900 w-[260px] shadow-2xl shadow-yellow-950 hover:scale-105 hover:translate-y-[-10px] transition-all">Login With Google</button>
        </div>
        </div>
     );
}
 
export default Login;