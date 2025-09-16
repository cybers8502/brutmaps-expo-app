import {StyleSheet, Text, View, Image} from 'react-native';
import React from 'react';
import COLORS from '@/constants/Colors';

interface PictureInfoProps {
  uri: string;
  figcaption?: string;
}

export default function PictureInfo({uri, figcaption}: PictureInfoProps) {
  return (
    <View style={styles.galleryItem}>
      <Image source={{uri}} style={styles.galleryImage} />
      {figcaption && (
        <View style={styles.figcaptionWrap}>
          <Text style={styles.figcaption} numberOfLines={1} ellipsizeMode='tail'>
            {figcaption}
          </Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
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
    color: COLORS.textWhite,
  },
});
