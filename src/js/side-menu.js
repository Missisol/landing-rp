'use strict';

const iconWrap = document.querySelector('#iconWrap');
const menuWrap = document.querySelector('#sideMenuWrap');

iconWrap.addEventListener('click', () => {

    if (menuWrap.classList.contains('invisible')) {
        menuWrap.classList.remove('invisible');
        menuWrap.classList.add('visible');
        menuWrap.style.right = '0';
    } else {
        menuWrap.classList.remove('visible');
        menuWrap.classList.add('invisible');
        menuWrap.style.right = '-370px';
    }
});
