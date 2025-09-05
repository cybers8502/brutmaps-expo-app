import {SafeAreaView, StyleSheet} from 'react-native';
import {useRef, useState} from 'react';
import {GeoJSONFeature} from '@/components/MapLayers/MapLayers.interface';
import SightBottomSheet from '@/components/SightBottomSheet/SightBottomSheet';
import MapSection from '@/components/MapLayers/MapView';
import MapFilters from '@/components/MapFilters/MapFilters';
import {Camera} from '@rnmapbox/maps';

export default function MapScreen() {
  const cameraRef = useRef<Camera>(null);
  const [selected, setSelected] = useState<GeoJSONFeature | null>(null);

  return (
    <SafeAreaView style={styles.container}>
      <MapSection cameraRef={cameraRef} setSelected={setSelected} />
      <MapFilters
        cameraRef={cameraRef}
        selectedType={''}
        setSelectedType={function (v: string): void {
          throw new Error('Function not implemented.');
        }}
        selectedArchitect={''}
        setSelectedArchitect={function (v: string): void {
          throw new Error('Function not implemented.');
        }}
      />
      <SightBottomSheet
        featureSlug={selected?.properties.slug || ''}
        visible={!!selected}
        onClose={() => setSelected(null)}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
