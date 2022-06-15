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

  console.log(iconContent)

  list.innerHTML = listContent
  iconList.innerHTML = iconContent
}

getHeaderList()