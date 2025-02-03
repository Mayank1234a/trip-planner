import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ImLocation } from "react-icons/im";
import { useEffect, useState } from "react";
import { getPlaceDetails, PHOTO_REF_URL } from "@/sevices/GlobalApi";

const PlaceCardItem = ({ activity }) => {
  const [photoUrl, setPhotoUrl] = useState();
  
      useEffect(() => {
           activity && getPlacePhoto();
          }, [activity]);
        const getPlacePhoto = async () => {
          const data = {
            textQuery: activity.placeName,
          };
          const result = await getPlaceDetails(data).then(res => {
      
          const photoUrl = PHOTO_REF_URL.replace("{NAME}", res.data.places[0].photos[5].name);
          setPhotoUrl(photoUrl);
        });
        };
  return (
    <Link to={
        "https://www.google.com/maps/search/?api=1&query="+activity?.placeName}
        target="_blank">
      <div className="border rounded-xl p-3 mt-2 flex gap-5 hover:scale-105 transition-all hover:shadow-md corsur-pointer">
        <img
          className="w-[130px] h-[130px] rounded-xl object-fill"
          src={photoUrl}
        />
        <div>
          <h2 className="font-bold text-lg text-black">{activity.placeName}</h2>
          <p className="text-gray-400 text-sm">{activity.placeDetails}</p>
          <h2 className="my-2 text-sm text-black">🕧 {activity.timeTravel}</h2>
          <Button size="sm"><ImLocation/></Button>
        </div>
      </div>
    </Link>
  );
};

export default PlaceCardItem;
