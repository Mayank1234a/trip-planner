import { Link } from "react-router-dom";
import HotelCardItem from "./HotelCardItem";

const Hotels = ({ tripData }) => {
  return (
    <div className="flex flex-col gap-5">
      <h2 className="font-bold text-xl mt-5">Hotel Recommendation</h2>
      <div className="grid grid-cols-2 md:grid-cols-2 xl:grid-cols-4 gap-5">
        {tripData?.tripData?.hotels?.map((hotel, index) => (
          <HotelCardItem key={index} hotel={hotel} />
        ))}
      </div>
      <hr />
    </div>
  );
};

export default Hotels;
