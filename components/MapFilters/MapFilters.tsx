import React, {RefObject, useCallback, useMemo, useRef, useState} from 'react';
import {View, Text, Pressable, StyleSheet} from 'react-native';
import BottomSheet, {BottomSheetView} from '@gorhom/bottom-sheet';
import Mapbox from '@rnmapbox/maps';
import MapGeocoding from '@/components/MapFilters/Geocoding/MapGeocoding';
import ArchitectsFilter from '@/components/MapFilters/Filters/ArchitectsFilter';
import ArchitectureStylesFilter from '@/components/MapFilters/Filters/ArchitectureStylesFilter';
import IconFilter from '@/components/Icons/IconFilter';

type Coords = [number, number];

interface MapFiltersProps {
  cameraRef: RefObject<Mapbox.Camera | null>;
  selectedType: string;
  setSelectedType: (v: string) => void;
  selectedArchitect: string;
  setSelectedArchitect: (v: string) => void;
}

export default function MapFilters({
  cameraRef,
  selectedType,
  setSelectedType,
  selectedArchitect,
  setSelectedArchitect,
}: MapFiltersProps) {
  const [open, setOpen] = useState(false);

  const sheetRef = useRef<BottomSheet>(null);
  const snaps = useMemo(() => ['12%', '80%'], []);

  const flyTo = useCallback(
    (center: Coords) => {
      cameraRef.current?.setCamera({
        centerCoordinate: center,
        zoomLevel: 9,
        animationDuration: 500,
      });

      sheetRef.current?.collapse();
    },
    [cameraRef],
  );

  return (
    <>
      <View style={styles.filterWrap}>
        <MapGeocoding callBack={flyTo} />

        <Pressable
          style={[styles.fab, open ? styles.fabActive : null]}
          onPress={() => {
            setOpen((p) => !p);
            if (!open) sheetRef.current?.expand();
            else sheetRef.current?.collapse();
          }}>
          <Text style={styles.fabText}>{open ? '×' : <IconFilter />}</Text>
        </Pressable>
      </View>

      <BottomSheet ref={sheetRef} index={0} snapPoints={snaps} enablePanDownToClose={false}>
        <BottomSheetView style={styles.container}>
          <View style={styles.filtersRow}>
            <ArchitectsFilter
              selectedArchitect={selectedArchitect}
              setSelectedArchitect={setSelectedArchitect}
            />
            <ArchitectureStylesFilter selectedType={selectedType} setSelectedType={setSelectedType} />
          </View>
        </BottomSheetView>
      </BottomSheet>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    gap: 12,
  },
  filtersRow: {
    flexDirection: 'column',
    gap: 12,
  },
  filterWrap: {
    position: 'absolute',
    top: 12,
    insetInline: 16,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'stretch',
    justifyContent: 'space-between',
    gap: 12,
    zIndex: 50,
    elevation: 50,
  },
  fab: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: 40,
    backgroundColor: '#000',
    borderRadius: '50%',
    aspectRatio: 1,
  },
  fabActive: {
    backgroundColor: '#000',
  },
  fabText: {
    color: '#fff',
    fontWeight: '700',
  },
});
