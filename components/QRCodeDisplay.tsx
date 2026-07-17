import React, { useMemo } from 'react';
import { View, StyleSheet } from 'react-native';
import Svg, { Rect } from 'react-native-svg';

interface QRCodeDisplayProps {
  value: string;
  size?: number;
  color?: string;
  backgroundColor?: string;
}

export function QRCodeDisplay({
  value,
  size = 200,
  color = '#000000',
  backgroundColor = '#FFFFFF',
}: QRCodeDisplayProps) {
  const matrix = useMemo(() => {
    const gridSize = 29;
    const grid: boolean[][] = Array(gridSize)
      .fill(null)
      .map(() => Array(gridSize).fill(false));

    const hash = value.split('').reduce((acc, char) => {
      return ((acc << 5) - acc + char.charCodeAt(0)) | 0;
    }, 0);

    let seed = Math.abs(hash);
    const random = () => {
      seed = (seed * 9301 + 49297) % 233280;
      return seed / 233280;
    };

    for (let i = 0; i < 8; i++) {
      for (let j = 0; j < 8; j++) {
        grid[i][j] = true;
        grid[i][gridSize - 1 - j] = true;
        grid[gridSize - 1 - i][j] = true;
      }
    }

    grid[7][7] = false;
    grid[7][gridSize - 8] = false;
    grid[gridSize - 8][7] = false;

    for (let i = 9; i < gridSize - 9; i++) {
      for (let j = 9; j < gridSize - 9; j++) {
        grid[i][j] = random() > 0.5;
      }
    }

    for (let i = 8; i < gridSize - 8; i++) {
      if (i === 8 || i === gridSize - 9) {
        for (let j = 8; j < gridSize - 8; j++) {
          grid[i][j] = (i + j) % 2 === 0;
        }
      }
    }

    return grid;
  }, [value]);

  const moduleSize = size / matrix.length;

  return (
    <View style={[styles.container, { width: size, height: size, backgroundColor }]}>
      <Svg width={size} height={size}>
        {matrix.map((row, i) =>
          row.map((cell, j) =>
            cell ? (
              <Rect
                key={`${i}-${j}`}
                x={j * moduleSize}
                y={i * moduleSize}
                width={moduleSize}
                height={moduleSize}
                fill={color}
              />
            ) : null
          )
        )}
      </Svg>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 8,
    overflow: 'hidden',
  },
});
