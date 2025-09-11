import {StyleSheet, Text, TextStyle} from 'react-native';
import React from 'react';
import COLORS from '@/constants/Colors';

interface SubtitleProps {
  style?: TextStyle;
  children: React.ReactNode;
}

export default function Subtitle({children, style}: SubtitleProps) {
  return <Text style={[styles.element, style]}>{children}</Text>;
}

const styles = StyleSheet.create({
  element: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.textPrime,
  },
});
