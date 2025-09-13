import {Stack} from 'expo-router';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {BottomSheetModalProvider} from '@gorhom/bottom-sheet';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {QueryClientProvider} from '@tanstack/react-query';
import {queryClient} from '@/utils/queryClient';

export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <QueryClientProvider client={queryClient}>
        <GestureHandlerRootView>
          <BottomSheetModalProvider>
            <Stack>
              <Stack.Screen
                name='index'
                options={{
                  title: 'Home',
                  headerTransparent: true,
                  headerTitle: 'HomeT',
                  headerShadowVisible: false,
                }}
              />
              <Stack.Screen name='map' options={{title: 'Map', headerShown: false}} />
            </Stack>
          </BottomSheetModalProvider>
        </GestureHandlerRootView>
      </QueryClientProvider>
    </SafeAreaProvider>
  );
}
