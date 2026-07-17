import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  type ImageSourcePropType,
} from 'react-native';
import { Stack, useLocalSearchParams } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { MapPin, Star, Phone, Navigation } from 'lucide-react-native';
import { colors, typography, spacing, borderRadius } from '@/constants/theme';
import { useApp } from '@/store/AppContext';

export default function CinemaDetailsScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { getCinemaById, getHalls } = useApp();

  const cinema = getCinemaById(id || '');
  const halls = cinema ? getHalls(cinema.id) : [];

  if (!cinema) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>Cinéma introuvable</Text>
      </View>
    );
  }

  // ✅ Supporte image locale (require) ET URL
  const imageSource: ImageSourcePropType =
    typeof cinema.imageUrl === 'string' ? { uri: cinema.imageUrl } : cinema.imageUrl;

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: cinema.name }} />

      <ScrollView showsVerticalScrollIndicator={false}>
        <Image source={imageSource} style={styles.image} resizeMode="cover" />

        <View style={styles.content}>
          <View style={styles.header}>
            <Text style={styles.name}>{cinema.name}</Text>
            <View style={styles.rating}>
              <Star color={colors.accent} size={20} fill={colors.accent} />
              <Text style={styles.ratingText}>{cinema.rating.toFixed(1)}</Text>
            </View>
          </View>

          <View style={styles.infoRow}>
            <MapPin color={colors.textSecondary} size={18} />
            <View style={styles.infoTextContainer}>
              <Text style={styles.address}>{cinema.address}</Text>
              <Text style={styles.city}>{cinema.city}</Text>
              <Text style={styles.distance}>{cinema.distance.toFixed(1)} km</Text>
            </View>
          </View>

          <View style={styles.infoRow}>
            <Phone color={colors.textSecondary} size={18} />
            <Text style={styles.phone}>{cinema.phone}</Text>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Services</Text>
            <View style={styles.servicesGrid}>
              {cinema.services.map((service) => (
                <View key={service} style={styles.serviceCard}>
                  <Text style={styles.serviceText}>{service}</Text>
                </View>
              ))}
            </View>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Salles ({halls.length})</Text>
            {halls.map((hall) => (
              <View key={hall.id} style={styles.hallCard}>
                <View style={styles.hallHeader}>
                  <Text style={styles.hallName}>{hall.name}</Text>
                  <View style={styles.hallTypeBadge}>
                    <Text style={styles.hallTypeText}>{hall.type}</Text>
                  </View>
                </View>
                <Text style={styles.hallCapacity}>Capacité: {hall.capacity} places</Text>
              </View>
            ))}
          </View>

          {/* <TouchableOpacity style={styles.directionButton} activeOpacity={0.8}>
            <LinearGradient
              colors={[colors.neon, '#2563EB']}
              style={styles.directionButtonGradient}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
            >
              <Navigation color={colors.text} size={20} />
              <Text style={styles.directionButtonText}>Itinéraire</Text>
            </LinearGradient>
          </TouchableOpacity> */}
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
  image: {
    width: '100%',
    height: 250,
    backgroundColor: colors.backgroundCard,
  },
  content: {
    padding: spacing.md,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  name: {
    ...typography.h2,
    color: colors.text,
    flex: 1,
    marginRight: spacing.sm,
  },
  rating: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: colors.backgroundCard,
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    borderRadius: borderRadius.sm,
  },
  ratingText: {
    ...typography.body,
    color: colors.text,
    fontWeight: '600' as const,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: spacing.sm,
    marginBottom: spacing.md,
  },
  infoTextContainer: {
    flex: 1,
  },
  address: {
    ...typography.body,
    color: colors.text,
  },
  city: {
    ...typography.bodySmall,
    color: colors.textSecondary,
    marginTop: 2,
  },
  distance: {
    ...typography.caption,
    color: colors.textMuted,
    marginTop: 2,
  },
  phone: {
    ...typography.body,
    color: colors.text,
  },
  section: {
    marginTop: spacing.lg,
  },
  sectionTitle: {
    ...typography.h4,
    color: colors.text,
    marginBottom: spacing.md,
  },
  servicesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
  },
  serviceCard: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: borderRadius.md,
    backgroundColor: colors.backgroundCard,
    borderWidth: 1,
    borderColor: colors.border,
  },
  serviceText: {
    ...typography.bodySmall,
    color: colors.text,
    fontWeight: '600' as const,
  },
  hallCard: {
    backgroundColor: colors.backgroundCard,
    borderRadius: borderRadius.lg,
    padding: spacing.md,
    marginBottom: spacing.sm,
    borderWidth: 1,
    borderColor: colors.border,
  },
  hallHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.xs,
  },
  hallName: {
    ...typography.h5,
    color: colors.text,
    flex: 1,
  },
  hallTypeBadge: {
    paddingHorizontal: spacing.sm,
    paddingVertical: 4,
    borderRadius: 6,
    backgroundColor: colors.backgroundElevated,
    borderWidth: 1,
    borderColor: colors.border,
  },
  hallTypeText: {
    ...typography.caption,
    color: colors.primary,
    fontWeight: '700' as const,
  },
  hallCapacity: {
    ...typography.bodySmall,
    color: colors.textSecondary,
  },
  directionButton: {
    marginTop: spacing.xl,
    marginBottom: spacing.md,
    borderRadius: borderRadius.md,
    overflow: 'hidden',
  },
  directionButtonGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: spacing.md,
    gap: spacing.sm,
  },
  directionButtonText: {
    ...typography.button,
    color: colors.text,
  },
});
