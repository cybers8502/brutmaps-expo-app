import {StyleSheet, FlatList, Dimensions} from 'react-native';
import {useCallback, useRef} from 'react';
import {PhotoPost, useFetchObjectsGallery} from '@/components/ObjectsList/hooks/useFetchObjectsGallery';
import ObjectsListItem from '@/components/ObjectsList/ObjectsListItem';
import ObjectsListLoader from '@/components/ObjectsList/ObjectsListLoader';
import ObjectsListEmpty from '@/components/ObjectsList/ObjectsListEmpty';

const PAGE_SIZE = 24;
const PREFETCH_THRESHOLD = 5; // за скільки айтемів до кінця підвантажувати

function getCellWidth(columns: number, gap: number, padding: number = 0) {
  const screenWidth = Dimensions.get('window').width;
  return (screenWidth - padding * 2 - gap * (columns - 1)) / columns;
}

//TODO fix eslinter bugs

export default function ObjectsList() {
  const {data, isLoading, isError, refetch, fetchNextPage, hasNextPage, isFetchingNextPage, isRefetching} =
    useFetchObjectsGallery(PAGE_SIZE);

  const flatData = data?.pages.flatMap((p) => p.posts) ?? [];

  const keyExtractor = useCallback((item: PhotoPost) => item.post_id, []);

  const renderItem = useCallback(({item}: {item: PhotoPost}) => <ObjectsListItem item={item} />, []);

  const getItemLayout = useCallback((_: any, index: number) => {
    const row = Math.floor(index / 3);
    return {
      length: getCellWidth(3, 0, 0) * 1.6,
      offset: getCellWidth(3, 0, 0) * 1.6 * row,
      index,
    };
  }, []);

  const loadMore = useCallback(() => {
    console.log('load more function is triggered');
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
      style={styles.container}
      removeClippedSubviews //прибирає з екрану елементи, які вийшли за межі viewport (обрізані).
      windowSize={2} //визначає, скільки “вікон” екрану вперед/назад FlatList буде тримати в пам’яті. (тільки поточний viewport/поточний + один екран вперед/назад / агресивне кешування, зручно коли користувач швидко скролить.)
      initialNumToRender={PAGE_SIZE} //скільки елементів відрендерити одразу при першому показі списку.
      maxToRenderPerBatch={PREFETCH_THRESHOLD} //максимальна кількість айтемів, які FlatList може відрендерити за один цикл.
      updateCellsBatchingPeriod={50} //час (мс) між партіями рендеру айтемів
      getItemLayout={getItemLayout} // дозволяє FlatList швидко порахувати позицію айтемів, якщо всі вони мають однакову висоту.
      // завантаження
      ListEmptyComponent={<ObjectsListEmpty isLoading={isLoading} isError={isError} />} // коли немає даних
      ListFooterComponent={<ObjectsListLoader visible={isFetchingNextPage} />}
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
});
