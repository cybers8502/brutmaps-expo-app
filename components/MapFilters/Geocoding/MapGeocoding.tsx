import React, {useEffect, useMemo, useRef, useState} from 'react';
import {TextInput, StyleSheet, View, FlatList, Pressable, Text, Keyboard} from 'react-native';
import {env} from '@/lib/env';
import apiRoutes from '@/utils/apiRoutes';
import {useDebounce} from 'expo-dev-launcher/bundle/hooks/useDebounce';
import IconGlass from '@/components/Icons/IconGlass';
import COLORS from '@/constants/Colors';

type Coords = [number, number];

type Place = {
  id: string;
  name: string;
  center: Coords;
};

interface MapGeocodingProps {
  callBack: (center: Coords) => void;
}

export default function MapGeocoding({callBack}: MapGeocodingProps) {
  const [q, setQ] = useState('');
  const [items, setItems] = useState<Place[]>([]);
  const [selectedItem, setSelectedItem] = useState<Place | null>(null);

  const inputRef = useRef<TextInput>(null);
  const publicToken = env.MAPBOX_PUBLIC_TOKEN;
  const debouncedQ = useDebounce(q, 350);
  const abortRef = useRef<AbortController | null>(null);

  const search = useMemo(
    () => (text: string) => {
      setSelectedItem(null);
      setQ(text);
      if (!text) setItems([]);
    },
    [],
  );

  useEffect(() => {
    if (!debouncedQ) return;

    abortRef.current?.abort();
    const ac = new AbortController();
    abortRef.current = ac;

    (async () => {
      try {
        const url =
          `${apiRoutes.mapBoxGeocoding}${encodeURIComponent(debouncedQ)}` +
          `.json?access_token=${publicToken}&language=en&limit=8`;

        const res = await fetch(url, {signal: ac.signal});
        const json = await res.json();
        const results: Place[] =
          json?.features?.map((f: any) => ({
            id: f.id,
            name: f.place_name,
            center: f.center as Coords,
          })) ?? [];

        setItems(results);
      } catch (e: any) {
        if (e?.name !== 'AbortError') setItems([]);
      }
    })();

    return () => ac.abort();
  }, [debouncedQ, publicToken]);

  const handlerClean = () => {
    setQ('');
    setSelectedItem(null);
    setItems([]);
  };

  useEffect(() => {
    if (!selectedItem) return;
    callBack(selectedItem?.center);
    setItems([]);
    inputRef.current?.blur();
    Keyboard.dismiss();
  }, [selectedItem]);

  return (
    <View
      style={[
        styles.container,
        items.length ? {borderBottomLeftRadius: 0, borderBottomRightRadius: 0} : null,
      ]}>
      <IconGlass />
      <TextInput
        ref={inputRef}
        placeholder='Search for city, country or object'
        placeholderTextColor={COLORS.placeholder}
        cursorColor={COLORS.secondary}
        value={selectedItem?.name ? selectedItem?.name : q}
        onChangeText={search}
        style={styles.input}
        autoCorrect={false}
        autoCapitalize='none'
      />

      {(!!q || !!selectedItem) && (
        <Pressable style={styles.clearBtn} onPress={handlerClean}>
          <Text style={styles.clearText}>×</Text>
        </Pressable>
      )}

      {!!items.length && (
        <FlatList
          data={items}
          style={styles.list}
          keyboardShouldPersistTaps='handled'
          keyExtractor={(i) => i.id}
          renderItem={({item}) => (
            <Pressable style={styles.row} onPress={() => setSelectedItem(item)}>
              <Text style={styles.rowText}>{item.name}</Text>
            </Pressable>
          )}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    flex: 1,
    paddingHorizontal: 12,
    paddingLeft: 10,
    paddingRight: 35,
    borderWidth: 1,
    borderColor: COLORS.primary,
    borderRadius: 25,
    backgroundColor: COLORS.backgroundPrime,
  },

  input: {
    flex: 1,
    position: 'relative',
    top: 1,
    fontSize: 16,
    lineHeight: 18,
    borderWidth: 0,
    padding: 0,
    backgroundColor: 'transparent',
    color: COLORS.textWhite,
  },

  clearBtn: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    top: 0,
    right: 0,
    height: 40,
    width: 30,
    paddingBottom: 4,
    zIndex: 2,
    elevation: 2,
  },
  clearText: {
    fontSize: 18,
    color: '#666',
  },

  list: {
    position: 'absolute',
    top: 40,
    insetInline: -1,
    maxHeight: 220,
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
    backgroundColor: COLORS.backgroundPrime,
  },
  row: {
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: COLORS.primary,
  },
  rowText: {
    fontSize: 16,
    lineHeight: 18,
    color: COLORS.textWhite,
  },
});
