import React from 'react';
import {ActivityIndicator, StyleSheet, View} from 'react-native';
import {useFetchTaxonomies} from '@/hooks/useFetchTaxonomies';
import Subtitle from '@/components/shared/Subtitle';
import Pill from '@/components/shared/Pill';
import PillSmaller from '@/components/shared/PillSmaller';

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

  const onPick = (slug: string) => {
    setSelectedType(slug);
  };

  const onClear = () => setSelectedType('');

  return (
    <View style={[styles.container]}>
      <View style={styles.header}>
        <Subtitle>Architecture styles</Subtitle>
        <PillSmaller onPick={onClear} active={!selectedType}>
          All Styles
        </PillSmaller>
      </View>

      {isLoading ? (
        <ActivityIndicator />
      ) : (
        <>
          {architectureStyles?.map((item, index) => {
            return (
              <View
                key={item.id}
                style={[styles.picker, index + 1 < architectureStyles?.length && styles.pickerSeparate]}>
                <Pill
                  onPick={() => onPick(item.slug)}
                  styleText={{fontWeight: 600}}
                  active={selectedType === item.slug}>
                  {item.label}
                </Pill>
                <View style={[styles.pickerOptions]}>
                  {item.subcategories?.map((subItem) => (
                    <Pill
                      key={subItem.id}
                      onPick={() => onPick(subItem.slug)}
                      active={selectedType === subItem.slug}>
                      - {subItem.label}
                    </Pill>
                  ))}
                </View>
              </View>
            );
          })}
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    gap: 8,
  },

  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  generalButton: {
    fontSize: 14,
  },

  picker: {
    gap: 8,
    display: 'flex',
    alignItems: 'flex-start',
  },
  pickerSeparate: {
    paddingBottom: 8,
  },
  pickerOptions: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
    gap: 8,
  },
});
