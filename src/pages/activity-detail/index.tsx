import React, { useState, useEffect } from 'react';
import { View, Text, Image, ScrollView } from '@tarojs/components';
import Taro, { useRouter } from '@tarojs/taro';
import classnames from 'classnames';
import styles from './index.module.scss';
import LoadingSpinner from '@/components/LoadingSpinner';
import { getActivityById } from '@/services/activity';
import { Activity } from '@/types';

const ActivityDetailPage: React.FC = () => {
  const router = useRouter();
  const { id } = router.params;
  const [activity, setActivity] = useState<Activity | null>(null);

  useEffect(() => {
    if (id) {
      const aId = parseInt(String(id));
      const act = getActivityById(aId);
      setActivity(act || null);
    }
  }, [id]);

  const getTypeStyle = (type: string): string => {
    if (type === 'community') return styles.badgeCommunity;
    if (type === 'merchant') return styles.badgeMerchant;
    return styles.badgePersonal;
  };

  if (!activity) {
    return (
      <View className={styles.page}>
        <LoadingSpinner text="加载活动详情" />
      </View>
    );
  }

  const progress = Math.round((activity.currentParticipants / activity.maxParticipants) * 100);

  return (
    <ScrollView className={styles.page} scrollY>
      <Image className={styles.cover} src={activity.image} mode="aspectFill" />
      <View className={styles.body}>
        <View className={styles.badgeRow}>
          <Text className={classnames(styles.typeBadge, getTypeStyle(activity.type))}>
            {activity.typeLabel}
          </Text>
          {activity.fee > 0 && (
            <Text className={styles.feeLabel}>¥{activity.fee}</Text>
          )}
        </View>

        <Text className={styles.title}>{activity.title}</Text>

        <View className={styles.infoCard}>
          <View className={styles.infoRow}>
            <Text className={styles.infoLabel}>📅 日期</Text>
            <Text className={styles.infoValue}>{activity.date}</Text>
          </View>
          <View className={styles.infoRow}>
            <Text className={styles.infoLabel}>⏰ 时间</Text>
            <Text className={styles.infoValue}>{activity.time}</Text>
          </View>
          <View className={styles.infoRow}>
            <Text className={styles.infoLabel}>📍 地点</Text>
            <Text className={styles.infoValue}>{activity.location}</Text>
          </View>
          <View className={styles.infoRow}>
            <Text className={styles.infoLabel}>👤 组织者</Text>
            <Text className={styles.infoValue}>{activity.organizer}</Text>
          </View>
        </View>

        <View className={styles.progressSection}>
          <View className={styles.progressHeader}>
            <Text className={styles.progressLabel}>报名进度</Text>
            <Text className={styles.progressCount}>
              {activity.currentParticipants}/{activity.maxParticipants} 人
            </Text>
          </View>
          <View className={styles.progressBar}>
            <View className={styles.progressFill} style={{ width: `${progress}%` }} />
          </View>
        </View>

        <View className={styles.descSection}>
          <Text className={styles.descTitle}>活动介绍</Text>
          <Text className={styles.desc}>{activity.description}</Text>
        </View>

        <View className={styles.bottomAction}>
          <View className={styles.signUpBtn}>
            <Text className={styles.signUpText}>立即报名</Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default ActivityDetailPage;
