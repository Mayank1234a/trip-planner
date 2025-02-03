import { Button } from "@/components/ui/button";
import { getPlaceDetails, PHOTO_REF_URL } from "@/sevices/GlobalApi";
import { useEffect, useState } from "react";
import { IoIosSend } from "react-icons/io";



const InfoSelection = ({ tripData }) => {

    const [photoUrl, setPhotoUrl] = useState();

    useEffect(() => {
     tripData && getPlacePhoto();
    }, [tripData])
  const getPlacePhoto = async () => {
    const data = {
      textQuery: tripData?.userSelection?.location?.label,
    };
    const result = await getPlaceDetails(data).then(res => {

    const photoUrl = PHOTO_REF_URL.replace("{NAME}", res.data.places[0].photos[5].name);
    setPhotoUrl(photoUrl);
  });
  };
  return (
    <div>
      <img
        src={photoUrl}
        className="w-full h-[340px] object-fill rounded-xl"
      />
      <div className="flex justify-between items-center">
        <div className="my-5 flex flex-col gap-2">
          <h2 className="font-bold text-2xl">
            {tripData?.userSelection?.location?.label}
          </h2>
          <div className="flex gap-5">
            <h2 className="p-1 px-3 rounded-full bg-gray-200 text-gray-500 text-xs md:text-md">
              📆 {tripData?.userSelection?.days} Day
            </h2>
            <h2 className="p-1 px-3 rounded-full bg-gray-200 text-gray-500 text-xs md:text-md">
              💵 {tripData?.userSelection?.budget} Budget
            </h2>
            <h2 className="p-1 px-3 rounded-full bg-gray-200 text-gray-500 text-xs md:text-md">
              🥂 No. of Travelers: {tripData?.userSelection?.travelers}
            </h2>
          </div>
        </div>
        <Button>
          <IoIosSend />
        </Button>
      </div>
    </div>
  );
};

export default InfoSelection;
