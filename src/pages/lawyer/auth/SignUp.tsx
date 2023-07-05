import Button from "../../../components/Button";
import TextField from "../../../components/TextField";
import LawyerImage from "../../../assets/Lawyer.png";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import {
  setLawyer,
  setLawyerAuthToken
} from "../../../constants/LocalStorage";
import { lawyerSignUp } from "../../../api/lawyer/lawyerAuthApi";
import Select from "../../../components/Select";
import { LaywerTypes } from "../../../constants/AppConstants";

type SignUpFormValues = {
  name: string;
  emailAddress: string;
  phoneNumber: string;
  password: string;
  address: string;
  confirmPassword?: string;
  qualification: string;
  type: string;
};

const LawyerSignUp = () => {
  const navigate = useNavigate()
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<SignUpFormValues>();

  const password = watch("password");

  const onSignUp = async (data: SignUpFormValues) => {
    delete data.confirmPassword;
    const response = await lawyerSignUp(data);
    if (!response.data) return console.log("Error");
    setLawyer(response.data.lawyer);
    setLawyerAuthToken(response.data.authToken);
    navigate("/lawyer/home");
  };

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
      <section className="w-full overflow-y-auto h-full md:w-1/2 shadow-xl flex flex-col items-center px-20 pt-5 bg-white">
        <img src={LawyerImage} className="w-36 h-36" />
        <div className="mt-12 mb-10 flex flex-col space-y-3">
          <div>
            <p className="font-extrabold text-xl">Hey, hello 👋</p>
            <p className="font-extralight text-sm">
              Enter the information to start your journey!
            </p>
          </div>
          <form
            className="flex flex-col space-y-5"
            onSubmit={handleSubmit(onSignUp)}
          >
            <TextField
              register={register}
              name="name"
              id="name"
              label="Name"
              type="text"
              errors={errors}
              validationSchema={{
                required: {
                  value: true,
                  message: "Name is required!",
                },
              }}
            />
            <TextField
              name="emailAddress"
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
              id="email"
              label="Email Address"
              type="email"
            />
            <TextField
              name="phoneNumber"
              register={register}
              errors={errors}
              validationSchema={{
                required: {
                  value: true,
                  message: "Phone number is required!",
                },
                minLength: {
                  value: 10,
                  message: "Invalid phone number!",
                },
                maxLength: {
                  value: 10,
                  message: "Invalid phone number!",
                },
              }}
              id="phoneNumber"
              label="Phone Number"
              type="tel"
            />
            <TextField
              name="address"
              register={register}
              errors={errors}
              validationSchema={{
                required: {
                  value: true,
                  message: "Address is Required!",
                },
              }}
              id="address"
              label="Address"
            />
            <TextField
              name="qualification"
              register={register}
              errors={errors}
              validationSchema={{
                required: {
                  value: true,
                  message: "Qualification is Required!",
                },
              }}
              id="qualification"
              label="Qualification"
            />
            <Select
              id="type"
              name="type"
              label="Select a type"
              options={[
                {
                  label: "Criminal",
                  value: LaywerTypes.CRIMINAL,
                },
                {
                  label: "Civil",
                  value: LaywerTypes.CIVIL,
                },
                {
                  label: "Corporate",
                  value: LaywerTypes.CORPORATE,
                },
              ]}
              register={register}
              validationSchema={{
                required: {
                  value: true,
                  message: "Type field is required!",
                },
              }}
            />
            <TextField
              name="password"
              register={register}
              errors={errors}
              validationSchema={{
                required: {
                  value: true,
                  message: "Password is required!",
                },
              }}
              id="password"
              label="Password"
              type="password"
            />
            <TextField
              name="confirmPassword"
              register={register}
              errors={errors}
              validationSchema={{
                required: {
                  value: true,
                  message: "Confirm password is required!",
                },
                validate: (value) =>
                  value === password || "Passwords must match!",
              }}
              id="confirmPassword"
              label="Confirm Password"
              type="password"
            />
            <Button text="Sign up" />
          </form>
          <p
            className="text-xs cursor-pointer self-end"
            onClick={() => {
              navigate("/lawyer/login");
            }}
          >
            Have an account? Login!
          </p>
        </div>
      </section>
    </div>
  );
};

export default LawyerSignUp;
