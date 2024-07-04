import React, { useRef, useState, useEffect } from 'react';
import L from 'leaflet';
import { MapContainer, TileLayer, Popup, Marker, useMap } from 'react-leaflet';
import Slider, { LazyLoadTypes } from 'react-slick';
import { IDAta } from '../Content';
import MapMarkerImage from '@/assets/images/avrast/hubungi-kami/Map-Pin.svg';
import Icon from '@/components/atoms/Icon';
import NotFound from '@/components/atoms/NotFound';
import MarkerCard from '@/components/molecules/specifics/avrast/RSRekanan/Maps/MarkerCard';
import SearchBox from '@/components/molecules/specifics/avrast/SearchBox';
import 'leaflet/dist/leaflet.css';

const Maps = ({
  hospitalData,
  onClickSearch,
  onSetPage,
  currentPage,
  loading
}: IProviderProps) => {
  const sliderRef = useRef<Slider | null>(null);
  const [mapCenter, setMapCenter] = useState<[number, number]>([
    -0.601784, 115.394436
  ]);
  const [mapZoom, setMapZoom] = useState(4.5);

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

  const defaultProps = {
    center: {
      lat: -0.601784,
      lng: 115.394436
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
          slidesToShow: 3,
          lazyLoad: 'progressive' as LazyLoadTypes,
          slidesToScroll: 1,
          rows: 1,
          afterChange: (current: number) => {
            if (current === hospitalData.length - 3) {
              onSetPage(currentPage + 1);
            }
          }
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
      },
      {
        breakpoint: 480,
        settings: {
          initialSlide: 0,
          slidesToShow: 1,
          lazyLoad: 'progressive' as LazyLoadTypes,
          slidesToScroll: 1,
          rows: 3,
          afterChange: (current: number) => {
            if (current === Math.floor(hospitalData.length / 3)) {
              onSetPage(currentPage + 1);
            }
          }
        }
      }
    ]
  });

  useEffect(() => {
    setMapCenter([-0.601784, 115.394436]);
    setMapZoom(4.5);
  }, [hospitalData]);

  const ChangeView = ({ center, zoom }: any) => {
    const map = useMap();
    map.setView(center, zoom);
    return null;
  };

  const onClickMarker = (lat: number, lng: number) => {
    if (lat !== 0 || lng !== 0) {
      setMapCenter([lat, lng]);
      setMapZoom(17);
    }
  };

  return (
    <div className="sm:w-[80%] xs:w-full h-full rounded rounded-[0.75rem] border border-gray_light flex flex-col gap-[24px] pb-6">
      <div className="w-full h-[43.75rem] xs:max-h-[339px] sm:max-h-[691px] rounded-t-[0.75rem] z-0">
        <MapContainer
          center={defaultProps.center}
          zoom={4.5}
          className="w-full h-full"
        >
          <ChangeView center={mapCenter} zoom={mapZoom} />
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
      <div className="px-[5%] pt-[0.75rem]">
        <SearchBox
          placeHolder="Ketik Lokasi Rumah Sakit"
          onSearch={(e) => onClickSearch(e)}
          customButton="max-w-[119px]"
          customClassName="!w-[90%] m-auto"
        />
      </div>
      <div className="flex sm:flex-row justify-between xs:flex-col px-3">
        <div className="sm:flex xs:hidden items-center justify-center">
          <div
            className="p-2 rounded-full border border-purple_dark cursor-pointer"
            onClick={previous}
          >
            <Icon name="chevronLeft" color="purple_dark" />
          </div>
        </div>
        {hospitalData?.length !== 0 ? (
          <Slider
            ref={(slider) => {
              sliderRef.current = slider;
            }}
            {...sliderSettings(hospitalData.length)}
            className="sm:w-[90%] w-full flex flex-row px-4"
          >
            {hospitalData?.length !== 0 &&
              hospitalData!.map((item, index) => (
                <div className="px-2" key={index}>
                  <div className="w-full sm:h-full xs:h-[95%] mb-[12px]">
                    <MarkerCard
                      index={index}
                      name={item.name}
                      address={item.address}
                      phone={item.phone}
                      lat={item.lat}
                      lng={item.lng}
                      onClickMarker={() => onClickMarker(item.lat, item.lng)}
                    />
                  </div>
                </div>
              ))}
          </Slider>
        ) : loading ? (
          <div className="h-[36vh] w-full flex items-center justify-center">
            <p className="font-opensans">Loading Data...</p>
          </div>
        ) : (
          <div className="-mt-14">
            <NotFound title="Rumah Sakit Tidak Ditemukan" />
          </div>
        )}

        <div className="sm:hidden flex flex-row items-center justify-between mt-5 sm:mt-0">
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
  onSetPage: (value: number) => void;
  currentPage: number;
  loading: boolean;
}
