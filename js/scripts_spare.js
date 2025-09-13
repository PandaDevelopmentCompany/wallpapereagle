//button scroll up
let buttonUp = document.getElementById("button-up");
buttonUp.addEventListener('click', function(e) {
	window.scrollTo({top: 0, behavior: 'smooth'});
	e.preventDefault()
	e.stopPropagation()
})
window.onscroll = function() {scrollFunction()}
function scrollFunction() {
	if (document.body.scrollTop > 500 || document.documentElement.scrollTop > 500) {
		buttonUp.style.display = "block";
	} else {
		buttonUp.style.display = "none";
	}
}
scrollFunction()


//sticky header
window.addEventListener("scroll", function () {
	let windowTop = window.scrollY;
	if (windowTop > 0) {
		document.querySelector(".wrap").classList.add("header-fixed");
	} else {
		document.querySelector(".wrap").classList.remove("header-fixed");
	}
});

//fancybox
Fancybox.bind("[data-fancybox]", {
	//settings
});

// Popups
document
  .querySelectorAll('.popup-outer-box').forEach(function(element) {
	element.addEventListener('click', function (event) {
	if (!event.target.closest('.popup-box')) {
	  document.body.classList.remove('popup-open');
	  document.body.classList.remove('popup-open-scroll');
	  document.querySelectorAll('.popup-outer-box').forEach(function(e) {
		e.classList.remove('active');
			})
	  return false;
		}
	});
})


