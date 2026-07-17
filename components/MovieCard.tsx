import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import type { ImageSourcePropType } from 'react-native';
import { colors, typography, spacing } from '@/constants/theme';
import { Movie } from '@/types/models';
import { Heart, Clock, Star } from 'lucide-react-native';

interface MovieCardProps {
  movie: Movie;
  isFavorite?: boolean;
  onFavoritePress?: () => void;
  onPress?: () => void;
}

export const MovieCard: React.FC<MovieCardProps> = ({
  movie,
  isFavorite = false,
  onFavoritePress,
  onPress,
}) => {
  const posterSource: ImageSourcePropType =
    typeof movie.poster === 'string' ? { uri: movie.poster } : movie.poster;

  return (
    <TouchableOpacity style={styles.container} onPress={onPress} activeOpacity={0.8}>
      <Image source={posterSource} style={styles.poster} resizeMode="cover" />

      <TouchableOpacity
        style={styles.favoriteButton}
        onPress={(e) => {
          e.stopPropagation();
          onFavoritePress?.();
        }}
        activeOpacity={0.7}
      >
        <Heart
          color={isFavorite ? colors.primary : colors.text}
          fill={isFavorite ? colors.primary : 'none'}
          size={20}
        />
      </TouchableOpacity>

      {movie.status === 'coming-soon' && (
        <View style={styles.badge}>
          <Text style={styles.badgeText}>Bientôt</Text>
        </View>
      )}

      <View style={styles.info}>
        <Text style={styles.title} numberOfLines={1}>
          {movie.title}
        </Text>

        <View style={styles.meta}>
          <View style={styles.metaItem}>
            <Star color={colors.accent} size={14} fill={colors.accent} />
            <Text style={styles.metaText}>{movie.rating.toFixed(1)}</Text>
          </View>

          <View style={styles.metaItem}>
            <Clock color={colors.textSecondary} size={14} />
            <Text style={styles.metaText}>{movie.duration} min</Text>
          </View>
        </View>

        <Text style={styles.genres} numberOfLines={1}>
          {movie.genres.join(', ')}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 160,
    marginRight: spacing.md,
    marginBottom: spacing.md,
  },
  poster: {
    width: 160,
    height: 240,
    borderRadius: 12,
    backgroundColor: colors.backgroundCard,
  },
  favoriteButton: {
    position: 'absolute',
    top: spacing.sm,
    right: spacing.sm,
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  badge: {
    position: 'absolute',
    top: spacing.sm,
    left: spacing.sm,
    paddingHorizontal: spacing.sm,
    paddingVertical: 4,
    borderRadius: 6,
    backgroundColor: colors.primary,
  },
  badgeText: {
    color: colors.text,
    fontSize: 10,
    fontWeight: '700',
    textTransform: 'uppercase',
  },
  info: {
    marginTop: spacing.sm,
  },
  title: {
    ...typography.h5,
    color: colors.text,
    marginBottom: 4,
  },
  meta: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
    gap: spacing.sm,
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  metaText: {
    ...typography.caption,
    color: colors.textSecondary,
  },
  genres: {
    ...typography.caption,
    color: colors.textMuted,
  },
});
