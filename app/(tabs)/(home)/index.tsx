import React, { useState, useMemo } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import { Stack, router } from 'expo-router';
import { Search, SlidersHorizontal, X } from 'lucide-react-native';
import { colors, typography, spacing } from '@/constants/theme';
import { Genre, MovieStatus } from '@/types/models';
import { useApp } from '@/store/AppContext';
import { MovieCard } from '@/components/MovieCard';
import { FilterChips } from '@/components/FilterChips';
import { LinearGradient } from 'expo-linear-gradient';

const allGenres: Genre[] = [
  'Action',
  'Aventure',
  'Comédie',
  'Drame',
  'Science-Fiction',
  'Horreur',
  'Thriller',
  'Animation',
  'Romance',
  'Fantastique',
];

export default function HomeScreen() {
  const { getMovies, isFavorite, addFavorite, removeFavorite } = useApp();
  const movies = getMovies();

  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedGenres, setSelectedGenres] = useState<Genre[]>([]);
  const [selectedStatus, setSelectedStatus] = useState<MovieStatus | 'all'>('all');

  const filteredMovies = useMemo(() => {
    return movies.filter((movie) => {
      const matchesSearch =
        searchQuery === '' ||
        movie.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        movie.cast.some((actor) => actor.toLowerCase().includes(searchQuery.toLowerCase()));

      const matchesGenre =
        selectedGenres.length === 0 ||
        selectedGenres.some((genre) => movie.genres.includes(genre));

      const matchesStatus = selectedStatus === 'all' || movie.status === selectedStatus;

      return matchesSearch && matchesGenre && matchesStatus;
    });
  }, [movies, searchQuery, selectedGenres, selectedStatus]);

  const handleGenreSelect = (genre: Genre) => {
    if (selectedGenres.includes(genre)) {
      setSelectedGenres(selectedGenres.filter((g) => g !== genre));
    } else {
      setSelectedGenres([...selectedGenres, genre]);
    }
  };

  const handleFavoritePress = (movieId: string) => {
    if (isFavorite(movieId)) {
      removeFavorite(movieId);
    } else {
      addFavorite(movieId);
    }
  };

  const clearFilters = () => {
    setSearchQuery('');
    setSelectedGenres([]);
    setSelectedStatus('all');
  };

  const hasActiveFilters = searchQuery !== '' || selectedGenres.length > 0 || selectedStatus !== 'all';

  return (
    <SafeAreaView style={styles.container}>
      <Stack.Screen
        options={{
          headerShown: true,
          headerTitle: 'CinéManager',
          headerStyle: {
            backgroundColor: colors.backgroundElevated,
          },
          headerTintColor: colors.text,
          headerTitleStyle: {
            ...typography.h3,
            fontWeight: '700' as const,
          },
          headerShadowVisible: false,
        }}
      />

      <View style={styles.header}>
        <LinearGradient
          colors={[colors.backgroundElevated, colors.background]}
          style={styles.headerGradient}
        >
          <View style={styles.searchContainer}>
            <Search color={colors.textMuted} size={20} />
            <TextInput
              style={styles.searchInput}
              placeholder="Rechercher un film, acteur..."
              placeholderTextColor={colors.textMuted}
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
            {searchQuery !== '' && (
              <TouchableOpacity onPress={() => setSearchQuery('')}>
                <X color={colors.textMuted} size={20} />
              </TouchableOpacity>
            )}
          </View>

          <View style={styles.statusFilters}>
            <TouchableOpacity
              style={[styles.statusButton, selectedStatus === 'all' && styles.statusButtonActive]}
              onPress={() => setSelectedStatus('all')}
            >
              <Text
                style={[styles.statusText, selectedStatus === 'all' && styles.statusTextActive]}
              >
                Tous
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.statusButton,
                selectedStatus === 'now-playing' && styles.statusButtonActive,
              ]}
              onPress={() => setSelectedStatus('now-playing')}
            >
              <Text
                style={[
                  styles.statusText,
                  selectedStatus === 'now-playing' && styles.statusTextActive,
                ]}
              >
                À l&apos;affiche
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.statusButton,
                selectedStatus === 'coming-soon' && styles.statusButtonActive,
              ]}
              onPress={() => setSelectedStatus('coming-soon')}
            >
              <Text
                style={[
                  styles.statusText,
                  selectedStatus === 'coming-soon' && styles.statusTextActive,
                ]}
              >
                Bientôt
              </Text>
            </TouchableOpacity>
          </View>
        </LinearGradient>
      </View>

      <FilterChips
        genres={allGenres}
        selectedGenres={selectedGenres}
        onGenreSelect={handleGenreSelect}
      />

      {hasActiveFilters && (
        <View style={styles.filterInfo}>
          <Text style={styles.filterInfoText}>
            {filteredMovies.length} film{filteredMovies.length > 1 ? 's' : ''} trouvé
            {filteredMovies.length > 1 ? 's' : ''}
          </Text>
          <TouchableOpacity onPress={clearFilters} style={styles.clearButton}>
            <Text style={styles.clearButtonText}>Réinitialiser</Text>
          </TouchableOpacity>
        </View>
      )}

      <FlatList
        data={filteredMovies}
        keyExtractor={(item) => item.id}
        numColumns={2}
        columnWrapperStyle={styles.row}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <SlidersHorizontal color={colors.textMuted} size={48} />
            <Text style={styles.emptyText}>Aucun film trouvé</Text>
            <Text style={styles.emptySubText}>Essayez de modifier vos filtres</Text>
          </View>
        }
        renderItem={({ item }) => (
          <MovieCard
            movie={item}
            isFavorite={isFavorite(item.id)}
            onFavoritePress={() => handleFavoritePress(item.id)}
            onPress={() => router.push(`/movie/${item.id}` as any)}
          />
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    backgroundColor: colors.backgroundElevated,
  },
  headerGradient: {
    paddingHorizontal: spacing.md,
    paddingBottom: spacing.md,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.backgroundCard,
    borderRadius: 12,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    gap: spacing.sm,
    borderWidth: 1,
    borderColor: colors.border,
  },
  searchInput: {
    flex: 1,
    ...typography.body,
    color: colors.text,
    padding: 0,
  },
  statusFilters: {
    flexDirection: 'row',
    gap: spacing.sm,
    marginTop: spacing.md,
  },
  statusButton: {
    flex: 1,
    paddingVertical: spacing.sm,
    borderRadius: 8,
    backgroundColor: colors.backgroundCard,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.border,
  },
  statusButtonActive: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  statusText: {
    ...typography.bodySmall,
    color: colors.textSecondary,
    fontWeight: '600' as const,
  },
  statusTextActive: {
    color: colors.text,
  },
  filterInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    backgroundColor: colors.backgroundElevated,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  filterInfoText: {
    ...typography.bodySmall,
    color: colors.textSecondary,
  },
  clearButton: {
    paddingHorizontal: spacing.sm,
    paddingVertical: 4,
  },
  clearButtonText: {
    ...typography.bodySmall,
    color: colors.primary,
    fontWeight: '600' as const,
  },
  listContent: {
    padding: spacing.md,
  },
  row: {
    justifyContent: 'space-between',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
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
