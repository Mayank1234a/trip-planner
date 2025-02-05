import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  AI_PROMPT,
  SelectBudgetOptions,
  SelectTravelesList,
} from "@/constants/options";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
} from "@/components/ui/dialog";

import { chatSession } from "@/services/AIModal";
import { useEffect, useState } from "react";
import GooglePlacesAutocomplete from "react-google-places-autocomplete";
import { toast } from "sonner";
import { FcGoogle } from "react-icons/fc";
import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { doc, setDoc } from "firebase/firestore";
import { db } from "@/services/firebaseconfig";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { firebaseConfig } from "@/services/firebaseconfig";

export const CreateTrip = () => {
  const [place, setPlace] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [formData, setFormData] = useState([]);
  const [loading , setLoading] = useState(false);

  const navigate = useNavigate();

  const handelInputChange = (name, value) => {
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  useEffect(() => {
  }, [formData]);

  
  const login = useGoogleLogin({
    onSuccess: (codeResponse) => getUserProfile(codeResponse),
    onError: (error) => console.log("Login Failed:", error),
  })
  const onGenerateTrip = async () => {
    const user = localStorage.getItem("user");
    if (!user) {
      setOpenDialog(true);
      return;
    }
    if (
      (formData?.days > 7 && !formData?.location) ||
      !formData?.budget ||
      !formData?.travelers
    ) {
      toast("Please fill all the fields");
      return;
    }
    setLoading(true);
    const FINAL_PROMPT = AI_PROMPT.replace(
      "{location}",
      formData?.location.label
    )
      .replace("{totalDays}", formData?.days)
      .replace("{traveler}", formData?.travelers)
      .replace("{budget}", formData?.budget)
      .replace("{totalDays}", formData?.days);
    
    const result = await chatSession.sendMessage(FINAL_PROMPT);
    
    setLoading(false);
    saveAiTrip(result?.response?.text());
  };
  
  const saveAiTrip = async (TripData) => {
    setLoading(true);
    const user = JSON.parse(localStorage.getItem("user"));
    const docId = Date.now().toString();
    await setDoc(doc(db, "AiTrips", docId), {
      userSelection : formData,
      tripData: JSON.parse(TripData),
      userEmail: user?.email,
      id: docId
    })  
    setLoading(false);
    navigate('/view-trip/' + docId);
  };
  
  const getUserProfile = (tokenInfo) => {
    axios.get(`https://www.googleapis.com/oauth2/v2/userinfo?access_token=${tokenInfo?.access_token}`,{
      headers: {
        Authorization: `Bearer ${tokenInfo?.access_token}`,
        Accept: "application/json"
      }
    }).then((res) => {
      localStorage.setItem("user", JSON.stringify(res.data));
      setOpenDialog(false);
      onGenerateTrip();
  })
  };

  return (
    <div className="sm:px-10 md:px-32 lg:px-56 xl:px-10 px-5 mt-10">
      <h2 className="font-bold text-3xl">
        Tell Us Your Travel Preferences 🗺️⁀જ✈︎
      </h2>
      <p className="text-gray-500 mt-3 text-xl">
        Just provide some basic information, and your trip planner will generate
        a customzed <br />
        itinerary based on your preferences
      </p>
      <div className="mt-14 flex flex-col gap-5">
        <div>
          <h2 className="text-xl my-3 font-medium">
            What is Destination of choice?
          </h2>
          <GooglePlacesAutocomplete
            apiKey={import.meta.env.VITE_GOOGLE_PLACE_API_KEY}
            selectProps={{
              value: place,
              onChange: (v) => {
                setPlace(v);
                handelInputChange("location", v);
              },
            }}
          />
        </div>
        <div>
          <h2 className="text-xl my-3 font-medium">
            How many days are you planning your trip?
          </h2>
          <Input
            placeholder="Ex.5"
            type="number"
            onChange={(e) => handelInputChange("days", e.target.value)}
          />
        </div>
      </div>
      <div>
        <h2 className="text-xl my-3 font-medium">What is your budget?</h2>
        <div className="grid grid-cols-3 gap-5 mt-5">
          {SelectBudgetOptions.map((item, index) => (
            <div
              key={index}
              onClick={() => handelInputChange("budget", item.title)}
              className={`cursor-pointer p-4 border rounded-lg hover:shadow-lg ${
                formData?.budget === item.title && "shadow-lg border-black"
              }`}
            >
              <h2 className="text-4xl">{item.icon}</h2>
              <h2 className="font-bold text-lg">{item.title}</h2>
              <h2 className="text-sm text-gray-500">{item.desc}</h2>
            </div>
          ))}
        </div>
      </div>
      <div>
        <h2 className="text-xl my-3 font-medium">
          Who do you plan on traveling with on your next adventure?
        </h2>
        <div className="grid grid-cols-3 gap-5 mt-5">
          {SelectTravelesList.map((item, index) => (
            <div
              key={index}
              onClick={() => handelInputChange("travelers", item.people)}
              className={`cursor-pointer p-4 border rounded-lg hover:shadow-lg ${
                formData?.travelers === item.people && "shadow-lg border-black"
              }`}
            >
              <h2 className="text-4xl">{item.icon}</h2>
              <h2 className="font-bold text-lg">{item.title}</h2>
              <h2 className="text-sm text-gray-500">{item.desc}</h2>
            </div>
          ))}
        </div>
      </div>
      <div className="my-10 justify-end flex ">
        <Button disabled={loading} className="text-lg" onClick={onGenerateTrip}>
          {loading ? <AiOutlineLoading3Quarters className="h-7 w-7 animate-spin" /> : "Generate Trip"}
        </Button>
      </div>
      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogDescription>
              <img src="/logo.svg" alt="Logo" />
              <h2 className="font-bold text-lg mt-7">Sign In With Google</h2>
              <p>Sign In to the App with Google Authentication securly</p>
              <Button onClick={login} className ="w-full mt-5 flex gap-4 items-center">
               <FcGoogle className="h-7 w-7" />Sign In with Google</Button>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
};
export default CreateTrip;
