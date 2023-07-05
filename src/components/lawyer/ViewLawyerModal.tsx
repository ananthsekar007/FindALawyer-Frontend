import { LawyerWithRating } from "../../types/Lawyer";
import { Modal } from "react-responsive-modal";
import LawyerProfile from "../../assets/LawyerProfile.jpg";
import StarRating from "../StarRating";

interface ViewLawyerModalProps {
  open: boolean;
  onClose: () => void;
  selectedLawyer?: LawyerWithRating;
}

const ViewLawyerModal = ({
  open,
  onClose,
  selectedLawyer,
  ...rest
}: ViewLawyerModalProps) => {
  return (
    <Modal
      open={open}
      onClose={onClose}
      center
      classNames={{
        modal: "w-5/6",
      }}
    >
      <p className="font-bold text-xl">Profile</p>
      <div className="w-full flex flex-col items-center mt-5">
        <img src={LawyerProfile} className="w-20 h-20 rounded-3xl" />
        <p className="mt-2 font-bold text-lg">{selectedLawyer?.name}</p>
        <div className="flex gap-x-2 mt-2">
          <p className="text-slate-500 text-xs">
            {selectedLawyer?.qualification}
          </p>
          <div className="w-px h-5 bg-slate-300" />
          <p className="text-slate-500 text-xs">{selectedLawyer?.type} Lawyer</p>
        </div>
        <p className="font-semibold font-lg mt-3">Contacts</p>
        <div className="flex flex-col gap-y-2 text-sm mt-1">
          <p>
            <i className="fa-solid fa-envelope" />
            {"     "}
            {selectedLawyer?.emailAddress}
          </p>
          <p>
            <i className="fa-solid fa-phone" /> {"     "}
            {selectedLawyer?.phoneNumber}
          </p>
          <p>
            <i className="fa-solid fa-address-card" />
            {"     "}
            {selectedLawyer?.address}
          </p>
        </div>
        <div className="mt-5">
        <StarRating isEditable={false}  initialRating={selectedLawyer?.averageRating} />
        </div>
        <div id="ratings" className="h-32 bg-slate-100 w-full mt-5 p-6 overflow-auto">
            {
                selectedLawyer?.feedbacks.map((feedback, index) => (
                    <div>
                        <div className="flex space-x-3">
                        <p className="font-semibold">{feedback.client.name}</p>
                        <StarRating isEditable={false} className={"w-3 h-3"} initialRating={feedback.rating} />
                        </div>
                        <p className="ml-10 font-sans text-sm my-2">{feedback.remarks}</p>
                        <div className="h-px w-full bg-slate-300" />
                    </div>
                ))
            }
        </div>
      </div>
    </Modal>
  );
};

export default ViewLawyerModal;
