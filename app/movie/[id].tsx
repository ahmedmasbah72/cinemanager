import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import type { ImageSourcePropType } from 'react-native';
import { Stack, router, useLocalSearchParams } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { Heart, Clock, Star, Calendar, Play } from 'lucide-react-native';
import { colors, typography, spacing, borderRadius } from '@/constants/theme';
import { useApp } from '@/store/AppContext';

const { width } = Dimensions.get('window');

// ✅ Helper: supporte URL (string) OU require(...) (ImageSourcePropType)
const toImageSource = (src: string | ImageSourcePropType): ImageSourcePropType =>
  typeof src === 'string' ? { uri: src } : src;

export default function MovieDetailsScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { getMovieById, isFavorite, addFavorite, removeFavorite } = useApp();

  const movie = getMovieById(id || '');

  if (!movie) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>Film introuvable</Text>
      </View>
    );
  }

  const handleFavoritePress = () => {
    if (isFavorite(movie.id)) {
      removeFavorite(movie.id);
    } else {
      addFavorite(movie.id);
    }
  };

  const favorite = isFavorite(movie.id);

  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{
          title: movie.title,
          headerRight: () => (
            <TouchableOpacity onPress={handleFavoritePress} style={styles.headerButton}>
              <Heart
                color={favorite ? colors.primary : colors.text}
                fill={favorite ? colors.primary : 'none'}
                size={24}
              />
            </TouchableOpacity>
          ),
        }}
      />

      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.backdropContainer}>
          {/* ✅ FIX: backdrop URL ou require */}
          <Image source={toImageSource(movie.backdrop)} style={styles.backdrop} />

          <LinearGradient
            colors={['transparent', colors.background]}
            style={styles.backdropGradient}
          />
        </View>

        <View style={styles.content}>
          <View style={styles.posterRow}>
            {/* ✅ FIX: poster URL ou require */}
            <Image source={toImageSource(movie.poster)} style={styles.poster} />

            <View style={styles.mainInfo}>
              <Text style={styles.title}>{movie.title}</Text>

              {movie.originalTitle && movie.originalTitle !== movie.title && (
                <Text style={styles.originalTitle}>{movie.originalTitle}</Text>
              )}

              <View style={styles.metaRow}>
                <View style={styles.metaItem}>
                  <Star color={colors.accent} size={18} fill={colors.accent} />
                  <Text style={styles.metaText}>{movie.rating.toFixed(1)}/10</Text>
                </View>
                <View style={styles.metaItem}>
                  <Clock color={colors.textSecondary} size={18} />
                  <Text style={styles.metaText}>{movie.duration} min</Text>
                </View>
              </View>

              <View style={styles.badges}>
                <View style={styles.badge}>
                  <Text style={styles.badgeText}>{movie.ageRating}</Text>
                </View>
                {movie.status === 'coming-soon' && (
                  <View style={[styles.badge, styles.badgeComingSoon]}>
                    <Text style={styles.badgeText}>Bientôt</Text>
                  </View>
                )}
              </View>
            </View>
          </View>

          <View style={styles.genresContainer}>
            {movie.genres.map((genre) => (
              <View key={genre} style={styles.genreChip}>
                <Text style={styles.genreText}>{genre}</Text>
              </View>
            ))}
          </View>

          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Calendar color={colors.primary} size={20} />
              <Text style={styles.sectionTitle}>Sortie</Text>
            </View>
            <Text style={styles.releaseDate}>
              {new Date(movie.releaseDate).toLocaleDateString('fr-FR', {
                day: 'numeric',
                month: 'long',
                year: 'numeric',
              })}
            </Text>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Synopsis</Text>
            <Text style={styles.synopsis}>{movie.synopsis}</Text>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Réalisation</Text>
            <Text style={styles.director}>{movie.director}</Text>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Avec</Text>
            <View style={styles.castContainer}>
              {movie.cast.map((actor, index) => (
                <View key={index} style={styles.castItem}>
                  <Text style={styles.castName}>{actor}</Text>
                </View>
              ))}
            </View>
          </View>

          {movie.status === 'now-playing' && (
            <TouchableOpacity
              style={styles.bookButton}
              onPress={() => router.push(`/showtimes/${movie.id}` as any)}
              activeOpacity={0.8}
            >
              <LinearGradient
                colors={[colors.primary, colors.primaryDark]}
                style={styles.bookButtonGradient}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
              >
                <Play color={colors.text} size={20} fill={colors.text} />
                <Text style={styles.bookButtonText}>Réserver des places</Text>
              </LinearGradient>
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
  headerButton: {
    marginRight: spacing.sm,
  },
  backdropContainer: {
    width: width,
    height: 240,
    position: 'relative',
  },
  backdrop: {
    width: '100%',
    height: '100%',
    backgroundColor: colors.backgroundCard,
  },
  backdropGradient: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 120,
  },
  content: {
    marginTop: -40,
    paddingHorizontal: spacing.md,
  },
  posterRow: {
    flexDirection: 'row',
    marginBottom: spacing.lg,
    gap: spacing.md,
  },
  poster: {
    width: 120,
    height: 180,
    borderRadius: borderRadius.lg,
    backgroundColor: colors.backgroundCard,
  },
  mainInfo: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  title: {
    ...typography.h2,
    color: colors.text,
    marginBottom: spacing.xs,
  },
  originalTitle: {
    ...typography.bodySmall,
    color: colors.textMuted,
    fontStyle: 'italic',
    marginBottom: spacing.sm,
  },
  metaRow: {
    flexDirection: 'row',
    gap: spacing.md,
    marginBottom: spacing.sm,
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  metaText: {
    ...typography.body,
    color: colors.textSecondary,
    fontWeight: '600' as const,
  },
  badges: {
    flexDirection: 'row',
    gap: spacing.sm,
  },
  badge: {
    paddingHorizontal: spacing.sm,
    paddingVertical: 4,
    borderRadius: 6,
    backgroundColor: colors.backgroundCard,
    borderWidth: 1,
    borderColor: colors.border,
  },
  badgeComingSoon: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  badgeText: {
    ...typography.caption,
    color: colors.text,
    fontWeight: '700' as const,
  },
  genresContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
    marginBottom: spacing.lg,
  },
  genreChip: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
    borderRadius: 20,
    backgroundColor: colors.backgroundCard,
    borderWidth: 1,
    borderColor: colors.border,
  },
  genreText: {
    ...typography.bodySmall,
    color: colors.textSecondary,
    fontWeight: '600' as const,
  },
  section: {
    marginBottom: spacing.lg,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    marginBottom: spacing.sm,
  },
  sectionTitle: {
    ...typography.h4,
    color: colors.text,
    marginBottom: spacing.sm,
  },
  releaseDate: {
    ...typography.body,
    color: colors.textSecondary,
  },
  synopsis: {
    ...typography.body,
    color: colors.textSecondary,
    lineHeight: 24,
  },
  director: {
    ...typography.body,
    color: colors.text,
    fontWeight: '600' as const,
  },
  castContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
  },
  castItem: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: borderRadius.md,
    backgroundColor: colors.backgroundCard,
  },
  castName: {
    ...typography.bodySmall,
    color: colors.text,
  },
  bookButton: {
    marginTop: spacing.md,
    marginBottom: spacing.xl,
    borderRadius: borderRadius.md,
    overflow: 'hidden',
  },
  bookButtonGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: spacing.md,
    gap: spacing.sm,
  },
  bookButtonText: {
    ...typography.button,
    color: colors.text,
  },
});
