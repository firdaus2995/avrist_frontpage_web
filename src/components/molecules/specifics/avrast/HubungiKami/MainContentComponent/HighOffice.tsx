import L from 'leaflet';
import { useMap, MapContainer, TileLayer, Popup, Marker } from 'react-leaflet';
import { Card } from './Card';
import { CardAddress } from './CardAddress';
import MapMarkerImage from '@/assets/images/avrast/hubungi-kami/Map-Pin.svg';
import 'leaflet/dist/leaflet.css';

type Props = {
  onChangeCenter: (lng: number, lat: number) => void;
  mapCenter?: any[];
  branchData?: any;
};

const HighOffice = (props: Props) => {
  const { mapCenter, branchData, onChangeCenter } = props;

  const renderMap = () => {
    const highOfficeCoordinate = {
      lat: -6.214663280751351,
      lng: 106.82071668189862
    };
    const defaultProps = {
      center: highOfficeCoordinate,
      zoom: 16
    };

    const markerIcon = new L.Icon({
      iconUrl: MapMarkerImage.src,
      iconSize: [40, 40], // adjust size as needed
      iconAnchor: [20, 40], // adjust anchor as needed
      popupAnchor: [0, -40] // adjust popup anchor as needed
    });

    const ChangeView = ({ center, zoom }: any) => {
      const map = useMap();
      map.setView(center, zoom);
      return null;
    };

    return (
      <div className="w-full sm:h-[37.5rem] xs:aspect-[3/4]">
        <MapContainer
          center={defaultProps.center}
          zoom={16}
          className="w-full h-full z-0"
        >
          <ChangeView center={mapCenter} zoom={defaultProps.zoom} />
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {branchData?.map((marker: any, index: number) => (
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
          <Marker
            position={[highOfficeCoordinate.lat, highOfficeCoordinate.lng]}
            icon={markerIcon}
          >
            <Popup>
              <div className="flex flex-col gap-2">
                <div>Kantor Pusat Jakarta</div>
                <div>
                  World Trade Center II Lt. 7 & 8, Jl. Jenderal Sudirman Kav
                  29-31, RT.8/RW.3 Jakarta 12920 Indonesia
                </div>
                <div>+62 21 5789 8188</div>
              </div>
            </Popup>
          </Marker>
        </MapContainer>
      </div>
    );
  };

  return (
    <div className="flex flex-col gap-[5rem]">
      <p className="md:text-5xl xs:text-3xl text-center font-extrabold text-purple_dark font-karla xs:-tracking-[1.44px] sm:-tracking-[2.56px] sm:leading-[67.2px] xs:leading-[43.2px]">
        Lokasi Kantor Pusat Avrist Assurance
      </p>
      <Card className="bg-white p-[1.5rem] flex sm:flex-row xs:flex-col-reverse gap-6">
        <div className="sm:w-1/3 xs:w-full">
          <CardAddress
            title="Kantor Pusat Jakarta"
            address="World Trade Center II Lt. 7 & 8, Jl. Jenderal Sudirman Kav 29-31, RT.8/RW.3 Jakarta 12920 Indonesia"
            workHour="Senin-Jumat 10.00 - 14.00 WIB"
            contact="+62 21 5789 8188"
            lat={-6.214663280751351}
            lng={106.82071668189862}
            onChangeCenter={onChangeCenter}
          />
        </div>
        <div className="sm:w-2/3 xs:w-full">
          <Card>{renderMap()}</Card>
        </div>
      </Card>
    </div>
  );
};

export default HighOffice;
