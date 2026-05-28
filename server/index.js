const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

const merchants = [
  { id: 1, name: '古城角落咖啡馆', category: 'cafe', categoryLabel: '咖啡馆', address: '南头古城中山西街12号', latitude: 22.536, longitude: 113.925, image: 'https://picsum.photos/id/312/300/300', rating: 4.8, totalSeats: 48, openTime: '08:00-22:00', description: '藏在古城巷子里的精品咖啡馆，手冲咖啡与古城慢时光的完美邂逅。', tags: ['手冲咖啡', '安静办公', '户外庭院'] },
  { id: 2, name: '南头书院·阅读空间', category: 'library', categoryLabel: '图书馆', address: '南头古城东城门内', latitude: 22.538, longitude: 113.927, image: 'https://picsum.photos/id/1082/300/300', rating: 4.9, totalSeats: 120, openTime: '09:00-21:00', description: '古城公益图书馆，藏书丰富，设有安静阅读区与小组讨论区。', tags: ['免费阅读', '安静自习', 'WiFi覆盖'] },
  { id: 3, name: '梧桐小馆', category: 'restaurant', categoryLabel: '餐厅', address: '南头古城中山南街28号', latitude: 22.537, longitude: 113.926, image: 'https://picsum.photos/id/292/300/300', rating: 4.6, totalSeats: 86, openTime: '11:00-22:00', description: '融合粤菜与新式料理，在百年老宅中品味舌尖上的古城。', tags: ['新式粤菜', '老宅餐厅', '约会圣地'] },
  { id: 4, name: '壹页书店', category: 'library', categoryLabel: '图书馆', address: '南头古城朝阳南街8号', latitude: 22.535, longitude: 113.924, image: 'https://picsum.photos/id/787/300/300', rating: 4.7, totalSeats: 35, openTime: '10:00-20:00', description: '独立书店+阅读空间，定期举办读书会与作者分享活动。', tags: ['独立书店', '读书会', '文创周边'] },
  { id: 5, name: '古城小筑咖啡', category: 'cafe', categoryLabel: '咖啡馆', address: '南头古城兴明北街15号', latitude: 22.539, longitude: 113.928, image: 'https://picsum.photos/id/431/300/300', rating: 4.5, totalSeats: 32, openTime: '09:00-23:00', description: '三层小楼的空中咖啡馆，顶楼露台可俯瞰古城全景。', tags: ['露台景观', '特调饮品', '拍照打卡'] },
  { id: 6, name: '家味小厨', category: 'restaurant', categoryLabel: '餐厅', address: '南头古城中山北街42号', latitude: 22.540, longitude: 113.929, image: 'https://picsum.photos/id/326/300/300', rating: 4.4, totalSeats: 55, openTime: '10:30-21:30', description: '本地阿姨主理的家常菜馆，地道广东味道，价格亲民。', tags: ['家常菜', '价格亲民', '本地味道'] },
  { id: 7, name: '半山咖啡馆', category: 'cafe', categoryLabel: '咖啡馆', address: '南头古城九街中段', latitude: 22.536, longitude: 113.926, image: 'https://picsum.photos/id/570/300/300', rating: 4.3, totalSeats: 40, openTime: '08:30-20:30', description: '日系简约风咖啡馆，提供精品咖啡与手工甜品。', tags: ['日系风格', '手工甜品', '安静空间'] },
  { id: 8, name: '古城食堂', category: 'restaurant', categoryLabel: '餐厅', address: '南头古城朝阳北街22号', latitude: 22.538, longitude: 113.925, image: 'https://picsum.photos/id/401/300/300', rating: 4.2, totalSeats: 100, openTime: '07:30-21:00', description: '古城社区食堂，提供一日三餐，干净卫生，深受租户喜爱。', tags: ['社区食堂', '一日三餐', '经济实惠'] },
  { id: 9, name: '墨香阁书吧', category: 'library', categoryLabel: '图书馆', address: '南头古城中山东街35号', latitude: 22.537, longitude: 113.928, image: 'https://picsum.photos/id/3/300/300', rating: 4.6, totalSeats: 60, openTime: '09:00-22:00', description: '集阅读、咖啡、文创于一体的复合型文化空间。', tags: ['复合空间', '文创市集', '夜间开放'] },
  { id: 10, name: '榕树下茶餐厅', category: 'restaurant', categoryLabel: '餐厅', address: '南头古城中山西街56号', latitude: 22.535, longitude: 113.927, image: 'https://picsum.photos/id/580/300/300', rating: 4.5, totalSeats: 70, openTime: '07:00-23:00', description: '百年榕树下的港式茶餐厅，奶茶菠萝包是古城一绝。', tags: ['港式茶餐', '户外座位', '古城地标'] },
  { id: 11, name: '慢时光咖啡', category: 'cafe', categoryLabel: '咖啡馆', address: '南头古城兴明南街3号', latitude: 22.534, longitude: 113.923, image: 'https://picsum.photos/id/625/300/300', rating: 4.1, totalSeats: 25, openTime: '10:00-21:00', description: '藏在巷尾的小众咖啡馆，适合独处，是文艺青年的秘密基地。', tags: ['小众秘境', '独处友好', '文艺氛围'] },
  { id: 12, name: '古城青年图书馆', category: 'library', categoryLabel: '图书馆', address: '南头古城中山南街12号', latitude: 22.536, longitude: 113.924, image: 'https://picsum.photos/id/201/300/300', rating: 4.4, totalSeats: 80, openTime: '08:00-22:00', description: '面向青年群体的共享图书馆，24小时自助借还，配备自习室。', tags: ['24小时', '共享空间', '自习室'] },
];

