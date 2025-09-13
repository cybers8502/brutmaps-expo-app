import React, {RefObject, useCallback, useMemo, useRef, useState} from 'react';
import {View, Text, Pressable, StyleSheet} from 'react-native';
import BottomSheet, {BottomSheetScrollView, BottomSheetView} from '@gorhom/bottom-sheet';
import Mapbox from '@rnmapbox/maps';
import MapGeocoding from '@/components/MapFilters/Geocoding/MapGeocoding';
import ArchitectsFilter from '@/components/MapFilters/Filters/ArchitectsFilter';
import ArchitectureStylesFilter from '@/components/MapFilters/Filters/ArchitectureStylesFilter';
import IconFilter from '@/components/Icons/IconFilter';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

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
  const insets = useSafeAreaInsets();

  const sheetRef = useRef<BottomSheet>(null);
  const snaps = useMemo(() => ['15%', '80%'], []);

  const flyTo = useCallback(
    (center: Coords) => {
      cameraRef.current?.setCamera({
        centerCoordinate: center,
        zoomLevel: 9,
        animationDuration: 500,
      });

      sheetRef.current?.close();
    },
    [cameraRef],
  );

  const handlerSheetState = () => {
    if (open) {
      sheetRef.current?.close();
    } else {
      sheetRef.current?.snapToIndex(0);
    }
  };

  return (
    <>
      <View style={[styles.filterWrap, {top: insets.top + 16}]}>
        <MapGeocoding callBack={flyTo} />

        <Pressable style={[styles.fab, open ? styles.fabActive : null]} onPress={handlerSheetState}>
          <Text style={styles.fabText}>{open ? '×' : <IconFilter />}</Text>
        </Pressable>
      </View>

      <BottomSheet
        ref={sheetRef}
        index={-1}
        snapPoints={snaps}
        animateOnMount={false}
        enablePanDownToClose
        enableContentPanningGesture={false}
        enableHandlePanningGesture
        onChange={(i) => setOpen(i >= 0)}>
        <BottomSheetScrollView
          style={styles.container}
          bounces={false}
          contentContainerStyle={{paddingBottom: insets.bottom + 24}}
          showsVerticalScrollIndicator>
          <View style={styles.filtersRow}>
            <ArchitectsFilter
              selectedArchitect={selectedArchitect}
              setSelectedArchitect={setSelectedArchitect}
            />
            <ArchitectureStylesFilter selectedType={selectedType} setSelectedType={setSelectedType} />
          </View>
        </BottomSheetScrollView>
      </BottomSheet>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  filtersRow: {
    flexDirection: 'column',
    gap: 12,
  },
  filterWrap: {
    position: 'absolute',
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
