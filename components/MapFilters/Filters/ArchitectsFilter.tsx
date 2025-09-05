import React, {useEffect, useMemo, useState} from 'react';
import {ActivityIndicator, FlatList, Image, Pressable, StyleSheet, Text, TextInput, View} from 'react-native';
import {useDebounce} from 'expo-dev-launcher/bundle/hooks/useDebounce';
import {useFetchPopularArchitects} from '@/hooks/useFetchPopularArchitects';
import {useSearchArchitects} from '@/hooks/useSearchArchitects';
import {useFetchArchitectBySlug} from '@/hooks/useFetchArchitectBySlug';

export interface ArchitectsResponse {
  id: string;
  full_name: string;
  image?: {url?: string; name?: string; alt?: string};
}

interface ArchitectsFilterProps {
  selectedArchitect: string;
  setSelectedArchitect: (architectId: string) => void;
}

export default function ArchitectsFilter({selectedArchitect, setSelectedArchitect}: ArchitectsFilterProps) {
  const [search, setSearch] = useState('');
  const [architectName, setArchitectName] = useState('');

  const debouncedSearch = useDebounce(search, 400);

  const {data: searchResults, isLoading: loadingSearch} = useSearchArchitects(debouncedSearch);
  const {data: popularArchitects, isLoading: loadingPopular} = useFetchPopularArchitects();
  const {data: preselectedArchitect} = useFetchArchitectBySlug(selectedArchitect);

  useEffect(() => {
    setArchitectName(preselectedArchitect?.full_name || '');
  }, [preselectedArchitect]);

  const architectOptions: ArchitectsResponse[] = useMemo(() => {
    if (search.trim().length >= 2) {
      return (searchResults as ArchitectsResponse[]) ?? [];
    }
    return (popularArchitects as ArchitectsResponse[]) ?? [];
  }, [search, searchResults, popularArchitects]);

  const handlePick = (architect: ArchitectsResponse) => {
    setSelectedArchitect(architect.id);
    setArchitectName(architect.full_name);
  };

  return (
    <>
      <View style={styles.searchRow}>
        <TextInput
          value={search}
          onChangeText={setSearch}
          placeholder='Search'
          placeholderTextColor='#888'
          style={styles.searchInput}
          autoCapitalize='none'
          autoCorrect={false}
          clearButtonMode='always'
        />
      </View>

      <Text style={styles.sectionTitle}>
        {search.length >= 2 ? 'Search result' : 'Most popular searches'}
      </Text>

      {search.length >= 2 ? (
        loadingSearch ? (
          <ActivityIndicator />
        ) : architectOptions?.length ? (
          <Grid data={architectOptions} onPick={handlePick} />
        ) : (
          <Text style={styles.empty}>Nothing found</Text>
        )
      ) : loadingPopular ? (
        <ActivityIndicator />
      ) : (
        <Grid data={architectOptions} onPick={handlePick} />
      )}
    </>
  );
}

function Grid({data, onPick}: {data: ArchitectsResponse[]; onPick: (a: ArchitectsResponse) => void}) {
  return (
    <FlatList
      data={data}
      keyExtractor={(a) => a.id}
      numColumns={2}
      columnWrapperStyle={styles.gridRow}
      contentContainerStyle={styles.gridContent}
      renderItem={({item}) => (
        <Pressable style={styles.card} onPress={() => onPick(item)}>
          <Image
            source={{
              uri: item?.image?.url || 'https://via.placeholder.com/100',
            }}
            alt={item?.image?.alt}
            style={styles.cardImage}
            resizeMode='cover'
          />
          <Text style={styles.cardText} numberOfLines={2}>
            {item.full_name}
          </Text>
        </Pressable>
      )}
    />
  );
}

const styles = StyleSheet.create({
  searchRow: {flexDirection: 'row', alignItems: 'center', marginBottom: 8},
  searchInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#e5e5e5',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 16,
    backgroundColor: '#fafafa',
  },

  sectionTitle: {fontWeight: '600', marginVertical: 8},
  empty: {color: '#666', marginTop: 8},

  gridContent: {paddingVertical: 6},
  gridRow: {gap: 8, marginBottom: 8},
  card: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    padding: 8,
    backgroundColor: '#f8f8f8',
    overflow: 'hidden',
  },
  cardImage: {width: '20%', aspectRatio: 1, borderRadius: '50%', backgroundColor: '#ccc'},
  cardText: {fontSize: 13, color: '#222', overflow: 'hidden'},
});
