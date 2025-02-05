import { getPlaceDetails, PHOTO_REF_URL } from "@/services/GlobalApi";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const HotelCardItem = ({ hotel }) => {

    const [photoUrl, setPhotoUrl] = useState();

    useEffect(() => {
         hotel && getPlacePhoto();
        }, [hotel]);
      const getPlacePhoto = async () => {
        const data = {
          textQuery: hotel?.hotelName,
        };
        const result = await getPlaceDetails(data).then(res => {
    
        const photoUrl = PHOTO_REF_URL.replace("{NAME}", res.data.places[0].photos[5].name);
        setPhotoUrl(photoUrl);
      });
      };

  return (
    <Link
     to={
        "https://www.google.com/maps/search/?api=1&query=" +
        hotel?.hotelName +
        "," +
        hotel?.hotelAddress
      }
      target="_blank"
    >
      <div
        className="hover:scale-105 transition-all corsur-pointer"
      >
        <img
          src={photoUrl}
          className="rounded-xl object-fill w-full h-[200px]"
        />
        <div className="my-2 flex flex-col gap-2">
          <h2 className="font-medium text-black">{hotel?.hotelName}</h2>
          <h2 className="text-gray-500 text-xs">📍 {hotel?.hotelAddress}</h2>
          <h2 className="text-sm font-semibold text-black">
            ₹ {hotel?.price.inr}
          </h2>
          <h2 className="text-sm font-semibold text-black">
            ⭐ {hotel?.rating} Stars
          </h2>
        </div>
      </div>
    </Link>
  );
};

export default HotelCardItem;
