import { useState } from "react";
import Modal from "react-responsive-modal";
import OutlinedButton from "../OutlinedButton";
import Button from "../Button";
import { useNavigate } from "react-router-dom";
import { completeAppointmentForClient } from "../../api/appointment/appointmentApi";
import { showErrorMessage, showSuccessMessage } from "../Toast";

interface CompleteAppointmentModalProps {
  open: boolean;
  onClose: () => void;
  appointmentId?: number;
}

function CompleteAppointmentModalForClient(
  props: CompleteAppointmentModalProps
) {
  const navigate = useNavigate();
  const [loading, setLoading] = useState<boolean>(false);

  const completeAppointment = async () => {
    if (!props.appointmentId) return;
    try {
      setLoading(true);
      const response = await completeAppointmentForClient(props.appointmentId);
      showSuccessMessage(response.data.response);
      navigate("/client/home");
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
      <p className="font-semibold mt-10">
        Are you sure you want to complete this appointment?
      </p>
      <div className="flex mt-10 space-x-5">
        <OutlinedButton
          text="Cancel"
          className="w-fit"
          onClick={() => {
            props.onClose();
          }}
        />
        <Button
          text="Complete"
          className="w-fit"
          loading={loading}
          onClick={completeAppointment}
        />
      </div>
    </Modal>
  );
}

export default CompleteAppointmentModalForClient;
