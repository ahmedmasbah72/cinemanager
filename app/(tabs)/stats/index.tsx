import React from 'react';
import { View, Text, StyleSheet, ScrollView, SafeAreaView } from 'react-native';
import { Stack } from 'expo-router';
import { colors, typography, spacing, borderRadius } from '@/constants/theme';
import { useApp } from '@/store/AppContext';
import { TrendingUp, DollarSign, Film, MapPin } from 'lucide-react-native';

export default function StatsScreen() {
  const { bookings, tickets, getMovies, getCinemas } = useApp();

  const movies = getMovies();
  const cinemas = getCinemas();

  const confirmedBookings = bookings.filter((b) => b.status === 'confirmed');
  const totalSpent = confirmedBookings.reduce((sum, b) => sum + b.totalPrice, 0);

  const currentMonth = new Date().getMonth();
  const monthlyBookings = confirmedBookings.filter((b) => {
    const bookingMonth = new Date(b.bookingDate).getMonth();
    return bookingMonth === currentMonth;
  });

  const movieBookingCounts: Record<string, number> = {};
  confirmedBookings.forEach((booking) => {
    movieBookingCounts[booking.movieId] = (movieBookingCounts[booking.movieId] || 0) + 1;
  });

  const mostBookedMovieId = Object.keys(movieBookingCounts).sort(
    (a, b) => movieBookingCounts[b] - movieBookingCounts[a]
  )[0];
  const mostBookedMovie = movies.find((m) => m.id === mostBookedMovieId);

  const cinemaBookingCounts: Record<string, number> = {};
  confirmedBookings.forEach((booking) => {
    cinemaBookingCounts[booking.cinemaId] = (cinemaBookingCounts[booking.cinemaId] || 0) + 1;
  });

  const mostVisitedCinemaId = Object.keys(cinemaBookingCounts).sort(
    (a, b) => cinemaBookingCounts[b] - cinemaBookingCounts[a]
  )[0];
  const mostVisitedCinema = cinemas.find((c) => c.id === mostVisitedCinemaId);

  return (
    <SafeAreaView style={styles.container}>
      <Stack.Screen
        options={{
          headerShown: true,
          headerTitle: 'Statistiques',
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

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.statsGrid}>
          <View style={[styles.statCard, styles.statCardPrimary]}>
            <TrendingUp color={colors.primary} size={28} />
            <Text style={styles.statValue}>{monthlyBookings.length}</Text>
            <Text style={styles.statLabel}>Ce mois</Text>
          </View>

          <View style={styles.statCard}>
            <DollarSign color={colors.accent} size={28} />
            <Text style={styles.statValue}>{totalSpent.toFixed(0)} Dhs</Text>
            <Text style={styles.statLabel}>Dépensé</Text>
          </View>
        </View>

        <View style={styles.statsGrid}>
          <View style={styles.statCard}>
            <Film color={colors.neon} size={28} />
            <Text style={styles.statValue}>{confirmedBookings.length}</Text>
            <Text style={styles.statLabel}>Réservations</Text>
          </View>

          <View style={styles.statCard}>
            <MapPin color={colors.success} size={28} />
            <Text style={styles.statValue}>{tickets.length}</Text>
            <Text style={styles.statLabel}>Tickets</Text>
          </View>
        </View>

        {mostBookedMovie && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Film le plus réservé</Text>
            <View style={styles.infoCard}>
              <Text style={styles.infoTitle}>{mostBookedMovie.title}</Text>
              <Text style={styles.infoSubtitle}>
                {movieBookingCounts[mostBookedMovie.id]} réservation
                {movieBookingCounts[mostBookedMovie.id] > 1 ? 's' : ''}
              </Text>
            </View>
          </View>
        )}

        {mostVisitedCinema && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Cinéma préféré</Text>
            <View style={styles.infoCard}>
              <Text style={styles.infoTitle}>{mostVisitedCinema.name}</Text>
              <Text style={styles.infoSubtitle}>
                {cinemaBookingCounts[mostVisitedCinema.id]} visite
                {cinemaBookingCounts[mostVisitedCinema.id] > 1 ? 's' : ''}
              </Text>
            </View>
          </View>
        )}

        {confirmedBookings.length === 0 && (
          <View style={styles.emptyContainer}>
            <TrendingUp color={colors.textMuted} size={48} />
            <Text style={styles.emptyText}>Pas encore de statistiques</Text>
            <Text style={styles.emptySubText}>
              Réservez des films pour voir vos stats
            </Text>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    padding: spacing.md,
  },
  statsGrid: {
    flexDirection: 'row',
    gap: spacing.md,
    marginBottom: spacing.md,
  },
  statCard: {
    flex: 1,
    backgroundColor: colors.backgroundCard,
    borderRadius: borderRadius.lg,
    padding: spacing.md,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.border,
  },
  statCardPrimary: {
    borderColor: colors.primary,
    borderWidth: 2,
  },
  statValue: {
    ...typography.h2,
    color: colors.text,
    marginTop: spacing.sm,
  },
  statLabel: {
    ...typography.caption,
    color: colors.textMuted,
    marginTop: 4,
  },
  section: {
    marginTop: spacing.md,
  },
  sectionTitle: {
    ...typography.h4,
    color: colors.text,
    marginBottom: spacing.sm,
  },
  infoCard: {
    backgroundColor: colors.backgroundCard,
    borderRadius: borderRadius.lg,
    padding: spacing.md,
    borderWidth: 1,
    borderColor: colors.border,
  },
  infoTitle: {
    ...typography.h5,
    color: colors.text,
    marginBottom: 4,
  },
  infoSubtitle: {
    ...typography.bodySmall,
    color: colors.textSecondary,
  },
  emptyContainer: {
    alignItems: 'center',
    paddingVertical: spacing.xxl,
  },
  emptyText: {
    ...typography.h4,
    color: colors.textSecondary,
    marginTop: spacing.md,
  },
  emptySubText: {
    ...typography.bodySmall,
    color: colors.textMuted,
    marginTop: spacing.xs,
  },
});
