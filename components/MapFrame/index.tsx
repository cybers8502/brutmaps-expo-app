import {StyleSheet, Text} from 'react-native';
import Mapbox, {Camera, MapView} from '@rnmapbox/maps';
import MapLayers from '@/components/MapFrame/MapLayers';
import {useFetchMapDetails} from '@/components/MapFrame/hooks/useFetchMapDetails';
import {RefObject, useCallback, useState} from 'react';
import {GeoJSONFeature} from '@/components/MapFrame/MapLayers.interface';
import {env} from '@/lib/env';

Mapbox.setAccessToken(env.MAPBOX_PUBLIC_TOKEN || '');

interface MapViewProps {
  cameraRef: RefObject<Camera | null>;
  setSelected: (feature: GeoJSONFeature | null) => void;
  filters: {architect?: string; type?: string};
}

export default function MapFrame({cameraRef, setSelected, filters}: MapViewProps) {
  const {data, isLoading, isError} = useFetchMapDetails(filters.architect, filters.type);
  const [styleLoaded, setStyleLoaded] = useState(false);

  const handleStyleLoaded = useCallback(() => {
    setStyleLoaded(true);
  }, []);

  const handleFeaturePress = useCallback(
    (feature: GeoJSONFeature) => {
      setSelected(feature);

      if (!styleLoaded) return;

      const coords = feature.geometry.coordinates;

      cameraRef.current?.setCamera({
        centerCoordinate: coords,
        zoomLevel: 14,
        animationDuration: 500,
      });
    },
    [styleLoaded],
  );

  if (isError) {
    return <Text>Server Error</Text>;
  }

  return (
    <MapView
      styleURL={'mapbox://styles/mapbox/dark-v11'}
      style={[StyleSheet.absoluteFillObject, styles.container]}
      onDidFinishLoadingStyle={handleStyleLoaded}
      surfaceView={false}>
      <Camera
        ref={cameraRef}
        defaultSettings={{
          centerCoordinate: [2.347146829343072, 48.86199106320665],
          zoomLevel: 10,
          pitch: 0,
        }}
        centerCoordinate={[2.347146829343072, 48.86199106320665]}
        zoomLevel={10}
        pitch={0}
        animationDuration={0}
      />
      {!isLoading && styleLoaded && (
        <MapLayers featureCollection={data?.featureCollection} onPressFeature={handleFeaturePress} />
      )}
    </MapView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
