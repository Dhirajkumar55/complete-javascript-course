'use strict';

const showBtn = document.querySelectorAll('.show-modal');
console.log(showBtn);

const closeBtn = document.querySelector('.close-modal');
console.log(closeBtn);

const modal = document.querySelector('.modal');
console.log(modal);

const overlay = document.querySelector('.overlay');

for (let i = 0; i < 3; i++) {
    showBtn[i].addEventListener('click', () => {
        console.log('clicked');
        modal.classList.remove('hidden');
        overlay.classList.remove('hidden');
    });
}

closeBtn.addEventListener('click', () => {
    modal.classList.add('hidden');
    overlay.classList.add('hidden');
});
