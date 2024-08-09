import React from 'react';
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
  tooltip?: boolean;
  onHover: (from?: string) => void;
}

const MarkerCard: React.FC<IMarkerCard> = ({
  name,
  address,
  phone,
  lat,
  lng,
  onClickMarker,
  index,
  tooltip,
  onHover
}) => {
  const tooltipTargetId = 'Tooltip-' + index;

  const toggle = () => {
    onHover();
  };

  return (
    <div className="rounded-xl border border-gray_light p-6">
      <div className="gap-4 flex flex-col overflow-auto sm:min-h-[20rem] xs:h-auto  sm:w-[100%]">
        <span className="flex flex-row justify-between">
          <h1 className="font-bold xl:text-[20px] text-sm w-[80%]">{name}</h1>
          {lat !== 0 && lng !== 0 ? (
            <div
              role="button"
              onClick={() => onClickMarker(lat, lng)}
              id={tooltipTargetId}
            >
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
            {phone.replaceAll('undefined', '')}
          </p>
        </span>
      </div>
      <div className="mt-1">
        {typeof document !== 'undefined' &&
          document.getElementById(tooltipTargetId) && (
            <Tooltip
              placement="top"
              isOpen={tooltip}
              target={'Tooltip-' + index}
              toggle={toggle}
              autohide={true}
              className="relative"
            >
              <div className="bg-white rounded-lg shadow-lg z-20 top-[40px] absolute -left-4 sm:min-w-[200px]">
                <div className="p-2">
                  <p className="mb-1.5">{name}</p>
                  <p className="mb-1.5">{address}</p>
                  <p>{phone}</p>
                </div>
              </div>
            </Tooltip>
          )}
      </div>
    </div>
  );
};

export default MarkerCard;
