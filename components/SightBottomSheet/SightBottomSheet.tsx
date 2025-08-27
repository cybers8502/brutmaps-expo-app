import React, {useEffect} from 'react';
import {Dimensions, StyleSheet, View, Text} from 'react-native';
import Animated, {runOnJS, useAnimatedStyle, useSharedValue, withSpring} from 'react-native-reanimated';
import {Gesture, GestureDetector, GestureHandlerRootView} from 'react-native-gesture-handler';
import useFetchObjectPost from '@/hooks/useFetchObjectPost';
import DescriptionBlock from '@/components/DescriptionBlock/DescriptionBlock';
import GalleryFlatList from '@/components/GalleryFlatList/GalleryFlatList';
import Header from '@/components/SightBottomSheet/Header';

const {height: SCREEN_HEIGHT} = Dimensions.get('window');
const SNAP_PREVIEW = SCREEN_HEIGHT * 0.25;
const SNAP_EXPANDED = SCREEN_HEIGHT * 0.6;

interface SightBottomSheetProps {
  featureSlug: string;
  visible: boolean;
  onClose: () => void;
}

export default function SightBottomSheet({featureSlug, visible, onClose}: SightBottomSheetProps) {
  const translateY = useSharedValue(SCREEN_HEIGHT);
  const {objectPost} = useFetchObjectPost(featureSlug);

  useEffect(() => {
    translateY.value = withSpring(visible ? SCREEN_HEIGHT - SNAP_PREVIEW : SCREEN_HEIGHT, {damping: 30});
  }, [visible]);

  const gesture = Gesture.Pan()
    .activeOffsetY([-10, 10])
    .onChange((e) => {
      translateY.value = Math.max(SCREEN_HEIGHT - SNAP_EXPANDED, translateY.value + e.changeY);
    })
    .onEnd(() => {
      const closeThreshold = SCREEN_HEIGHT - SNAP_PREVIEW + 50;
      if (translateY.value > closeThreshold) {
        translateY.value = withSpring(SCREEN_HEIGHT, {}, () => runOnJS(onClose)());
      } else if (translateY.value < SCREEN_HEIGHT - SNAP_EXPANDED + 50) {
        translateY.value = withSpring(SCREEN_HEIGHT - SNAP_EXPANDED);
      } else {
        translateY.value = withSpring(SCREEN_HEIGHT - SNAP_PREVIEW);
      }
    });

  const style = useAnimatedStyle(() => ({
    transform: [{translateY: translateY.value}],
  }));

  if (!objectPost) return null;

  const {title, address, topGallery, description} = objectPost;

  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <Animated.View style={[styles.sheet, style]}>
        <GestureDetector gesture={gesture}>
          <View collapsable={false}>
            <Header title={title} address={address} onClose={onClose} />
          </View>
        </GestureDetector>

        <View style={{height: 220, marginBottom: 16}}>
          {topGallery?.length && <GalleryFlatList gallery={topGallery} />}
        </View>

        <View style={{paddingHorizontal: 16}}>
          <Text style={styles.secondText}>Contributed by: </Text>
          {description && <DescriptionBlock description={description} />}
        </View>
      </Animated.View>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  sheet: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: SCREEN_HEIGHT,
    paddingVertical: 16,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    backgroundColor: '#1C1C1C',
    zIndex: 2,
  },
  secondText: {
    marginBottom: 8,
    color: '#DFDDD9',
    fontSize: 14,
    lineHeight: 14,
  },
});
