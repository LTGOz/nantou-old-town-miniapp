import React from 'react';
import { View, Text } from '@tarojs/components';
import styles from './index.module.scss';

const mineMenus = [
  { icon: '📋', label: '我的报名', count: '3' },
  { icon: '⭐', label: '我的收藏', count: '5' },
  { icon: '✏️', label: '我的发布', count: '1' },
  { icon: '🏆', label: '我的积分', count: '256' },
];

const otherMenus = [
  { icon: '🔔', label: '消息中心' },
  { icon: '⚙️', label: '设置' },
  { icon: '❓', label: '帮助与反馈' },
];

const MinePage: React.FC = () => {
  return (
    <View className={styles.page}>
      <View className={styles.profileSection}>
        <View className={styles.avatar}>
          <Text className={styles.avatarText}>👤</Text>
        </View>
        <Text className={styles.nickname}>古城青年</Text>
        <Text className={styles.role}>常住租户 · 已认证</Text>
      </View>

      <View className={styles.menuSection}>
        <View className={styles.menuGrid}>
          {mineMenus.map((item) => (
            <View key={item.label} className={styles.menuItem}>
              <Text className={styles.menuIcon}>{item.icon}</Text>
              <Text className={styles.menuLabel}>{item.label}</Text>
              <Text className={styles.menuCount}>{item.count}</Text>
            </View>
          ))}
        </View>
      </View>

      <View className={styles.menuSection}>
        {otherMenus.map((item) => (
          <View key={item.label} className={styles.menuRow}>
            <View className={styles.menuRowLeft}>
              <Text className={styles.menuRowIcon}>{item.icon}</Text>
              <Text className={styles.menuRowLabel}>{item.label}</Text>
            </View>
            <Text className={styles.menuRowArrow}>›</Text>
          </View>
        ))}
      </View>

      <View className={styles.footer}>
        <Text className={styles.footerText}>南头古城青年社交平台 v1.0.0</Text>
      </View>
    </View>
  );
};

export default MinePage;
