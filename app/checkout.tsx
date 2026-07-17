import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { Stack, router, useLocalSearchParams } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { Check, Calendar, MapPin, Clock, Users, CreditCard } from 'lucide-react-native';
import { colors, typography, spacing, borderRadius } from '@/constants/theme';
import { useApp } from '@/store/AppContext';
import { Seat } from '@/types/models';

export default function CheckoutScreen() {
  const { showtimeId, movieId, cinemaId, hallId, seats } = useLocalSearchParams<{
    showtimeId: string;
    movieId: string;
    cinemaId: string;
    hallId: string;
    seats: string;
  }>();

  const { getMovieById, getCinemaById, getHallById, getShowTimes, createBooking } = useApp();

  const movie = getMovieById(movieId || '');
  const cinema = getCinemaById(cinemaId || '');
  const hall = getHallById(hallId || '');
  const showtimes = getShowTimes(movieId);
  const showtime = showtimes.find((st) => st.id === showtimeId);
  const selectedSeats: Seat[] = seats ? JSON.parse(seats as string) : [];

  if (!movie || !cinema || !hall || !showtime) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>Informations introuvables</Text>
      </View>
    );
  }

  const totalPrice = selectedSeats.reduce((sum, seat) => sum + seat.price, 0);

  const handleConfirm = async () => {
    try {
      await createBooking(showtime, movie, cinema, hall, selectedSeats);
      
      Alert.alert(
        'Réservation confirmée !',
        'Votre ticket a été créé avec succès.',
        [
          {
            text: 'Voir le ticket',
            onPress: () => {
              router.replace('/(tabs)/tickets');
            },
          },
        ]
      );
    } catch {
      Alert.alert('Erreur', 'Une erreur est survenue lors de la réservation.');
    }
  };

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: 'Confirmation' }} />

      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.content}>
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Récapitulatif</Text>
            
            <View style={styles.card}>
              <Text style={styles.movieTitle}>{movie.title}</Text>
              
              <View style={styles.infoRow}>
                <MapPin color={colors.textSecondary} size={16} />
                <Text style={styles.infoText}>{cinema.name}</Text>
              </View>

              <View style={styles.infoRow}>
                <Calendar color={colors.textSecondary} size={16} />
                <Text style={styles.infoText}>
                  {new Date(showtime.date).toLocaleDateString('fr-FR', {
                    weekday: 'long',
                    day: 'numeric',
                    month: 'long',
                  })}
                </Text>
              </View>

              <View style={styles.infoRow}>
                <Clock color={colors.textSecondary} size={16} />
                <Text style={styles.infoText}>{showtime.time}</Text>
              </View>

              <View style={styles.infoRow}>
                <Users color={colors.textSecondary} size={16} />
                <Text style={styles.infoText}>
                  {selectedSeats.length} place{selectedSeats.length > 1 ? 's' : ''}
                </Text>
              </View>
            </View>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Sièges sélectionnés</Text>
            <View style={styles.seatsContainer}>
              {selectedSeats.map((seat) => (
                <View key={seat.id} style={styles.seatChip}>
                  <Text style={styles.seatText}>
                    {String.fromCharCode(65 + seat.row)}{seat.number + 1}
                  </Text>
                  <Text style={styles.seatPrice}>{seat.price.toFixed(2)} Dhs</Text>
                </View>
              ))}
            </View>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Détails</Text>
            <View style={styles.card}>
              <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>Format</Text>
                <Text style={styles.detailValue}>{showtime.format}</Text>
              </View>
              <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>Langue</Text>
                <Text style={styles.detailValue}>{showtime.language}</Text>
              </View>
              <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>Salle</Text>
                <Text style={styles.detailValue}>{hall.name}</Text>
              </View>
            </View>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Paiement</Text>
            <View style={styles.card}>
              <View style={styles.paymentRow}>
                <CreditCard color={colors.textSecondary} size={20} />
                <Text style={styles.paymentText}>Carte bancaire</Text>
              </View>
              <Text style={styles.paymentNote}>
                Le paiement sera simulé pour cette démo
              </Text>
            </View>
          </View>

          <View style={styles.totalSection}>
            <View style={styles.totalRow}>
              <Text style={styles.totalLabel}>Total</Text>
              <Text style={styles.totalPrice}>{totalPrice.toFixed(2)} Dhs</Text>
            </View>
          </View>
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity
          style={styles.confirmButton}
          onPress={handleConfirm}
          activeOpacity={0.8}
        >
          <LinearGradient
            colors={[colors.success, '#059669']}
            style={styles.confirmButtonGradient}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
          >
            <Check color={colors.text} size={20} />
            <Text style={styles.confirmButtonText}>Confirmer la réservation</Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
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
  content: {
    padding: spacing.md,
  },
  section: {
    marginBottom: spacing.lg,
  },
  sectionTitle: {
    ...typography.h4,
    color: colors.text,
    marginBottom: spacing.sm,
  },
  card: {
    backgroundColor: colors.backgroundCard,
    borderRadius: borderRadius.lg,
    padding: spacing.md,
    borderWidth: 1,
    borderColor: colors.border,
  },
  movieTitle: {
    ...typography.h4,
    color: colors.text,
    marginBottom: spacing.md,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    marginBottom: spacing.sm,
  },
  infoText: {
    ...typography.body,
    color: colors.textSecondary,
    flex: 1,
  },
  seatsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
  },
  seatChip: {
    backgroundColor: colors.backgroundCard,
    borderRadius: borderRadius.md,
    padding: spacing.sm,
    borderWidth: 1,
    borderColor: colors.border,
    minWidth: 80,
    alignItems: 'center',
  },
  seatText: {
    ...typography.body,
    color: colors.text,
    fontWeight: '600' as const,
    marginBottom: 4,
  },
  seatPrice: {
    ...typography.caption,
    color: colors.textSecondary,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  detailLabel: {
    ...typography.body,
    color: colors.textSecondary,
  },
  detailValue: {
    ...typography.body,
    color: colors.text,
    fontWeight: '600' as const,
  },
  paymentRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    marginBottom: spacing.xs,
  },
  paymentText: {
    ...typography.body,
    color: colors.text,
  },
  paymentNote: {
    ...typography.caption,
    color: colors.textMuted,
    fontStyle: 'italic',
  },
  totalSection: {
    backgroundColor: colors.backgroundCard,
    borderRadius: borderRadius.lg,
    padding: spacing.md,
    borderWidth: 2,
    borderColor: colors.primary,
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  totalLabel: {
    ...typography.h3,
    color: colors.text,
  },
  totalPrice: {
    ...typography.h2,
    color: colors.primary,
  },
  footer: {
    backgroundColor: colors.backgroundCard,
    borderTopWidth: 1,
    borderTopColor: colors.border,
    padding: spacing.md,
  },
  confirmButton: {
    borderRadius: borderRadius.md,
    overflow: 'hidden',
  },
  confirmButtonGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: spacing.md,
    gap: spacing.sm,
  },
  confirmButtonText: {
    ...typography.button,
    color: colors.text,
  },
});
