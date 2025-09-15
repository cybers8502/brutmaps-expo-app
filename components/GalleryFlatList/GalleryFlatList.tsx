import {FlatList, Image, Pressable, StyleSheet, Text, View} from 'react-native';
import React, {useMemo, useState} from 'react';
import {ImageItem} from '@/hooks/useFetchObjectPost';
import ImageViewing from 'react-native-image-viewing';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import COLORS from '@/constants/Colors';

interface GalleryFlatListProps {
  gallery: ImageItem[];
}

export default function GalleryFlatList({gallery}: GalleryFlatListProps) {
  const [index, setIndex] = useState(0);
  const [visible, setVisible] = useState(false);
  const insets = useSafeAreaInsets();

  const images = useMemo(() => (gallery ?? []).map((p) => ({uri: p.url})), [gallery]);

  return (
    <>
      <FlatList
        horizontal
        data={gallery}
        keyExtractor={(item, index) => `${index}_${item.id}`}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.galleryContainer}
        renderItem={({item, index}) => (
          <Pressable
            onPress={() => {
              setIndex(index);
              setVisible(true);
            }}>
            <View style={styles.galleryItem}>
              <Image source={{uri: item.url}} style={styles.galleryImage} />
              {!!item?.author?.figcaption && (
                <View style={styles.figcaptionWrap}>
                  <Text style={styles.figcaption} numberOfLines={1} ellipsizeMode='tail'>
                    {item.author.figcaption}
                  </Text>
                </View>
              )}
            </View>
          </Pressable>
        )}
        getItemLayout={(_, index) => ({
          length: 220 + 16,
          offset: (220 + 16) * index,
          index,
        })}
      />

      <ImageViewing
        images={images}
        imageIndex={index}
        visible={visible}
        onRequestClose={() => setVisible(false)}
        swipeToCloseEnabled
        doubleTapToZoomEnabled
        animationType='fade'
        HeaderComponent={({imageIndex}) => (
          <View style={{position: 'relative', marginBlockStart: insets.top + 16, paddingHorizontal: 16}}>
            <Text style={{color: '#fff'}}>
              {imageIndex + 1}/{images.length}
            </Text>

            <Pressable style={styles.close} onPress={() => setVisible(false)} hitSlop={8}>
              <Text style={styles.closeText}>×</Text>
            </Pressable>
          </View>
        )}
        FooterComponent={({imageIndex}) => {
          const cap = gallery?.[imageIndex]?.author?.figcaption;
          if (!cap) return null;
          return (
            <View style={{paddingHorizontal: 16, paddingBottom: insets.bottom}}>
              <Text style={{color: '#fff'}} numberOfLines={2}>
                {cap}
              </Text>
            </View>
          );
        }}
      />
    </>
  );
}

const styles = StyleSheet.create({
  close: {
    position: 'absolute',
    top: -8,
    right: 12,
    padding: 4,
    zIndex: 1,
    elevation: 1,
  },
  closeText: {
    color: COLORS.textWhite,
    fontSize: 18,
  },
  galleryContainer: {
    paddingStart: 16,
  },
  galleryItem: {
    position: 'relative',
    height: 220,
    marginRight: 16,
    alignItems: 'center',
    overflow: 'hidden',
  },
  galleryImage: {
    position: 'relative',
    width: 220,
    height: 220,
    borderRadius: 10,
    resizeMode: 'cover',
    zIndex: 1,
    elevation: 1,
    backgroundColor: COLORS.backgroundWhite,
  },
  figcaptionWrap: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    paddingLeft: 10,
    paddingRight: 4,
    backgroundColor: 'rgba(45, 45, 45, 0.8)',
    zIndex: 2,
    elevation: 2,
  },
  figcaption: {
    fontSize: 10,
    lineHeight: 15,
    color: COLORS.backgroundWhite,
  },
});
