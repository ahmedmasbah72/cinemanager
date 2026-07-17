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
import { Calendar, MapPin, Clock, Users, XCircle } from 'lucide-react-native';
import { QRCodeDisplay } from '@/components/QRCodeDisplay';
import { colors, typography, spacing, borderRadius } from '@/constants/theme';
import { useApp } from '@/store/AppContext';

export default function TicketDetailsScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { getTicketById, cancelBooking } = useApp();

  const ticket = getTicketById(id || '');

  if (!ticket) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>Ticket introuvable</Text>
      </View>
    );
  }

  const handleCancel = () => {
    Alert.alert(
      'Annuler la réservation',
      'Êtes-vous sûr de vouloir annuler cette réservation ?',
      [
        { text: 'Non', style: 'cancel' },
        {
          text: 'Oui, annuler',
          style: 'destructive',
          onPress: () => {
            cancelBooking(ticket.bookingId);
            Alert.alert('Réservation annulée', 'Votre réservation a été annulée.', [
              {
                text: 'OK',
                onPress: () => router.back(),
              },
            ]);
          },
        },
      ]
    );
  };

  const isActive = ticket.status === 'confirmed';

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: 'Ticket' }} />

      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.content}>
          <View style={styles.qrSection}>
            <View style={styles.qrPlaceholder}>
              <QRCodeDisplay
                value={ticket.qrCode}
                size={180}
                color={colors.background}
                backgroundColor={colors.text}
              />
            </View>
            <Text style={styles.qrCode}>{ticket.qrCode}</Text>
            <View style={[styles.statusBadge, !isActive && styles.statusBadgeCancelled]}>
              <Text style={styles.statusText}>
                {isActive ? 'Confirmé' : 'Annulé'}
              </Text>
            </View>
          </View>

          <View style={styles.movieSection}>
            <Text style={styles.movieTitle}>{ticket.movie.title}</Text>
            <Text style={styles.movieGenres}>{ticket.movie.genres.join(', ')}</Text>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Détails de la séance</Text>
            <View style={styles.card}>
              <View style={styles.detailRow}>
                <MapPin color={colors.textSecondary} size={18} />
                <View style={styles.detailContent}>
                  <Text style={styles.detailLabel}>Cinéma</Text>
                  <Text style={styles.detailValue}>{ticket.cinema.name}</Text>
                  <Text style={styles.detailSubValue}>{ticket.cinema.address}</Text>
                </View>
              </View>

              <View style={styles.detailRow}>
                <Calendar color={colors.textSecondary} size={18} />
                <View style={styles.detailContent}>
                  <Text style={styles.detailLabel}>Date</Text>
                  <Text style={styles.detailValue}>
                    {new Date(ticket.showTime.date).toLocaleDateString('fr-FR', {
                      weekday: 'long',
                      day: 'numeric',
                      month: 'long',
                      year: 'numeric',
                    })}
                  </Text>
                </View>
              </View>

              <View style={styles.detailRow}>
                <Clock color={colors.textSecondary} size={18} />
                <View style={styles.detailContent}>
                  <Text style={styles.detailLabel}>Heure</Text>
                  <Text style={styles.detailValue}>{ticket.showTime.time}</Text>
                </View>
              </View>

              <View style={styles.detailRow}>
                <Users color={colors.textSecondary} size={18} />
                <View style={styles.detailContent}>
                  <Text style={styles.detailLabel}>Salle & Places</Text>
                  <Text style={styles.detailValue}>{ticket.hall.name}</Text>
                  <Text style={styles.detailSubValue}>
                    {ticket.seats.map((seat) => 
                      `${String.fromCharCode(65 + seat.row)}${seat.number + 1}`
                    ).join(', ')}
                  </Text>
                </View>
              </View>
            </View>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Informations</Text>
            <View style={styles.card}>
              <View style={styles.infoRow}>
                <Text style={styles.infoLabel}>Format</Text>
                <Text style={styles.infoValue}>{ticket.showTime.format}</Text>
              </View>
              <View style={styles.infoRow}>
                <Text style={styles.infoLabel}>Langue</Text>
                <Text style={styles.infoValue}>{ticket.showTime.language}</Text>
              </View>
              <View style={styles.infoRow}>
                <Text style={styles.infoLabel}>Places</Text>
                <Text style={styles.infoValue}>{ticket.seats.length}</Text>
              </View>
              <View style={styles.infoRow}>
                <Text style={styles.infoLabel}>Total</Text>
                <Text style={[styles.infoValue, styles.priceValue]}>
                  {ticket.totalPrice.toFixed(2)} Dhs
                </Text>
              </View>
            </View>
          </View>

          {isActive && (
            <TouchableOpacity
              style={styles.cancelButton}
              onPress={handleCancel}
              activeOpacity={0.8}
            >
              <XCircle color={colors.error} size={20} />
              <Text style={styles.cancelButtonText}>Annuler la réservation</Text>
            </TouchableOpacity>
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
  content: {
    padding: spacing.md,
  },
  qrSection: {
    alignItems: 'center',
    paddingVertical: spacing.xl,
    backgroundColor: colors.backgroundCard,
    borderRadius: borderRadius.lg,
    marginBottom: spacing.lg,
    borderWidth: 1,
    borderColor: colors.border,
  },
  qrPlaceholder: {
    padding: spacing.md,
    backgroundColor: colors.text,
    borderRadius: borderRadius.md,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  qrCode: {
    ...typography.caption,
    color: colors.textMuted,
    marginTop: spacing.sm,
    fontFamily: 'monospace' as const,
  },
  statusBadge: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
    borderRadius: 20,
    backgroundColor: colors.success,
  },
  statusBadgeCancelled: {
    backgroundColor: colors.error,
  },
  statusText: {
    ...typography.bodySmall,
    color: colors.text,
    fontWeight: '700' as const,
    textTransform: 'uppercase',
  },
  movieSection: {
    marginBottom: spacing.lg,
  },
  movieTitle: {
    ...typography.h2,
    color: colors.text,
    marginBottom: spacing.xs,
  },
  movieGenres: {
    ...typography.body,
    color: colors.textMuted,
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
  detailRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: spacing.md,
    marginBottom: spacing.md,
  },
  detailContent: {
    flex: 1,
  },
  detailLabel: {
    ...typography.caption,
    color: colors.textMuted,
    marginBottom: 4,
  },
  detailValue: {
    ...typography.body,
    color: colors.text,
    fontWeight: '600' as const,
  },
  detailSubValue: {
    ...typography.bodySmall,
    color: colors.textSecondary,
    marginTop: 2,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  infoLabel: {
    ...typography.body,
    color: colors.textSecondary,
  },
  infoValue: {
    ...typography.body,
    color: colors.text,
    fontWeight: '600' as const,
  },
  priceValue: {
    color: colors.primary,
    ...typography.h5,
  },
  cancelButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.sm,
    paddingVertical: spacing.md,
    borderRadius: borderRadius.md,
    backgroundColor: colors.backgroundCard,
    borderWidth: 1,
    borderColor: colors.error,
    marginTop: spacing.md,
  },
  cancelButtonText: {
    ...typography.button,
    color: colors.error,
  },
});
