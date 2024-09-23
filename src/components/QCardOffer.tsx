import { FC, useEffect, useState } from "react";
import QHeading from "./QHeading";
import QRating from "./QRating";
import QPrice from "./QPrice";
import QText from "./QText";
import QButton from "./QButton";

interface QCardOfferProps {
  courseName: string;
  rating: number;
  fullPrice: string;
  offeredPrice: string;
  discount: string;
  kind: string;
  level: string;
  iesLogo: string;
  iesName: string;
}

const QCardOffer: FC<QCardOfferProps> = ({
  courseName,
  rating,
  fullPrice,
  offeredPrice,
  discount,
  kind,
  level,
  iesLogo,
  iesName,
}) => {
  const [kindFormatted, setKindFormatted] = useState<string>(kind)
  const [fullPriceFormatted, setFullPriceFormatted] = useState<string>(fullPrice)
  const [offeredPriceFormatted, setOfferedPriceFormatted] = useState<string>(offeredPrice)


  console.log(kind.length)

  useEffect(() => {
    const handleKind = () => {
      if (kind.length <= 3) {
        setKindFormatted('EaD')
      } else {
        const newPresencialKind = kind.charAt(0).toUpperCase() + kind.slice(1)
        setKindFormatted(newPresencialKind)
      }
    }

    const handleMoneyFormat = (reais: string,) => {
      const getReais = reais.replace('.', ',')

      return `R$ ${getReais}`
    }

    handleKind()
    setFullPriceFormatted(handleMoneyFormat(fullPrice))
    setOfferedPriceFormatted(handleMoneyFormat(offeredPrice))
  }, [kind])

  return (
    <article className="bg-white p-6 rounded-lg shadow-sm border flex flex-col justify-between items-start gap-3">
      <img src={iesLogo} alt={iesName} className="h-10 object-contain" />
      <QHeading tag="h2" size="sm">
        {courseName}
      </QHeading>
      <QRating rating={rating} />
      <QPrice
        fullPrice={fullPriceFormatted}
        offeredPrice={offeredPriceFormatted}
        discount={discount}
      />
      <div>
        <QText tag="p">{kindFormatted}</QText>
        <QText tag="p" color="minor" size="sm">
          {`Graduação (${level})`}
        </QText>
      </div>
      <QButton tag="a" size="sm" className="w-full">
        Quero esta bolsa
      </QButton>
    </article>
  );
};

export default QCardOffer;
