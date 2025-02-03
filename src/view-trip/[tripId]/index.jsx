import { db } from "@/sevices/firebaseConfig";
import { doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "sonner";
import InfoSelection from "../components/InfoSelection";
import Hotels from "../components/Hotels";
import PlaceToVisit from "../components/PlaceToVisit";
import Footer from "../components/Footer";


function Viewtrip() {

    const { tripId } = useParams();
    const [tripData, setTripData] = useState([]);

    useEffect(() => {
        tripId && getTripData();
    }, [tripId]);
    const getTripData = async () => {
        const docRef = doc(db, "AiTrips", tripId);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            setTripData(docSnap.data());
        } else {
            // doc.data() will be undefined in this case
            toast("No Trip Found!");
        }
    }

  return (
    <div className="p-10 md:px-20 lg:px-44 xl:px-56">
        {/* Info Selection */}
        <InfoSelection tripData={tripData} />
        {/* Hotels */}
        <Hotels tripData={tripData} />
        {/* Place To Visit */}
        <PlaceToVisit tripData= {tripData}/>
        {/* Footer */}
        <Footer/>
    </div>
  )
}

export default Viewtrip;