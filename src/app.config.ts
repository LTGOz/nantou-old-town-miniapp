export default defineAppConfig({
  pages: [
    'pages/home/index',
    'pages/occupancy/index',
    'pages/activity/index',
    'pages/circle/index',
    'pages/mine/index',
    'pages/merchant-detail/index',
    'pages/activity-detail/index',
  ],
  window: {
    backgroundTextStyle: 'dark',
    navigationBarBackgroundColor: '#F2F0ED',
    navigationBarTitleText: '南头古城',
    navigationBarTextStyle: 'black',
  },
  tabBar: {
    color: '#B5B0AB',
    selectedColor: '#8B7E74',
    backgroundColor: '#FFFFFF',
    borderStyle: 'white',
    list: [
      { pagePath: 'pages/home/index', text: '首页' },
      { pagePath: 'pages/occupancy/index', text: '入座率' },
      { pagePath: 'pages/activity/index', text: '活动' },
      { pagePath: 'pages/circle/index', text: '圈子' },
      { pagePath: 'pages/mine/index', text: '我的' },
    ],
  },
});
