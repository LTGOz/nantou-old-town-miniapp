import React, { useState, useEffect } from 'react';
import { View, Text, Image, Swiper, SwiperItem } from '@tarojs/components';
import Taro, { usePullDownRefresh } from '@tarojs/taro';
import classnames from 'classnames';
import styles from './index.module.scss';
import OccupancyBar from '@/components/OccupancyBar';
import { activities } from '@/data/activities';
import { merchants } from '@/data/merchants';
import { occupancyData } from '@/data/occupancy';
import { Activity, Merchant } from '@/types';

const banners = [
  { id: 1, title: '南头古城青年市集', desc: '本周六主街广场，不见不散', image: 'https://picsum.photos/id/1036/750/400' },
  { id: 2, title: '社区闲置交换日', desc: '带一件闲置来，换一件好物走', image: 'https://picsum.photos/id/225/750/400' },
  { id: 3, title: '古城读书分享会', desc: '本月共读书目《看不见的城市》', image: 'https://picsum.photos/id/1082/750/400' },
];

const quickEntries = [
  { key: 'cafe', emoji: '☕', label: '咖啡馆' },
  { key: 'restaurant', emoji: '🍽️', label: '餐厅' },
  { key: 'library', emoji: '📚', label: '图书馆' },
];

const categoryNavs = [
  { key: 'community', emoji: '🏛️', label: '社区活动' },
  { key: 'merchant', emoji: '🛍️', label: '商户活动' },
  { key: 'personal', emoji: '🙋', label: '个人发起' },
];

