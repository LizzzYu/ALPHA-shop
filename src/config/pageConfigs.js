import '../static/images/icon-search.png';
import '../static/images/icon-shopping-cart.png';
import '../static/images/icon-theme.png';

export const headerList = [
  '男款',
  '女款',
  '最新消息',
  '客製商品',
  '聯絡我們',
]

export const stepperItems = [
  {
    id: 1,
    name: '寄送地址',
    finished: false,
  }, {
    id: 2,
    name: '運送方式',
    finished: false,
  }, {
    id: 3,
    name: '付款資訊',
    finished: false,
  }
]

export const headerIcons = [
  'icon-search.png',
  'icon-shopping-cart.png',
  'icon-theme.png',
]

export const formShippingAddress = [
  {
    id: 'title',
    title: '稱謂',
    placeholder: ''
  }, {
    id: 'name',
    title: '姓名',
    placeholder: '請輸入姓名'
  }, {
    id: 'phone',
    title: '電話',
    placeholder: '請輸入行動電話'
  }, {
    id: 'email',
    title: 'Email',
    placeholder: '請輸入電子郵件'
  }, {
    id: 'city',
    title: '縣市',
    placeholder: ''
  }, {
    id: 'address',
    title: '地址',
    placeholder: '請輸入地址'
  }
];

export const titleItems = [
  {
    id: 'sir',
    name: '先生'
  }, {
    id: 'miss',
    name: '小姐'
  }
];

export const citiesItems = ['台北市', '高雄市'];