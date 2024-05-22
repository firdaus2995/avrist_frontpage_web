import L from 'leaflet';
import { MapContainer, TileLayer, Marker } from 'react-leaflet';
import { Card } from './Card';
import { CardAddress } from './CardAddress';
import MapMarkerImage from '@/assets/images/avrast/hubungi-kami/Map-Pin.svg';
import 'leaflet/dist/leaflet.css';

export const HighOffice = () => {
  const renderMap = () => {
    const defaultProps = {
      center: {
        lat: -6.214663280751351,
        lng: 106.82071668189862
      },
      zoom: 11
    };

    const markerIcon = new L.Icon({
      iconUrl: MapMarkerImage.src,
      iconSize: [40, 40], // adjust size as needed
      iconAnchor: [20, 40], // adjust anchor as needed
      popupAnchor: [0, -40] // adjust popup anchor as needed
    });

    return (
      <div className="w-full sm:h-[37.5rem] xs:h-[12rem]">
        <MapContainer
          center={defaultProps.center}
          zoom={10}
          className="w-full h-full relative z-20"
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Marker
            position={[defaultProps.center.lat, defaultProps.center.lng]}
            icon={markerIcon}
          ></Marker>
        </MapContainer>
      </div>
    );
  };

  return (
    <div className="flex flex-col gap-[4rem]">
      <p className="font-karla font-bold sm:text-[3.5rem] xs:text-[2.25rem] text-center text-purple_dark">
        Lokasi Kantor Pusat Avrist Assurance
      </p>
      <Card className="bg-white p-[1.5rem] flex sm:flex-row xs:flex-col-reverse gap-6">
        <div className="sm:w-1/3 xs:w-full">
          <CardAddress
            title="Kantor Pusat Jakarta"
            address="World Trade Center II Lt. 7 & 8, Jl. Jenderal Sudirman Jl. Setiabudi Raya Kav 29-31, RT.8/RW.3"
            workHour="Senin-Jumat 10.00 - 14.00 WIB"
            contact="(021) 5789 8188"
          />
        </div>
        <div className="sm:w-2/3 xs:w-full">
          <Card>{renderMap()}</Card>
        </div>
      </Card>
    </div>
  );
};
