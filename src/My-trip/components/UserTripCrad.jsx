import { getPlaceDetails, PHOTO_REF_URL } from "@/services/GlobalApi";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";


const UserTripCrad = ({trip}) => {
    const [photoUrl, setPhotoUrl] = useState();
    
        useEffect(() => {
         trip && getPlacePhoto();
        }, [trip])
      const getPlacePhoto = async () => {
        const data = {
          textQuery: trip?.userSelection?.location?.label,
        };
        const result = await getPlaceDetails(data).then(res => {
    
        const photoUrl = PHOTO_REF_URL.replace("{NAME}", res.data.places[0].photos[5].name);
        setPhotoUrl(photoUrl);
      });
      };
  return (
    <Link to={"/view-trip/"+trip?.id}>
    <div className="hover:scale-105 transition-all corsur-pointer">
        <img src={photoUrl} alt="" className="object-cantain w-full h-[300px] rounded-xl" />
        <div>
            <h2 className="font-bold text-lg text-black">
                {
                    trip?.userSelection?.location.label
                }
            </h2>
            <h2 className="text-sm text-gray-500">{trip?.userSelection?.days} Days Trip With {trip?.userSelection?.budget} Budget</h2>
        </div>
    </div>
    </Link>
  )
}

export default UserTripCrad