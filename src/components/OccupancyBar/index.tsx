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

const LEVEL: Record<OccupancyLevel, string> = { high: '较满', medium: '适中', low: '空闲' };

const levelFromRate = (rate: number): OccupancyLevel => {
  if (rate >= 70) return 'high';
  if (rate >= 40) return 'medium';
  return 'low';
};

const OccupancyBar: React.FC<OccupancyBarProps> = ({ rate, occupiedSeats, totalSeats, showLabel = true, size = 'small' }) => {
  const level = levelFromRate(rate);
  const cap = `${level.charAt(0).toUpperCase() + level.slice(1)}`;

  return (
    <View className={classnames(styles.wrapper, styles[size])}>
      <View className={styles.barBg}>
        <View className={classnames(styles.barFill, styles[level])} style={{ width: `${Math.min(rate, 100)}%` }} />
      </View>
      {showLabel && (
        <View className={styles.info}>
          <View className={styles.labelRow}>
            <View className={classnames(styles.dot, styles[`dot${cap}`])} />
            <Text className={classnames(styles.levelLabel, styles[`label${cap}`])}>{LEVEL[level]}</Text>
            <Text className={styles.percentText}>{rate}%</Text>
          </View>
          {size === 'large' && <Text className={styles.seatsText}>{occupiedSeats}/{totalSeats} 座已使用</Text>}
        </View>
      )}
    </View>
  );
};

export default OccupancyBar;
