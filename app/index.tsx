import {StyleSheet, Text, View} from 'react-native';
import {Link} from 'expo-router';
import COLORS from '@/constants/Colors';
import FONT_SiZE from '@/constants/Text';

export default function Index() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Edit app/index.tsx to edit this screen.</Text>
      <Link href='/map' style={styles.button}>
        Go to About screen
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.backgroundPrime,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: COLORS.textWhite,
  },
  button: {
    fontSize: FONT_SiZE.primary,
    textDecorationLine: 'underline',
    color: COLORS.textWhite,
  },
});
