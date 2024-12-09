import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { addDoc, collection } from "firebase/firestore";
import { auth, database } from "../../config/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { Link } from "react-router-dom";

const PostForm = () => {

    const [user] = useAuthState(auth);

    const schema = yup.object().shape({
        title: yup.string().required("You must add a title..."),
        body: yup.string().required("You must add some content..."),

    });

    const {register, handleSubmit, formState: {errors},} = useForm({
        resolver: yupResolver(schema)
    });

    const postRef = collection(database, "posts");

    const PostCreated = async (data) => {
        await addDoc(postRef, {
            title: data.title,
            body: data.body,
            username: user?.displayName,
            id: user?.uid,
        }
        );
    };


    if(!user){
        return (
            <div className="w-full h-[87vh] flex justify-center items-center">
                <div className="flex flex-col text-2xl font-semibold text-center items-center justify-center gap-2 bg-yellow-200 max-w-[350px] w-[90%] p-4 h-[300px] rounded-xl border-2 border-rose-900 shadow-2xl shadow-yellow-500">
                    <p className="font-extrabold text-rose-900">Oops...
                    You must log in to post content on the platform!
                    </p>
                    <Link to={"/login"} className="underline text-rose-900 font-bold mt-4">Login</Link>
                </div>
            </div>
        );
    }
    else
    return (
    <div className="w-full h-[90vh] flex justify-center items-center">
        <form onSubmit={handleSubmit(PostCreated)} className="flex items-center flex-col gap-2 bg-yellow-200 max-w-[400px] w-[90%] pt-8 pb-4 rounded-xl h-auto border-2 border-rose-900 shadow-xl">
            <h1 className="font-bold text-2xl text-gray-900 text-center">Create Your Post</h1>
            <div className="flex flex-col gap-4 p-8 w-[80%]">
            <input placeholder="Your Title" {...register("title")} className="border-2 border-yellow-300 rounded focus:outline-yellow-500 min-h-[40px] p-2"/> 
            <textarea placeholder="Your Content" {...register("body")} className="border-2 border-yellow-300 rounded focus:outline-yellow-500 min-h-[100px] p-2"/>
            </div>
            
            <input type="submit" onClick={(e)=>e.preventDefault} className="bg-yellow-400 px-2 py-4 rounded-lg border-[2.7px] shadow-yellow-500 text-xl font-extrabold border-rose-900 w-[260px] shadow-xl hover:scale-105 hover:shadow-2xl hover:shadow-yellow-500 hover:translate-y-[-10px] transition-all text-white"/>
            <div className="text-red-700 text-center h-[60px] mt-8 font-semibold">
                <p>{errors.title?.message}</p>
                <p>{errors.body?.message}</p>
            </div>
        </form>
    </div>
    );
}
 
export default PostForm;