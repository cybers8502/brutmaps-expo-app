import {StyleProp, StyleSheet, TextStyle, ViewStyle} from 'react-native';
import Pill from '@/components/shared/Pill';
import {ReactNode} from 'react';

interface PillSmallerProps {
  onPick: () => void;
  style?: StyleProp<ViewStyle>;
  styleText?: StyleProp<TextStyle>;
  children: ReactNode;
  active?: boolean;
}

export default function PillSmaller({onPick, style, styleText, children, active}: PillSmallerProps) {
  return (
    <Pill
      onPick={onPick}
      style={[style, styles.pill]}
      styleText={[styleText, styles.pillText]}
      active={active}>
      {children}
    </Pill>
  );
}

const styles = StyleSheet.create({
  pill: {
    paddingHorizontal: 8,
    paddingTop: 5,
    paddingBottom: 6,
  },
  pillText: {
    fontSize: 12,
  },
});
