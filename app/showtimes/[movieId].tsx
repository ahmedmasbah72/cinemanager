import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
} from 'react-native';
import { Stack, router, useLocalSearchParams } from 'expo-router';
import { Calendar, Clock, MapPin, ChevronRight } from 'lucide-react-native';
import { colors, typography, spacing, borderRadius } from '@/constants/theme';
import { useApp } from '@/store/AppContext';

export default function ShowtimesScreen() {
  const { movieId } = useLocalSearchParams<{ movieId: string }>();
  const { getMovieById, getShowTimes, getCinemaById, getHallById } = useApp();

  const movie = getMovieById(movieId || '');
  const showtimes = getShowTimes(movieId);

  const [selectedDate, setSelectedDate] = useState<string>(
    showtimes[0]?.date || ''
  );

  if (!movie) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>Film introuvable</Text>
      </View>
    );
  }

  const uniqueDates = Array.from(new Set(showtimes.map((st) => st.date)));
  const filteredShowtimes = showtimes.filter((st) => st.date === selectedDate);

  const groupedByCinema = filteredShowtimes.reduce((acc, showtime) => {
    const cinemaId = showtime.cinemaId;
    if (!acc[cinemaId]) {
      acc[cinemaId] = [];
    }
    acc[cinemaId].push(showtime);
    return acc;
  }, {} as Record<string, typeof showtimes>);

  const posterSource = typeof movie.poster === 'string' ? { uri: movie.poster } : (movie.poster as any);

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: 'Séances' }} />

      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.movieHeader}>
          <Image source={posterSource} style={styles.poster} />
          <View style={styles.movieInfo}>
            <Text style={styles.movieTitle}>{movie.title}</Text>
            <Text style={styles.movieDuration}>{movie.duration} min</Text>
            <Text style={styles.movieGenres}>{movie.genres.join(', ')}</Text>
          </View>
        </View>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.datesContainer}
        >
          {uniqueDates.map((date) => {
            const isSelected = date === selectedDate;
            const dateObj = new Date(date);
            return (
              <TouchableOpacity
                key={date}
                style={[styles.dateChip, isSelected && styles.dateChipSelected]}
                onPress={() => setSelectedDate(date)}
                activeOpacity={0.7}
              >
                <Text
                  style={[
                    styles.dateDay,
                    isSelected && styles.dateTextSelected,
                  ]}
                >
                  {dateObj.toLocaleDateString('fr-FR', { weekday: 'short' })}
                </Text>
                <Text
                  style={[
                    styles.dateNumber,
                    isSelected && styles.dateTextSelected,
                  ]}
                >
                  {dateObj.getDate()}
                </Text>
                <Text
                  style={[
                    styles.dateMonth,
                    isSelected && styles.dateTextSelected,
                  ]}
                >
                  {dateObj.toLocaleDateString('fr-FR', { month: 'short' })}
                </Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>

        <View style={styles.content}>
          {Object.keys(groupedByCinema).length === 0 ? (
            <View style={styles.emptyContainer}>
              <Calendar color={colors.textMuted} size={48} />
              <Text style={styles.emptyText}>Aucune séance disponible</Text>
            </View>
          ) : (
            Object.keys(groupedByCinema).map((cinemaId) => {
              const cinema = getCinemaById(cinemaId);
              const cinemaShowtimes = groupedByCinema[cinemaId];

              if (!cinema) return null;

              return (
                <View key={cinemaId} style={styles.cinemaSection}>
                  <View style={styles.cinemaHeader}>
                    <View style={styles.cinemaInfo}>
                      <Text style={styles.cinemaName}>{cinema.name}</Text>
                      <View style={styles.cinemaDistance}>
                        <MapPin color={colors.textMuted} size={14} />
                        <Text style={styles.distanceText}>
                          {cinema.distance.toFixed(1)} km
                        </Text>
                      </View>
                    </View>
                  </View>

                  <View style={styles.showtimesGrid}>
                    {cinemaShowtimes.map((showtime) => {
                      const hall = getHallById(showtime.hallId);
                      return (
                        <TouchableOpacity
                          key={showtime.id}
                          style={styles.showtimeCard}
                          onPress={() =>
                            router.push({
                              pathname: '/seat-selection',
                              params: {
                                showtimeId: showtime.id,
                                movieId: movie.id,
                                cinemaId: cinema.id,
                                hallId: showtime.hallId,
                              },
                            } as any)
                          }
                          activeOpacity={0.7}
                        >
                          <View style={styles.showtimeTime}>
                            <Clock color={colors.primary} size={16} />
                            <Text style={styles.timeText}>{showtime.time}</Text>
                          </View>
                          <View style={styles.showtimeDetails}>
                            <View style={styles.formatBadge}>
                              <Text style={styles.formatText}>
                                {showtime.format}
                              </Text>
                            </View>
                            <Text style={styles.languageText}>
                              {showtime.language}
                            </Text>
                          </View>
                          <Text style={styles.hallText}>{hall?.name}</Text>
                          <View style={styles.showtimeFooter}>
                            <Text style={styles.priceText}>
                              {showtime.basePrice.toFixed(2)} Dhs
                            </Text>
                            <ChevronRight
                              color={colors.textMuted}
                              size={16}
                            />
                          </View>
                        </TouchableOpacity>
                      );
                    })}
                  </View>
                </View>
              );
            })
          )}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.background,
  },
  errorText: {
    ...typography.h3,
    color: colors.textSecondary,
  },
  movieHeader: {
    flexDirection: 'row',
    padding: spacing.md,
    backgroundColor: colors.backgroundCard,
    gap: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  poster: {
    width: 80,
    height: 120,
    borderRadius: borderRadius.md,
    backgroundColor: colors.backgroundElevated,
  },
  movieInfo: {
    flex: 1,
    justifyContent: 'center',
  },
  movieTitle: {
    ...typography.h4,
    color: colors.text,
    marginBottom: spacing.xs,
  },
  movieDuration: {
    ...typography.bodySmall,
    color: colors.textSecondary,
    marginBottom: 4,
  },
  movieGenres: {
    ...typography.caption,
    color: colors.textMuted,
  },
  datesContainer: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.md,
    gap: spacing.sm,
    backgroundColor: colors.backgroundElevated,
  },
  dateChip: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: borderRadius.md,
    backgroundColor: colors.backgroundCard,
    borderWidth: 1,
    borderColor: colors.border,
    alignItems: 'center',
    minWidth: 70,
  },
  dateChipSelected: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  dateDay: {
    ...typography.caption,
    color: colors.textMuted,
    textTransform: 'capitalize',
  },
  dateNumber: {
    ...typography.h4,
    color: colors.text,
    marginVertical: 2,
  },
  dateMonth: {
    ...typography.caption,
    color: colors.textMuted,
    textTransform: 'capitalize',
  },
  dateTextSelected: {
    color: colors.text,
  },
  content: {
    padding: spacing.md,
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
  cinemaSection: {
    marginBottom: spacing.xl,
  },
  cinemaHeader: {
    marginBottom: spacing.md,
  },
  cinemaInfo: {
    flex: 1,
  },
  cinemaName: {
    ...typography.h5,
    color: colors.text,
    marginBottom: 4,
  },
  cinemaDistance: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  distanceText: {
    ...typography.caption,
    color: colors.textMuted,
  },
  showtimesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
  },
  showtimeCard: {
    width: '48%',
    backgroundColor: colors.backgroundCard,
    borderRadius: borderRadius.lg,
    padding: spacing.sm,
    borderWidth: 1,
    borderColor: colors.border,
  },
  showtimeTime: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: spacing.xs,
  },
  timeText: {
    ...typography.h5,
    color: colors.text,
  },
  showtimeDetails: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
    marginBottom: spacing.xs,
  },
  formatBadge: {
    paddingHorizontal: spacing.xs,
    paddingVertical: 2,
    borderRadius: 4,
    backgroundColor: colors.backgroundElevated,
  },
  formatText: {
    fontSize: 10,
    color: colors.text,
    fontWeight: '700' as const,
  },
  languageText: {
    ...typography.caption,
    color: colors.textMuted,
  },
  hallText: {
    ...typography.caption,
    color: colors.textSecondary,
    marginBottom: spacing.xs,
  },
  showtimeFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: spacing.xs,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  priceText: {
    ...typography.bodySmall,
    color: colors.primary,
    fontWeight: '600' as const,
  },
});
