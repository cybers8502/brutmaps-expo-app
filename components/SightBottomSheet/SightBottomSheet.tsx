import React, {useEffect, useMemo, useRef, useState} from 'react';
import {Dimensions, StyleSheet, View, Text, ActivityIndicator} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import Animated, {useSharedValue} from 'react-native-reanimated';
import {BottomSheetModal, BottomSheetScrollView} from '@gorhom/bottom-sheet';

import {useFetchObjectPost} from '@/hooks/useFetchObjectPost';
import DescriptionBlock from '@/components/DescriptionBlock/DescriptionBlock';
import GalleryFlatList from '@/components/GalleryFlatList/GalleryFlatList';
import Header from '@/components/SightBottomSheet/Header';

const {height: SCREEN_HEIGHT} = Dimensions.get('window');
const SHEET_PADDING_V = 16;

type Props = {
  featureSlug: string;
  visible: boolean;
  onClose: () => void;
};

export default function SightBottomSheet({featureSlug, visible, onClose}: Props) {
  const {data: objectPost, isLoading} = useFetchObjectPost(featureSlug);
  const insets = useSafeAreaInsets();
  const sheetRef = useRef<BottomSheetModal>(null);

  const [headerH, setHeaderH] = useState(0);

  const previewPx = useMemo(() => {
    const raw = headerH + 242 + insets.top + SHEET_PADDING_V;
    return Math.min(Math.max(raw, 160), SCREEN_HEIGHT * 0.9);
  }, [headerH, insets.top]);

  const snapPoints = useMemo<(number | string)[]>(
    () => (isLoading ? ['5%', '100%'] : [previewPx || 300, '100%']),
    [isLoading, previewPx],
  );

  useEffect(() => {
    if (visible) sheetRef.current?.present();
    else sheetRef.current?.dismiss();
  }, [visible]);

  const scrollY = useSharedValue(0);
  const [isAtTop, setIsAtTop] = useState(true);

  const onScroll = (e: {nativeEvent: {contentOffset: {y: any}}}) => {
    const y = e.nativeEvent.contentOffset.y;
    const clamped = y <= 0 ? 0 : y;
    scrollY.value = clamped;
    const top = clamped <= 0;
    if (top !== isAtTop) setIsAtTop(top);
  };

  return (
    <BottomSheetModal
      ref={sheetRef}
      index={0}
      snapPoints={snapPoints}
      onDismiss={onClose}
      enablePanDownToClose
      enableContentPanningGesture={false}
      enableHandlePanningGesture
      handleComponent={() => (
        <Animated.View
          style={[styles.headerContainer, {paddingTop: 8}]}
          onLayout={(e) => setHeaderH(e.nativeEvent.layout.height)}>
          <Header
            title={isLoading ? 'Loading.' : (objectPost?.title ?? '')}
            address={isLoading ? '' : (objectPost?.address ?? '')}
            onClose={() => sheetRef.current?.dismiss()}
          />
        </Animated.View>
      )}
      topInset={insets.top}
      backgroundStyle={styles.sheetBg}
      handleIndicatorStyle={styles.handle}>
      {isLoading ? (
        <View style={{paddingHorizontal: 16, paddingVertical: 24, alignItems: 'center'}}>
          <ActivityIndicator />
          <Text style={{color: '#DFDDD9', marginTop: 12}}>Loading</Text>
        </View>
      ) : (
        <BottomSheetScrollView
          onScroll={onScroll}
          bounces={false}
          contentContainerStyle={{paddingBottom: insets.bottom + 24}}
          showsVerticalScrollIndicator>
          {objectPost?.topGallery?.length ? (
            <View
              style={{
                height: objectPost?.topGallery?.length ? 220 : 0,
                marginBottom: objectPost?.topGallery?.length ? 16 : 0,
              }}>
              {objectPost?.topGallery?.length ? <GalleryFlatList gallery={objectPost?.topGallery} /> : null}
            </View>
          ) : (
            ''
          )}
          <View style={{paddingHorizontal: 16}}>
            <Text style={[styles.secondText, {marginBottom: 8}]} numberOfLines={1} ellipsizeMode='tail'>
              Contributed by:
            </Text>

            {objectPost?.description ? <DescriptionBlock description={objectPost?.description} /> : null}
          </View>
        </BottomSheetScrollView>
      )}
    </BottomSheetModal>
  );
}

const styles = StyleSheet.create({
  sheetBg: {
    backgroundColor: '#1C1C1C',
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },
  headerContainer: {
    paddingBottom: 8,
    zIndex: 2,
    shadowColor: '#000',
    shadowRadius: 12,
    shadowOffset: {width: 0, height: 6},
  },
  secondText: {
    color: '#DFDDD9',
    fontSize: 14,
    lineHeight: 14,
  },
  handle: {
    alignSelf: 'center',
    width: 40,
    height: 4,
    borderRadius: 2,
    backgroundColor: '#666',
    marginBottom: 16,
  },
});
