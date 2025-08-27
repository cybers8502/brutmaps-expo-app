import {StyleSheet, Text, View} from 'react-native';
import Mapbox, {Camera, MapView} from '@rnmapbox/maps';
import {env} from '@/lib/env';
import useFetchMapDetails from '@/hooks/useFetchMapDetails';
import MapLayers from '@/components/MapLayers/MapLayers';
import {useCallback, useRef, useState} from 'react';
import {GeoJSONFeature} from '@/components/MapLayers/MapLayers.interface';
import SightBottomSheet from '@/components/SightBottomSheet/SightBottomSheet';
import {GestureHandlerRootView} from 'react-native-gesture-handler';

Mapbox.setAccessToken(env.MAPBOX_PUBLIC_TOKEN || '');

export default function MapScreen() {
  const {featureCollection, isLoading, isError} = useFetchMapDetails();
  const [selected, setSelected] = useState<GeoJSONFeature | null>(null);
  const [styleLoaded, setStyleLoaded] = useState(false);
  const cameraRef = useRef<Camera>(null);

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
    <View style={styles.container}>
      <GestureHandlerRootView>
        <MapView
          styleURL={'mapbox://styles/mapbox/dark-v11'}
          style={StyleSheet.absoluteFillObject}
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
            <MapLayers featureCollection={featureCollection} onPressFeature={handleFeaturePress} />
          )}
        </MapView>
        <SightBottomSheet
          featureSlug={selected?.properties.slug || ''}
          visible={!!selected}
          onClose={() => setSelected(null)}
        />
      </GestureHandlerRootView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
