import React from 'react';
import { View, Text } from '@tarojs/components';
import styles from './index.module.scss';

interface LoadingSpinnerProps {
  text?: string;
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ text = '加载中' }) => (
  <View className={styles.wrapper}>
    <View className={styles.container}>
      <View className={`${styles.block} ${styles.blockA}`} />
      <View className={`${styles.block} ${styles.blockB}`} />
      <View className={`${styles.block} ${styles.blockC}`} />
      <View className={`${styles.block} ${styles.blockD}`} />
    </View>
    <Text className={styles.text}>{text}</Text>
  </View>
);

export default LoadingSpinner;
