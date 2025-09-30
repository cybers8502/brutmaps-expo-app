import React from 'react';
import {View, Image, Text, StyleSheet, ImageStyle, ViewStyle, TextStyle} from 'react-native';
import COLORS from '@/constants/Colors';

interface PictureInfoProps {
  uri?: string;
  figcaption?: string;
  height?: number;
  width?: number;
  size?: number;
  resizeMode?: 'cover' | 'contain' | 'stretch' | 'center';
  containerStyle?: ViewStyle;
  imageStyle?: ImageStyle;
  captionStyle?: TextStyle;
}

export default function PictureCard({
  uri,
  figcaption,
                                      height,
  width,
  size = 220,
  resizeMode = 'cover',
  containerStyle,
  imageStyle,
  captionStyle,
}: PictureInfoProps) {
  return (
    <View style={[styles.container, {height: height || size, width: width || size}, containerStyle]}>
      <Image
        source={uri ? {uri} : require('@/assets/images/placeholder.png')}
        style={[styles.image, {height: height || size, width: width || size}, imageStyle]}
        resizeMode={resizeMode}
      />

      {figcaption && (
        <View style={styles.captionWrap}>
          <Text style={[styles.caption, captionStyle]} numberOfLines={1} ellipsizeMode='tail'>
            {figcaption}
          </Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    alignItems: 'center',
    overflow: 'hidden',
  },
  image: {
    backgroundColor: COLORS.backgroundWhite,
    zIndex: 1,
    elevation: 1,
  },
  captionWrap: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingHorizontal: 8,
    paddingVertical: 2,
    backgroundColor: 'rgba(45, 45, 45, 0.8)',
    zIndex: 2,
    elevation: 2,
  },
  caption: {
    fontSize: 10,
    lineHeight: 14,
    color: COLORS.textWhite,
  },
});
