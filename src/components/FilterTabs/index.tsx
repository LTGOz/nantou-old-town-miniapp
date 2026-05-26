import React from 'react';
import { View, Text, ScrollView } from '@tarojs/components';
import classnames from 'classnames';
import styles from './index.module.scss';

interface Tab {
  key: string;
  label: string;
  count?: number;
}

interface FilterTabsProps {
  tabs: Tab[];
  activeKey: string;
  onChange: (key: string) => void;
}

const FilterTabs: React.FC<FilterTabsProps> = ({ tabs, activeKey, onChange }) => {
  return (
    <ScrollView className={styles.container} scrollX>
      {tabs.map((tab) => (
        <View
          key={tab.key}
          className={classnames(styles.tab, activeKey === tab.key && styles.active)}
          onClick={() => onChange(tab.key)}
        >
          <Text className={classnames(styles.tabLabel, activeKey === tab.key && styles.activeLabel)}>
            {tab.label}
          </Text>
          {tab.count !== undefined && (
            <Text className={classnames(styles.tabCount, activeKey === tab.key && styles.activeCount)}>
              {tab.count}
            </Text>
          )}
        </View>
      ))}
    </ScrollView>
  );
};

export default FilterTabs;
