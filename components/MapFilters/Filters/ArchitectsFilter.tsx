import React, {useMemo, useState} from 'react';
import {ActivityIndicator, StyleSheet, Text, TextInput, View} from 'react-native';
import {useDebounce} from 'expo-dev-launcher/bundle/hooks/useDebounce';
import {useFetchPopularArchitects} from '@/hooks/useFetchPopularArchitects';
import {useSearchArchitects} from '@/hooks/useSearchArchitects';
import {useFetchArchitectBySlug} from '@/hooks/useFetchArchitectBySlug';
import {ArchitectsResponse} from '@/interfaces/Architects.interface';
import Subtitle from '@/components/shared/Subtitle';
import ArchitectsGrid from '@/components/MapFilters/Filters/ArchitectsFilter/ArchitectsGrid';
import PillSmaller from '@/components/shared/PillSmaller';
import COLORS from '@/constants/Colors';

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

  const onClear = (): void => {
    setSelectedArchitect('');
  };

  return (
    <>
      {selectedArchitect && (
        <View style={styles.resultWrap}>
          {loadingPreselectedArchitect ? (
            <PillSmaller onPick={() => {}}>Loading...</PillSmaller>
          ) : (
            <PillSmaller onPick={() => {}} active>
              {preselectedArchitect?.full_name}
            </PillSmaller>
          )}

          <PillSmaller onPick={onClear}>All Architects</PillSmaller>
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
          cursorColor={COLORS.textSecondary}
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
    flexDirection: 'row',
    alignItems: 'stretch',
    justifyContent: 'space-between',
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
    borderColor: COLORS.inputWhiteBorder,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 16,
    backgroundColor: COLORS.inputWhiteBackground,
  },

  empty: {
    marginTop: 8,
    color: COLORS.inputWhiteEmpty,
  },
});
