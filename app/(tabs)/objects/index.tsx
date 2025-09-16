import {SafeAreaView, StyleSheet} from 'react-native';
import ObjectsFlatList from '@/components/ObjectsFlatList/ObjectsFlatList';

export default function ObjectsScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <ObjectsFlatList />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
