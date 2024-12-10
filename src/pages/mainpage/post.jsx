
import { collection, addDoc, query, where, getDocs, deleteDoc, doc } from "firebase/firestore";
import { FaHeart } from "react-icons/fa";
import { auth, database } from "../../config/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useEffect, useState } from "react";

const Post = ({title, body, username, id}) => {

    const [user] = useAuthState(auth);

    const likesRef = collection(database, "likes");

    const likesDoc = query(likesRef, where("postId", "==", id));

    const [likes, setLikes] = useState(null);

    const userLiked = likes?.find((like) => like.id === user?.uid );

    const getLikes = async () => {
        const data = await getDocs(likesDoc);
        setLikes(data.docs.map((doc)=> ({
            id: doc.data().id,
        })));
    };

    const addLike = async () => {
        try{
            await addDoc(likesRef, {
                id: user?.uid,
                postId: id,
            });
            getLikes();
        } catch(err) {console.log(err)}
    };

    useEffect(() => {
        getLikes();
    },[]);

    const deleteLike = async () => {
        try{
        const unlikeQuery= query(likesRef, 
            where("postId", "==", id),
            where("id", "==", user?.uid)
        );
        const unlikeData = await getDocs(unlikeQuery);
        const unlike = doc(database, "likes", unlikeData.docs[0].id);
        await deleteDoc(unlike);
        getLikes();
        } catch(err){
            console.log(err);
        }    
    };

    return ( 
        <div className="max-w-[460px] flex flex-col bg-yellow-200 min-h-[200px] rounded-lg border-2 border-rose-900 shadow-2xl p-4">
            <div className="font-bold">
                @{username}
            </div>
            
            <div className="font-semibold ">
                {title}
                <div className="h-[1.5px] mt-1 w-full bg-red-600"></div>
            </div>

            <div className="mt-1 flex-grow">{body}</div>

            <div className="flex items-center gap-2 relative bottom-0">
                {userLiked ? <button onClick={deleteLike} className="text-2xl top-[1.5px] relative text-red-600 animate-likeAnimation"><FaHeart/></button> :
                <button onClick={addLike} className="text-2xl top-[1.5px] relative text-gray-500"><FaHeart/></button>}
                {likes?.length>0 && <div className="text-xl font-semibold">{likes.length}</div>}
            </div>
            
            
        </div> 
    );
}
 
export default Post;