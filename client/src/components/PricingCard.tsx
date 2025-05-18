import { PRICES, SPECIAL_OFFER } from '@/lib/constants';

interface PricingCardProps {
  dice: number | string;
  price: number;
  highlight?: boolean;
  special?: boolean;
  condition?: string;
}

export function PricingCard({ dice, price, highlight = false, special = false, condition }: PricingCardProps) {
  return (
    <div 
      className={`${
        special 
          ? 'bg-gradient-to-br from-[#FF4C00]/10 to-[#FF4C00]/5 border-l-4 border-[#FF4C00] rounded-lg p-6 shadow-md' 
          : 'bg-gradient-to-br from-[#00CFFF]/15 to-[#00CFFF]/5 rounded-lg p-6 border-l-4 border-[#00CFFF] shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1'
      }`}
    >
      {special ? (
        <>
          <p className="font-bold flex items-center mb-3">
            <span className="text-2xl mr-2">💥</span>
            <span className="font-['Baloo_2'] text-lg bg-clip-text text-transparent bg-gradient-to-r from-[#FF4C00] to-[#FF7E4D]">Sonderangebot</span>
            {condition && (
              <span className="text-gray-600 ml-2 font-normal text-sm">
                {condition}
              </span>
            )}
          </p>
          <p className="font-bold text-lg flex items-center">
            🎲 <span className="ml-2">{dice} Würfel → <span className="text-[#FF4C00] text-xl">{price} €</span></span>
          </p>
        </>
      ) : (
        <>
          <div className="mb-2 flex justify-center">
            <span className="inline-block bg-[#00CFFF]/20 rounded-full p-2">
              <span className="text-2xl">🎲</span>
            </span>
          </div>
          <p className="font-bold text-lg text-center mb-2">
            <span className="font-bold">{dice.toLocaleString('de-DE')} Würfel</span>
          </p>
          <p className="text-xl font-['Baloo_2'] font-bold text-[#0A3A68] text-center mt-2">{price} €</p>
        </>
      )}
    </div>
  );
}

export function PricingGrid() {
  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-3 my-8">
        {PRICES.map((item, index) => (
          <PricingCard 
            key={index}
            dice={item.dice}
            price={item.price}
            highlight={item.highlight}
          />
        ))}
      </div>
      
      <PricingCard 
        dice={SPECIAL_OFFER.dice}
        price={SPECIAL_OFFER.price}
        special={true}
        condition={SPECIAL_OFFER.condition}
      />
    </div>
  );
}

export default PricingGrid;
