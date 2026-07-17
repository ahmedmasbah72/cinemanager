import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { Stack, router, useLocalSearchParams } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { ChevronRight } from 'lucide-react-native';
import { colors, typography, spacing, borderRadius } from '@/constants/theme';
import { useApp } from '@/store/AppContext';
import { SeatMap } from '@/components/SeatMap';
import { Seat } from '@/types/models';

export default function SeatSelectionScreen() {
  const { showtimeId, movieId, cinemaId, hallId } = useLocalSearchParams<{
    showtimeId: string;
    movieId: string;
    cinemaId: string;
    hallId: string;
  }>();

  const { getMovieById, getCinemaById, getHallById, getShowTimes } = useApp();

  const movie = getMovieById(movieId || '');
  const cinema = getCinemaById(cinemaId || '');
  const hall = getHallById(hallId || '');
  const showtimes = getShowTimes(movieId);
  const showtime = showtimes.find((st) => st.id === showtimeId);

  const [selectedSeats, setSelectedSeats] = useState<Seat[]>([]);

  if (!movie || !cinema || !hall || !showtime) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>Informations introuvables</Text>
      </View>
    );
  }

  const occupiedSeats = ['2-5', '2-6', '3-8', '3-9', '5-10', '7-7'];

  const handleSeatSelect = (seat: Seat) => {
    const isSelected = selectedSeats.some((s) => s.id === seat.id);
    if (isSelected) {
      setSelectedSeats(selectedSeats.filter((s) => s.id !== seat.id));
    } else {
      setSelectedSeats([...selectedSeats, seat]);
    }
  };

  const totalPrice = selectedSeats.reduce((sum, seat) => sum + seat.price, 0);

  const handleContinue = () => {
    router.push({
      pathname: '/checkout',
      params: {
        showtimeId: showtime.id,
        movieId: movie.id,
        cinemaId: cinema.id,
        hallId: hall.id,
        seats: JSON.stringify(selectedSeats),
      },
    } as any);
  };

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: 'Sélection des sièges' }} />

      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.movieTitle}>{movie.title}</Text>
          <Text style={styles.showInfo}>
            {cinema.name} • {showtime.time} • {showtime.format}
          </Text>
          <Text style={styles.hallName}>{hall.name}</Text>
        </View>

        <SeatMap
          rows={hall.rows}
          seatsPerRow={hall.seatsPerRow}
          occupiedSeats={occupiedSeats}
          selectedSeats={selectedSeats}
          onSeatSelect={handleSeatSelect}
          basePrice={showtime.basePrice}
        />
      </ScrollView>

      {selectedSeats.length > 0 && (
        <View style={styles.footer}>
          <View style={styles.footerInfo}>
            <Text style={styles.seatsCount}>
              {selectedSeats.length} siège{selectedSeats.length > 1 ? 's' : ''}
            </Text>
            <Text style={styles.totalPrice}>{totalPrice.toFixed(2)} Dhs</Text>
          </View>
          <TouchableOpacity
            style={styles.continueButton}
            onPress={handleContinue}
            activeOpacity={0.8}
          >
            <LinearGradient
              colors={[colors.primary, colors.primaryDark]}
              style={styles.continueButtonGradient}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
            >
              <Text style={styles.continueButtonText}>Continuer</Text>
              <ChevronRight color={colors.text} size={20} />
            </LinearGradient>
          </TouchableOpacity>
        </View>
      )}
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
  header: {
    padding: spacing.md,
    backgroundColor: colors.backgroundCard,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  movieTitle: {
    ...typography.h4,
    color: colors.text,
    marginBottom: spacing.xs,
  },
  showInfo: {
    ...typography.bodySmall,
    color: colors.textSecondary,
    marginBottom: 4,
  },
  hallName: {
    ...typography.caption,
    color: colors.textMuted,
  },
  footer: {
    backgroundColor: colors.backgroundCard,
    borderTopWidth: 1,
    borderTopColor: colors.border,
    padding: spacing.md,
  },
  footerInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  seatsCount: {
    ...typography.body,
    color: colors.textSecondary,
  },
  totalPrice: {
    ...typography.h3,
    color: colors.text,
  },
  continueButton: {
    borderRadius: borderRadius.md,
    overflow: 'hidden',
  },
  continueButtonGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: spacing.md,
    gap: spacing.sm,
  },
  continueButtonText: {
    ...typography.button,
    color: colors.text,
  },
});