const HomePage: React.FC = () => {
  const [hotActivities, setHotActivities] = useState<Activity[]>([]);
  const [topMerchants, setTopMerchants] = useState<Merchant[]>([]);

  useEffect(() => {
    loadData();
  }, []);

  usePullDownRefresh(() => {
    loadData();
    setTimeout(() => {
      Taro.stopPullDownRefresh();
    }, 600);
  });

  const loadData = () => {
    setHotActivities(activities.slice(0, 2));
    setTopMerchants([...merchants].sort((a, b) => b.rating - a.rating).slice(0, 4));
  };

  const getTodayDate = (): string => {
    const now = new Date();
    const weekDays = ['周日', '周一', '周二', '周三', '周四', '周五', '周六'];
    return `${now.getMonth() + 1}月${now.getDate()}日 ${weekDays[now.getDay()]}`;
  };

  const getTypeStyle = (type: string): string => {
    if (type === 'community') return styles.tagCommunity;
    if (type === 'merchant') return styles.tagMerchant;
    return styles.tagPersonal;
  };

  const handleQuickEntry = (key: string) => {
    Taro.switchTab({
      url: `/pages/occupancy/index?category=${key}`,
    });
  };

  const handleCategoryNav = (key: string) => {
    Taro.switchTab({
      url: `/pages/activity/index?type=${key}`,
    });
  };

  const getOccupancyForMerchant = (merchantId: number) => {
    return occupancyData.find((o) => o.merchantId === merchantId);
  };

  return (
    <View className={styles.page}>
      <View className={styles.header}>
        <View className={styles.headerTop}>
          <Text className={styles.headerTitle}>南头古城</Text>
          <Text className={styles.headerDate}>{getTodayDate()}</Text>
        </View>
        <Text className={styles.slogan}>兴趣相聚，轻社交，遇古城同频青年</Text>
        <View className={styles.quickEntry}>
          {quickEntries.map((entry) => (
            <View
              key={entry.key}
              className={styles.entryCard}
              onClick={() => handleQuickEntry(entry.key)}
            >
              <Text className={styles.entryEmoji}>{entry.emoji}</Text>
              <Text className={styles.entryLabel}>{entry.label}入座率</Text>
            </View>
          ))}
        </View>
      </View>

      <View className={styles.bannerSection}>
        <Swiper
          className={styles.bannerWrap}
          indicatorDots
          autoplay
          interval={4000}
          circular
        >
          {banners.map((banner) => (
            <SwiperItem key={banner.id}>
              <Image className={styles.bannerImage} src={banner.image} mode="aspectFill" />
              <View className={styles.bannerOverlay}>
                <Text className={styles.bannerTitle}>{banner.title}</Text>
                <Text className={styles.bannerDesc}>{banner.desc}</Text>
              </View>
            </SwiperItem>
          ))}
        </Swiper>
      </View>

      <View className={styles.section} style={{ marginTop: '32rpx' }}>
        <View className={styles.sectionHeader}>
          <Text className={styles.sectionTitle}>活动分类</Text>
        </View>
        <View className={styles.categoryNav}>
          {categoryNavs.map((cat) => (
            <View
              key={cat.key}
              className={styles.catBtn}
              onClick={() => handleCategoryNav(cat.key)}
            >
              <Text className={styles.catEmoji}>{cat.emoji}</Text>
              <Text className={styles.catLabel}>{cat.label}</Text>
            </View>
          ))}
        </View>
      </View>

      <View className={styles.section}>
        <View className={styles.sectionHeader}>
          <Text className={styles.sectionTitle}>热门活动</Text>
          <Text
            className={styles.sectionMore}
            onClick={() => Taro.switchTab({ url: '/pages/activity/index' })}
          >
            查看全部 ›
          </Text>
        </View>
        <View className={styles.activityCards}>
          {hotActivities.map((act) => (
            <View
              key={act.id}
              className={styles.activityCard}
              onClick={() => Taro.navigateTo({ url: `/pages/activity-detail/index?id=${act.id}` })}
            >
              <Image className={styles.activityImage} src={act.image} mode="aspectFill" />
              <View className={styles.activityInfo}>
                <Text className={styles.activityTitle}>{act.title}</Text>
                <View className={styles.activityMeta}>
                  <Text>{act.date}</Text>
                  <Text className={styles.metaDivider}>|</Text>
                  <Text>{act.time}</Text>
                  <Text className={styles.metaDivider}>|</Text>
                  <Text>{act.location}</Text>
                </View>
                <View className={styles.activityFooter}>
                  <Text className={classnames(styles.typeTag, getTypeStyle(act.type))}>
                    {act.typeLabel}
                  </Text>
                  <Text className={styles.activityParticipants}>
                    {act.currentParticipants}/{act.maxParticipants}人
                  </Text>
                </View>
              </View>
            </View>
          ))}
        </View>
      </View>

      <View className={styles.section}>
        <View className={styles.sectionHeader}>
          <Text className={styles.sectionTitle}>热门商户</Text>
          <Text
            className={styles.sectionMore}
            onClick={() => Taro.switchTab({ url: '/pages/occupancy/index' })}
          >
            查看入座率 ›
          </Text>
        </View>
        <View className={styles.merchantGrid}>
          {topMerchants.map((merchant) => {
            const occupancy = getOccupancyForMerchant(merchant.id);
            return (
              <View
                key={merchant.id}
                className={styles.merchantMini}
                onClick={() => Taro.navigateTo({ url: `/pages/merchant-detail/index?id=${merchant.id}` })}
              >
                <Image className={styles.merchantMiniImg} src={merchant.image} mode="aspectFill" />
                <View className={styles.merchantMiniInfo}>
                  <Text className={styles.merchantMiniName}>{merchant.name}</Text>
                  <Text className={styles.merchantMiniDesc}>★ {merchant.rating}</Text>
                  {occupancy && (
                    <View className={styles.merchantMiniBar}>
                      <OccupancyBar
                        rate={occupancy.currentOccupancy}
                        occupiedSeats={occupancy.occupiedSeats}
                        totalSeats={occupancy.totalSeats}
                        size="small"
                      />
                    </View>
                  )}
                </View>
              </View>
            );
          })}
        </View>
      </View>

      <View className={styles.bottomSpace} />
    </View>
  );
};

export default HomePage;
