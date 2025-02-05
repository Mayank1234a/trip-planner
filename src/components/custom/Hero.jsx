import { Button } from "../ui/button";
import { Link } from "react-router-dom";


const Hero = () => {
  return (
    <div className=" flex flex-col items-center mx-56 gap-9 mb-5">
      <h1 className="font-extrabold text-[50px] text-center mt-16 tracking-tight">
        <span className="text-[#F56551]">
          Discover Your Next Adventure With AI:
        </span>{" "}
        Personalized Itineraries at Your Fingertips
      </h1>
      <p className="text-xl text-semibold items-center text-gray-500">
        Your Personalized AI trip planner and travel curator, creating custom
        itineraries tailored to your intrests and budget.
      </p>
      <Link to="/create-trip">
        <Button className="text-lg">Get Started, It&apos;s Free</Button>
      </Link>
      <img src="tripplanner.png" className="-mt-35 h-[400px]" />
    </div>
  );
};

export default Hero;
