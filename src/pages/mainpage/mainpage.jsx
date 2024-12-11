import { collection, getDocs } from "firebase/firestore";
import { auth, database } from "../../config/firebase";
import { useEffect, useState } from "react";
import Post from "./post";
import { useAuthState } from "react-firebase-hooks/auth";
import { Link } from "react-router-dom";


const Main = () => {
    const [user] = useAuthState(auth);

    const [posts, setPosts] = useState(null);
    
    const postRef = collection(database,"posts");

    const getPosts = async () => {

        try{
        const data = await getDocs(postRef);

        await setPosts(data.docs.map((doc) => ({...doc.data(), id: doc.id})));
        } catch(err){
            console.log(err.message);
        }
    };

    useEffect(() => {
        getPosts();
    },[]);



    if(!user){
        return <div className=" text-center h-[87vh] w-full text-white font-extrabold flex justify-center items-center text-3xl"> 
        <Link to={"/login"} className="underline">Please Login</Link>...</div>
        
    } else if(posts===null){
        return <div className=" text-center h-[87vh] w-full text-white font-extrabold flex justify-center items-center text-3xl">Loading...</div>
    }else return ( 
        
        <div className="w-full flex items-center justify-center">

            <div className="flex flex-col gap-4 p-8">
            { posts?.map((post) => 
                <Post title={post.title} body={post.body} username={post.username} id={post.id}/>
            )

            }
            </div>

        </div>
     );
}
 
export default Main;