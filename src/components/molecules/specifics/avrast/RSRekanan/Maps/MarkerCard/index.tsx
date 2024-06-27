import React from 'react';
import Icon from '@/components/atoms/Icon';

interface IMarkerCard {
  name: string;
  address: string;
  phone: string;
  lat: number;
  lng: number;
  onClickMarker: (lat: number, lng: number) => void;
}

const MarkerCard: React.FC<IMarkerCard> = ({
  name,
  address,
  phone,
  lat,
  lng,
  onClickMarker
}) => {
  return (
    <div className="rounded-xl border border-gray_light p-6 sm:w-[95%] xs:w-full xs:min-h-[189px] sm:h-[36vh] flex flex-col gap-4 overflow-auto">
      <span className="flex flex-row justify-between">
        <h1 className="font-bold xl:text-2xl text-sm w-[80%]">{name}</h1>
        {lat !== 0 && lng !== 0 ? (
          <div role="button" onClick={() => onClickMarker(lat, lng)}>
            <Icon
              name="navigation"
              color="purple_verylight"
              width={24}
              height={24}
            />
          </div>
        ) : null}
      </span>
      <span className="flex flex-row gap-2">
        <Icon name="maps" width={24} height={24} color="purple_verylight" />
        <p className="text-sm sm:text-lg sm:w-[85%]">{address}</p>
      </span>
      <span className="flex flex-row gap-2">
        <Icon name="phone" width={24} height={24} color="purple_verylight" />
        <p className="text-sm sm:text-lg sm:w-[85%] w-[100%]">{phone}</p>
      </span>
    </div>
  );
};

export default MarkerCard;
