import React, { useState } from 'react';
import { Tooltip } from 'reactstrap';
import Icon from '@/components/atoms/Icon';

interface IMarkerCard {
  name: string;
  address: string;
  phone: string;
  lat: number;
  lng: number;
  onClickMarker: (lat: number, lng: number) => void;
  index?: number;
}

const MarkerCard: React.FC<IMarkerCard> = ({
  name,
  address,
  phone,
  lat,
  lng,
  onClickMarker,
  index
}) => {
  const [tooltipOpen, setTooltipOpen] = useState(false);

  const toggle = () => setTooltipOpen(!tooltipOpen);
  return (
    <div
      id={'Tooltip-' + index}
      className="rounded-xl border border-gray_light p-6 sm:w-[95%] flex flex-col gap-4 overflow-auto sm:min-h-[19rem] xs:h-auto"
    >
      <span className="flex flex-row justify-between">
        <h1 className="font-bold xl:text-[20px] text-sm w-[80%]">{name}</h1>
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
        <p className="text-sm sm:text-[16px] sm:w-[85%]">{address}</p>
      </span>
      <span className="flex flex-row gap-2">
        <Icon name="phone" width={24} height={24} color="purple_verylight" />
        <p className="text-sm sm:text-[16px] sm:w-[85%] w-[100%] truncate">
          {phone}
        </p>
      </span>
      <Tooltip
        placement="bottom"
        isOpen={tooltipOpen}
        target={'Tooltip-' + index}
        toggle={toggle}
        autohide={true}
        className="relative left-0"
      >
        {name}
      </Tooltip>
    </div>
  );
};

export default MarkerCard;
