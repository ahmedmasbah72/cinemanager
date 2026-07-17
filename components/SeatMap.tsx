import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Seat, SeatType, SeatStatus } from '@/types/models';
import { colors, spacing, typography } from '@/constants/theme';

interface SeatMapProps {
  rows: number;
  seatsPerRow: number;
  occupiedSeats?: string[];
  selectedSeats: Seat[];
  onSeatSelect: (seat: Seat) => void;
  basePrice: number;
}

export const SeatMap: React.FC<SeatMapProps> = ({
  rows,
  seatsPerRow,
  occupiedSeats = [],
  selectedSeats,
  onSeatSelect,
  basePrice,
}) => {
  const generateSeats = (): Seat[][] => {
    const seatMap: Seat[][] = [];
    
    for (let row = 0; row < rows; row++) {
      const rowSeats: Seat[] = [];
      for (let seat = 0; seat < seatsPerRow; seat++) {
        const seatId = `${row}-${seat}`;
        let type: SeatType = 'standard';
        let price = basePrice;

        if (row < 2) {
          type = 'vip';
          price = basePrice * 1.5;
        } else if (row === rows - 1) {
          type = 'pmr';
          price = basePrice;
        }

        const isOccupied = occupiedSeats.includes(seatId);
        const isSelected = selectedSeats.some(s => s.id === seatId);

        let status: SeatStatus = 'available';
        if (isOccupied) status = 'occupied';
        else if (isSelected) status = 'selected';

        rowSeats.push({
          id: seatId,
          row,
          number: seat,
          type,
          status,
          price,
        });
      }
      seatMap.push(rowSeats);
    }

    return seatMap;
  };

  const seatMap = generateSeats();

  const getSeatColor = (seat: Seat) => {
    if (seat.status === 'occupied') return colors.seatOccupied;
    if (seat.status === 'selected') return colors.seatSelected;
    if (seat.type === 'vip') return colors.seatVIP;
    if (seat.type === 'pmr') return colors.seatPMR;
    return colors.seatAvailable;
  };

  return (
    <View style={styles.container}>
      <View style={styles.screen}>
        <Text style={styles.screenText}>ÉCRAN</Text>
      </View>

      <View style={styles.seatGrid}>
        {seatMap.map((row, rowIndex) => (
          <View key={rowIndex} style={styles.row}>
            <Text style={styles.rowLabel}>{String.fromCharCode(65 + rowIndex)}</Text>
            {row.map((seat) => (
              <TouchableOpacity
                key={seat.id}
                style={[
                  styles.seat,
                  { backgroundColor: getSeatColor(seat) },
                  seat.status === 'occupied' && styles.seatDisabled,
                ]}
                onPress={() => {
                  if (seat.status !== 'occupied') {
                    onSeatSelect(seat);
                  }
                }}
                disabled={seat.status === 'occupied'}
                activeOpacity={0.7}
              >
                <Text style={styles.seatText}>{seat.number + 1}</Text>
              </TouchableOpacity>
            ))}
          </View>
        ))}
      </View>

      <View style={styles.legend}>
        <View style={styles.legendItem}>
          <View style={[styles.legendBox, { backgroundColor: colors.seatAvailable }]} />
          <Text style={styles.legendText}>Disponible</Text>
        </View>
        <View style={styles.legendItem}>
          <View style={[styles.legendBox, { backgroundColor: colors.seatSelected }]} />
          <Text style={styles.legendText}>Sélectionné</Text>
        </View>
        <View style={styles.legendItem}>
          <View style={[styles.legendBox, { backgroundColor: colors.seatVIP }]} />
          <Text style={styles.legendText}>VIP</Text>
        </View>
        <View style={styles.legendItem}>
          <View style={[styles.legendBox, { backgroundColor: colors.seatOccupied }]} />
          <Text style={styles.legendText}>Occupé</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: spacing.lg,
  },
  screen: {
    height: 40,
    backgroundColor: colors.backgroundElevated,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: spacing.xl,
    borderWidth: 2,
    borderColor: colors.primary,
  },
  screenText: {
    ...typography.caption,
    color: colors.textSecondary,
    fontWeight: '700' as const,
    letterSpacing: 2,
  },
  seatGrid: {
    gap: spacing.sm,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 6,
  },
  rowLabel: {
    ...typography.caption,
    color: colors.textMuted,
    width: 20,
    textAlign: 'center',
    fontWeight: '600' as const,
  },
  seat: {
    width: 28,
    height: 28,
    borderRadius: 6,
    justifyContent: 'center',
    alignItems: 'center',
  },
  seatDisabled: {
    opacity: 0.5,
  },
  seatText: {
    fontSize: 10,
    color: colors.background,
    fontWeight: '600' as const,
  },
  legend: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: spacing.md,
    marginTop: spacing.xl,
    paddingTop: spacing.lg,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
  },
  legendBox: {
    width: 16,
    height: 16,
    borderRadius: 4,
  },
  legendText: {
    ...typography.caption,
    color: colors.textSecondary,
  },
});
