import React from 'react';
import { View, Text } from '@tarojs/components';
import classnames from 'classnames';
import styles from './index.module.scss';
import { HourlyOccupancy } from '@/types';

interface TrendChartProps {
  data: HourlyOccupancy[];
  currentRate: number;
}

const TrendChart: React.FC<TrendChartProps> = ({ data, currentRate }) => {
  const maxRate = Math.max(...data.map((d) => d.rate), 100);

  const getBarColor = (rate: number): string => {
    if (rate >= 70) return styles.barHigh;
    if (rate >= 40) return styles.barMedium;
    return styles.barLow;
  };

  const getBarLabelColor = (rate: number): string => {
    if (rate >= 70) return styles.labelHigh;
    if (rate >= 40) return styles.labelMedium;
    return styles.labelLow;
  };

  const currentHour = String(new Date().getHours()).padStart(2, '0') + ':00';

  return (
    <View className={styles.container}>
      <Text className={styles.title}>今日入座率趋势</Text>
      <View className={styles.chart}>
        {data.map((item, index) => {
          const height = (item.rate / maxRate) * 200;
          const isCurrent = item.hour === currentHour;
          return (
            <View key={index} className={styles.barCol}>
              <Text className={classnames(styles.barValue, getBarLabelColor(item.rate))}>
                {item.rate}%
              </Text>
              <View
                className={classnames(
                  styles.bar,
                  getBarColor(item.rate),
                  isCurrent && styles.barCurrent
                )}
                style={{ height: `${height}rpx` }}
              />
              <Text
                className={classnames(
                  styles.barHour,
                  isCurrent && styles.barHourCurrent
                )}
              >
                {item.hour}
              </Text>
            </View>
          );
        })}
      </View>
      <View className={styles.legend}>
        <View className={styles.legendItem}>
          <View className={classnames(styles.legendDot, styles.legendLow)} />
          <Text className={styles.legendText}>空闲</Text>
        </View>
        <View className={styles.legendItem}>
          <View className={classnames(styles.legendDot, styles.legendMedium)} />
          <Text className={styles.legendText}>适中</Text>
        </View>
        <View className={styles.legendItem}>
          <View className={classnames(styles.legendDot, styles.legendHigh)} />
          <Text className={styles.legendText}>较满</Text>
        </View>
      </View>
    </View>
  );
};

export default TrendChart;
