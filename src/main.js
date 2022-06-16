import './scss/main.scss';
import './static/images/alpha-shop-logo.png';
import './static/images/icon-search.png';
import './static/images/icon-shopping-cart.png';
import './static/images/icon-theme.png';

const headerList = [
  '男款',
  '女款',
  '最新消息',
  '客製商品',
  '聯絡我們',
]

const stepperItems = [
  {
    id: 1,
    name: '寄送地址',
    finished: true,
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

const headerIcons = [
  'icon-search.png',
  'icon-shopping-cart.png',
  'icon-theme.png',
]

const getHeaderList = () => {
  const list = document.querySelector('.header__header-list')
  const iconList = document.querySelector('.header__action-row')

  const listContent = headerList.map(item => (
    `<li>${item}</li>`
  )).join('')

  const iconContent = headerIcons.map(icon => (
    `<img src="${icon}" />`
  )).join('')

  list.innerHTML = listContent
  iconList.innerHTML = iconContent
}

// stepper
const getStepper = () => {
  const stepper = document.querySelector('#stepper')
  let step = 1
  let stepperContent = ''

  stepperItems.forEach(step => {
    stepperContent += 
    `<div class="stepper">
      <div class="stepper__circle${step.finished ? '__active' : ''}">${step.id}</div>
      <p class="stepper__text">${step.name}</p>
    </div>
    ${step.id !== 3 ? `<div class="stepper__line"></div>` : ''}`
  })
  stepper.innerHTML = ''
  stepper.innerHTML = stepperContent
}

const getFullWhenLoaded = () => {
  getHeaderList()
  getStepper()
}

getFullWhenLoaded()
