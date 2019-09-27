'use strict';

const iconWrap = document.querySelector('#iconWrap');
const menuWrap = document.querySelector('#sideMenuWrap');
const overlay = document.querySelector('#overlay');

iconWrap.addEventListener('click', (e) => {
    e.preventDefault();

    if (menuWrap.classList.contains('invisible')) {
        menuWrap.classList.remove('invisible');
        menuWrap.classList.add('visible');

        iconWrap.classList.add('active');

        overlay.classList.remove('invisible');

        menuWrap.style.right = '0';

        // document.body.style.overflow = 'hidden';
    } else {
        menuWrap.classList.remove('visible');
        menuWrap.classList.add('invisible');

        iconWrap.classList.remove('active');

        overlay.classList.add('invisible');

        menuWrap.style.right = '-100vw';

        // document.body.style.overflow = '';
    }
});
