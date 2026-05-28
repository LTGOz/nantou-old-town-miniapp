import React, { useState } from 'react';
import { View, Text } from '@tarojs/components';
import Taro, { usePullDownRefresh } from '@tarojs/taro';
import classnames from 'classnames';
import styles from './index.module.scss';
import FilterTabs from '@/components/FilterTabs';

const circleGroups = [
  { id: 1, name: '📷 古城摄影社', members: 128, desc: '用镜头记录古城之美' },
  { id: 2, name: '🎲 周末桌游局', members: 86, desc: '狼人杀、剧本杀、各种桌游' },
  { id: 3, name: '📖 读书分享会', members: 65, desc: '每月共读一本书' },
  { id: 4, name: '☕ 咖啡品鉴团', members: 52, desc: '打卡古城每一家咖啡馆' },
  { id: 5, name: '🥾 户外徒步队', members: 73, desc: '南山绿道，说走就走' },
  { id: 6, name: '🎨 手作工坊', members: 39, desc: '陶艺、扎染、木工体验' },
];

const neighborPosts = [
  { id: 1, title: '求租古城附近一居室', type: 'rent', user: '小陈', time: '10分钟前' },
  { id: 2, title: '闲置书架转让，八成新', type: 'exchange', user: '李姐', time: '1小时前' },
  { id: 3, title: '猫砂一袋免费送', type: 'help', user: '阿杰', time: '2小时前' },
];

const TYPE_LABEL: Record<string, string> = { rent: '转租', exchange: '交换', help: '互助' };
const TYPE_CSS: Record<string, string> = { rent: 'typeRent', exchange: 'typeExchange', help: 'typeHelp' };

const tabItems = [
  { key: 'circle', label: '兴趣社群' },
  { key: 'neighbor', label: '邻里互助' },
];

const CirclePage: React.FC = () => {
  const [activeTab, setActiveTab] = useState('circle');

  usePullDownRefresh(() => Taro.stopPullDownRefresh());

  return (
    <View className={styles.page}>
      <View className={styles.tabRow}>
        <FilterTabs tabs={tabItems} activeKey={activeTab} onChange={setActiveTab} />
      </View>

      {activeTab === 'circle' && (
        <View className={styles.contentBody}>
          <Text className={styles.sectionTitle}>热门兴趣社群</Text>
          <Text className={styles.sectionDesc}>以兴趣为纽带，遇见同频青年</Text>
          <View className={styles.circleGrid}>
            {circleGroups.map((group) => (
              <View key={group.id} className={styles.circleCard}>
                <View className={styles.circleCardBody}>
                  <Text className={styles.circleName}>{group.name}</Text>
                  <Text className={styles.circleDesc}>{group.desc}</Text>
                  <View className={styles.circleMeta}>
                    <Text className={styles.circleMembers}>{group.members}位成员</Text>
                    <View className={styles.joinBtn}>
                      <Text className={styles.joinBtnText}>加入</Text>
                    </View>
                  </View>
                </View>
              </View>
            ))}
          </View>
        </View>
      )}

      {activeTab === 'neighbor' && (
        <View className={styles.contentBody}>
          <Text className={styles.sectionTitle}>邻里互助</Text>
          <Text className={styles.sectionDesc}>物品借用、合租转租、闲置交换</Text>
          <View className={styles.postList}>
            {neighborPosts.map((post) => (
              <View key={post.id} className={styles.postCard}>
                <View className={styles.postInfo}>
                  <Text className={classnames(styles.postTypeTag, styles[TYPE_CSS[post.type] || 'typeHelp'])}>
                    {TYPE_LABEL[post.type]}
                  </Text>
                  <Text className={styles.postTitle}>{post.title}</Text>
                </View>
                <View className={styles.postMeta}>
                  <Text className={styles.postUser}>{post.user}</Text>
                  <Text className={styles.postTime}>{post.time}</Text>
                </View>
              </View>
            ))}
          </View>
          <View className={styles.emptySpace}>
            <Text className={styles.devTip}>更多功能开发中...</Text>
          </View>
        </View>
      )}
    </View>
  );
};

export default CirclePage;
