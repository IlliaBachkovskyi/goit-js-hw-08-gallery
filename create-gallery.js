import * as modulGalleryItems from "./app.js";

const refs = {
  gallary: document.querySelector('.js-gallery'),
  modal: document.querySelector('.js-lightbox'),
  modalImage: document.querySelector('.lightbox__image'),
  modalCloseBtn: document.querySelector('[data-action="close-lightbox"]'),
  overlay: document.querySelector('.lightbox__overlay'),
};
const dataSourceArray = [];
// console.log(refs.gallary);
// console.log(refs.modal);
// console.log(refs.modalImage);
// console.log(refs.modalCloseBtn);
// console.log(refs.overlay);
// console.log(dataSourceArray);


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
refs.gallary.insertAdjacentHTML('afterbegin', createImageGallery);
console.log(createImageGallery);
// Наполнение массива для получения индексов 
document.querySelectorAll('[data-source]').forEach(e => {
  dataSourceArray.push(e.dataset.source)
});


//  Откытие модального окна
const onOpenModalWindow = e => {
  e.preventDefault();

  if (e.target.localName === 'img') {
    refs.modalImage.src = e.target.dataset.source;
    refs.modalImage.alt = e.target.alt;
  
    refs.modal.classList.add('is-open');
  };
};
refs.gallary.addEventListener('click', onOpenModalWindow);


// Закрываем модальное окно кнопкой (svg)
const onCloseModalButton = function () {
  refs.modal.classList.remove('is-open');
  refs.modalImage.src = '';
  refs.modalImage.alt = '';
};
refs.modalCloseBtn.addEventListener('click', onCloseModalButton);
refs.overlay.addEventListener('click', onCloseModalButton);



// Закрываем модальное окно кнопкой Escape
const onCloseModalEscape = e => {
  if (e.key === 'Escape') {
    refs.modal.classList.remove('is-open');
    refs.modalImage.src = '';
    refs.modalImage.alt = '';
  }
};
window.addEventListener('keyup', onCloseModalEscape);



// Ф-ция перелистывания картинок
document.addEventListener('keydown', e => {
  const currentIndex = dataSourceArray.indexOf(refs.modalImage.src)
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
  refs.modalImage.src = dataSourceArray[nextIndex];
};
function rightClick(currentIndex) {
  let nextIndex = currentIndex + 1;
  if (nextIndex == dataSourceArray.length) {
    nextIndex = 0;
  }
  refs.modalImage.src = dataSourceArray[nextIndex];
};