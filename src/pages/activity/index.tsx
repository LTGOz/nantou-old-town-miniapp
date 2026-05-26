import React, { useState, useMemo } from 'react';
import { View, Text, Image } from '@tarojs/components';
import Taro, { usePullDownRefresh } from '@tarojs/taro';
import classnames from 'classnames';
import styles from './index.module.scss';
import FilterTabs from '@/components/FilterTabs';
import { activities } from '@/data/activities';
import { Activity } from '@/types';

const typeTabs = [
  { key: 'all', label: '全部活动' },
  { key: 'community', label: '社区活动' },
  { key: 'merchant', label: '商户活动' },
  { key: 'personal', label: '个人发起' },
];

const ActivityPage: React.FC = () => {
  const [activeType, setActiveType] = useState('all');

  usePullDownRefresh(() => {
    setTimeout(() => Taro.stopPullDownRefresh(), 600);
  });

  const filteredActivities = useMemo(() => {
    if (activeType === 'all') return activities;
    return activities.filter((a) => a.type === activeType);
  }, [activeType]);

  const getTypeBadgeStyle = (type: string): string => {
    if (type === 'community') return styles.badgeCommunity;
    if (type === 'merchant') return styles.badgeMerchant;
    return styles.badgePersonal;
  };

  const handleActivityClick = (activity: Activity) => {
    Taro.navigateTo({ url: `/pages/activity-detail/index?id=${activity.id}` });
  };

  return (
    <View className={styles.page}>
      <View className={styles.filterRow}>
        <FilterTabs tabs={typeTabs} activeKey={activeType} onChange={setActiveType} />
      </View>

      {filteredActivities.length > 0 ? (
        <View className={styles.listSection}>
          {filteredActivities.map((act) => (
            <View
              key={act.id}
              className={styles.activityCard}
              onClick={() => handleActivityClick(act)}
            >
              <View className={styles.activityImage}>
                <Image src={act.image} mode="aspectFill" style={{ width: '100%', height: '100%' }} />
                <View className={classnames(styles.typeBadge, getTypeBadgeStyle(act.type))}>
                  <Text className={styles.badgeText}>{act.typeLabel}</Text>
                </View>
                {act.fee > 0 && (
                  <View className={styles.feeBadge}>
                    <Text className={styles.feeText}>¥{act.fee}</Text>
                  </View>
                )}
              </View>
              <View className={styles.activityBody}>
                <Text className={styles.actTitle}>{act.title}</Text>
                <View className={styles.metaRow}>
                  <Text className={styles.metaItem}>{act.date}</Text>
                  <Text className={styles.metaItem}>{act.time}</Text>
                </View>
                <Text className={styles.metaLocation}>{act.location}</Text>
                <Text className={styles.actDesc}>{act.description}</Text>
                <View className={styles.footer}>
                  <Text className={styles.organizer}>{act.organizer}</Text>
                  <View className={styles.participants}>
                    <View className={styles.participantBar}>
                      <View
                        className={styles.participantFill}
                        style={{ width: `${(act.currentParticipants / act.maxParticipants) * 100}%` }}
                      />
                    </View>
                    <Text className={styles.participantCount}>{act.currentParticipants}</Text>
                    <Text className={styles.participantMax}>/{act.maxParticipants}</Text>
                  </View>
                </View>
              </View>
            </View>
          ))}
        </View>
      ) : (
        <View className={styles.emptyTip}>
          <Text className={styles.emptyEmoji}>📋</Text>
          <Text className={styles.emptyText}>暂无此分类活动</Text>
        </View>
      )}

      <View className={styles.bottomSpace} />
    </View>
  );
};

export default ActivityPage;
