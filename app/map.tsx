import {StyleSheet, Text} from 'react-native';
import Mapbox, {Camera, MapView} from '@rnmapbox/maps';
import {env} from '@/lib/env';
import useFetchMapDetails from '@/hooks/useFetchMapDetails';
import MapLayers from '@/components/MapLayers/MapLayers';
import {useRef, useState} from 'react';
import {GeoJSONFeature} from '@/components/MapLayers/MapLayers.interface';
import SightBottomSheet from '@/components/SightBottomSheet/SightBottomSheet';

Mapbox.setAccessToken(env.MAPBOX_PUBLIC_TOKEN || '');

export default function MapScreen() {
  const {featureCollection, isLoading, isError} = useFetchMapDetails();
  const [selected, setSelected] = useState<GeoJSONFeature | null>(null);
  const cameraRef = useRef<Camera>(null);

  const handleFeaturePress = (feature: GeoJSONFeature) => {
    setSelected(feature);
    const coords = (feature.geometry as any).coordinates as [number, number];
    cameraRef.current?.setCamera({
      centerCoordinate: coords,
      zoomLevel: 14,
      animationDuration: 500,
    });
  };

  if (isError) {
    return <Text>Server Error</Text>;
  }

  return (
    <>
      <MapView style={styles.map} styleURL={'mapbox://styles/mapbox/dark-v11'}>
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
        {!isLoading && (
          <MapLayers featureCollection={featureCollection} onPressFeature={handleFeaturePress} />
        )}
      </MapView>
      <SightBottomSheet
        featureSlug={selected?.properties.slug || ''}
        visible={!!selected}
        onClose={() => setSelected(null)}
      />
    </>
  );
}

const styles = StyleSheet.create({
  map: {
    flex: 1,
    minHeight: '100%',
    minWidth: '100%',
    zIndex: 1,
  },
});
