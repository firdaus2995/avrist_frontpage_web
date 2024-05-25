import React, { useEffect, useRef } from 'react';
import L from 'leaflet';
import { MapContainer, TileLayer, Popup, Marker } from 'react-leaflet';
import Slider, { LazyLoadTypes } from 'react-slick';
import { IDAta } from '../Content';
import MapMarkerImage from '@/assets/images/avrast/hubungi-kami/Map-Pin.svg';
import Icon from '@/components/atoms/Icon';
import MarkerCard from '@/components/molecules/specifics/avrast/RSRekanan/Maps/MarkerCard';
import SearchBox from '@/components/molecules/specifics/avrast/SearchBox';
import 'leaflet/dist/leaflet.css';

const Maps = ({ hospitalData, onClickSearch }: IProviderProps) => {
  const sliderRef = useRef<Slider | null>(null);

  const next = () => {
    if (sliderRef.current) {
      sliderRef.current.slickNext();
    }
  };
  const previous = () => {
    if (sliderRef.current) {
      sliderRef.current.slickPrev();
    }
  };

  useEffect(() => {
    if (sliderRef.current) {
      sliderRef.current.slickGoTo(0);
    }
  }, [hospitalData]);

  const defaultProps = {
    center: {
      lat: -6.195125,
      lng: 106.823456
    },
    zoom: 11
  };

  const markerIcon = new L.Icon({
    iconUrl: MapMarkerImage.src,
    iconSize: [40, 40], // adjust size as needed
    iconAnchor: [20, 40], // adjust anchor as needed
    popupAnchor: [0, -40] // adjust popup anchor as needed
  });

  const sliderSettings = (totalData: number) => ({
    dots: false,
    infinite: false,
    focusOnSelect: true,
    arrows: false,
    centerMode: false,
    initialSlide: 0,
    lazyLoad: 'progressive' as LazyLoadTypes,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1536,
        settings: {
          initialSlide: 0,
          slidesToShow: totalData > 3 ? 3.2 : 3,
          lazyLoad: 'progressive' as LazyLoadTypes,
          slidesToScroll: 1,
          rows: 1
        }
      },
      {
        breakpoint: 1100,
        settings: {
          initialSlide: 0,
          slidesToShow: totalData > 2 ? 2 : 1,
          lazyLoad: 'progressive' as LazyLoadTypes,
          slidesToScroll: 1,
          rows: 1
        }
      },
      {
        breakpoint: 768,
        settings: {
          initialSlide: 0,
          slidesToShow: 1,
          lazyLoad: 'progressive' as LazyLoadTypes,
          slidesToScroll: 1,
          rows: 1
        }
      }
      ,
      {
        breakpoint: 480,
        settings: {
          initialSlide: 0,
          slidesToShow: 1,
          lazyLoad: 'progressive' as LazyLoadTypes,
          slidesToScroll: 1,
          rows: 3
        }
      }
    ]
  });

  return (
    <div className="sm:w-[80%] xs:w-full h-full rounded rounded-[0.75rem] border border-gray_light flex flex-col gap-[0.75rem] pb-6">
      <div className="w-full h-[43.75rem] rounded-t-[0.75rem]">
        <MapContainer
          center={defaultProps.center}
          zoom={10}
          className="w-full h-full"
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {hospitalData?.map((marker, index) => (
            <Marker
              key={index}
              position={[marker.lat, marker.lng]}
              icon={markerIcon}
            >
              <Popup>
                <div className="flex flex-col gap-2">
                  <div>{marker.name}</div>
                  <div>{marker.address}</div>
                  <div>{marker.phone}</div>
                </div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>
      <div className="px-[5%]">
        <SearchBox onSearch={(e) => onClickSearch(e)} />
      </div>
      <div className="flex sm:flex-row xs:flex-col px-3">
        <div className="sm:flex xs:hidden items-center justify-center">
          <div
            className="p-2 rounded-full border border-purple_dark cursor-pointer"
            onClick={previous}
          >
            <Icon name="chevronLeft" color="purple_dark" />
          </div>
        </div>
        <Slider
          ref={(slider) => {
            sliderRef.current = slider;
          }}
          {...sliderSettings(hospitalData.length)}
          className="sm:w-[90%] w-full flex flex-row"
        >
          {hospitalData?.length !== 0 &&
            hospitalData!.map((item, index) => (
              <div key={index} className="w-full  sm:h-full xs:h-[95%] mt-[0.75rem]">
                <MarkerCard
                  name={item.name}
                  address={item.address}
                  phone={item.phone}
                />
              </div>
            ))}
        </Slider>
        <div className="sm:hidden flex flex-row items-center justify-between">
          <div
            className="p-2 rounded-full border border-purple_dark cursor-pointer"
            onClick={previous}
          >
            <Icon name="chevronLeft" color="purple_dark" />
          </div>
          <div
            className="p-2 rounded-full border border-purple_dark cursor-pointer"
            onClick={next}
          >
            <Icon name="chevronRight" color="purple_dark" />
          </div>
        </div>
        <div className="sm:flex xs:hidden items-center justify-center">
          <div
            className="p-2 rounded-full border border-purple_dark cursor-pointer"
            onClick={next}
          >
            <Icon name="chevronRight" color="purple_dark" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Maps;

export interface IProviderProps {
  hospitalData: IDAta[] | [];
  onClickSearch: (value: string) => void;
}
