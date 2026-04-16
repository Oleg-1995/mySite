const lang = document.querySelector('.header__lang');
const menu = document.querySelector('.menu');
const headerElements = document.querySelector('.header__elements');
const headerBtn = document.querySelector('.header__btn');

// Перемещение языка
function moveLang() {
  if (window.innerWidth <= 1020) {
    if (!menu.contains(lang)) menu.append(lang);
  } else {
    if (!headerElements.contains(lang)) headerElements.prepend(lang);
  }
}

window.addEventListener('load', moveLang);
window.addEventListener('resize', moveLang);

// --- Мобильное меню ---
const menuLinks = menu.querySelectorAll('a'); // все ссылки меню

function openMenu() {
  menu.classList.add('menu--active');
  document.body.style.overflow = 'hidden';
}

function closeMenu() {
  menu.classList.remove('menu--active');
  document.body.style.overflow = '';
}

// Кнопка бургер
headerBtn.addEventListener('click', () => {
  if (menu.classList.contains('menu--active')) {
    closeMenu();
  } else {
    openMenu();
  }
});

// Закрытие меню при клике на пункт
menuLinks.forEach(link => {
  link.addEventListener('click', closeMenu);
});

// Добавляем класс при загрузке страницы, считаем, что пользователь мышью
  document.addEventListener('DOMContentLoaded', () => {
    document.body.classList.add('using-mouse');
  });

  // Клик мышью — остаёмся в режиме "мышь"
  document.addEventListener('mousedown', () => {
    document.body.classList.add('using-mouse');
  });

  // Нажатие Tab — включаем режим клавиатуры
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Tab') {
      document.body.classList.remove('using-mouse');
    }
  });


document.addEventListener("DOMContentLoaded", function () {
  const reveals = document.querySelectorAll(".reveal");

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("active");
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.2
  });

  reveals.forEach(reveal => {
    observer.observe(reveal);
  });
});



document.addEventListener('DOMContentLoaded', function () {

  const modal = document.querySelector('.modal-success').closest('.modal');
  const overlay = modal.querySelector('.modal__overlay');
  const closeButtons = modal.querySelectorAll('.close-modal');

  function openSuccessModal() {
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function closeSuccessModal() {
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  closeButtons.forEach(button => {
    button.addEventListener('click', closeSuccessModal);
  });

  overlay.addEventListener('click', closeSuccessModal);

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && modal.getAttribute('aria-hidden') === 'false') {
      closeSuccessModal();
    }
  });

  // 👇 вот это для CF7
  document.addEventListener('wpcf7mailsent', function () {
    openSuccessModal();
  });

});


// Форма зворотнього зв'язку

const consultationModal = document.querySelector('.consultation-modal');
const openConsultationBtns = document.querySelectorAll('.open-consultation');
const closeConsultationBtn = consultationModal.querySelector('.close-modal');

// Открытие
openConsultationBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    consultationModal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden'; // блокируем скролл body
  });
});

// Закрытие по крестику
closeConsultationBtn.addEventListener('click', () => {
  consultationModal.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = ''; // восстанавливаем скролл
});

// Закрытие по клику на фон
consultationModal.addEventListener('click', (e) => {
  if (e.target === consultationModal) {
    consultationModal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }
});

// Закрытие по ESC
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    consultationModal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }
});


// Модальне вікно, інформація про сайт

(function () {

  const modal = document.querySelector('.portfolio-modal');
  if (!modal) return;

  const overlay = modal.querySelector('.modal__overlay');
  const closeBtn = modal.querySelector('.close-modal');

  const purposeTitle = modal.querySelector('.modal__purpose .modal__title');
  const purposeText = modal.querySelector('.modal__text');
  const stackList = modal.querySelector('.modal__list');
  const modalLink = modal.querySelector('.modal__link');

  document.addEventListener('click', function (e) {

    const btn = e.target.closest('.open-modal');
    if (!btn) return;

    // ---------- DATA ATTRIBUTES ----------

    const {
      title,
      desc,
      stack,
      link,
      image // читаем data-image тоже
    } = btn.dataset;

    // ---------- TEXT ----------

    if (title && purposeTitle) {
      purposeTitle.textContent = title;
    }

    if (desc && purposeText) {
      purposeText.textContent = desc;
    }

    if (stack && stackList) {
      stackList.innerHTML = stack
        .split(',')
        .map(i => `<li class="modal__item">${i.trim()}</li>`)
        .join('');
    }

    if (link && modalLink) {
      modalLink.href = link;
      modalLink.target = '_blank';
      modalLink.rel = 'noopener';
    }

    // ---------- IMAGE (пока не выводим) ----------
    // data-image сохранён и прочитан — можно будет
    // легко подключить позже без переписывания логики
    if (image) {
      modal.dataset.currentImage = image;
    }

    openModal();
  });

  // ---------- OPEN / CLOSE ----------

  function openModal() {
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  closeBtn?.addEventListener('click', closeModal);
  overlay?.addEventListener('click', closeModal);

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && modal.getAttribute('aria-hidden') === 'false') {
      closeModal();
    }
  });

})();



// Етап розробки
const buttons = document.querySelectorAll('.development-process__steps-btn');
const contents = document.querySelectorAll('.development-process__steps-panel');

buttons.forEach(button => {
  button.addEventListener('click', () => {
    const step = button.dataset.step;

    buttons.forEach(btn => btn.classList.remove('active'));
    contents.forEach(item => item.classList.remove('content__active'));

    button.classList.add('active');

    const currentContent = document.querySelector(
      `.development-process__steps-panel[data-step="${step}"]`
    );

    currentContent.classList.add('content__active');
  });
});


// Акордеон
const accordions = document.querySelectorAll('.questions__accordion');

accordions.forEach(acc => {
  const head = acc.querySelector('.questions__accordion-head');
  const descr = acc.querySelector('.questions__accordion-descr');

  head.addEventListener('click', () => {
    const isOpen = descr.classList.contains('questions__accordion-descr--open');

    // Закрываем все остальные
    accordions.forEach(other => {
      const otherDescr = other.querySelector('.questions__accordion-descr');
      otherDescr.classList.remove('questions__accordion-descr--open');
      otherDescr.style.maxHeight = null;
    });

    // Открываем текущий, если был закрыт
    if (!isOpen) {
      descr.classList.add('questions__accordion-descr--open');
      descr.style.maxHeight = descr.scrollHeight + 'px';
    }
  });
});

// Пересчет maxHeight при изменении ширины окна
window.addEventListener('resize', () => {
  document.querySelectorAll('.questions__accordion-descr--open').forEach(el => {
    el.style.maxHeight = el.scrollHeight + 'px';
  });
});


// Форма зворотнього зв'язку
function showForm(formNode) {
  console.log(formNode.elements);

  const elements = formNode;

  const data = Array.from(elements)
    .filter((item) => !item.name)
    .map(element => {
      const { name, type } = element;

      const value = type === 'checkbox'
        ? element.checked
        : element.value;

      return { name, value }
    });
}

function handleFormSubmit(evt) {
  evt.preventDefault();

  showForm(form)
}

const form = document.querySelector('.consultation__form');
form.addEventListener('submit', handleFormSubmit);







