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
          ? 'bg-[#FF4C00]/5 border-l-4 border-[#FF4C00] rounded-lg p-5' 
          : 'bg-[#00CFFF]/10 rounded-lg p-5 border-l-4 border-[#00CFFF] shadow-sm hover:shadow-md transition transform hover:-translate-y-1'
      }`}
    >
      {special ? (
        <>
          <p className="font-bold flex items-center mb-2">
            <span className="text-2xl mr-2">💥</span>
            <span className="font-['Baloo_2'] text-lg">Sonderangebot</span>
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
          <p className="font-bold text-lg text-center">
            🎲 <span className="font-bold">{dice.toLocaleString('de-DE')} Würfel</span>
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
