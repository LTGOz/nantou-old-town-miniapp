import React from 'react';
import { View, Text, Image } from '@tarojs/components';
import Taro, { type ITouchEvent } from '@tarojs/taro';
import styles from './index.module.scss';
import OccupancyBar from '@/components/OccupancyBar';
import { Merchant, OccupancyRecord } from '@/types';

interface MerchantCardProps {
  merchant: Merchant;
  occupancy?: OccupancyRecord;
}

const MerchantCard: React.FC<MerchantCardProps> = ({ merchant, occupancy }) => {
  const toDetail = () => Taro.navigateTo({ url: `/pages/merchant-detail/index?id=${merchant.id}` });
  const toLocation = (e: ITouchEvent) => {
    e.stopPropagation();
    Taro.openLocation({ latitude: merchant.latitude, longitude: merchant.longitude, name: merchant.name, address: merchant.address });
  };

  return (
    <View className={styles.card} onClick={toDetail}>
      <View className={styles.imageWrap}>
        <Image className={styles.image} src={merchant.image} mode="aspectFill" />
        <View className={styles.categoryTag}>
          <Text className={styles.categoryText}>{merchant.categoryLabel}</Text>
        </View>
      </View>
      <View className={styles.content}>
        <View className={styles.header}>
          <Text className={styles.name}>{merchant.name}</Text>
          <View className={styles.rating}>
            <Text className={styles.ratingText}>★ {merchant.rating}</Text>
          </View>
        </View>
        <Text className={styles.address}>{merchant.address}</Text>
        <View className={styles.tags}>
          {merchant.tags.slice(0, 3).map((tag) => (
            <Text key={tag} className={styles.tag}>{tag}</Text>
          ))}
        </View>
        {occupancy && (
          <View className={styles.occupancySection}>
            <OccupancyBar rate={occupancy.currentOccupancy} occupiedSeats={occupancy.occupiedSeats} totalSeats={occupancy.totalSeats} size="small" />
          </View>
        )}
        <View className={styles.actions}>
          <View className={styles.navBtn} onClick={toLocation}>
            <Text className={styles.navBtnText}>📍 导航前往</Text>
          </View>
          <View className={styles.openTime}>
            <Text className={styles.openTimeText}>{merchant.openTime}</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default MerchantCard;
