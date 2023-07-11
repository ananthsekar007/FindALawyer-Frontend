import { listAllLawyers } from "../../api/lawyer/lawyerApi";
import ClientLayout from "../../components/client/ClientLayout";
import LawyerCard from "../../components/lawyer/LawyerCard";
import { useState, useEffect } from "react";
import { LawyerWithRating } from "../../types/Lawyer";
import ViewLawyerModal from "../../components/lawyer/ViewLawyerModal";
import BookAppointmentModal from "../../components/appointment/BookAppointmentModal";
import Loader from "../../components/Loader";

const ClientLawyersPage = () => {
  const [lawyers, setLawyers] = useState<LawyerWithRating[]>([]);
  const [selectedLawyer, setSelectedLawyer] = useState<LawyerWithRating>();
  const [viewModalOpen, setViewModalOpen] = useState<boolean>(false);
  const [bookModalOpen, setBookModalOpen] = useState<boolean>(false);
  const [selectedLawyerId, setSelectedLawyerId] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);

  const getAllLawyers = async () => {
    try {
      setLoading(true);
      const response = await listAllLawyers();
      setLawyers(response.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const onHireLawyer = (lawyerId: number) => {
    setSelectedLawyerId(lawyerId);
    setBookModalOpen(true);
  };

  const onViewLawyer = (lawyer: LawyerWithRating) => {
    setSelectedLawyer(lawyer);
    setViewModalOpen(true);
  };

  useEffect(() => {
    getAllLawyers();
  }, []);

  return (
    <ClientLayout>
      {loading && <Loader />}
      <div className="grid gap-10 mt-10 md:grid-cols-2 lg:grid-cols-3">
        {lawyers.map((lawyer, index) => (
          <LawyerCard
            lawyerId={lawyer.lawyerId}
            lawyerLocation={lawyer.address}
            lawyerName={lawyer.name}
            qualification={lawyer.qualification}
            reviews={lawyer.feedbacks.length}
            starRating={lawyer.averageRating}
            key={index}
            lawyer={lawyer}
            onHireClick={onHireLawyer}
            onViewClick={onViewLawyer}
          />
        ))}
      </div>
      <ViewLawyerModal
        open={viewModalOpen}
        onClose={() => {
          setViewModalOpen(false);
        }}
        selectedLawyer={selectedLawyer}
      />
      <BookAppointmentModal
        open={bookModalOpen}
        lawyerId={selectedLawyerId}
        onClose={() => {
          setBookModalOpen(false);
        }}
      />
    </ClientLayout>
  );
};

export default ClientLawyersPage;
