import { useEffect, useState } from "react";

import QHeader from "./components/QHeader";
import QInput from "./components/QInput";
import QButton from "./components/QButton";
import QFooter from "./components/QFooter";
import QLayout from "./components/QLayout";
import QListCard from "./components/QListCard";
import QFormOrderByOffer from "./components/QFormOrderByOffer";
import QFormFilterOffer from "./components/QFormFilterOffer";
import QSectionForm from "./components/QSectionForm";
import QCardOffer from "./components/QCardOffer";

interface OffersProps {
  id: string,
  courseName: string,
  fullPrice: number
  discount: string
  iesLogo: string
  iesName: string
  kind: string
  level: string
  offeredPrice: number
  rating: number
}

const App: React.FC = () => {
  const [offers, setOffers] = useState<OffersProps[]>([]);



  useEffect(() => {
    const fetchOffers = async () => {
      try {
        const response = await fetch('http://localhost:3000/offers')
        const data = response.json()

        const offersResult = await Promise.resolve(data)

        setOffers(offersResult)
        console.log(offersResult[0].fullPrice)
      } catch (error) {
        console.error(error)
      }
    }

    fetchOffers()
  }, [])


  return (
    <QLayout
      header={
        <QHeader>
          <QInput
            type="search"
            id="site-search"
            name="q"
            placeholder="Busque o curso ideal para você"
            aria-label="Buscar cursos e bolsas"
          />
          <QButton type="submit">Buscar</QButton>
        </QHeader>
      }
      sidebar={<QFormFilterOffer />}
      footer={<QFooter />}
    >
      <QSectionForm
        title="Veja as opções que encontramos"
        orderBy={<QFormOrderByOffer />}
        filter={<QFormFilterOffer />}
      />

      <div className="mt-6">
        <QListCard cards={offers}>
          {(card) => (
            <QCardOffer
              key={card.id}
              courseName={card.courseName}
              rating={card.rating}
              fullPrice={String(card.fullPrice)}
              offeredPrice={String(card.offeredPrice)}
              discount={String(card.discount)}
              kind={card.kind}
              level={card.level}
              iesLogo={card.iesLogo}
              iesName={card.iesName}
            />
          )}
        </QListCard>
      </div>
    </QLayout>
  );
};

export default App;
