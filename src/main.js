import './scss/main.scss';
import './static/images/alpha-shop-logo.png';

import {
  headerList,
  stepperItems,
  headerIcons,
  formShippingAddressInputFields,
  paymentInfoInputFields,
  titleItems,
  citiesItems,
  productInfo,
  shippingMethods,
  footerInfomation
} from './config/pageConfigs'

let currentStep = 1;

const list = document.querySelector('.header__header-list')
const iconList = document.querySelector('.header__action-row')
const stepper = document.querySelector('#stepper')
const subTitle = document.querySelector('#sub-title');

const formPanel = document.querySelector('.form-panel');
const productPanel = document.querySelector('.product-panel')

const getHeaderList = () => {
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
  stepper.innerHTML = ''
  let stepperContent = ''

  stepperItems.forEach(step => {
    stepperContent += 
    `<div class="stepper">
      <div class="stepper__circle${step.id === currentStep || step.isFinished ? '__active' : ''}">${step.isFinished ? '&#10004;' : step.id}</div>
      <p class="stepper__text">${step.name}</p>
    </div>
    ${step.id !== 3 ? `<div class="stepper__line"></div>` : ''}`
  })
  stepper.innerHTML = stepperContent
}

// get subTitle
const getSubTitle = () => {
  subTitle.innerHTML = ''
  const subTitleContent = stepperItems.find(item => item.id === currentStep).name
  subTitle.innerText = subTitleContent
}

const getFormContent = () => {
  formPanel.innerHTML = ''

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
    formShippingAddressInputFields.forEach((item, index) => {
      if (item.placeholder ===  '') {
        formContent += `
        <form class="form-panel__row">
        <div class="form-panel__row__input-field form-panel__row__input-${index + 1}">
          <label for="${item.id}">
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
        <form class="form-panel__row">
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
    break;

    case 2:
    shippingMethods.forEach(item => {
      formContent += `
      <form class="form-panel__radio-btn-group">
        <label class="radio-container form-panel__radio-btn-group__option">
          <div class="form-panel__radio-btn-group__option__description">
            <p>${item.title}</p>
            <p>${item.description}</p>
          </div>
          <input type="radio" name="radio">
          <span class="checkmark"></span>
        </label>
      `
    })
    break;

    case 3:
    paymentInfoInputFields.forEach((item, index) => {
      formContent += `
        <form class="form-panel__row">
        <div class="form-panel__row__input-field form-panel__row__step-3__input-${index + 1}">
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
    })
  }

  formPanel.innerHTML = formContent + formContentBottom;

  if (currentStep === 2) {
    const radioOption = document.querySelectorAll('.form-panel__radio-btn-group__option');
    

    radioOption.forEach(option => {
      option.addEventListener('click', () => {
        for (let i = 0; i < radioOption.length; i++) {
          radioOption[i].classList.remove('form-panel__radio-btn-group__option__checked')
        }
        option.classList.add('form-panel__radio-btn-group__option__checked')
      })
    })
  }
}

const getProductInfo = () => {
  productPanel.innerHTML = ''
  let productContent = ''

  productInfo.forEach(item => productContent += `
  <div class="product-panel__product">
    <img src="${item.image}" />
    <div class="product-panel__product__info">
      <div>
        <p>${item.name}</p>
        <div class="product-panel__button-group">
          <button class="product-panel__button-group__minus">
            -
          </button>
          <p>1</p>
          <button class="product-panel__button-group__plus">
            +
          </button>
        </div>
      </div>
      <p>$${item.price}</p>
    </div>
  </div>
  `)

  productPanel.innerHTML = productContent
}

const getActionButtonGroupContent = () => {
  const buttonGroup = document.querySelector('.action-button-group')
  
  let buttonGroupContent = ''
  buttonGroup.innerHTML = ''

  if (currentStep === 1) {
    buttonGroupContent += `
    <div class="action-button-group__previous"></div>
    <button class="action-button-group__next">
      下一步
      <div class="action-button-group__line-right"></div>
      <div class="action-button-group__arrow-right"></div>
    </button>
    `
  } else if (currentStep === 3) {
    buttonGroupContent += `
    <button class="action-button-group__previous">
      <div class="action-button-group__arrow-left"></div>
      <div class="action-button-group__line-left"></div>
      上一步
    </button>
    <button class="action-button-group__next">
      確認下單
    </button>
    `
  } else {
    buttonGroupContent += `
    <button class="action-button-group__previous">
      <div class="action-button-group__arrow-left"></div>
      <div class="action-button-group__line-left"></div>
      上一步
    </button>
    <button class="action-button-group__next">
      下一步
      <div class="action-button-group__line-right"></div>
      <div class="action-button-group__arrow-right"></div>
    </button>
    `
  }

  buttonGroup.innerHTML = buttonGroupContent

  const nextButton = document.querySelector('.action-button-group__next')
  const prevButton = document.querySelector('.action-button-group__previous')

  nextButton.addEventListener('click', () => {
    if (currentStep !== 3) {
      stepperItems[currentStep - 1].isFinished = true
      currentStep = currentStep + 1
      getFullWhenLoaded()
    } else return
  })
  
  prevButton.addEventListener('click', () => {
    if (currentStep !== 1) {
      stepperItems[currentStep - 2].isFinished = false
      currentStep = currentStep - 1
      getFullWhenLoaded()
    } else return
  })
}

// const getFooterContent = () => {
//   const footerInfo = document.querySelector('.footer__container__info')
//   footerInfo.innerHTML = ''
//   let footerInfoContentStart = ''
//   let serviceContent = ''

//   footerInfomation.forEach((item, index) => (
//     footerInfoContentStart += `
//     <div>
//       <h3 class="footer__sub-title">${item.title}</h3>
//       <div class="footer__container__info__content">
//       ${item.sevices.forEach(service => {
//         console.log(service)
//         `<p>${service}</p>`
//       })}
//       </div>
//     </div>
//     `
//   ))

//   console.log(footerInfoContentStart)

//   footerInfo.innerHTML = footerInfoContentStart
// }

const getFullWhenLoaded = () => {
  getHeaderList()
  getSubTitle()
  getStepper()
  getFormContent()
  getProductInfo()
  getActionButtonGroupContent()
  // getFooterContent()
}

getFullWhenLoaded()
