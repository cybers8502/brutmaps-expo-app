import {Redirect} from 'expo-router';

export default function Index() {
  return <Redirect href='/(tabs)/map' />;

  /*const isLoggedIn = false;

  return (
    if (!isLoggedIn) {
    return <Redirect href="/login" />;
  }
  return <Redirect href="/(tabs)/map" />;
  );*/
}
