import './scss/main.scss';
import './static/images/alpha-shop-logo.png';

import {
  headerList,
  stepperItems,
  headerIcons,
  formShippingAddress,
  titleItems,
  citiesItems
} from './config/pageConfigs'

let currentStep = 1;

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
  stepper.innerHTML = ''
  
  let stepperContent = ''

  stepperItems.forEach(step => {
    stepperContent += 
    `<div class="stepper">
      <div class="stepper__circle${step.id === currentStep || step.finished ? '__active' : ''}">${step.id}</div>
      <p class="stepper__text">${step.name}</p>
    </div>
    ${step.id !== 3 ? `<div class="stepper__line"></div>` : ''}`
  })
  stepper.innerHTML = stepperContent
}

// get subTitle
const getSubTitle = () => {
  const subTitle = document.querySelector('#sub-title');
  subTitle.innerHTML = ''
  const subTitleContent = stepperItems.find(item => item.id === currentStep).name
  subTitle.innerText = subTitleContent
}

const getFormContent = () => {
  const formPanel = document.querySelector('.form-panel')
  formPanel.innerHTML = ''

  const formContentTop = '<form class="form-panel__row">'
  const formContentBottom = '</form>'

  let formContent = ''
  let titleOptions = ''
  let citiesOptions = ''

  titleItems.forEach(option => titleOptions += 
    `<option value="${option.id}">
      ${option.name}
    </option>
    `)

  citiesItems.forEach(option => citiesOptions +=
    `<option value="${option}">
      ${option}
    </option>
    `)

  switch (currentStep) {
    case 1:
    formShippingAddress.forEach((item, index) => {
      if (item.placeholder ===  '') {
        formContent += `
        <div class="form-panel__row__input-field form-panel__row__input-${index + 1}">
          <label for="title">
            ${item.title}
          </label>
          <select
            id="${item.id}"
            name="${item.id}" class="form-panel__row__input-field__select">
            ${item.id === 'title' ? titleOptions : citiesOptions}
          </select>
          <i class="form-panel__row__input-field__icon"></i>
        </div>
        ` 
      } else {
        formContent += `
        <div class="form-panel__row__input-field form-panel__row__input-${index + 1}">
          <label for="${item.id}">
            ${item.title}
          </label>
          <input
            id="${item.id}"
            name="${item.id}"
            type="text"
            placeholder="${item.placeholder}" />
        </div>
        `
      }
    })
  }

  formPanel.innerHTML = formContentTop + formContent + formContentBottom;
}

const getFullWhenLoaded = () => {
  getHeaderList()
  getSubTitle()
  getStepper()
  getFormContent()
}

getFullWhenLoaded()
