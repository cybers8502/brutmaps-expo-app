import {ShapeSource, CircleLayer, SymbolLayer} from '@rnmapbox/maps';
import {clusterLayer, clusterCountLayer, unclutteredPointLayer} from './layers';
import {useCallback} from 'react';
import type {Feature} from 'geojson';
import {GeoJSONFeature, IMapLayers} from '@/components/MapView/MapLayers.interface';

interface MapLayersProps {
  featureCollection?: IMapLayers;
  onPressFeature?: (feature: GeoJSONFeature) => void;
}

type MapPressEvent = {
  features: Feature[];
  coordinates: {
    latitude: number;
    longitude: number;
  };
  point: {
    x: number;
    y: number;
  };
};

export default function MapLayers({featureCollection, onPressFeature}: MapLayersProps) {
  const handlePress = useCallback(
    (e: MapPressEvent) => {
      const feature = e.features?.[0] as GeoJSONFeature | undefined;
      if (feature && !('cluster' in (feature.properties as any))) {
        onPressFeature?.(feature);
      }
    },
    [onPressFeature],
  );

  if (!featureCollection) {
    return null;
  }

  return (
    <ShapeSource
      id='sights'
      shape={featureCollection}
      cluster
      clusterMaxZoomLevel={9}
      clusterRadius={50}
      onPress={handlePress}>
      <CircleLayer id={clusterLayer.id} filter={clusterLayer.filter} style={clusterLayer.style} />
      <SymbolLayer
        id={clusterCountLayer.id}
        filter={clusterCountLayer.filter}
        style={clusterCountLayer.style}
      />
      <CircleLayer
        id={unclutteredPointLayer.id}
        filter={unclutteredPointLayer.filter}
        style={unclutteredPointLayer.style}
      />
    </ShapeSource>
  );
}
