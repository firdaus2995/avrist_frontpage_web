import React, { useRef, useState, useEffect } from 'react';
import L from 'leaflet';
import { MapContainer, TileLayer, Popup, Marker, useMap } from 'react-leaflet';
import Slider, { LazyLoadTypes } from 'react-slick';
import { IDAta } from '../Content';
import MapMarkerImagePurple from '@/assets/images/avrast/hubungi-kami/Map-Pin-Purple.svg';
import MapMarkerImage from '@/assets/images/avrast/hubungi-kami/Map-Pin.svg';
import Icon from '@/components/atoms/Icon';
import NotFound from '@/components/atoms/NotFound';
import MarkerCard from '@/components/molecules/specifics/avrast/RSRekanan/Maps/MarkerCard';
import SearchBox from '@/components/molecules/specifics/avrast/SearchBox';
import 'leaflet/dist/leaflet.css';

const Maps = ({
  hospitalData,
  fetchMapData,
  onClickSearch,
  onSetPage,
  currentPage,
  loading
}: IProviderProps) => {
  const [, forceUpdate] = React.useReducer((x) => x + 1, 0);
  const sliderRef = useRef<Slider | null>(null);
  const [mapCenter, setMapCenter] = useState<[number, number]>([
    -0.601784, 115.394436
  ]);
  const [mapZoom, setMapZoom] = useState(4.5);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [controlNextNav, setControlNextNav] = useState(false);
  const [searchFlag, setSearchFlag] = useState(false);
  const [locationFlag, setLocationFlag] = useState(false);

  const next = () => {
    if (controlNextNav) return null;
    if (sliderRef.current) {
      sliderRef.current.slickNext();
    }
  };
  const previous = () => {
    if (currentSlide === 0) return null;
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

  const markerIconPurple = new L.Icon({
    iconUrl: MapMarkerImagePurple.src,
    iconSize: [40, 40], // adjust size as needed
    iconAnchor: [20, 40], // adjust anchor as needed
    popupAnchor: [0, -40] // adjust popup anchor as needed
  });

  const sliderSettings = (totalData: number) => ({
    dots: false,
    infinite: false,
    focusOnSelect: false,
    arrows: false,
    centerMode: false,
    initialSlide: 0,
    draggable: false,
    lazyLoad: 'progressive' as LazyLoadTypes,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1536,
        settings: {
          initialSlide: 1,
          slidesToShow: 3,
          lazyLoad: 'progressive' as LazyLoadTypes,
          slidesToScroll: 1,
          rows: 1,
          afterChange: (current: number) => {
            if (!searchFlag && current === hospitalData.length - 3) {
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
            if (
              !searchFlag &&
              current === Math.floor(hospitalData.length / 3)
            ) {
              onSetPage(currentPage + 1);
            }
          }
        }
      }
    ]
  });

  useEffect(() => {
    // setMapCenter([-0.601784, 115.394436]);
    // setMapZoom(4.5);

    if (hospitalData.length <= 2 && hospitalData.length !== 0) {
      setControlNextNav(true);
    } else if (currentSlide === hospitalData.length - 3) {
      setControlNextNav(true);
    } else {
      setControlNextNav(false);
    }
  }, [hospitalData, currentSlide]);

  const ChangeView = ({ center, zoom }: any) => {
    const map = useMap();
    map.setView(center, zoom);
    return null;
  };

  const onClickMarker = (lat: number, lng: number) => {
    if (lat !== 0 || lng !== 0) {
      setMapCenter([lat, lng]);
      setMapZoom(17);
      handleScroll();
    }
  };

  const handleScroll = () => {
    const heading = document.getElementById('scrollTarget');

    const offsetTop = heading ? heading.offsetTop - 250 : 0;

    window.scrollTo({
      top: offsetTop,
      behavior: 'smooth'
    });
  };

  // for detecting location permission in browser
  useEffect(() => {
    const requestLocation = () => {
      if ('geolocation' in navigator) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const location = {
              latitude: position.coords.latitude,
              longitude: position.coords.longitude
            };
            if (typeof window !== 'undefined') {
              localStorage.setItem('location', JSON.stringify(location));
              setMapCenter([location.latitude, location.longitude]);
              setMapZoom(17);
              setLocationFlag(true);
              fetchMapData ? fetchMapData() : null;
            }
          },
          () => {
            if (typeof window !== 'undefined') {
              localStorage.removeItem('location');
              setMapCenter([-0.601784, 115.394436]);
              setMapZoom(5);
              setLocationFlag(false);
              fetchMapData ? fetchMapData() : null;
            }
          }
        );
      }
    };

    requestLocation();

    if (navigator.permissions) {
      navigator.permissions.query({ name: 'geolocation' }).then((result) => {
        result.onchange = () => {
          if (result.state === 'granted' || result.state === 'prompt') {
            requestLocation();
          } else {
            if (typeof window !== 'undefined') {
              localStorage.removeItem('location');
              setMapCenter([-0.601784, 115.394436]);
              setMapZoom(5);
              setLocationFlag(false);
              fetchMapData ? fetchMapData() : null;
            }
          }
        };
      });
    }
  }, []);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const location: any = localStorage.getItem('location');
      if (location) {
        const locationObj = JSON.parse(location);
        setMapZoom(17);
        setLocationFlag(true);

        setMapCenter([locationObj?.latitude, locationObj?.longitude]);
      } else {
        setLocationFlag(false);
      }
    }
  }, []);

  return (
    <div className="sm:min-w-[80%] xs:w-full h-full rounded rounded-[0.75rem] border border-gray_light flex flex-col gap-[24px] pb-6">
      <div
        className="w-full h-[43.75rem] xs:max-h-[339px] sm:max-h-[691px] rounded-t-[0.75rem] z-0"
        id="scrollTarget"
      >
        <MapContainer
          center={defaultProps.center}
          zoom={mapZoom}
          className="w-full h-full"
        >
          <ChangeView center={mapCenter} zoom={mapZoom} />
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {locationFlag && (
            <Marker position={mapCenter} icon={markerIconPurple}>
              <Popup>
                <div className="flex flex-col gap-2">
                  <div>{'Lokasi Anda'}</div>
                </div>
              </Popup>
            </Marker>
          )}
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
      <div className="pt-[0.75rem] max-w-[90%] min-w-[90%] m-auto px-4 2xl:px-[17px]">
        <SearchBox
          placeHolder="Ketik Lokasi Rumah Sakit"
          onSearch={(e) => {
            if (e !== '') {
              setSearchFlag(true);
            } else {
              setSearchFlag(false);
            }
            onClickSearch(e);
          }}
          customButton="max-w-[119px]"
          customClassName="2xl:!max-w-[100%] 2xl:px-2 px-0 xl:!max-w-[100%]"
        />
      </div>
      <div className="flex sm:flex-row justify-between xs:flex-col w-[98%] m-auto 2xl:px-2">
        <div className="sm:flex xs:hidden items-center justify-center">
          <div
            className={`${currentSlide <= 0 ? 'opacity-50' : 'opacity-100'} p-2 rounded-full border border-purple_dark cursor-pointer`}
            onClick={previous}
          >
            <Icon name="chevronLeft" color="purple_dark" />
          </div>
        </div>
        {hospitalData?.length !== 0 ? (
          <div className="sm:max-w-[90%] sm:min-w-[90%] h-full">
            <Slider
              ref={(slider) => {
                sliderRef.current = slider;
              }}
              {...sliderSettings(hospitalData.length)}
              beforeChange={(_, next) => setCurrentSlide(next)}
              className="w-full"
            >
              {hospitalData?.length !== 0 &&
                hospitalData!.map((item, index) => (
                  <div className="px-2 flex flex-start" key={index}>
                    <div className="w-full sm:h-full xs:h-[95%] xs:mt-[12px] sm:mt-[12px]">
                      <MarkerCard
                        index={index}
                        name={item.name}
                        address={item.address}
                        phone={item.phone}
                        lat={item.lat}
                        lng={item.lng}
                        onClickMarker={() => onClickMarker(item.lat, item.lng)}
                        tooltip={item.tooltip}
                        onHover={(content) => {
                          if (content) {
                            item.tooltip = true;
                          } else {
                            item.tooltip = !item.tooltip;
                          }
                          forceUpdate();
                        }}
                      />
                    </div>
                  </div>
                ))}
            </Slider>
          </div>
        ) : loading ? (
          <div className="h-[36vh] w-full flex items-center justify-center">
            <p className="font-opensans">Loading Data...</p>
          </div>
        ) : (
          <div className="-mt-14">
            <NotFound title="Rumah Sakit Tidak Ditemukan" />
          </div>
        )}

        <div className="sm:hidden flex flex-row items-center justify-between mt-5 sm:mt-0 w-[90%] m-auto">
          <div
            className={`${currentSlide === 0 ? 'opacity-50' : 'opacity-100'} p-2 rounded-full border border-purple_dark cursor-pointer`}
            onClick={previous}
          >
            <Icon name="chevronLeft" color="purple_dark" />
          </div>
          <div
            className={`p-2 rounded-full border border-purple_dark cursor-pointer ${controlNextNav ? 'opacity-50' : 'opacity-100'}`}
            onClick={next}
          >
            <Icon name="chevronRight" color="purple_dark" />
          </div>
        </div>
        <div className="sm:flex xs:hidden items-center justify-center">
          <div
            className={`p-2 rounded-full border border-purple_dark cursor-pointer ${controlNextNav ? 'opacity-50' : 'opacity-100'}`}
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
  fetchMapData?: () => void;
  onClickSearch: (value: string) => void;
  onSetPage: (value: number) => void;
  currentPage: number;
  loading: boolean;
}
