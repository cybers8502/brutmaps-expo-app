import {Pressable, StyleProp, StyleSheet, Text, TextStyle, ViewStyle} from 'react-native';
import COLORS from '@/constants/Colors';
import {ReactNode} from 'react';

interface PillProps {
  onPick: () => void;
  style?: StyleProp<ViewStyle>;
  styleText?: StyleProp<TextStyle>;
  children: ReactNode;
  active?: boolean;
}

export default function Pill({onPick, style, styleText, children, active}: PillProps) {
  return (
    <Pressable onPress={onPick} style={[styles.pill, style, active && styles.pillActive]}>
      <Text style={[styles.pillText, styleText, active && styles.pillTextActive]} numberOfLines={1}>
        {children}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  pill: {
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: COLORS.primary,
  },
  pillActive: {
    backgroundColor: COLORS.secondary,
    borderColor: COLORS.secondary,
  },
  pillText: {
    color: COLORS.textPrime,
    fontSize: 14,
  },
  secondPillText: {
    fontSize: 12,
  },
  pillTextActive: {
    color: COLORS.textWhite,
  },
});
