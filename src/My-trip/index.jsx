import { db } from "@/services/firebaseConfig";
import { collection, getDocs, query, where } from "firebase/firestore";
import { useEffect, useState } from "react"
import { useNavigation } from "react-router-dom";
import UserTripCrad from "./components/UserTripCrad";


const Mytrip = () => {
    const navigation = useNavigation();
    const [userTripData, setUserTripData] = useState([]);
    useEffect(() => {
        getUserTrip();
    }, [])

    const getUserTrip = async () => {
        const user = JSON.parse(localStorage.getItem("user"));
        if(!user) {
            navigation("/");
            return;
        }
        const q = query(collection(db, "AiTrips"), where("userEmail", "==", user?.email));
        const querySnapshot = await getDocs(q);
        setUserTripData([]);
        querySnapshot.forEach((doc) => {

            setUserTripData(prevVel=> [...prevVel, doc.data()]);
        })
    }
  return (
    <div className="sm:px-10 md:px-32 lg:px-56 xl:px-10 px-5 mt-10">
        <h2 className="font-bold text-3xl">My Trips</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-5 mt-10">
            {userTripData?.length > 0 ? userTripData.map((trip, index) =>(
                <UserTripCrad key={index} trip = {trip} />
            )) 
            :
            [1,2,3,4,5,6].map((item, index) =>(
                <div key={index} className="w-full h-[300px] bg-slate-200 animate-pulse rounded-xl">
                </div>
            ))
            }
        </div>
    </div>
  )
}

export default Mytrip