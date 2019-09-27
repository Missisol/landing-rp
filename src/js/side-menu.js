'use strict';

const iconWrap = document.querySelector('#iconWrap');
const menuWrap = document.querySelector('#sideMenuWrap');
const overlay = document.querySelector('#overlay');

iconWrap.addEventListener('click', () => {

    if (menuWrap.classList.contains('invisible')) {
        menuWrap.classList.remove('invisible');
        menuWrap.classList.add('visible');

        overlay.classList.remove('invisible');

        menuWrap.style.right = '0';

        document.body.style.overflow = 'hidden';
    } else {
        menuWrap.classList.remove('visible');
        menuWrap.classList.add('invisible');

        overlay.classList.add('invisible');

        menuWrap.style.right = '-50vw';

        document.body.style.overflow = '';
    }
});
