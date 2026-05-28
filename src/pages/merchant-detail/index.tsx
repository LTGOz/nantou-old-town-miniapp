import React, { useState, useEffect } from 'react';
import { View, Text, Image, ScrollView } from '@tarojs/components';
import Taro, { useRouter } from '@tarojs/taro';
import styles from './index.module.scss';
import OccupancyBar from '@/components/OccupancyBar';
import TrendChart from '@/components/TrendChart';
import LoadingSpinner from '@/components/LoadingSpinner';
import { getMerchantById } from '@/services/merchant';
import { getOccupancyByMerchant } from '@/services/occupancy';
import { Merchant, OccupancyRecord } from '@/types';

const MerchantDetailPage: React.FC = () => {
  const router = useRouter();
  const { id } = router.params;
  const [merchant, setMerchant] = useState<Merchant | null>(null);
  const [occupancy, setOccupancy] = useState<OccupancyRecord | null>(null);

  useEffect(() => {
    if (id) {
      const mId = parseInt(String(id));
      const m = getMerchantById(mId);
      const o = getOccupancyByMerchant(mId);
      setMerchant(m || null);
      setOccupancy(o || null);
    }
  }, [id]);

  if (!merchant) {
    return (
      <View className={styles.page}>
        <LoadingSpinner text="加载商户信息" />
      </View>
    );
  }

  return (
    <ScrollView className={styles.page} scrollY>
      <Image className={styles.cover} src={merchant.image} mode="aspectFill" />
      <View className={styles.body}>
        <Text className={styles.name}>{merchant.name}</Text>
        <View className={styles.basicInfo}>
          <Text className={styles.rating}>★ {merchant.rating}</Text>
          <Text className={styles.divider}>|</Text>
          <Text className={styles.category}>{merchant.categoryLabel}</Text>
          <Text className={styles.divider}>|</Text>
          <Text className={styles.time}>{merchant.openTime}</Text>
        </View>
        <Text className={styles.address}>{merchant.address}</Text>

        <View className={styles.tags}>
          {merchant.tags.map((tag) => (
            <Text key={tag} className={styles.tag}>{tag}</Text>
          ))}
        </View>

        <Text className={styles.desc}>{merchant.description}</Text>

        {occupancy && (
          <View className={styles.occupancyCard}>
            <View className={styles.occHeader}>
              <Text className={styles.occTitle}>实时入座率</Text>
              <Text className={styles.occTime}>更新于 {occupancy.updateTime}</Text>
            </View>
            <View className={styles.occMain}>
              <View className={styles.occPercent}>
                <Text className={styles.occNum}>{occupancy.currentOccupancy}%</Text>
              </View>
              <View className={styles.occBar}>
                <OccupancyBar
                  rate={occupancy.currentOccupancy}
                  occupiedSeats={occupancy.occupiedSeats}
                  totalSeats={occupancy.totalSeats}
                  size="large"
                />
              </View>
            </View>
            <TrendChart data={occupancy.hourlyData} currentRate={occupancy.currentOccupancy} />
          </View>
        )}

        <View className={styles.navigateBtn} onClick={() => {
          Taro.openLocation({
            latitude: merchant.latitude,
            longitude: merchant.longitude,
            name: merchant.name,
            address: merchant.address,
          });
        }}>
          <Text className={styles.navigateBtnText}>📍 导航前往</Text>
        </View>
      </View>
    </ScrollView>
  );
};

export default MerchantDetailPage;
