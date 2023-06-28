import Button from "../../../components/Button";
import Textfield from "../../../components/TextField";
import LawyerImage from "../../../assets/Lawyer.jpg";
import { useNavigate } from "react-router-dom";

const ClientSignUp = () => {

  const navigate = useNavigate();

  return (
    <div className="flex w-full h-full md:h-screen overflow-hidden">
      <section className="hidden md:flex w-1/2 bg-gradient-to-br from-blue-300 to-purple-300 justify-center items-center">
        <div className="w-3/4 h-4/6 bg-white bg-opacity-30 rounded p-10 ">
          <div className="space-y-2">
            <p className="text-white text-4xl font-bold">Connecting</p>
            <p className="text-white text-4xl font-bold">Justice,</p>
            <p className="text-white text-4xl font-bold">Empowering</p>
            <p className="text-[#14144c] text-5xl font-bold">You!</p>
          </div>
          <p className="text-white mt-12 text-base">
            Legal Solutions Made Simple: Connect, Consult, Resolve{" "}
          </p>
        </div>
      </section>
      <section className="w-full overflow-y-auto h-full md:w-1/2 shadow-xl flex flex-col items-center px-20 pt-5">
        <img src={LawyerImage} className="w-36 h-36" />
        <div className="mt-12 space-y-5 flex flex-col mb-10">
          <div>
            <p className="font-extrabold text-xl">Hey, hello 👋</p>
            <p className="font-extralight text-sm">
              Enter the information to start your journey!
            </p>
          </div>
          <Textfield id="name" label="Name" name="name" type="name" />
          <Textfield
            id="email"
            label="Email Address"
            name="email"
            type="email"
          />
          <Textfield
            id="phoneNumber"
            label="Phone Number"
            name="phoneNumber"
            type="tel"
          />
          <Textfield
            id="password"
            label="Password"
            name="password"
            type="password"
          />
          <Textfield
            id="password1"
            label="Confirm Password"
            name="confirmPassword"
            type="password"
          />
          <Button text="Sign up" />
          <p className="text-xs cursor-pointer self-end" onClick={() => {
            navigate("/client/signup")
          }}>
            Have an account? Login!
          </p>
        </div>
      </section>
    </div>
  );
};

export default ClientSignUp;
