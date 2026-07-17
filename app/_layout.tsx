import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import React, { useEffect } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { StyleSheet } from "react-native";
import { colors } from "@/constants/theme";
import { AppProvider } from "@/store/AppContext";

SplashScreen.preventAutoHideAsync();

function RootLayoutNav() {
  return (
    <Stack
      screenOptions={{
        headerBackTitle: "Retour",
        headerStyle: {
          backgroundColor: colors.backgroundElevated,
        },
        headerTintColor: colors.text,
        headerTitleStyle: {
          fontWeight: '600' as const,
        },
        contentStyle: {
          backgroundColor: colors.background,
        },
      }}
    >
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen
        name="movie/[id]"
        options={{ headerShown: true, title: "Détails du film" }}
      />
      <Stack.Screen
        name="cinema/[id]"
        options={{ headerShown: true, title: "Détails du cinéma" }}
      />
      <Stack.Screen
        name="showtimes/[movieId]"
        options={{ headerShown: true, title: "Séances" }}
      />
      <Stack.Screen
        name="seat-selection"
        options={{ headerShown: true, title: "Sélection des sièges" }}
      />
      <Stack.Screen
        name="checkout"
        options={{ headerShown: true, title: "Confirmation" }}
      />
      <Stack.Screen
        name="ticket/[id]"
        options={{ headerShown: true, title: "Ticket" }}
      />
    </Stack>
  );
}

export default function RootLayout() {
  useEffect(() => {
    SplashScreen.hideAsync();
  }, []);

  return (
    <GestureHandlerRootView style={styles.container}>
      <AppProvider>
        <RootLayoutNav />
      </AppProvider>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
