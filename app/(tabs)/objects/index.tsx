import {SafeAreaView, StyleSheet} from 'react-native';
import ObjectsList from '@/components/ObjectsList';

export default function ObjectsScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <ObjectsList />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
