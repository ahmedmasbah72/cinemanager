import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  type ImageSourcePropType,
} from 'react-native';
import { Cinema } from '@/types/models';
import { colors, typography, spacing, borderRadius } from '@/constants/theme';
import { MapPin, Star } from 'lucide-react-native';

interface CinemaCardProps {
  cinema: Cinema;
  onPress?: () => void;
}

export const CinemaCard: React.FC<CinemaCardProps> = ({ cinema, onPress }) => {
  // ✅ Supporte image locale (require) ET URL
  const imageSource: ImageSourcePropType =
    typeof cinema.imageUrl === 'string' ? { uri: cinema.imageUrl } : cinema.imageUrl;

  return (
    <TouchableOpacity style={styles.container} onPress={onPress} activeOpacity={0.8}>
      <Image source={imageSource} style={styles.image} resizeMode="cover" />

      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.name} numberOfLines={1}>
            {cinema.name}
          </Text>
          <View style={styles.rating}>
            <Star color={colors.accent} size={14} fill={colors.accent} />
            <Text style={styles.ratingText}>{cinema.rating.toFixed(1)}</Text>
          </View>
        </View>

        <View style={styles.location}>
          <MapPin color={colors.textSecondary} size={14} />
          <Text style={styles.address} numberOfLines={1}>
            {cinema.address}
          </Text>
        </View>

        <Text style={styles.distance}>{cinema.distance.toFixed(1)} km</Text>

        <View style={styles.services}>
          {cinema.services.slice(0, 3).map((service) => (
            <View key={service} style={styles.serviceBadge}>
              <Text style={styles.serviceText}>{service}</Text>
            </View>
          ))}

          {cinema.services.length > 3 && (
            <Text style={styles.moreServices}>+{cinema.services.length - 3}</Text>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.backgroundCard,
    borderRadius: borderRadius.lg,
    marginBottom: spacing.md,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: 180,
    backgroundColor: colors.backgroundElevated,
  },
  content: {
    padding: spacing.md,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  name: {
    ...typography.h4,
    color: colors.text,
    flex: 1,
    marginRight: spacing.sm,
  },
  rating: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  ratingText: {
    ...typography.bodySmall,
    color: colors.text,
    fontWeight: '600' as const,
  },
  location: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 4,
  },
  address: {
    ...typography.bodySmall,
    color: colors.textSecondary,
    flex: 1,
  },
  distance: {
    ...typography.caption,
    color: colors.textMuted,
    marginBottom: spacing.sm,
  },
  services: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.xs,
    alignItems: 'center',
  },
  serviceBadge: {
    paddingHorizontal: spacing.sm,
    paddingVertical: 4,
    borderRadius: 6,
    backgroundColor: colors.backgroundElevated,
    borderWidth: 1,
    borderColor: colors.border,
  },
  serviceText: {
    ...typography.caption,
    color: colors.textSecondary,
    fontWeight: '600' as const,
  },
  moreServices: {
    ...typography.caption,
    color: colors.textMuted,
    fontWeight: '600' as const,
  },
});
