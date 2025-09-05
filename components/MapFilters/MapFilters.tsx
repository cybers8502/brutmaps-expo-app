import React, {RefObject, useCallback, useMemo, useRef, useState} from 'react';
import {View, FlatList, Text, Pressable, StyleSheet} from 'react-native';
import BottomSheet, {BottomSheetView} from '@gorhom/bottom-sheet';
import Mapbox from '@rnmapbox/maps';
import MapGeocoding from '@/components/MapFilters/MapGeocoding';
import Svg, {Path} from 'react-native-svg';
import ArchitectsFilter from '@/components/MapFilters/Filters/ArchitectsFilter';
import ArchitectureStylesFilter from '@/components/MapFilters/Filters/ArchitectureStylesFilter';

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
  const [open, setOpen] = useState(true);

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
          <Text style={styles.fabText}>
            {open ? (
              '×'
            ) : (
              <Svg width='18' height='18' viewBox='0 0 18 18' fill='none'>
                <Path
                  d='M5.25569 7.7181L0.434273 2.15493C-0.126953 1.50736 0.333037 0.5 1.18996 0.5H16.1988C17.0732 0.5 17.5264 1.5431 16.9298 2.18232L11.7689 7.71184C11.5961 7.89702 11.5 8.14087 11.5 8.39416V14.882C11.5 15.2607 11.286 15.607 10.9472 15.7764L6.94721 17.7764C6.28231 18.1088 5.5 17.6253 5.5 16.882V8.37303C5.5 8.13244 5.41326 7.89991 5.25569 7.7181Z'
                  fill='white'
                />
              </Svg>
            )}
          </Text>
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
  container: {paddingVertical: 8, paddingHorizontal: 16, gap: 12},
  filtersRow: {flexDirection: 'column', gap: 12},
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
  fabActive: {backgroundColor: '#000'},
  fabText: {color: '#fff', fontWeight: '700'},
});
