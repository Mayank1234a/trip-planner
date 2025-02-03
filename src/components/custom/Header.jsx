import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { MdLogout } from "react-icons/md";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { googleLogout, useGoogleLogin } from "@react-oauth/google";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
} from "@/components/ui/dialog"

import { FcGoogle } from "react-icons/fc";
import axios from "axios";

const Header = () => {
    const [openDialog, setOpenDialog] = useState(false);
  const user = JSON.parse(localStorage.getItem("user"));
  useEffect(() => {
    console.log(user);
  }, []);
  const login = useGoogleLogin({
    onSuccess: (codeResponse) => getUserProfile(codeResponse),
    onError: (error) => console.log("Login Failed:", error),
  })

  const getUserProfile = (tokenInfo) => {
    axios.get(`https://www.googleapis.com/oauth2/v2/userinfo?access_token=${tokenInfo?.access_token}`,{
      headers: {
        Authorization: `Bearer ${tokenInfo?.access_token}`,
        Accept: "application/json"
      }
    }).then((res) => {
      localStorage.setItem("user", JSON.stringify(res.data));
      setOpenDialog(false);
      window.location.reload();
  })
  };
  return (
    <div className="p-2 shadow-sm flex justify-between items-center px-5">
      <img src="/logo.svg" alt="Logo" />
      <div>
        {user ? (
          <div className="flex gap-2 items-center">
            <a href="/create-trip">
            <Button variant="outline" className="rounded-full text-black">
              + Create Trip
            </Button>
            </a>
            <a href="/my-trip">
            <Button variant="outline" className="rounded-full text-black">
              My Trips
            </Button>
            </a>
            <Popover>
              <PopoverTrigger className="bg-white">
                <img  src={user.picture} className="w-8 h-8 rounded-full" />
              </PopoverTrigger>
              <PopoverContent className="flex items-center justify-between cursor-pointer">
                <h2 onClick={()=>{
                  googleLogout();
                  localStorage.clear();
                  window.location.reload();
                }} className="text-lg font-semibold cursor-pointer">LogOut</h2>
                <MdLogout size={20} />
              </PopoverContent>
            </Popover>
          </div>
        ) : (
          <Button onClick={() => setOpenDialog(true)} className="text-lg">Sign In</Button>
        )}
      </div>
      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogDescription>
              <img src="/logo.svg" alt="Logo" />
              <h2 className="font-bold text-lg mt-7">Sign In With Google</h2>
              <p>Sign In to the App with Google Authentication securly</p>
              <Button onClick={login} className ="w-full mt-5 flex gap-4 items-center">
               <FcGoogle className="h-7 w-7" onClick={login}/>Sign In with Google</Button>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Header;