function genHourlyData(baseRate) {
  const hours = [];
  const start = baseRate < 30 ? 8 : baseRate < 60 ? 9 : 10;
  let r = Math.max(5, baseRate - 25);
  for (let h = start; h <= 22; h++) {
    r = Math.min(100, Math.max(5, r + Math.round(Math.random() * 16 - 8)));
    hours.push({ hour: `${String(h).padStart(2, '0')}:00`, rate: r });
  }
  return hours;
}

const occupancyData = merchants.map((m, i) => {
  const currentOccupancy = [85, 42, 60, 28, 72, 35, 50, 25, 55, 45, 15, 38][i];
  const totalSeats = m.totalSeats;
  const occupiedSeats = Math.round((currentOccupancy / 100) * totalSeats);
  return {
    merchantId: m.id,
    currentOccupancy,
    occupiedSeats,
    totalSeats,
    trend: currentOccupancy >= 70 ? 'up' : currentOccupancy <= 35 ? 'down' : 'stable',
    updateTime: new Date().toTimeString().slice(0, 5),
    hourlyData: genHourlyData(currentOccupancy),
  };
});

const activities = [
  { id: 1, title: '古城周末摄影巡拍', type: 'community', typeLabel: '社区活动', category: '摄影', date: '2026-06-01', time: '14:00-17:00', location: '南头古城全区域', maxParticipants: 20, currentParticipants: 16, fee: 0, description: '由社区组织的古城摄影活动，专业摄影师带队，发现古城之美。', image: 'https://picsum.photos/id/1015/750/500', organizer: '南头古城社区' },
  { id: 2, title: '手冲咖啡体验课', type: 'merchant', typeLabel: '商户活动', category: '手工', merchantId: 1, date: '2026-06-02', time: '10:00-11:30', location: '古城角落咖啡馆', maxParticipants: 8, currentParticipants: 5, fee: 68, description: '由专业咖啡师带领，学习手冲咖啡技巧，品尝三款不同产地咖啡。', image: 'https://picsum.photos/id/312/750/500', organizer: '古城角落咖啡馆' },
  { id: 3, title: '桌游之夜·狼人杀', type: 'personal', typeLabel: '个人发起', category: '桌游', date: '2026-06-01', time: '19:00-22:00', location: '壹页书店', maxParticipants: 12, currentParticipants: 8, fee: 0, description: '狼人杀爱好者集结！新手友好，有老玩家带队讲解规则。', image: 'https://picsum.photos/id/103/750/500', organizer: '小林（古城租户）' },
  { id: 4, title: '古城读书分享会', type: 'community', typeLabel: '社区活动', category: '读书', date: '2026-06-03', time: '15:00-17:00', location: '南头书院·阅读空间', maxParticipants: 30, currentParticipants: 18, fee: 0, description: '本月共读书目《看不见的城市》，欢迎来分享你的读后感。', image: 'https://picsum.photos/id/1082/750/500', organizer: '南头古城社区' },
  { id: 5, title: '粤菜烹饪小课堂', type: 'merchant', typeLabel: '商户活动', category: '美食', merchantId: 3, date: '2026-06-04', time: '14:30-16:30', location: '梧桐小馆', maxParticipants: 10, currentParticipants: 7, fee: 128, description: '梧桐小馆主厨亲授三道经典粤菜，含食材与品尝环节。', image: 'https://picsum.photos/id/292/750/500', organizer: '梧桐小馆' },
  { id: 6, title: '古城夜跑团', type: 'personal', typeLabel: '个人发起', category: '运动', date: '2026-06-02', time: '20:00-21:00', location: '南头古城城墙步道', maxParticipants: 15, currentParticipants: 11, fee: 0, description: '每周二四固定夜跑，配速6分半，适合入门跑者。', image: 'https://picsum.photos/id/1044/750/500', organizer: '阿杰（古城租户）' },
  { id: 7, title: '文创手作市集', type: 'community', typeLabel: '社区活动', category: '市集', date: '2026-06-08', time: '10:00-18:00', location: '南头古城主街广场', maxParticipants: 100, currentParticipants: 45, fee: 0, description: '月度文创手作市集，20+摊位，手工饰品、插画、陶艺等你来逛！', image: 'https://picsum.photos/id/1036/750/500', organizer: '南头古城社区' },
  { id: 8, title: '油画体验课', type: 'merchant', typeLabel: '商户活动', category: '艺术', merchantId: 5, date: '2026-06-05', time: '14:00-16:00', location: '古城小筑咖啡三楼', maxParticipants: 6, currentParticipants: 4, fee: 98, description: '零基础友好！在古城露台画一幅属于自己的油画。', image: 'https://picsum.photos/id/431/750/500', organizer: '古城小筑咖啡' },
  { id: 9, title: '周末徒步·南山绿道', type: 'personal', typeLabel: '个人发起', category: '户外', date: '2026-06-07', time: '08:00-14:00', location: '南山公园绿道', maxParticipants: 10, currentParticipants: 5, fee: 0, description: '南山绿道轻徒步，全程约8公里，中等难度，自带午餐。', image: 'https://picsum.photos/id/1018/750/500', organizer: '大刘（古城租户）' },
  { id: 10, title: '闲置交换日', type: 'community', typeLabel: '社区活动', category: '生活', date: '2026-06-15', time: '14:00-17:00', location: '古城社区活动中心', maxParticipants: 50, currentParticipants: 22, fee: 0, description: '带一件闲置来，换一件好物走！书籍、衣物、小家电均可。', image: 'https://picsum.photos/id/225/750/500', organizer: '南头古城社区' },
];

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

