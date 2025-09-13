import React, {useEffect, useMemo, useState} from 'react';
import {ActivityIndicator, StyleSheet, Text, TextInput, View} from 'react-native';
import {useDebounce} from 'expo-dev-launcher/bundle/hooks/useDebounce';
import {useFetchPopularArchitects} from '@/hooks/useFetchPopularArchitects';
import {useSearchArchitects} from '@/hooks/useSearchArchitects';
import {useFetchArchitectBySlug} from '@/hooks/useFetchArchitectBySlug';
import {ArchitectsResponse} from '@/interfaces/Architects.interface';
import Subtitle from '@/components/shared/Subtitle';
import ArchitectsGrid from '@/components/MapFilters/Filters/ArchitectsFilter/ArchitectsGrid';
import Pill from '@/components/shared/Pill';

interface ArchitectsFilterProps {
  selectedArchitect: string;
  setSelectedArchitect: (architectId: string) => void;
}

export default function ArchitectsFilter({selectedArchitect, setSelectedArchitect}: ArchitectsFilterProps) {
  const [search, setSearch] = useState('');

  const debouncedSearch = useDebounce(search, 400);

  const {data: searchResults, isLoading: loadingSearch} = useSearchArchitects(debouncedSearch);
  const {data: popularArchitects, isLoading: loadingPopular} = useFetchPopularArchitects();
  const {data: preselectedArchitect, isLoading: loadingPreselectedArchitect} =
    useFetchArchitectBySlug(selectedArchitect);

  const architectOptions: ArchitectsResponse[] = useMemo(() => {
    if (search.trim().length >= 2) {
      return (searchResults as ArchitectsResponse[]) ?? [];
    }
    return (popularArchitects as ArchitectsResponse[]) ?? [];
  }, [search, searchResults, popularArchitects]);

  const handlePick = (architect: ArchitectsResponse) => {
    setSelectedArchitect(architect.id);
  };

  return (
    <>
      {selectedArchitect && (
        <View style={styles.resultWrap}>
          {loadingPreselectedArchitect ? (
            <Pill onPick={() => {}}>Loading...</Pill>
          ) : (
            <Pill onPick={() => {}}>{preselectedArchitect?.full_name}</Pill>
          )}
        </View>
      )}

      <View style={styles.searchRow}>
        <TextInput
          value={search}
          onChangeText={setSearch}
          placeholder='Look for architect'
          placeholderTextColor='#000'
          style={styles.searchInput}
          autoCapitalize='none'
          autoCorrect={false}
          clearButtonMode='always'
          cursorColor={'#f00'}
        />
      </View>

      <Subtitle>{search.length >= 2 ? 'Search result' : 'Most viewed architects'}</Subtitle>

      {search.length >= 2 ? (
        loadingSearch ? (
          <ActivityIndicator />
        ) : architectOptions?.length ? (
          <ArchitectsGrid data={architectOptions} onPick={handlePick} />
        ) : (
          <Text style={styles.empty}>Nothing found</Text>
        )
      ) : loadingPopular ? (
        <ActivityIndicator />
      ) : (
        <ArchitectsGrid data={architectOptions} onPick={handlePick} />
      )}
    </>
  );
}

const styles = StyleSheet.create({
  resultWrap: {
    alignItems: 'flex-start',
  },

  searchRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
    gap: 8,
  },
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

  empty: {
    marginTop: 8,
    color: '#666',
  },
});
