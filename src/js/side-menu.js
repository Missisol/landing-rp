'use strict';

const menuIcon = document.querySelector('#menu-icon');
const sidebar = document.querySelector('#sidebar');
const overlay = document.querySelector('#overlay');

menuIcon.addEventListener('click', (e) => {
    e.preventDefault();

    if (overlay.classList.contains('invisible')) {

        overlay.classList.remove('invisible');
        sidebar.style.right = '0';
        document.body.style.overflow = 'hidden';
    } else {

        overlay.classList.add('invisible');
        sidebar.style.right = '-100vw';
        document.body.style.overflow = '';
    }
});

sidebar.addEventListener('click', (e) => {
    const target = e.target;
    console.log(target);

    if (target.classList.contains('header__link_side') && !overlay.classList.contains('invisible')) {

        overlay.classList.add('invisible');
        sidebar.style.right = '-100vw';
        document.body.style.overflow = '';
    }
});

