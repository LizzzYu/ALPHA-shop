import './scss/main.scss';

import {
  headerList,
  stepperItems,
  headerIcons,
  headerIconsWhite,
  formShippingAddressInputFields,
  paymentInfoInputFields,
  titleItems,
  citiesItems,
  productInfo,
  shippingMethods,
  alphaLogos,
} from './config/pageConfigs';

let currentStep = 1;
let totalPrice = 0;
let fee = 0;

const html = document.querySelector('html');
const list = document.querySelector('.header__header-list');
const logo = document.querySelectorAll('.logo');
const iconList = document.querySelector('.header__action-row');
const stepper = document.querySelector('#stepper');
const subTitle = document.querySelector('#sub-title');

const formPanel = document.querySelector('.form-panel');
const productPanel = document.querySelector('.product-panel');
const totalPriceText = document.querySelector('.total-price');
const shippingFeeText = document.querySelector('.shipping-fee');

const iconContent = headerIcons
  .map((icon) => `<img id="${icon.split('-')[1]}" src="${icon}.png" />`)
  .join('');

const iconContentWhite = headerIconsWhite
  .map((icon) => `<img id="${icon.split('-')[1]}" src="${icon}.png" />`)
  .join('');

const getHeaderList = () => {
  const listContent = headerList.map((item) => `<li>${item}</li>`).join('');

  list.innerHTML = listContent;
  iconList.innerHTML =
    html.className === 'light' ? iconContent : iconContentWhite;
};

// change theme function
iconList.addEventListener('click', () => {
  if (html.className === 'light') {
    html.className = '';
    html.className = 'dark';
  } else if (html.className === 'dark') {
    html.className = '';
    html.className = 'light';
  }
  html.classList.toggle('dark');
  getFullWhenLoaded();
});

// header logo
const getLogo = () => {
  if (html.className === 'light') {
    logo.forEach((el) => (el.src = alphaLogos.dark));
  } else {
    logo.forEach((el) => (el.src = alphaLogos.light));
  }
};

