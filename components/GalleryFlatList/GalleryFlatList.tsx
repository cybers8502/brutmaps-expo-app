import {FlatList, Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {ImageItem} from '@/hooks/useFetchObjectPost';

interface GalleryFlatListProps {
  gallery: ImageItem[];
}

export default function GalleryFlatList({gallery}: GalleryFlatListProps) {
  return (
    <FlatList
      horizontal
      data={gallery}
      keyExtractor={(item, index) => `${index}_${item.id}`}
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.galleryContainer}
      renderItem={({item}) => (
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
      )}
      getItemLayout={(_, index) => ({
        length: 220 + 16,
        offset: (220 + 16) * index,
        index,
      })}
    />
  );
}

const styles = StyleSheet.create({
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
    height: 220,
    borderRadius: 10,
    resizeMode: 'cover',
    zIndex: 1,
    backgroundColor: '#ccc',
  },
  figcaptionWrap: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    paddingLeft: 10,
    paddingRight: 4,
    backgroundColor: 'rgba(45, 45, 45, 0.8)',
    zIndex: 2,
  },
  figcaption: {
    fontSize: 10,
    lineHeight: 15,
    color: '#fff',
  },
});
