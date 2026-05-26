import React from 'react';
import { View, Text } from '@tarojs/components';
import classnames from 'classnames';
import styles from './index.module.scss';
import { OccupancyLevel } from '@/types';

interface OccupancyBarProps {
  rate: number;
  occupiedSeats: number;
  totalSeats: number;
  showLabel?: boolean;
  size?: 'small' | 'large';
}

const getOccupancyLevel = (rate: number): OccupancyLevel => {
  if (rate >= 70) return 'high';
  if (rate >= 40) return 'medium';
  return 'low';
};

const getLevelLabel = (level: OccupancyLevel): string => {
  switch (level) {
    case 'high': return '较满';
    case 'medium': return '适中';
    case 'low': return '空闲';
  }
};

const OccupancyBar: React.FC<OccupancyBarProps> = ({
  rate,
  occupiedSeats,
  totalSeats,
  showLabel = true,
  size = 'small',
}) => {
  const level = getOccupancyLevel(rate);

  return (
    <View className={classnames(styles.wrapper, styles[size])}>
      <View className={styles.barBg}>
        <View
          className={classnames(styles.barFill, styles[level])}
          style={{ width: `${Math.min(rate, 100)}%` }}
        />
      </View>
      {showLabel && (
        <View className={styles.info}>
          <View className={styles.labelRow}>
            <View className={classnames(styles.dot, styles[`dot${level.charAt(0).toUpperCase() + level.slice(1)}`])} />
            <Text className={classnames(styles.levelLabel, styles[`label${level.charAt(0).toUpperCase() + level.slice(1)}`])}>
              {getLevelLabel(level)}
            </Text>
            <Text className={styles.percentText}>{rate}%</Text>
          </View>
          {size === 'large' && (
            <Text className={styles.seatsText}>
              {occupiedSeats}/{totalSeats} 座已使用
            </Text>
          )}
        </View>
      )}
    </View>
  );
};

export default OccupancyBar;
