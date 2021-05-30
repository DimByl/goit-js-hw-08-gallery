import galleryItem from './gallery-items.js';

const galletyBackgroundE = document.querySelector('.js-gallery');

const ref = {
  lightboxE: document.querySelector('.js-lightbox'),
  closeLightboxBtn: document.querySelector('[data-action="close-lightbox"]'),
  lightboxOverlay: document.querySelector('.lightbox__overlay'),
  lightboxImageE: document.querySelector('.lightbox__image'),
};
const arrayLinks = [];
galleryItem.forEach(item => arrayLinks.push(item.original));

function createGalleryEl (items) {
return items.map(({ preview, original, description}) => 
`<li class="gallery__item">
  <a
    class="gallery__link"
    href="${original}"
  >
    <img
      class="gallery__image"
      src="${preview}"
      data-source="${original}"
      alt="${description}"
    />
  </a>
</li>`
).join('');
};

galletyBackgroundE.innerHTML = createGalleryEl(galleryItem);

galletyBackgroundE.addEventListener('click', clickOnImage);

function clickOnImage (evt) {
  if (evt.target.nodeName !== 'IMG') {
    return;
  } else {
    evt.preventDefault();
    ref.lightboxE.classList.add('is-open');
    ref.lightboxImageE.src = evt.target.dataset.source;
    ref.lightboxImageE.alt = evt.target.alt;

    eventListenerAdds();
  };
};

const eventListenerAdds = function () {
  document.addEventListener('keydown', closeLightboxByEsc);
  document.addEventListener('keydown', switchImages);
  ref.closeLightboxBtn.addEventListener('click', closeLightboxByBtn);
  ref.lightboxOverlay.addEventListener('click', closeLightboxByOvelayClick);
};

const eventListenerRemoves = function () {
  ref.closeLightboxBtn.removeEventListener('click', closeLightboxByBtn);
  ref.lightboxOverlay.removeEventListener('click', closeLightboxByOvelayClick);  
  document.removeEventListener('keydown', closeLightboxByEsc);
  document.removeEventListener('keydown', switchImages);
};

function closeLightboxByBtn () {
  ref.lightboxE.classList.remove('is-open');
  ref.lightboxImageE.src = '';
  ref.lightboxImageE.alt = '';

  eventListenerRemoves();
};

function closeLightboxByOvelayClick () {
  ref.lightboxEl.classList.remove('is-open');
  ref.lightboxImageE.src = '';
  ref.lightboxImageE.alt = '';
  
  eventListenerRemoves();
};

function closeLightboxByEsc (evt) {
  if (ref.lightboxE.classList.contains('is-open')) {
    if(evt.code === 'Escape') {
      ref.lightboxE.classList.remove('is-open');
      ref.lightboxImageE.src = '';
      ref.lightboxImageE.alt = '';
      
      eventListenerRemoves();
    };
  };
};

function switchImages (evt) {
  let newId;
  const currentId = arrayLinks.indexOf(ref.lightboxImageE.src);
  if (evt.key === 'ArrowLeft') {
    newId = currentId - 1;
    if (newId === -1) {
      newId = arrayLinks.length - 1;
    };
  } else if (evt.key === 'ArrowRight') {
    newId = currentId + 1;
    if (newId === arrayLinks.length) {
      newId = 0;
    } 
  } else {
    return;
  };
  ref.lightboxImageE.src = arrayLinks[newId];
};