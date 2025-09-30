import {ActivityIndicator, StyleSheet, View} from 'react-native';

interface ObjectsListLoaderProps {
  visible: boolean;
}

export default function ObjectsListLoader({visible}: ObjectsListLoaderProps) {
  if (!visible) return null;

  return (
    <View style={styles.container}>
      <ActivityIndicator size='small' />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 16,
  },
});
