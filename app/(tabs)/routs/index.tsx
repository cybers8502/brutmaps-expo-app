import {SafeAreaView, StyleSheet, View, Text} from 'react-native';

export default function RoutsScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Text>Routs</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
