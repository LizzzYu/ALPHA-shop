import '../static/images/icon-search.png';
import '../static/images/icon-shopping-cart.png';
import '../static/images/icon-theme.png';
import '../static/images/product-1.png';
import '../static/images/product-2.png';
import '../static/images/social-media-icon.png';

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

export const productInfo = [
  {
    id: 1,
    name: '破壞補丁修身牛仔褲',
    price: 3999,
    image: 'product-1.png'
  }, {
    id: 2,
    name: '刷色直筒牛仔褲',
    price: 1299,
    image: 'product-2.png'
  }
];

export const footerInfomation = [
  {
    id: 1,
    title: '客戶服務',
    sevices: [
      '運送說明',
      '退換貨相關',
      '付款資訊',
      'FAQ'
    ]
  }, {
    id: 2,
    title: '關於我們',
    sevices: [
      '品牌故事',
      '媒體聯繫',
      'Press kit',
    ]
  }, {
    id: 3,
    title: '資訊',
    sevices: [
      '隱私權政策',
      'Cookie',
      'GDPR',
    ]
  }
]