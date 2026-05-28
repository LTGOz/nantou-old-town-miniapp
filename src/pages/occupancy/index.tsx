import React, { useState, useMemo } from 'react';
import { View, Text, Image, ScrollView } from '@tarojs/components';
import Taro, { usePullDownRefresh } from '@tarojs/taro';
import classnames from 'classnames';
import styles from './index.module.scss';
import FilterTabs from '@/components/FilterTabs';
import OccupancyBar from '@/components/OccupancyBar';
import { merchants } from '@/data/merchants';
import { occupancyData } from '@/data/occupancy';
import { Merchant, OccupancyRecord, OccupancyLevel } from '@/types';

const categoryTabs = [
  { key: 'all', label: '全部' },
  { key: 'cafe', label: '咖啡馆' },
  { key: 'restaurant', label: '餐厅' },
  { key: 'library', label: '图书馆' },
];

const levelTabs = [
  { key: 'all', label: '全部状态' },
  { key: 'low', label: '空闲' },
  { key: 'medium', label: '适中' },
  { key: 'high', label: '较满' },
];

const LEVEL_LABEL: Record<OccupancyLevel, string> = { high: '较满', medium: '适中', low: '空闲' };
const LEVEL_STYLE: Record<OccupancyLevel, string> = { high: 'levelHigh', medium: 'levelMedium', low: 'levelLow' };

const levelFromRate = (rate: number): OccupancyLevel => {
  if (rate >= 70) return 'high';
  if (rate >= 40) return 'medium';
  return 'low';
};

const OccupancyPage: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [activeLevel, setActiveLevel] = useState('all');
  const [selectedId, setSelectedId] = useState<number | null>(null);

  usePullDownRefresh(() => Taro.stopPullDownRefresh());

  const filtered = useMemo(() => {
    let list = [...merchants];
    if (activeCategory !== 'all') list = list.filter((m) => m.category === activeCategory);
    if (activeLevel !== 'all') {
      list = list.filter((m) => {
        const occ = occupancyData.find((o) => o.merchantId === m.id);
        return occ && levelFromRate(occ.currentOccupancy) === activeLevel;
      });
    }
    return list;
  }, [activeCategory, activeLevel]);

  const selectedMerchant = useMemo(() => {
    const id = selectedId ?? filtered[0]?.id ?? null;
    return id ? merchants.find((m) => m.id === id) ?? null : null;
  }, [selectedId, filtered]);

  const selectedOcc = useMemo(() => {
    if (!selectedMerchant) return null;
    return occupancyData.find((o) => o.merchantId === selectedMerchant.id) ?? null;
  }, [selectedMerchant]);

  const stats = useMemo(() => {
    const total = occupancyData.length;
    const high = occupancyData.filter((o) => o.currentOccupancy >= 70).length;
    const medium = occupancyData.filter((o) => o.currentOccupancy >= 40 && o.currentOccupancy < 70).length;
    const low = total - high - medium;
    return { total, high, medium, low };
  }, []);

  return (
    <View className={styles.page}>
      <View className={styles.statsBar}>
        <View className={styles.statItem}>
          <Text className={styles.statLabel}>商户</Text>
          <Text className={styles.statValue}>{stats.total}</Text>
        </View>
        {(['low', 'medium', 'high'] as const).map((level) => (
          <View key={level} className={styles.statItem}>
            <View className={classnames(styles.statDot, styles[`dot${level.charAt(0).toUpperCase() + level.slice(1)}`])} />
            <Text className={styles.statLabel}>{LEVEL_LABEL[level]}</Text>
            <Text className={styles.statValue}>{stats[level]}</Text>
          </View>
        ))}
      </View>

      <View className={styles.filterSection}>
        <FilterTabs tabs={categoryTabs} activeKey={activeCategory} onChange={setActiveCategory} />
        <View style={{ height: 8 }} />
        <FilterTabs tabs={levelTabs} activeKey={activeLevel} onChange={setActiveLevel} />
      </View>

      <View className={styles.mainContent}>
        <ScrollView className={styles.merchantList} scrollY>
          {filtered.map((merchant) => {
            const occ = occupancyData.find((o) => o.merchantId === merchant.id);
            const level = occ ? levelFromRate(occ.currentOccupancy) : null;
            const isSelected = (selectedId ?? filtered[0]?.id) === merchant.id;

            return (
              <View key={merchant.id} className={classnames(styles.merchantRow, isSelected && styles.merchantRowSelected)} onClick={() => setSelectedId(merchant.id)}>
                <View className={styles.merchantInfo}>
                  <Image className={styles.merchantImage} src={merchant.image} mode="aspectFill" />
                  <View className={styles.merchantDetail}>
                    <Text className={styles.merchantName}>{merchant.name}</Text>
                    <View className={styles.merchantTags}>
                      <Text className={styles.merchantCategory}>{merchant.categoryLabel}</Text>
                      {level && <Text className={classnames(styles.levelTag, styles[LEVEL_STYLE[level]])}>{LEVEL_LABEL[level]}</Text>}
                    </View>
                    <Text className={styles.merchantSeats}>空座 {occ ? occ.totalSeats - occ.occupiedSeats : 0}/{occ?.totalSeats ?? 0}</Text>
                  </View>
                </View>
                {occ && (
                  <View className={styles.occupancyBar}>
                    <OccupancyBar rate={occ.currentOccupancy} occupiedSeats={occ.occupiedSeats} totalSeats={occ.totalSeats} size="small" />
                    <Text className={styles.updateTime}>更新于 {occ.updateTime}</Text>
                  </View>
                )}
              </View>
            );
          })}
        </ScrollView>

        {selectedMerchant && selectedOcc && (
          <View className={styles.bottomPanel}>
            <View className={styles.panelHeader}>
              <View className={styles.panelTitleRow}>
                <Text className={styles.panelTitle}>{selectedMerchant.name}</Text>
                <View className={styles.panelActions}>
                  <View className={styles.detailBtn} onClick={() => Taro.navigateTo({ url: `/pages/merchant-detail/index?id=${selectedMerchant.id}` })}>
                    <Text className={styles.detailBtnText}>详情</Text>
                  </View>
                  <View className={styles.navBtn} onClick={() => Taro.openLocation({ latitude: selectedMerchant.latitude, longitude: selectedMerchant.longitude, name: selectedMerchant.name, address: selectedMerchant.address })}>
                    <Text className={styles.navBtnText}>导航</Text>
                  </View>
                </View>
              </View>
            </View>
            <View className={styles.panelBody}>
              <View className={styles.panelOccupancy}>
                <View className={styles.panelPercent}>
                  <Text className={styles.percentNum}>{selectedOcc.currentOccupancy}%</Text>
                  <Text className={styles.percentLabel}>实时入座率</Text>
                </View>
                <View className={styles.panelBar}>
                  <OccupancyBar rate={selectedOcc.currentOccupancy} occupiedSeats={selectedOcc.occupiedSeats} totalSeats={selectedOcc.totalSeats} size="large" />
                </View>
              </View>
            </View>
          </View>
        )}
      </View>
    </View>
  );
};

export default OccupancyPage;
