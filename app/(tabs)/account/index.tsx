import {SafeAreaView, StyleSheet, View, Text} from 'react-native';

export default function AccountScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Text>Account</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
