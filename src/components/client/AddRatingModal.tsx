import Modal from "react-responsive-modal";
import StarRating from "../StarRating";
import { useState } from "react";
import TextField from "../TextField";
import { useForm } from "react-hook-form";
import Button from "../Button";
import { RateLawyersBody, rateLawyers } from "../../api/lawyer/lawyerApi";
import { AxiosError } from "axios";
import { showErrorMessage, showSuccessMessage } from "../Toast";

interface AddRatingModalProps {
  open: boolean;
  onClose: () => void;
  lawyerId?: number;
  clientId?: number;
}

interface StarRatingData {
  remarks: string;
}

function AddRatingModal(props: AddRatingModalProps) {
  const [rating, setRating] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<StarRatingData>();

  const onSubmit = async (data: StarRatingData) => {
    if (!props.lawyerId && !props.clientId) return;
    const body: RateLawyersBody = {
      clientId: Number(props.clientId),
      lawyerId: Number(props.lawyerId),
      ratingValue: rating,
      remarks: data.remarks,
    };
    try {
      setLoading(true);
      const response = await rateLawyers(body);
      showSuccessMessage(response.data.response);
    } catch (error: any) {
      if (error.response) {
        showErrorMessage(error.response.data);
      } else {
        console.log("Non-Axios Error:", error);
      }
    } finally {
      setLoading(false);
      props.onClose();
    }
  };

  return (
    <Modal
      open={props.open}
      onClose={props.onClose}
      center
      classNames={{
        modal: "w-3/6",
      }}
    >
      <p className="font-semibold text-lg">Rate the lawyer</p>
      <StarRating
        isEditable
        initialRating={0}
        onChange={(rating) => {
          setRating(rating);
        }}
      />
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextField
          label="Give Remarks"
          name="remarks"
          type="text"
          multiline
          id="remarks"
          register={register}
          errors={errors}
          validationSchema={{
            required: {
              value: true,
              message: "Remarks is required!",
            },
          }}
        />
        <Button text="Review" type="submit" loading={loading} />
      </form>
    </Modal>
  );
}

export default AddRatingModal;