// stepper
const getStepper = () => {
  stepper.innerHTML = '';
  let stepperContent = '';

  stepperItems.forEach((step) => {
    stepperContent += `<div class="stepper">
      <div class="stepper__circle${
        step.id === currentStep || step.isFinished ? '__active' : ''
      }">${step.isFinished ? '&#10004;' : step.id}</div>
      <p class="stepper__text${
        step.id === currentStep || step.isFinished ? '--active' : ''
      }">${step.name}</p>
    </div>
    ${
      step.id !== 3
        ? `<div class="stepper__line${
            step.id === currentStep || step.isFinished ? '--active' : ''
          }"></div>`
        : ''
    }`;
  });
  stepper.innerHTML = stepperContent;
};

// get subTitle
const getSubTitle = () => {
  subTitle.innerHTML = '';
  const subTitleContent = stepperItems.find(
    (item) => item.id === currentStep
  ).name;
  subTitle.innerText = subTitleContent;
};

const getFormContent = () => {
  formPanel.innerHTML = '';

  const formContentBottom = '</form>';

  let formContent = '';
  let titleOptions = '';
  let citiesOptions = '';

  titleItems.forEach(
    (option) =>
      (titleOptions += `<option value="${option.id}">
      ${option.name}
    </option>
    `)
  );

  citiesItems.forEach(
    (option) =>
      (citiesOptions += `<option value="${option}">
      ${option}
    </option>
    `)
  );

  switch (currentStep) {
    case 1:
      formShippingAddressInputFields.forEach((item, index) => {
        if (item.placeholder === '') {
          formContent += `
        <form class="form-panel__row">
        <div class="form-panel__row__input-field form-panel__row__input-${
          index + 1
        }">
          <label for="${item.id}">
            ${item.title}
          </label>
          <select
            id="${item.id}"
            name="${item.id}" class="form-panel__row__input-field__select">
            <option value="" disabled selected>?????????</option>
            ${item.id === 'title' ? titleOptions : citiesOptions}
          </select>
          <i class="form-panel__row__input-field__icon"></i>
        </div>
        `;
        } else {
          formContent += `
        <form class="form-panel__row">
        <div class="form-panel__row__input-field form-panel__row__input-${
          index + 1
        }">
          <label for="${item.id}">
            ${item.title}
          </label>
          <input
            id="${item.id}"
            name="${item.id}"
            type="text"
            placeholder="${item.placeholder}" />
        </div>
        `;
        }
      });
      break;

    case 2:
      shippingMethods.forEach((item) => {
        formContent += `
      <form class="form-panel__radio-btn-group">
        <label class="radio-container form-panel__radio-btn-group__option">
          <div class="form-panel__radio-btn-group__option__description">
            <p>${item.title}</p>
            <p>${item.description}</p>
          </div>
          <input class="radio-input" type="radio" name="radio" value="${
            item.price
          }">
          <span class="checkmark"></span>
          <p class="form-panel__radio-btn-group__option__shipping-fee">
            ${item.price === 0 ? '??????' : '$' + item.price}
          </p>
        </label>
      `;
      });
      break;

    case 3:
      paymentInfoInputFields.forEach((item, index) => {
        formContent += `
        <form class="form-panel__row">
        <div class="form-panel__row__input-field form-panel__row__step-3__input-${
          index + 1
        }">
          <label for="${item.id}">
            ${item.title}
          </label>
          <input
            id="${item.id}"
            name="${item.id}"
            type="text"
            placeholder="${item.placeholder}" />
        </div>
        `;
      });
  }

  formPanel.innerHTML = formContent + formContentBottom;

  if (currentStep === 2) {
    const radioOption = document.querySelectorAll(
      '.form-panel__radio-btn-group__option'
    );

    radioOption.forEach((option) => {
      option.addEventListener('click', () => {
        for (let i = 0; i < radioOption.length; i++) {
          radioOption[i].classList.remove(
            'form-panel__radio-btn-group__option__checked'
          );
        }
        option.classList.add('form-panel__radio-btn-group__option__checked');
      });
    });

    formPanel.addEventListener('click', (e) => {
      if (e.target.classList.contains('radio-input')) {
        const feeValue = Number(e.target.value);
        shippingFeeText.innerHTML = feeValue === 0 ? '??????' : '$' + feeValue;
        totalPriceText.innerHTML = '$' + (totalPrice + feeValue).toLocaleString()
        fee = feeValue
      }
    });
  }
};

const getProductInfo = () => {
  productPanel.innerHTML = '';
  let productContent = '';

  // toLocaleString ????????????????????????????????????
  productInfo.forEach(
    (item, index) =>
      (productContent += `
  <div class="product-panel__product">
    <img src="${item.image}" />
    <div class="product-panel__product__info">
      <div>
        <p>${item.name}</p>
        <div class="product-panel__button-group">
          <button
            data-productindex="${index}"
            data-productprice="${item.price}"
            class="product-panel__button-group__minus">
            -
          </button>
          <p
            data-productindex="${index}"
            class="count">0</p>
          <button
            data-productindex="${index}"
            data-productprice="${item.price}"
            class="product-panel__button-group__plus">
            +
          </button>
        </div>
      </div>
      <p>$${item.price.toLocaleString()}</p>
    </div>
  </div>
  `)
  );

  productPanel.innerHTML = productContent;

  const countText = document.querySelectorAll('.count');

  const totalPriceTop = '$';
  let priceSum = 0;

  totalPriceText.innerHTML = totalPriceTop + priceSum;

  // add event listener to productPanel and trigger function refer to class name accordingly
  productPanel.addEventListener('click', (e) => {
    const target = e.target;
    const index = target.dataset.productindex;
    const price = Number(target.dataset.productprice);
    let currentCountText = countText[index];

    if (target.classList.contains('product-panel__button-group__plus')) {
      currentCountText.innerHTML = Number(currentCountText.innerHTML) + 1;
      priceSum += price;
    } else if (
      target.classList.contains('product-panel__button-group__minus')
    ) {
      if (currentCountText.innerHTML === '0') return;

      currentCountText.innerHTML = Number(currentCountText.innerHTML) - 1;
      priceSum -= price;
    }
    totalPrice = priceSum;
    totalPriceText.innerHTML = totalPriceTop + (totalPrice + fee).toLocaleString();
  });
};

const getActionButtonGroupContent = () => {
  const buttonGroup = document.querySelector('.action-button-group');

  let buttonGroupContent = '';
  buttonGroup.innerHTML = '';

  if (currentStep === 1) {
    buttonGroupContent += `
    <div class="action-button-group__previous"></div>
    <button class="action-button-group__next">
      ?????????
      <div class="action-button-group__line-right"></div>
      <div class="action-button-group__arrow-right"></div>
    </button>
    `;
  } else if (currentStep === 3) {
    buttonGroupContent += `
    <button class="action-button-group__previous">
      <div class="action-button-group__arrow-left"></div>
      <div class="action-button-group__line-left"></div>
      ?????????
    </button>
    <button class="action-button-group__next">
      ????????????
    </button>
    `;
  } else {
    buttonGroupContent += `
    <button class="action-button-group__previous">
      <div class="action-button-group__arrow-left"></div>
      <div class="action-button-group__line-left"></div>
      ?????????
    </button>
    <button class="action-button-group__next">
      ?????????
      <div class="action-button-group__line-right"></div>
      <div class="action-button-group__arrow-right"></div>
    </button>
    `;
  }

  buttonGroup.innerHTML = buttonGroupContent;

  const nextButton = document.querySelector('.action-button-group__next');
  const prevButton = document.querySelector('.action-button-group__previous');

  nextButton.addEventListener('click', () => {
    if (currentStep !== 3) {
      stepperItems[currentStep - 1].isFinished = true;
      currentStep = currentStep + 1;
      getFullWhenLoaded();
      totalPriceText.innerHTML = '$' + (totalPrice + fee).toLocaleString();
    } else return;
  });

  prevButton.addEventListener('click', () => {
    if (currentStep !== 1) {
      stepperItems[currentStep - 2].isFinished = false;
      currentStep = currentStep - 1;
      getFullWhenLoaded();
      totalPriceText.innerHTML = '$' + (totalPrice + fee).toLocaleString();
    } else return;
  });
};

// render side menu items
const sideMenuList = document.querySelector('.header__mobile-menu__content');
const sideMenu = document.querySelector('.header__mobile-menu');
let sideMenuContent = '';
headerList.forEach((item) => {
  sideMenuContent += `
  <p>${item}</p>
  `;
});
sideMenuList.innerHTML = sideMenuContent + `<p class="">${iconContent}</p>`;

const hamburgerBtn = document.querySelector('.header__hamburger');
const hamburgerBtnInSideMenu = document.querySelector(
  '.header__mobile-menu__header__hamburger'
);

hamburgerBtn.addEventListener('click', () => {
  sideMenu.classList.remove('header__mobile-menu__hide');
  sideMenu.classList.add('header__mobile-menu__show');
});

hamburgerBtnInSideMenu.addEventListener('click', () => {
  sideMenu.classList.remove('header__mobile-menu__show');
  sideMenu.classList.add('header__mobile-menu__hide');
});

// hamburgerBtn.addEventListener('click', () => {
// })

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
  getHeaderList();
  getLogo();
  getSubTitle();
  getStepper();
  getFormContent();
  getProductInfo();
  getActionButtonGroupContent();
  // getFooterContent()
};

getFullWhenLoaded();
