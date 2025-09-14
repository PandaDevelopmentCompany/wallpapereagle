'use strict';

(function() {
  //button scroll up
  const buttonUp = document.getElementById("button-up");
  if(buttonUp){
      buttonUp.addEventListener('click', function(e) {
          window.scrollTo({top: 0, behavior: 'smooth'});
          e.preventDefault();
      });
      window.onscroll = function() {scrollFunction()};
      function scrollFunction() {
          if (document.body.scrollTop > 500 || document.documentElement.scrollTop > 500) {
              buttonUp.style.display = "block";
          } else {
              buttonUp.style.display = "none";
          }
      }
      scrollFunction();
  }

  //sticky header
  window.addEventListener("scroll", function () {
      const wrap = document.querySelector(".wrap");
      if(!wrap) return;
      let windowTop = window.scrollY;
      if (windowTop > 0) {
          wrap.classList.add("header-fixed");
      } else {
          wrap.classList.remove("header-fixed");
      }
  });

  //fancybox
  if(window.Fancybox) {
      Fancybox.bind("[data-fancybox]", {});
  }

  // Popups
  document.querySelectorAll('.popup-outer-box').forEach(function(element) {
      element.addEventListener('click', function (event) {
          if (!event.target.closest('.popup-box')) {
              document.body.classList.remove('popup-open', 'popup-open-scroll');
              document.querySelectorAll('.popup-outer-box').forEach(function(e) { e.classList.remove('active'); });
          }
      });
  });

  //files add
  const fileButton = document.querySelector('.js-field-file .js-file-button');
  if(fileButton){
      fileButton.addEventListener('click', function() {
          this.parentElement.querySelector('input[type="file"]').click();
      });
  }
  document.querySelectorAll('.js-field-file input[type="file"]').forEach(input => {
      input.addEventListener('change', function(event) {
          let fileName = event.target.value;
          if (fileName == '') {
              fileName = this.parentNode.querySelector('.js-file-button').getAttribute('data-title');
              this.parentNode.classList.remove('active');
              this.parentNode.querySelector('.js-file-button .button-title').innerHTML = fileName;
          } else {
              this.parentNode.classList.add('active');
              this.parentNode.querySelector('.js-file-button .button-title').innerHTML = fileName;
          }
      });
  });

  // items animations
  let sTop = window.scrollY + window.innerHeight;
  const items = document.querySelectorAll('.item-animation');
  function animateItems() {
      sTop = window.scrollY + window.innerHeight;
      items.forEach(item => {
          if (item.offsetTop < sTop) {
              item.classList.add('item-active');
          } else {
              item.classList.remove('item-active');
          }
      });
  }
  animateItems();
  window.addEventListener('scroll', animateItems);

  //js popup wrap
  const togglePopupButtons = document.querySelectorAll('.js-btn-popup-toggle');
  const closePopupButtons = document.querySelectorAll('.js-btn-popup-close');
  const popupElements = document.querySelectorAll('.js-popup-wrap');
  const wrapElem = document.querySelector('.wrap');
  const wrapWidth = wrapElem ? wrapElem.offsetWidth : 0;
  function popupElementsClear() {
      document.body.classList.remove('menu-show', 'filter-show', 'search-show');
      popupElements.forEach(element => element.classList.remove('popup-right'));
  }
  function popupElementsClose() {
      togglePopupButtons.forEach(element => {
          if (!element.closest('.no-close')) {
              element.classList.remove('active');
          }
      });
  }
  function popupElementsContentPositionClass() {
      popupElements.forEach(element => {
          let pLeft = element.offsetLeft;
          let pWidth = element.querySelector('.js-popup-block').offsetWidth;
          let pMax = pLeft + pWidth;
          if (pMax > wrapWidth) {
              element.classList.add('popup-right');
          } else {
              element.classList.remove('popup-right');
          }
      });
  }

  togglePopupButtons.forEach(button => {
      button.addEventListener('click', function (e) {
          popupElementsClear();
          if (this.classList.contains('active')) {
              this.classList.remove('active');
          } else {
              popupElementsClose();
              this.classList.add('active');
              if (this.closest('.popup-menu-wrap')) document.body.classList.add('menu-show');
              if (this.closest('.popup-search-wrap')) document.body.classList.add('search-show');
              if (this.closest('.popup-filter-wrap')) document.body.classList.add('filter-show');
              popupElementsContentPositionClass();
          }
          e.preventDefault();
      });
  });

  closePopupButtons.forEach(button => {
      button.addEventListener('click', function (e) {
          popupElementsClear();
          popupElementsClose();
          e.preventDefault();
      });
  });

  document.addEventListener('click', function (event) {
      if (!event.target.closest('.js-popup-block')) {
          popupElementsClear();
          popupElementsClose();
      }
  });

  popupElements.forEach(element => {
      if (element.classList.contains('js-popup-select')) {
          const popupElementSelectItem = element.querySelectorAll('.js-popup-block li a');
          const activeEl = element.querySelector('.js-popup-block .active');
          const popupElementButton = element.querySelector('.js-btn-popup-toggle');
          if(activeEl){
              element.classList.add('select-active');
              popupElementButton.innerHTML = activeEl.innerHTML;
          } else {
              element.classList.remove('select-active');
          }
          popupElementSelectItem.forEach(item => {
              item.addEventListener('click', function (e) {
                  element.classList.add('select-active');
                  const oldActive = element.querySelector('.js-popup-block .active');
                  if(oldActive) oldActive.classList.remove('active');
                  item.classList.add('active');
                  popupElementButton.innerHTML = item.innerHTML;
                  popupElementsClear();
                  popupElementsClose();
                  if (!item.closest('.js-tabs-nav')) {
                      e.preventDefault();
                  }
              });
          });
      }
  });

  //button scroll anchor
  document.querySelectorAll('.js-anchor').forEach(anchor => {
      anchor.addEventListener('click', function (e) {
          e.preventDefault();
          const menuToggle = document.querySelector('.popup-menu-wrap .js-btn-popup-toggle');
          if(menuToggle) menuToggle.classList.remove('active');
          document.querySelector(this.getAttribute('href')).scrollIntoView({behavior: 'smooth'});
      });
  });

  //swiper sliders
  if(window.Swiper){
      const swiperSliderGallery = new Swiper(".slider-gallery .swiper", {
          loop: false,
          slidesPerView: 1,
          spaceBetween: 0,
          autoheight: true,
          speed: 500,
          autoplay: { delay: 4000, disableOnInteraction: false },
          pagination: { el: ".slider-gallery-pagination", clickable: true },
      });

      const swiperSliderProjects = new Swiper(".slider-projects .swiper", {
          loop: true,
          slidesPerView: "auto",
          spaceBetween: 0,
          speed: 400,
          pagination: { el: ".slider-projects-pagination", clickable: true },
      });
  }

  //calculator
  const widthInput = document.getElementById("width-img");
  const heightInput = document.getElementById("height-img");
  const priceElement = document.getElementById("price-img");
  const widthForm = document.getElementById("width-img__input");
  const heightForm = document.getElementById("height-img__input");
  const priceForm = document.getElementById("price-img__input");
  if(widthInput && heightInput){
      widthInput.addEventListener("input", validateInput);
      heightInput.addEventListener("input", validateInput);
  }
  function validateInput(event){
      const input = event.target;
      input.value = input.value.replace(/[^0-9.]/g, '');
      calculatePrice();
  }
  function calculatePrice(){
      const width = widthInput.value;
      const height = heightInput.value;
      const squareMeters = width * height;
      let price = 0;
      priceElement.setAttribute('data-unit', ' $ ');
      if(squareMeters >= 30 && squareMeters < 50) price = Math.round(squareMeters * 18);
      else if(squareMeters >= 50 && squareMeters < 100) price = Math.round(squareMeters * 16);
      else if(squareMeters >= 100){
          price = "<span>Special price</span>";
          priceElement.setAttribute('data-unit', '');
      } else {
          price = '<span class="-red">Minimum calculation from 30 sq. ft<sup><small></small></sup></span>';
          priceElement.setAttribute('data-unit', '');
      }
      priceElement.innerHTML = `${price}`;
      priceForm.value = `${price}`;
      heightForm.value = `${height}`;
      widthForm.value = `${width}`;
  }

 // ======================== GOOGLE SHEETS ========================
const sendButton = document.getElementById("sendButton");
if(sendButton){
  sendButton.addEventListener("click", function(event){
    event.preventDefault();

    const form = event.target.closest("form");
    if(!form) return;

    const formData = new FormData(form);

    const scriptURL = 'https://script.google.com/macros/s/AKfycbyf1fW7pcqqDgZAVKSXuocQtPKTLtzMTrG3n6mTxFm8fuu2eKdAb7XAReShFEvrkitxfQ/exec';

    fetch(scriptURL, {
      method: 'POST',
      body: formData,
    })
    .then(() => {
      alert("✅ Your message has been successfully sent!");
      form.reset();
    })
    .catch(err => {
      console.warn("Ошибка отправки в Telegram", err);
      alert("❌ Ошибка при отправке. Попробуйте снова.");
    });
  });
}


})();