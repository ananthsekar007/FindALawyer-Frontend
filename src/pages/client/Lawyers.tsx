import { listAllLawyers } from "../../api/lawyer/lawyerApi";
import ClientLayout from "../../components/client/ClientLayout";
import LawyerCard from "../../components/lawyer/LawyerCard";
import { useState, useEffect } from "react";
import { LawyerWithRating } from "../../types/Lawyer";
import ViewLawyerModal from "../../components/lawyer/ViewLawyerModal";

const ClientLawyersPage = () => {
  const [lawyers, setLawyers] = useState<LawyerWithRating[]>([]);
  const [selectedLawyer, setSelectedLawyer] = useState<LawyerWithRating>();
  const [viewModalOpen, setViewModalOpen] = useState<boolean>(false);

  const getAllLawyers = async () => {
    try {
      const response = await listAllLawyers();
      if (!response.data) {
        console.log("Some error occured");
      }
      setLawyers(response.data);
    } catch (err) {
      console.error(err);
    }
  };

  const onHireLawyer = (lawyerId: number) => {};

  const onViewLawyer = (lawyer: LawyerWithRating) => {
    setSelectedLawyer(lawyer);
    setViewModalOpen(true);
  };

  useEffect(() => {
    getAllLawyers();
  }, []);

  return (
    <ClientLayout>
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
    </ClientLayout>
  );
};

export default ClientLawyersPage;
