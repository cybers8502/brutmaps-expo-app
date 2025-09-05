import React, {useMemo, useState} from 'react';
import {ActivityIndicator, Modal, Pressable, StyleSheet, Text, View, FlatList} from 'react-native';
import {useFetchTaxonomies} from '@/hooks/useFetchTaxonomies';

export type ArchitectureStylesResponse = {
  id: string;
  slug: string;
  label: string;
  subcategories?: ArchitectureStylesResponse[];
};

interface ArchitectureStylesFilterProps {
  selectedType: string;
  setSelectedType: (type: string) => void;
}

export default function ArchitectureStylesFilter({
  selectedType,
  setSelectedType,
}: ArchitectureStylesFilterProps) {
  const {data: architectureStyles, isLoading} = useFetchTaxonomies<ArchitectureStylesResponse[]>('taxonomy');

  const [open, setOpen] = useState(false);

  // робимо плаский список опцій з відступом для сабкатегорій
  const options = useMemo(() => {
    const rows: {id: string; slug: string; label: string; indent: number}[] = [
      {id: '__all__', slug: '', label: 'All styles', indent: 0},
    ];
    if (!architectureStyles?.length) return rows;

    for (const t of architectureStyles) {
      rows.push({id: t.id, slug: t.slug, label: t.label, indent: 0});
      if (t.subcategories?.length) {
        for (const s of t.subcategories) {
          rows.push({id: s.id, slug: s.slug, label: s.label, indent: 1});
        }
      }
    }
    return rows;
  }, [architectureStyles]);

  const selectedLabel = options.find((o) => o.slug === selectedType)?.label || 'All styles';

  const onPick = (slug: string) => {
    setSelectedType(slug);
    setOpen(false);
  };

  const onClear = () => setSelectedType('');

  return (
    <View style={[styles.container]}>
      {/* Кнопка відкриття списку */}
      <Pressable style={styles.selectBtn} onPress={() => setOpen(true)}>
        <Text style={styles.selectText}>{selectedLabel}</Text>
      </Pressable>

      {/* Кнопка скидання */}
      {!!selectedType && (
        <Pressable style={styles.clearChip} onPress={onClear}>
          <Text style={styles.clearChipText}>×</Text>
        </Pressable>
      )}

      {/* Модалка з вибором */}
      <Modal visible={open} animationType='fade' transparent>
        <Pressable style={styles.overlay} onPress={() => setOpen(false)} />

        <View style={styles.popup}>
          <Text style={styles.title}>Architecture styles</Text>

          {isLoading ? (
            <ActivityIndicator />
          ) : (
            <FlatList
              data={options}
              keyExtractor={(o) => o.id}
              renderItem={({item}) => (
                <Pressable
                  onPress={() => onPick(item.slug)}
                  style={[styles.row, selectedType === item.slug && styles.rowActive]}>
                  <Text
                    style={[
                      styles.rowText,
                      {paddingLeft: 12 + item.indent * 14},
                      selectedType === item.slug && styles.rowTextActive,
                    ]}
                    numberOfLines={1}>
                    {item.label}
                  </Text>
                </Pressable>
              )}
              ItemSeparatorComponent={() => <View style={styles.sep} />}
              contentContainerStyle={{paddingVertical: 6}}
            />
          )}
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {position: 'relative'},
  selectBtn: {
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: 10,
    backgroundColor: '#111',
  },
  selectText: {color: '#fff', fontWeight: '600'},

  clearChip: {
    position: 'absolute',
    right: -6,
    top: -6,
    width: 22,
    height: 22,
    borderRadius: 11,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#b21f2d',
  },
  clearChipText: {color: '#fff', fontWeight: '700'},

  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.35)',
  },
  popup: {
    position: 'absolute',
    left: 12,
    right: 12,
    top: 90,
    bottom: 24,
    borderRadius: 16,
    padding: 12,
    backgroundColor: '#fff',
    elevation: 8,
    shadowColor: '#000',
    shadowOpacity: 0.12,
    shadowRadius: 12,
    shadowOffset: {width: 0, height: 6},
  },
  title: {fontWeight: '700', fontSize: 16, marginBottom: 10},

  row: {
    paddingVertical: 10,
    paddingRight: 12,
    borderRadius: 10,
    marginHorizontal: 2,
  },
  rowActive: {backgroundColor: '#111'},
  rowText: {fontSize: 15, color: '#222'},
  rowTextActive: {color: '#fff'},
  sep: {height: 6},
});
