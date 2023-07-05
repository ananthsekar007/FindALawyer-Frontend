import React, { useState } from "react";

interface StarRatingProps {
  initialRating: number;
  onChange: (rating: number) => void;
  isEditable: boolean;
}

const StarRating: React.FC<StarRatingProps> = ({
  initialRating,
  onChange,
  isEditable,
}) => {
  const [rating, setRating] = useState(initialRating);

  const handleRatingChange = (newRating: number) => {
    setRating(newRating);
    onChange(newRating);
  };

  return (
    <div className="flex items-center">
      {[...Array(5)].map((_, index) => {
        const starValue = index + 1;
        return (
          <svg
            key={index}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill={starValue <= rating ? "#feb400" : "lightgrey"}
            className="w-6 h-6 cursor-pointer"
            onClick={() => isEditable && handleRatingChange(starValue)}
          >
            <path
              fillRule="evenodd"
              d="M9.86 1.079l2.614 5.298 5.84.85a.999.999 0 0 1 .552 1.703l-4.223 4.116.996 5.814c.051.296-.041.598-.26.818-.217.22-.52.337-.823.283l-5.212-1.883-5.212 1.883c-.296.054-.606-.062-.823-.283-.218-.22-.312-.522-.26-.818l.996-5.814-4.223-4.116a.999.999 0 0 1 .552-1.703l5.84-.85 2.614-5.298c.218-.44.94-.44 1.157 0z"
            />
          </svg>
        );
      })}
    </div>
  );
};

export default StarRating;
