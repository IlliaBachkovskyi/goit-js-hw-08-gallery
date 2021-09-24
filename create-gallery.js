import * as modulGalleryItems from "./app.js";

const gallaryRef = document.querySelector('.js-gallery');
console.log(gallaryRef);
const modalRef = document.querySelector('.js-lightbox');
console.log(modalRef);
const modalImageRef = document.querySelector('.lightbox__image');
console.log(modalImageRef);
const modalCloseBtnRef = modalRef.querySelector('[data-action="close-lightbox"]')
console.log(modalCloseBtnRef);
const overlayRef = document.querySelector('.lightbox__overlay');
console.log(overlayRef);
const dataSourceArray = [];
console.log(dataSourceArray);


const createaElementImageGallery = galleryItem => {
  const { preview, original, description } = galleryItem;
    return `
    <li class="gallery__item">
  <a
    class="gallery__link"
    href=""
  >
    <img
      class="gallery__image"
      src="${preview}"
      data-source="${original}"
      alt="${description}"
    />
  </a>
</li>
     `;
   };
const createImageGallery = modulGalleryItems.galleryItems
  .map(createaElementImageGallery)
  .join('');
gallaryRef.insertAdjacentHTML('afterbegin', createImageGallery);
console.log(createImageGallery);
// Наполнение массива для получения индексов 
document.querySelectorAll('[data-source]').forEach(e => {
  dataSourceArray.push(e.dataset.source)
});


//  Откытие модального окна
const onOpenModalWindow = e => {
  e.preventDefault();

  if (e.target.localName === 'img') {
    modalImageRef.src = e.target.dataset.source;
    modalImageRef.alt = e.target.alt;
  
    modalRef.classList.add('is-open');
  };
};
gallaryRef.addEventListener('click', onOpenModalWindow);


// Закрываем модальное окно кнопкой (svg)
const onCloseModalButton = function () {
  modalRef.classList.remove('is-open');
  modalImageRef.src = '';
  modalImageRef.alt = '';
};
modalCloseBtnRef.addEventListener('click', onCloseModalButton);
overlayRef.addEventListener('click', onCloseModalButton);



// Закрываем модальное окно кнопкой Escape
const onCloseModalEscape = e => {
  if (e.key === 'Escape') {
    modalRef.classList.remove('is-open');
    modalImageRef.src = '';
    modalImageRef.alt = '';
  }
};
window.addEventListener('keyup', onCloseModalEscape);



// Ф-ция перелистывания картинок
document.addEventListener('keydown', e => {
  const currentIndex = dataSourceArray.indexOf(modalImageRef.src)
  if (e.key === 'ArrowLeft') {
    leftClick(currentIndex)
  } else if (e.key === 'ArrowRight') {
    rightClick(currentIndex)
  }
})
function leftClick(currentIndex) {
  let nextIndex = currentIndex - 1;
  if (nextIndex == -1) {
    nextIndex = dataSourceArray.length - 1;
  }
  modalImageRef.src = dataSourceArray[nextIndex];
};
function rightClick(currentIndex) {
  let nextIndex = currentIndex + 1;
  if (nextIndex == dataSourceArray.length) {
    nextIndex = 0;
  }
  modalImageRef.src = dataSourceArray[nextIndex];
};