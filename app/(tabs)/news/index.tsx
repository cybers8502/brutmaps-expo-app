import {SafeAreaView, StyleSheet, View, Text} from 'react-native';

export default function NewsScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Text>News</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
