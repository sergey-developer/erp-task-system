import OlMap from 'ol/Map'
import View from 'ol/View'
import { Coordinate } from 'ol/coordinate'
import TileLayer from 'ol/layer/Tile'
import { fromLonLat } from 'ol/proj'
import { OSM } from 'ol/source'
import { useState, useEffect, useRef, FC } from 'react'

import { MapWrapperStyled } from './styles'

const Map: FC = () => {
  const [map, setMap] = useState<OlMap>()
  const [selectedCoord, setSelectedCoord] = useState<Coordinate>()

  const mapWrapperRef = useRef<HTMLDivElement>(null)

  const mapRef = useRef<OlMap>()
  mapRef.current = map

  useEffect(() => {
    if (mapWrapperRef.current !== null) {
      const initialMap = new OlMap({
        target: mapWrapperRef.current,
        layers: [new TileLayer({ source: new OSM() })],
        view: new View({
          center: fromLonLat([0, 0]),
          zoom: 2,
        }),
        controls: [],
      })

      initialMap.on('click', (event) => {
        setSelectedCoord(event.coordinate)
      })

      setMap(initialMap)
    }
  }, [])

  return <MapWrapperStyled ref={mapWrapperRef} />
}

export default Map
