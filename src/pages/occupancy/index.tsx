import React, { useState, useEffect, useMemo } from 'react';
import { View, Text, Image, ScrollView } from '@tarojs/components';
import Taro, { usePullDownRefresh } from '@tarojs/taro';
import classnames from 'classnames';
import styles from './index.module.scss';
import FilterTabs from '@/components/FilterTabs';
import OccupancyBar from '@/components/OccupancyBar';
import TrendChart from '@/components/TrendChart';
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

const OccupancyPage: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [activeLevel, setActiveLevel] = useState('all');
  const [selectedMerchantId, setSelectedMerchantId] = useState<number | null>(null);

  useEffect(() => {
    if (selectedMerchantId === null && filteredMerchants.length > 0) {
      setSelectedMerchantId(filteredMerchants[0].id);
    }
  }, []);

  usePullDownRefresh(() => {
    setTimeout(() => Taro.stopPullDownRefresh(), 600);
  });

  const getOccupancyRecord = (merchantId: number): OccupancyRecord | undefined => {
    return occupancyData.find((o) => o.merchantId === merchantId);
  };

  const getOccupancyLevel = (rate: number): OccupancyLevel => {
    if (rate >= 70) return 'high';
    if (rate >= 40) return 'medium';
    return 'low';
  };

  const getLevelLabel = (level: OccupancyLevel): string => {
    if (level === 'high') return '较满';
    if (level === 'medium') return '适中';
    return '空闲';
  };

  const getLevelStyle = (level: OccupancyLevel): string => {
    if (level === 'high') return styles.levelHigh;
    if (level === 'medium') return styles.levelMedium;
    return styles.levelLow;
  };

  const filteredMerchants = useMemo(() => {
    let list = merchants;
    if (activeCategory !== 'all') {
      list = list.filter((m) => m.category === activeCategory);
    }
    if (activeLevel !== 'all') {
      list = list.filter((m) => {
        const occ = getOccupancyRecord(m.id);
        if (!occ) return false;
        return getOccupancyLevel(occ.currentOccupancy) === activeLevel;
      });
    }
    return list;
  }, [activeCategory, activeLevel]);

  const selectedMerchant = useMemo(() => {
    return merchants.find((m) => m.id === selectedMerchantId) || null;
  }, [selectedMerchantId]);

  const selectedOccupancy = useMemo(() => {
    if (!selectedMerchantId) return null;
    return getOccupancyRecord(selectedMerchantId) || null;
  }, [selectedMerchantId]);

  const trendData = useMemo(() => {
    if (!selectedMerchantId) return [];
    const record = getOccupancyRecord(selectedMerchantId);
    return record?.hourlyData || [];
  }, [selectedMerchantId]);

  const overallStats = useMemo(() => {
    const total = occupancyData.length;
    const highCount = occupancyData.filter((o) => o.currentOccupancy >= 70).length;
    const mediumCount = occupancyData.filter((o) => o.currentOccupancy >= 40 && o.currentOccupancy < 70).length;
    const lowCount = total - highCount - mediumCount;
    return { total, highCount, mediumCount, lowCount };
  }, []);

  const handleMerchantSelect = (id: number) => {
    setSelectedMerchantId(id);
  };

  const handleNavigate = (merchant: Merchant) => {
    Taro.openLocation({
      latitude: merchant.latitude,
      longitude: merchant.longitude,
      name: merchant.name,
      address: merchant.address,
    });
  };

  return (
    <View className={styles.page}>
      <View className={styles.statsBar}>
        <View className={styles.statItem}>
          <Text className={styles.statLabel}>总商户</Text>
          <Text className={styles.statValue}>{overallStats.total}</Text>
        </View>
        <View className={styles.statItem}>
          <View className={classnames(styles.statDot, styles.dotLow)} />
          <Text className={styles.statLabel}>空闲</Text>
          <Text className={styles.statValue}>{overallStats.lowCount}</Text>
        </View>
        <View className={styles.statItem}>
          <View className={classnames(styles.statDot, styles.dotMedium)} />
          <Text className={styles.statLabel}>适中</Text>
          <Text className={styles.statValue}>{overallStats.mediumCount}</Text>
        </View>
        <View className={styles.statItem}>
          <View className={classnames(styles.statDot, styles.dotHigh)} />
          <Text className={styles.statLabel}>较满</Text>
          <Text className={styles.statValue}>{overallStats.highCount}</Text>
        </View>
      </View>

      <View className={styles.filterSection}>
        <FilterTabs tabs={categoryTabs} activeKey={activeCategory} onChange={setActiveCategory} />
        <View style={{ height: '8rpx' }} />
        <FilterTabs tabs={levelTabs} activeKey={activeLevel} onChange={setActiveLevel} />
      </View>

      <View className={styles.mainContent}>
        <ScrollView className={styles.merchantList} scrollY>
          {filteredMerchants.length > 0 ? (
            filteredMerchants.map((merchant) => {
              const occupancy = getOccupancyRecord(merchant.id);
              const level = occupancy ? getOccupancyLevel(occupancy.currentOccupancy) : null;
              const isSelected = selectedMerchantId === merchant.id;

              return (
                <View
                  key={merchant.id}
                  className={classnames(styles.merchantRow, isSelected && styles.merchantRowSelected)}
                  onClick={() => handleMerchantSelect(merchant.id)}
                >
                  <View className={styles.merchantInfo}>
                    <Image className={styles.merchantImage} src={merchant.image} mode="aspectFill" />
                    <View className={styles.merchantDetail}>
                      <Text className={styles.merchantName}>{merchant.name}</Text>
                      <View className={styles.merchantTags}>
                        <Text className={styles.merchantCategory}>{merchant.categoryLabel}</Text>
                        {level && (
                          <Text className={classnames(styles.levelTag, getLevelStyle(level))}>
                            {getLevelLabel(level)}
                          </Text>
                        )}
                      </View>
                      <Text className={styles.merchantSeats}>
                        空座 {occupancy ? occupancy.totalSeats - occupancy.occupiedSeats : 0}/{occupancy?.totalSeats || 0}
                      </Text>
                    </View>
                  </View>
                  {occupancy && (
                    <View className={styles.occupancyBar}>
                      <OccupancyBar
                        rate={occupancy.currentOccupancy}
                        occupiedSeats={occupancy.occupiedSeats}
                        totalSeats={occupancy.totalSeats}
                        size="small"
                      />
                      <View className={styles.trendIndicator}>
                        <Text className={styles.updateTime}>更新于 {occupancy.updateTime}</Text>
                      </View>
                    </View>
                  )}
                </View>
              );
            })
          ) : (
            <View className={styles.emptyTip}>
              <Text className={styles.emptyText}>暂无匹配商户</Text>
            </View>
          )}
        </ScrollView>

        {selectedMerchant && selectedOccupancy && (
          <View className={styles.bottomPanel}>
            <View className={styles.panelHeader}>
              <View className={styles.panelTitleRow}>
                <Text className={styles.panelTitle}>{selectedMerchant.name}</Text>
                <View className={styles.panelActions}>
                  <View className={styles.detailBtn}>
                    <Text
                      className={styles.detailBtnText}
                      onClick={() => Taro.navigateTo({ url: `/pages/merchant-detail/index?id=${selectedMerchant.id}` })}
                    >
                      详情
                    </Text>
                  </View>
                  <View className={styles.navBtn} onClick={() => handleNavigate(selectedMerchant)}>
                    <Text className={styles.navBtnText}>导航</Text>
                  </View>
                </View>
              </View>
            </View>
            <View className={styles.panelBody}>
              <View className={styles.panelOccupancy}>
                <View className={styles.panelPercent}>
                  <Text className={styles.percentNum}>{selectedOccupancy.currentOccupancy}%</Text>
                  <Text className={styles.percentLabel}>实时入座率</Text>
                </View>
                <View className={styles.panelBar}>
                  <OccupancyBar
                    rate={selectedOccupancy.currentOccupancy}
                    occupiedSeats={selectedOccupancy.occupiedSeats}
                    totalSeats={selectedOccupancy.totalSeats}
                    size="large"
                  />
                </View>
              </View>
              <TrendChart data={trendData} currentRate={selectedOccupancy.currentOccupancy} />
            </View>
          </View>
        )}
      </View>
    </View>
  );
};

export default OccupancyPage;
