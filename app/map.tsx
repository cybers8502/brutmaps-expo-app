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
  const [selectedType, setSelectedType] = useState<string>('');
  const [selectedArchitect, setSelectedArchitect] = useState<string>('');

  return (
    <SafeAreaView style={styles.container}>
      <MapSection
        cameraRef={cameraRef}
        setSelected={setSelected}
        filters={{architect: selectedArchitect, type: selectedType}}
      />
      <MapFilters
        cameraRef={cameraRef}
        selectedType={selectedType}
        setSelectedType={setSelectedType}
        selectedArchitect={selectedArchitect}
        setSelectedArchitect={setSelectedArchitect}
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
