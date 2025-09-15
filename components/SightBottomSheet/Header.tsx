import {Pressable, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import COLORS from '@/constants/Colors';

interface HeaderProps {
  title: string;
  address: string;
  onClose: () => void;
}

export default function Header({title, address, onClose}: HeaderProps) {
  return (
    <View style={styles.header}>
      <View style={styles.handle} />
      <Pressable style={styles.close} onPress={onClose} hitSlop={8}>
        <Text style={styles.closeText}>×</Text>
      </Pressable>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.secondText}>{address}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    width: '100%',
    paddingHorizontal: 16,
  },
  handle: {
    alignSelf: 'center',
    width: 40,
    height: 4,
    borderRadius: 2,
    backgroundColor: COLORS.componentHandlePrime,
    marginBottom: 8,
  },
  close: {
    position: 'absolute',
    top: 8,
    right: 8,
    padding: 4,
    zIndex: 1,
    elevation: 1,
  },
  closeText: {
    color: COLORS.textWhite,
    fontSize: 18,
  },
  title: {
    marginBottom: 8,
    color: COLORS.textWhite,
    fontSize: 17,
    lineHeight: 22,
    fontWeight: '600',
  },
  secondText: {
    marginBottom: 16,
    color: COLORS.textWhite,
    fontSize: 14,
    lineHeight: 14,
  },
});