app.get('/api/merchants', (req, res) => {
  const { category } = req.query;
  let result = merchants;
  if (category && category !== 'all') {
    result = merchants.filter((m) => m.category === category);
  }
  res.json({ code: 0, data: result, total: result.length });
});

app.get('/api/merchants/:id', (req, res) => {
  const m = merchants.find((m) => m.id === parseInt(req.params.id));
  if (!m) return res.status(404).json({ code: 404, message: '商户不存在' });
  res.json({ code: 0, data: m });
});

app.get('/api/occupancy', (req, res) => {
  res.json({ code: 0, data: occupancyData, total: occupancyData.length });
});

app.get('/api/occupancy/:merchantId', (req, res) => {
  const o = occupancyData.find((o) => o.merchantId === parseInt(req.params.merchantId));
  if (!o) return res.status(404).json({ code: 404, message: '入座率数据不存在' });
  res.json({ code: 0, data: o });
});

app.get('/api/activities', (req, res) => {
  const { type } = req.query;
  let result = activities;
  if (type && type !== 'all') {
    result = activities.filter((a) => a.type === type);
  }
  res.json({ code: 0, data: result, total: result.length });
});

app.get('/api/activities/:id', (req, res) => {
  const a = activities.find((a) => a.id === parseInt(req.params.id));
  if (!a) return res.status(404).json({ code: 404, message: '活动不存在' });
  res.json({ code: 0, data: a });
});

app.listen(PORT, () => {
  console.log(`[Server] 南头古城后端服务已启动: http://localhost:${PORT}`);
  console.log(`[Server] API 接口列表:`);
  console.log(`  GET  /api/health`);
  console.log(`  GET  /api/merchants?category=cafe|restaurant|library`);
  console.log(`  GET  /api/merchants/:id`);
  console.log(`  GET  /api/occupancy`);
  console.log(`  GET  /api/occupancy/:merchantId`);
  console.log(`  GET  /api/activities?type=community|merchant|personal`);
  console.log(`  GET  /api/activities/:id`);
});
