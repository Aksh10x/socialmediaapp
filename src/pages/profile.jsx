import { useAuthState } from "react-firebase-hooks/auth";
import Post from "./mainpage/post";
import { auth, database } from "../config/firebase";
import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { Link } from "react-router-dom";

const Profile = () => {
    const [user] = useAuthState(auth);

    const [posts, setPosts] = useState(null);

    const postsRef = collection(database, "posts");

    const getMyPosts = async () => {
        const data = await getDocs(postsRef);
        const allPosts = await data.docs.map((doc)=>({...doc.data(), pid: doc.id,}));
        const myPosts = await allPosts.filter((post) => post.id === user?.uid);
        await setPosts(myPosts);
    };

    useEffect(() => {
        if(user) getMyPosts();
    }, [user])



    if(!user){
        return <div className=" text-center h-[87vh] w-full text-white font-extrabold flex justify-center items-center text-3xl"> 
        <Link to={"/login"} className="underline">Please Login</Link>...</div>
        
    } else if(posts===null){
        return <div className=" text-center h-[87vh] w-full text-white font-extrabold flex justify-center items-center text-3xl">Loading...</div>
    }else return ( 
        <>
        <div className="font-extrabold flex text-white text-3xl mt-8 items-center justify-center w-full">My Posts</div>
        <div className="w-full flex flex-col items-center justify-center">
            
            <div className="flex flex-col gap-4 p-8">
            { posts?.map((post) => 
                <Post title={post.title} body={post.body} username={post.username} id={post.pid}/>
            )
            }
            </div>

        </div>
        </>
     );
}
 
export default Profile;