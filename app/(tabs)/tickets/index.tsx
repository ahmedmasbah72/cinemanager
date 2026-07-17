import React from 'react';
import { View, Text, StyleSheet, FlatList, SafeAreaView, TouchableOpacity } from 'react-native';
import { Stack, router } from 'expo-router';
import { colors, typography, spacing } from '@/constants/theme';
import { useApp } from '@/store/AppContext';
import { Ticket as TicketIcon, Calendar, MapPin } from 'lucide-react-native';

export default function TicketsScreen() {
  const { tickets } = useApp();

  const activeTickets = tickets.filter((t) => t.status === 'confirmed');

  return (
    <SafeAreaView style={styles.container}>
      <Stack.Screen
        options={{
          headerShown: true,
          headerTitle: 'Mes Tickets',
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

      {activeTickets.length === 0 ? (
        <View style={styles.emptyContainer}>
          <TicketIcon color={colors.textMuted} size={64} />
          <Text style={styles.emptyText}>Aucun ticket</Text>
          <Text style={styles.emptySubText}>
            Vos réservations apparaîtront ici
          </Text>
        </View>
      ) : (
        <FlatList
          data={activeTickets}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.list}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.ticketCard}
              onPress={() => router.push(`/ticket/${item.id}` as any)}
              activeOpacity={0.8}
            >
              <View style={styles.ticketHeader}>
                <Text style={styles.movieTitle} numberOfLines={1}>
                  {item.movie.title}
                </Text>
                <View style={styles.statusBadge}>
                  <Text style={styles.statusText}>Confirmé</Text>
                </View>
              </View>

              <View style={styles.ticketInfo}>
                <View style={styles.infoRow}>
                  <MapPin color={colors.textSecondary} size={16} />
                  <Text style={styles.infoText} numberOfLines={1}>
                    {item.cinema.name}
                  </Text>
                </View>

                <View style={styles.infoRow}>
                  <Calendar color={colors.textSecondary} size={16} />
                  <Text style={styles.infoText}>
                    {new Date(item.showTime.date).toLocaleDateString('fr-FR', {
                      day: 'numeric',
                      month: 'short',
                    })}{' '}
                    à {item.showTime.time}
                  </Text>
                </View>
              </View>

              <View style={styles.ticketFooter}>
                <Text style={styles.seatsText}>
                  {item.seats.length} place{item.seats.length > 1 ? 's' : ''}
                </Text>
                <Text style={styles.priceText}>{item.totalPrice.toFixed(2)} Dhs</Text>
              </View>
            </TouchableOpacity>
          )}
        />
      )}
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
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: spacing.xl,
  },
  emptyText: {
    ...typography.h3,
    color: colors.textSecondary,
    marginTop: spacing.lg,
  },
  emptySubText: {
    ...typography.body,
    color: colors.textMuted,
    marginTop: spacing.xs,
    textAlign: 'center',
  },
  ticketCard: {
    backgroundColor: colors.backgroundCard,
    borderRadius: 16,
    padding: spacing.md,
    marginBottom: spacing.md,
    borderWidth: 1,
    borderColor: colors.border,
  },
  ticketHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  movieTitle: {
    ...typography.h4,
    color: colors.text,
    flex: 1,
    marginRight: spacing.sm,
  },
  statusBadge: {
    paddingHorizontal: spacing.sm,
    paddingVertical: 4,
    borderRadius: 6,
    backgroundColor: colors.success,
  },
  statusText: {
    fontSize: 10,
    color: colors.text,
    fontWeight: '700' as const,
    textTransform: 'uppercase',
  },
  ticketInfo: {
    gap: spacing.xs,
    marginBottom: spacing.sm,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
  },
  infoText: {
    ...typography.bodySmall,
    color: colors.textSecondary,
    flex: 1,
  },
  ticketFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: spacing.sm,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  seatsText: {
    ...typography.bodySmall,
    color: colors.textMuted,
  },
  priceText: {
    ...typography.h5,
    color: colors.primary,
  },
});
