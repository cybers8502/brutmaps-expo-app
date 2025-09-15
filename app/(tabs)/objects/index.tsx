import {SafeAreaView, StyleSheet, View, Text} from 'react-native';

export default function ObjectsScreen() {

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Text>Objects</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
