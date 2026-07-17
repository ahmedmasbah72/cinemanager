import React from 'react';
import { StyleSheet, FlatList, SafeAreaView } from 'react-native';
import { Stack, router } from 'expo-router';
import { colors, typography, spacing } from '@/constants/theme';
import { useApp } from '@/store/AppContext';
import { CinemaCard } from '@/components/CinemaCard';

export default function CinemasScreen() {
  const { getCinemas } = useApp();
  const cinemas = getCinemas();

  return (
    <SafeAreaView style={styles.container}>
      <Stack.Screen
        options={{
          headerShown: true,
          headerTitle: 'Cinémas',
          headerStyle: {
            backgroundColor: colors.backgroundElevated,
          },
          headerTintColor: colors.text,
          headerTitleStyle: {
            ...typography.h3,
            fontWeight: '700' as const,
          },
        }}
      />

      <FlatList
        data={cinemas}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <CinemaCard
            cinema={item}
            onPress={() => router.push(`/cinema/${item.id}` as any)}
          />
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  list: {
    padding: spacing.md,
  },
});
