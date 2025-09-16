import {StyleSheet, View, Text, FlatList, ActivityIndicator} from 'react-native';
import {useCallback, useMemo} from 'react';
import {PhotoPost, useFetchObjectsGallery} from '@/hooks/useFetchObjectsGallery';
import ObjectsItem from '@/components/ObjectsFlatList/ObjectItem';

export default function ObjectsFlatList() {
  const {data, isLoading, isError, refetch, fetchNextPage, hasNextPage, isFetchingNextPage, isRefetching} =
    useFetchObjectsGallery(12);

  const flatData = data?.pages.flatMap((p) => p.posts) ?? [];

  const keyExtractor = useCallback((item: PhotoPost) => item.post_id, []);

  const renderItem = useCallback(({item}: {item: PhotoPost}) => <ObjectsItem item={item} />, []);

  const ListEmpty = useMemo(
    () =>
      isLoading ? (
        <ActivityIndicator size='large' style={{marginTop: 24}} />
      ) : isError ? (
        <Text style={styles.center}>Something was going wrong. Try again later.</Text>
      ) : (
        <Text style={styles.center}>Nothing to show.</Text>
      ),
    [isLoading, isError],
  );

  const getItemLayout = useCallback(
    (_: any, index: number) => ({
      length: 200 + 8 + 40,
      offset: (200 + 8 + 40 + 16) * index,
      index,
    }),
    [],
  );

  const loadMore = useCallback(() => {
    if (hasNextPage && !isFetchingNextPage) fetchNextPage();
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  const refresh = useCallback(() => {
    refetch();
  }, [refetch]);

  return (
    <FlatList
      data={flatData}
      keyExtractor={keyExtractor}
      renderItem={renderItem}
      contentContainerStyle={styles.container}
      ListEmptyComponent={ListEmpty}
      ListFooterComponent={
        isFetchingNextPage ? (
          <View style={{paddingVertical: 16}}>
            <ActivityIndicator size='small' />
          </View>
        ) : null
      }
      onEndReachedThreshold={0.5}
      onEndReached={loadMore}
      refreshing={isRefetching && flatData.length === 0}
      onRefresh={refresh}
      removeClippedSubviews
      windowSize={7}
      initialNumToRender={12}
      maxToRenderPerBatch={12}
      updateCellsBatchingPeriod={50}
      getItemLayout={getItemLayout}
      numColumns={3}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  center: {
    padding: 16,
    textAlign: 'center',
    color: '#444',
  },
});
