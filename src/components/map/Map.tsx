'use client'
import '@/lib/leaflet-icons'
import Apiarist from '@/interfaces/apiarist.interface'
import 'leaflet/dist/leaflet.css'
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet'


const Map = ({ data }: { data: Apiarist[] }) => {
  const defaultPosition: [number, number] = data.length > 0
    ? [Number(data[0].latitude), Number(data[0].longitude)]
    : [-23.55052, -46.633308] 

  return (
    <div>
        <p className="text-black text-xl font-bold uppercase mb-2">
          Localização dos Apiários
        </p>

        <MapContainer center={defaultPosition} zoom={5} scrollWheelZoom={false} style={{ height: '400px', width: '100%' }}>
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {data.map((apiarist, index) => {

            const position: [number, number] = [Number(apiarist.latitude), Number(apiarist.longitude)]

            return (
              <Marker key={index} position={position}>
                <p>{apiarist.name}</p>
                <Popup>
                  {apiarist.name} <br />
                  Latitude: {apiarist.latitude} <br />
                  Longitude: {apiarist.longitude}
                </Popup>
              </Marker>
            )
          })}
        </MapContainer>
    </div>
  )
}

export default Map