//files add
document.querySelector('.js-field-file .js-file-button').addEventListener('click', function() {
  this.parentElement.querySelector('input[type="file"]').click();
});
const inputs = document.querySelectorAll('.js-field-file input[type="file"]');
for (let i = 0; i < inputs.length; i++) {
  inputs[i].addEventListener('change', function(event) {
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
}


// items animations
let sTop = window.scrollY + window.innerHeight;
const items = document.querySelectorAll('.item-animation');
items.forEach(function (item) {
  if (item.offsetTop < sTop) {
	item.classList.add('item-active');
	}
});
window.addEventListener('scroll', function () {
  sTop = this.scrollY + this.innerHeight; // Обновляем позицию прокрутки

  items.forEach((item) => { // Проверяем все элементы с классом item-animation
	if (item.offsetTop < sTop) { // Если он находится ниже позиции прокрутки
	  item.classList.add('item-active'); // Добавляем класс item-active
		} else {
	  item.classList.remove('item-active'); // Иначе удаляем класс
		}
	});
});


//js popup wrap
const togglePopupButtons = document.querySelectorAll('.js-btn-popup-toggle')
const closePopupButtons = document.querySelectorAll('.js-btn-popup-close')
const popupElements = document.querySelectorAll('.js-popup-wrap')
const wrapWidth = document.querySelector('.wrap').offsetWidth
const bodyElem = document.querySelector('body')
function popupElementsClear() {
	document.body.classList.remove('menu-show')
	document.body.classList.remove('filter-show')
	document.body.classList.remove('search-show')
	popupElements.forEach(element => element.classList.remove('popup-right'))
}
function popupElementsClose() {
	togglePopupButtons.forEach(element => {
		if (!element.closest('.no-close')) {
			element.classList.remove('active')
		}
	})
}
function popupElementsContentPositionClass() {
	popupElements.forEach(element => {
		let pLeft = element.offsetLeft
		let pWidth = element.querySelector('.js-popup-block').offsetWidth
		let pMax = pLeft + pWidth;
		if (pMax > wrapWidth) {
			element.classList.add('popup-right')
		} else {
			element.classList.remove('popup-right')
		}
	})
}
for (i = 0; i < togglePopupButtons.length; i++) {
	togglePopupButtons[i].addEventListener('click', function (e) {
		popupElementsClear()
		if (this.classList.contains('active')) {
			this.classList.remove('active')
		} else {
			popupElementsClose()
			this.classList.add('active')
			if (this.closest('.popup-menu-wrap')) {
				document.body.classList.add('menu-show')
			}
			if (this.closest('.popup-search-wrap')) {
				document.body.classList.add('search-show')
			}
			if (this.closest('.popup-filter-wrap')) {
				document.body.classList.add('filter-show')
			}
			popupElementsContentPositionClass()
		}
		e.preventDefault()
		e.stopPropagation()
		return false
	})
}
for (i = 0; i < closePopupButtons.length; i++) {
	closePopupButtons[i].addEventListener('click', function (e) {
		popupElementsClear()
		popupElementsClose()
		e.preventDefault()
		e.stopPropagation()
		return false;
	})
}
document.onclick = function (event) {
	if (!event.target.closest('.js-popup-block')) {
		popupElementsClear()
		popupElementsClose()
	}
}
popupElements.forEach(element => {
	if (element.classList.contains('js-popup-select')) {
		let popupElementSelectItem = element.querySelectorAll('.js-popup-block li a')
		if (element.querySelector('.js-popup-block .active')) {
			element.classList.add('select-active')
			let popupElementActive = element.querySelector('.js-popup-block .active').innerHTML
			let popupElementButton = element.querySelector('.js-btn-popup-toggle')
			popupElementButton.innerHTML = ''
			popupElementButton.insertAdjacentHTML('beforeend', popupElementActive)
		} else {
			element.classList.remove('select-active')
		}
		for (i = 0; i < popupElementSelectItem.length; i++) {
			popupElementSelectItem[i].addEventListener('click', function (e) {
				this.closest('.js-popup-wrap').classList.add('select-active')
				if (this.closest('.js-popup-wrap').querySelector('.js-popup-block .active')) {
					this.closest('.js-popup-wrap').querySelector('.js-popup-block .active').classList.remove('active')
				}
				this.classList.add('active')
				let popupElementActive = element.querySelector('.js-popup-block .active').innerHTML
				let popupElementButton = element.querySelector('.js-btn-popup-toggle')
				popupElementButton.innerHTML = ''
				popupElementButton.insertAdjacentHTML('beforeend', popupElementActive)
				popupElementsClear()
				popupElementsClose()
				if (!this.closest('.js-tabs-nav')) {
					e.preventDefault()
					e.stopPropagation()
					return false
				}
			})
		}
	}
})


//button scroll 
document.querySelectorAll('.js-anchor').forEach(anchor => {
	anchor.addEventListener('click', function (e) {
		e.preventDefault();
		document.querySelector('.popup-menu-wrap .js-btn-popup-toggle').classList.remove('active')
		document.querySelector(this.getAttribute('href')).scrollIntoView({
			behavior: 'smooth'
		});
	});
});



//slider gallery
const swiperSliderGallery = new Swiper(".slider-gallery .swiper", {
  loop: false,
  slidesPerView: 1,
  spaceBetween: 0,
  autoheight: true,
  speed: 500,
  autoplay: {
    delay: 4000,
    disableOnInteraction: false,
  },
  pagination: {
    el: ".slider-gallery-pagination",
    clickable: true,
  },
});


//slider projects
const swiperSliderProjects = new Swiper(".slider-projects .swiper", {
  loop: true,
  slidesPerView: "auto",
  spaceBetween: 0,
  speed: 400,
  pagination: {
    el: ".slider-projects-pagination",
    clickable: true,
  },
  breakpoints: {},
});
// Калькулятор
const widthInput = document.getElementById("width-img");
const heightInput = document.getElementById("height-img");
const priceElement = document.getElementById("price-img");
const widthForm = document.getElementById("width-img__input");
const heightForm = document.getElementById("height-img__input");
const priceForm = document.getElementById("price-img__input");
    
widthInput.addEventListener("input", validateInput);
heightInput.addEventListener("input", validateInput);

function validateInput(event) {
    const input = event.target;
    input.value = input.value.replace(/[^0-9.]/g, '');
   
    calculatePrice();
}

function calculatePrice() {
    const width = widthInput.value;
    const height = heightInput.value;
    
    const squareMeters = width * height;
    let price = 0;
    priceElement.setAttribute('data-unit', ' $ ');
    if (squareMeters >= 30 && squareMeters < 50) {
        price =  Math.round(squareMeters * 18);
        
    } else if (squareMeters >= 50 && squareMeters < 100) {
        price = Math.round(squareMeters * 16);
    } else if (squareMeters >= 100) {
        price = "<span>Special price</span>";
        priceElement.setAttribute('data-unit', '');
    }
    else {
        price = '<span class="-red">Minimum calculation from 30 sq. ft<sup><small></small></sup></span>';
        priceElement.setAttribute('data-unit', '');
    }

    priceElement.innerHTML = `${price}`;
    priceForm.value = `${price}`;
    heightForm.value = `${height}`;
    widthForm.value = `${width}`;
}





