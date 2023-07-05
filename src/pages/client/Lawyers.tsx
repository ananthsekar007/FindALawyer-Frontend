import { listAllLawyers } from "../../api/lawyer/lawyerApi";
import ClientLayout from "../../components/client/ClientLayout";
import LawyerCard, {
  LawyerCardProps,
} from "../../components/lawyer/LawyerCard";
import React, { useState, useEffect } from "react";
import { LawyerWithRating } from "../../types/Lawyer";

const generateDummyLawyerData = (): LawyerCardProps[] => {
  const dummyData: LawyerCardProps[] = [];

  for (let i = 1; i <= 10; i++) {
    const lawyer: LawyerCardProps = {
      lawyerName: `Lawyer ${i}`,
      qualification: `Qualification ${i}`,
      starRating: Math.floor(Math.random() * 5) + 1,
      reviews: Math.floor(Math.random() * 100),
      lawyerId: i,
      lawyerLocation: `Location ${i}`,
    };

    dummyData.push(lawyer);
  }

  return dummyData;
};

const ClientLawyersPage = () => {
  const [lawyers, setLawyers] = useState<LawyerWithRating[]>([]);

  const getAllLawyers = async () => {
    try {
        const response = await listAllLawyers();
        if(!response.data) {
            console.log("Some error occured");
        }
        setLawyers(response.data);
    }
    catch(err) {
        console.error(err)
    }
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
          />
        ))}
      </div>
    </ClientLayout>
  );
};

export default ClientLawyersPage;
