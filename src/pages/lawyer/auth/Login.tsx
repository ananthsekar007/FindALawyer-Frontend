import Button from "../../../components/Button";
import TextField from "../../../components/TextField";
import LawyerImage from "../../../assets/Lawyer.png";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { UserLoginType } from "../../../types/UserAuthTypes";
import { setLawyer, setLawyerAuthToken } from "../../../constants/LocalStorage";
import { lawyerLogin } from "../../../api/lawyer/lawyerAuthApi";

const LawyerLogin = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UserLoginType>();

  const onLogin = async (data: UserLoginType) => {
    try {
      const response = await lawyerLogin(data);
      if(!response.data) return console.log("Error");
      setLawyer(response.data.lawyer);
      setLawyerAuthToken(response.data.authToken);
      navigate("/");
    }
    catch(err) {
      console.error(err);
    }
  }

  return (
    <div className="flex w-full h-full md:h-screen">
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
      <section className="w-full h-full md:w-1/2 shadow-xl flex flex-col items-center px-20 pt-5">
        <img src={LawyerImage} className="w-36 h-36" />
        <div className="mt-12 space-y-5 flex flex-col">
          <div>
            <p className="font-extrabold text-xl font-[Mukta]">Hey, hello 👋</p>
            <p className="font-extralight text-sm">
              Enter the information you entered while registering!
            </p>
          </div>
          <form onSubmit={handleSubmit(onLogin)} className="space-y-5">
            <TextField
              id="email"
              label="Email Address"
              name="email"
              type="email"
              register={register}
              errors={errors}
              validationSchema={{
                required: {
                  value: true,
                  message: "Email is required!",
                },
                pattern: {
                  value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/i,
                  message: "Email is not valid!",
                },
              }}
            />
            <TextField
              id="password"
              label="Password"
              name="password"
              type="password"
              errors={errors}
              register={register}
              validationSchema={{
                required: {
                  value: true,
                  message: "Password is required!",
                },
              }}
            />
            <Button type="submit" text="Login" />
          </form>
          <p
            className="text-xs cursor-pointer self-end"
            onClick={() => {
              navigate("/lawyer/signup");
            }}
          >
            Don't have an account? Sign up!
          </p>
        </div>
      </section>
    </div>
  );
};

export default LawyerLogin;
