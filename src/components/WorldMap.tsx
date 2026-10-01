'use client'

import React, { useEffect, useState } from 'react'
import dynamic from 'next/dynamic'
import 'leaflet/dist/leaflet.css'
import L, { Icon } from 'leaflet'

// Dynamic imports to avoid SSR issues in Next.js
const MapContainer = dynamic(
  () => import('react-leaflet').then((mod) => mod.MapContainer),
  { ssr: false },
)
const TileLayer = dynamic(
  () => import('react-leaflet').then((mod) => mod.TileLayer),
  { ssr: false },
)
const Marker = dynamic(
  () => import('react-leaflet').then((mod) => mod.Marker),
  { ssr: false },
)
const Popup = dynamic(() => import('react-leaflet').then((mod) => mod.Popup), {
  ssr: false,
})

// Fix Leaflet icon loading in Next.js
delete (L.Icon.Default.prototype as any)._getIconUrl
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
})

// Type definitions
type MarkerType = 'gold' | 'silver' | 'green'

interface MarkerData {
  position: [number, number]
  type: MarkerType
  popupText: string
}

// Marker data
const markers: MarkerData[] = [
  { position: [51.505, -0.09], type: 'gold', popupText: 'London, UK' },
  { position: [40.7128, -74.006], type: 'silver', popupText: 'New York, USA' },
  {
    position: [34.0522, -118.2437],
    type: 'green',
    popupText: 'Los Angeles, USA',
  },
  { position: [48.8566, 2.3522], type: 'gold', popupText: 'Paris, France' },
  { position: [35.6895, 139.6917], type: 'green', popupText: 'Tokyo, Japan' },
  {
    position: [-33.8688, 151.2093],
    type: 'silver',
    popupText: 'Sydney, Australia',
  },
  {
    position: [-22.3285, 24.6849],
    type: 'green',
    popupText: 'Gaborone, Botswana',
  },
]

// Create custom icon
const createCustomIcon = (color: MarkerType): Icon =>
  new L.Icon({
    iconUrl: `/images/marker-${color}.png`,
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
    shadowSize: [41, 41],
    shadowAnchor: [12, 41],
  })

// Icons by type
const iconMap: Record<MarkerType, Icon> = {
  gold: createCustomIcon('gold'),
  silver: createCustomIcon('silver'),
  green: createCustomIcon('green'),
}

const getIconByType = (type: MarkerType): Icon => iconMap[type]

const WorldMap: React.FC = () => {
  const [mapLoaded, setMapLoaded] = useState(false)

  const tileUrl = process.env.NEXT_PUBLIC_MAPS_API_KEY
    ? `https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png?api_key=${process.env.NEXT_PUBLIC_MAPS_API_KEY}`
    : `https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png`

  useEffect(() => {
    setMapLoaded(true)
  }, [])

  if (!mapLoaded) return <div>Loading Map...</div>

  return (
    <MapContainer
      attributionControl={false}
      zoomControl={false}
      center={[20, 0]}
      zoom={2}
      scrollWheelZoom={false}
      className="h-[350px] w-full md:h-[450px] lg:h-[512px]"
      minZoom={1.5}
      maxZoom={8}
      maxBounds={[
        [-90, -180],
        [90, 180],
      ]}
      maxBoundsViscosity={1.0}
    >
      <TileLayer url={tileUrl} attribution="" />
      {markers.map((marker, idx) => (
        <Marker
          key={idx}
          position={marker.position}
          icon={getIconByType(marker.type)}
        >
          <Popup>{marker.popupText}</Popup>
        </Marker>
      ))}
    </MapContainer>
  )
}

export default WorldMap
