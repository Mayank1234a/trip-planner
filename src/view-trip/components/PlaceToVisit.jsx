import PlaceCardItem from "./PlaceCardItem";

const PlaceToVisit = ({ tripData }) => {
  return (
    <div>
      <h2 className="font-bold text-lg my-2">Places To Visit</h2>
      <div>
        {tripData?.tripData?.itinerary?.map((place, index) => (
          <div key={index}>
            <h2 className="font-medium text-lg">Day {place.day}</h2>
            <div className="grid md:grid-cols-2 gap-5">
              {place.activities.map((activity, index) => (
                <div key={index} className="my-1">
                  <h2 className="font-medium text-sm text-orange-500">
                    {activity.bestTimeToVisit}
                  </h2>
                  <PlaceCardItem activity={activity} />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PlaceToVisit;
