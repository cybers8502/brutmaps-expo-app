import {StyleSheet, View, Text, FlatList, ActivityIndicator} from 'react-native';
import {useCallback, useMemo, useRef} from 'react';
import {PhotoPost, useFetchObjectsGallery} from '@/hooks/useFetchObjectsGallery';
import ObjectsItem from '@/components/ObjectsList/ObjectsItem';

const PAGE_SIZE = 12;
const PREFETCH_THRESHOLD = 5; // за скільки айтемів до кінця підвантажувати

export default function ObjectsList() {
  const {data, isLoading, isError, refetch, fetchNextPage, hasNextPage, isFetchingNextPage, isRefetching} =
    useFetchObjectsGallery(PAGE_SIZE);

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
      length: 200,
      offset: 200 * index,
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

  // Щоб не дублювати запити під час того самого "кінця сторінки"
  const lastTriggeredPageRef = useRef(0);

  // зручно знати «поточну» сторінку з даних infiniteQuery
  const getCurrentPage = useCallback(() => {
    if (!data?.pages?.length) return 1;
    const last = data.pages[data.pages.length - 1];
    return Number(last.current_page || 1);
  }, [data]);

  // коли у вʼю попадає хвіст списку — префетчимо наступну сторінку
  const onViewableItemsChanged = useRef(({viewableItems}) => {
    if (!viewableItems?.length || !hasNextPage || isFetchingNextPage) return;

    const maxVisibleIndex = viewableItems.reduce(
      (acc, v) => (typeof v.index === 'number' && v.index > acc ? v.index : acc),
      -1,
    );

    // якщо залишилось <= PREFETCH_THRESHOLD айтемів — час тягнути наступну сторінку
    const itemsLeft = flatData.length - 1 - maxVisibleIndex;
    if (itemsLeft <= PREFETCH_THRESHOLD) {
      const pageNow = getCurrentPage();
      if (pageNow >= lastTriggeredPageRef.current) {
        lastTriggeredPageRef.current = pageNow + 1; // помічаємо, що вже запросили next
        fetchNextPage();
      }
    }
  }).current;

  // щоб працювало на iOS/Android однаково
  const viewabilityConfig = useRef({itemVisiblePercentThreshold: 50}).current;

  return (
    <FlatList
      data={flatData} // всі елементи з усіх сторінок
      keyExtractor={keyExtractor} // унікальний ключ
      renderItem={renderItem} // твій компонент картки
      numColumns={3}
      // UX
      contentContainerStyle={styles.container}
      removeClippedSubviews
      windowSize={2}
      initialNumToRender={PAGE_SIZE}
      maxToRenderPerBatch={PREFETCH_THRESHOLD}
      updateCellsBatchingPeriod={50}
      getItemLayout={getItemLayout} // якщо є фіксована висота
      // завантаження
      ListEmptyComponent={ListEmpty} // коли немає даних
      ListFooterComponent={
        isFetchingNextPage ? (
          <View style={{paddingVertical: 16, backgroundColor: '#000'}}>
            <ActivityIndicator size='small' />
          </View>
        ) : null
      }
      // infinite scroll
      onEndReachedThreshold={0.5} // за півекрана до кінця
      onEndReached={loadMore} // викликає fetchNextPage
      onViewableItemsChanged={onViewableItemsChanged} // префетч завчасно
      viewabilityConfig={viewabilityConfig}
      // refresh
      refreshing={isRefetching}
      onRefresh={refresh}
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
