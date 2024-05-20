import React from 'react';
import Icon from '@/components/atoms/Icon';

interface IMarkerCard {
  name: string;
  address: string;
  phone: string;
}

const MarkerCard: React.FC<IMarkerCard> = ({ name, address, phone }) => {
    return (
    <div className="rounded-xl border border-gray_light py-4 px-6 w-[95%] h-auto lg:h-[36vh] flex flex-col gap-4">
      <span className="flex flex-row justify-between">
        <h1 className="font-bold xl:text-2xl text-sm">{name}</h1>
        <Icon
          name="navigation"
          color="purple_verylight"
          width={24}
          height={24}
        />
      </span>
      <span className="flex flex-row gap-2">
        <Icon name="maps" width={24} height={24} color="purple_verylight" />
        <p className="text-sm lg:text-md lg:w-[85%]">{address}</p>
      </span>
      <span className="flex flex-row gap-2">
        <Icon name="phone" width={24} height={24} color="purple_verylight" />
        <p className="text-sm lg:text-lg lg:w-[85%] w-[40%]">{phone}</p>
      </span>
    </div>
  );
};

export default MarkerCard;
