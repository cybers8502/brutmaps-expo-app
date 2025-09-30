import {StyleSheet, Text} from 'react-native';

interface ObjectsListEmptyTextProps {
  text: string;
}

export default function ObjectsListNotification({text}: ObjectsListEmptyTextProps) {
  return <Text style={styles.center}>{text}</Text>;
}

const styles = StyleSheet.create({
  center: {
    padding: 16,
    textAlign: 'center',
    color: '#444',
  },
});
