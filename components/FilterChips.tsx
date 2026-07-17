import React from 'react';
import { Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { Genre } from '@/types/models';
import { colors, typography, spacing } from '@/constants/theme';

interface FilterChipsProps {
  genres: Genre[];
  selectedGenres: Genre[];
  onGenreSelect: (genre: Genre) => void;
}

export const FilterChips: React.FC<FilterChipsProps> = ({
  genres,
  selectedGenres,
  onGenreSelect,
}) => {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.container}
    >
      {genres.map((genre) => {
        const isSelected = selectedGenres.includes(genre);
        return (
          <TouchableOpacity
            key={genre}
            style={[styles.chip, isSelected && styles.chipSelected]}
            onPress={() => onGenreSelect(genre)}
            activeOpacity={0.7}
          >
            <Text style={[styles.chipText, isSelected && styles.chipTextSelected]}>
              {genre}
            </Text>
          </TouchableOpacity>
        );
      })}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: spacing.md,
    gap: spacing.sm,
    paddingVertical: spacing.xs,
  },
  chip: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: 20,
    backgroundColor: colors.backgroundCard,
    borderWidth: 1,
    borderColor: colors.border,
  },
  chipSelected: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  chipText: {
    ...typography.bodySmall,
    color: colors.textSecondary,
    fontWeight: '600' as const,
  },
  chipTextSelected: {
    color: colors.text,
  },
});
