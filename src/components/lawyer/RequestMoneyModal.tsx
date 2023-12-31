import { useState } from "react";
import Modal from "react-responsive-modal";
import TextField from "../TextField";
import { useForm } from "react-hook-form";
import Button from "../Button";
import { requestPayment } from "../../api/payments/paymentsApi";
import { showErrorMessage, showSuccessMessage } from "../Toast";

interface RequestMoneyModalProps {
  appointmentId?: number;
  onSuccess: () => void;
  open: boolean;
  onClose: () => void;
}

type RequestPaymentData = {
  amount: number;
};

function RequestMoneyModal(props: RequestMoneyModalProps) {
  const [loading, setLoading] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RequestPaymentData>();

  const onSubmit = async (data: RequestPaymentData) => {
    try {
      if (!props.appointmentId) return;
      setLoading(true);
      const response = await requestPayment(props.appointmentId, data.amount);
      showSuccessMessage(response.data.response);
      props.onSuccess();
    } catch (error: any) {
      if (error.response) {
        showErrorMessage(error.response.data);
      } else {
        console.log("Non-Axios Error:", error);
      }
    } finally {
      setLoading(false);
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
      <p className="font-semibold text-lg">Request Money</p>
      <form onSubmit={handleSubmit(onSubmit)} className="mt-10 space-y-5">
        <TextField
          label="Enter the Amount"
          name="amount"
          type="number"
          id="caseDescription"
          register={register}
          errors={errors}
          validationSchema={{
            required: {
              value: true,
              message: "Amount is required!",
            },
          }}
        />
        <Button text="Request now!" type="submit" loading={loading} />
      </form>
    </Modal>
  );
}

export default RequestMoneyModal;
