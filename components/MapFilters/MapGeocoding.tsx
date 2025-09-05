import React, {useEffect, useMemo, useRef, useState} from 'react';
import {TextInput, StyleSheet, View, FlatList, Pressable, Text, Keyboard} from 'react-native';
import {env} from '@/lib/env';
import apiRoutes from '@/utils/apiRoutes';
import Svg, {Path} from 'react-native-svg';

type Coords = [number, number];

interface MapGeocodingProps {
  callBack: (center: Coords) => void;
}

export default function MapGeocoding({callBack}: MapGeocodingProps) {
  const [q, setQ] = useState('');
  const [items, setItems] = useState<{id: string; name: string; center: Coords}[]>([]);
  const [selectedItem, setSelectedItem] = useState<{id: string; name: string; center: Coords} | null>(null);

  const inputRef = useRef<TextInput>(null);
  const publicToken = env.MAPBOX_PUBLIC_TOKEN;

  const search = useMemo(() => {
    let t: any;
    return (text: string) => {
      clearTimeout(t);
      setSelectedItem(null);
      setQ(text);
      if (!text) {
        setItems([]);
        return;
      }
      t = setTimeout(async () => {
        try {
          const url = `${apiRoutes.mapBoxGeocoding}${encodeURIComponent(
            text,
          )}.json?access_token=${publicToken}&language=en&limit=8`;
          const res = await fetch(url);
          const json = await res.json();
          const results =
            json?.features?.map((f: any) => ({
              id: f.id as string,
              name: f.place_name as string,
              center: f.center as Coords, // [lon, lat]
            })) ?? [];
          setItems(results);
        } catch {
          setItems([]);
        }
      }, 350);
    };
  }, [publicToken]);

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
      <Svg width='19' height='19' viewBox='0 0 19 19' fill='none'>
        <Path
          d='M8.54675 1.51181C11.8607 1.67977 14.496 4.42076 14.496 7.77646L14.4882 8.09872C14.4173 9.49596 13.8874 10.7711 13.0487 11.7804L16.4745 15.2061L16.536 15.2745C16.8225 15.6263 16.802 16.1458 16.4745 16.4737C16.1466 16.8016 15.6272 16.8218 15.2753 16.5352L15.2069 16.4737L11.7167 12.9835C10.7183 13.6544 9.51773 14.0478 8.22449 14.0479L7.90125 14.0401C4.6942 13.8776 2.12238 11.3058 1.95984 8.09872L1.95203 7.77646C1.95203 4.31253 4.76056 1.504 8.22449 1.504L8.54675 1.51181ZM8.22449 2.84775C5.50283 2.84775 3.29578 5.0548 3.29578 7.77646C3.29603 10.4979 5.50298 12.7042 8.22449 12.7042C10.9458 12.7039 13.152 10.4978 13.1522 7.77646C13.1522 5.05495 10.9459 2.848 8.22449 2.84775Z'
          fill='#DFDDD9'
        />
      </Svg>
      <TextInput
        ref={inputRef}
        placeholder='Search for city, country or object'
        placeholderTextColor='#DFDDD9'
        value={selectedItem?.name ? selectedItem?.name : q}
        onChangeText={search}
        style={styles.input}
        autoCorrect={false}
        autoCapitalize='none'
        clearButtonMode='while-editing'
      />

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
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: '#000',
    borderRadius: 25,
    backgroundColor: '#000',
  },
  input: {
    flex: 1,
    fontSize: 16,
    lineHeight: 18,
    borderWidth: 0,
    padding: 0,
    backgroundColor: 'transparent',
    color: '#DFDDD9',
  },
  list: {
    position: 'absolute',
    top: 40,
    insetInline: -1,
    maxHeight: 220,
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
    backgroundColor: '#000',
  },
  row: {
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: '#db1313',
  },
  rowText: {
    fontSize: 16,
    lineHeight: 18,
    color: '#fff',
  },
});
