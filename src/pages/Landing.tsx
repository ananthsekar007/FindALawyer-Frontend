import { NavLink, useNavigate } from "react-router-dom";
import ClientImage from "../assets/Client.png";
import LawyerImage from "../assets/Lawyer.png";
import Button from "../components/Button";

const Landing = () => {
  const navigate = useNavigate();

  return (
    <>
      <div className="-z-50 w-full h-full absolute bg-gradient-to-b from-purple-50  to-white"></div>
      <nav className="bg-transparent p-10"></nav>
      <div className="w-full flex flex-col space-y-10 items-center font-bold text-xl lg:text-4xl">
        <p>
          <span className="text-white bg-gradient-to-tr from-pink-400 to-orange-400 p-2 rounded-lg">
            Navigating
          </span>
          {"  "}
          Legal Waters,
        </p>
        <p>
          Protecting Your {"  "}
          <span className="text-white bg-gradient-to-tr from-pink-400 to-orange-400 p-2 rounded-lg">
            Interests!
          </span>
        </p>
      </div>
      <div className="flex mb-20 flex-col md:flex-row items-center space-y-5 md:justify-center md:space-x-20 md:space-y-0  mt-20">
        <div className="bg-white rounded-lg p-10 px-20 cursor-pointer shadow hover:shadow-lg text-center space-y-2">
          <p className="font-bold text-xl md:text-2xl text-transparent bg-clip-text bg-gradient-to-b from-blue-500 to-purple-500">
            Client
          </p>
          <img src={ClientImage} className="w-36 h-36 mix-blend-multiply" />
          <Button
            onClick={() => {
              navigate("/client/login");
            }}
            text="Start!"
          />
        </div>
        <div className="bg-white rounded-lg p-10 px-20 cursor-pointer shadow hover:shadow-lg text-center space-y-2">
          <p className="font-bold text-xl md:text-2xl text-transparent bg-clip-text bg-gradient-to-b from-blue-500 to-purple-500">
            Lawyer
          </p>
          <img src={LawyerImage} className="w-36 h-36 mix-blend-multiply" />
          <Button
            onClick={() => {
              navigate("/lawyer/login");
            }}
            text="Start!"
          />
        </div>
      </div>
    </>
  );
};

export default Landing;
