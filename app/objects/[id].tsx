import {useLocalSearchParams} from 'expo-router';
import {Text, StyleSheet, SafeAreaView} from 'react-native';

export default function ObjectDetails() {
  const {id} = useLocalSearchParams<{id: string}>();
  return (
    <SafeAreaView style={styles.container}>
      <Text>Деталі обʼєкта: {id}</Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
