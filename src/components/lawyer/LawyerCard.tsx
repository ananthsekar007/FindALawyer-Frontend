import StarRating from "../StarRating";
import LawyerProfile from "../../assets/LawyerProfile.jpg";
import OutlinedButton from "../OutlinedButton";
import Button from "../Button";

export interface LawyerCardProps {
    lawyerName: string;
    qualification: string;
    starRating: number;
    reviews: number;
    lawyerId: number;
    lawyerLocation: string;
}

const LawyerCard = ({lawyerLocation, lawyerName, qualification, reviews, starRating, ...rest}: LawyerCardProps) => {
  return (
    <div className="bg-white rounded p-10 px-20 flex flex-col items-center shadow hover:shadow-lg">
      <img src={LawyerProfile} className="w-24 h-24 rounded-3xl" />
      <p className="mt-2 font-bold text-lg">{lawyerName}</p>
      <p className="text-slate-500 text-xs">{qualification}</p>
      <div className="flex items-center gap-3 mt-5">
        <StarRating
          initialRating={starRating}
          onChange={(rating) => {
            console.log({ rating });
          }}
          isEditable={false}
        />
        <div className="w-px h-8 bg-slate-300" />
        <p className="text-slate-400 text-sm">{reviews} reviews</p>
      </div>
      <div className="flex gap-3 w-56 mt-5">
        <OutlinedButton text="View Profile" className="w-56" />
        <Button text="Hire!" className="w-32" />
      </div>
      <p className="mt-5 font-bold text-slate-400">{lawyerLocation}</p>
    </div>
  );
};

export default LawyerCard;