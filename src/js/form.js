'use strict';

const element = document.querySelector('#input-phone');

let phoneMask = IMask(element, {
        mask: '+{7}(000)000-00-00',
});

class SubmitForm {

    constructor(apiURL, inputNames, formSelector, btnSubmitSelector, formEl = null, formValue = {}) {
        this.apiURL = apiURL;
        this.inputNames = inputNames;
        this.formSelector = formSelector;
        this.btnSubmitSelector = btnSubmitSelector;
        this.formEl = formEl;
        this.formValue = formValue;
    }

    init() {
        this.formEl = document.querySelector(this.formSelector);
        this.submitBtn = document.querySelector(this.btnSubmitSelector);

        for (let input of this.inputNames) {
            const inputEl = this.formEl[`${input}`];

            if (inputEl.name === 'name') {
                inputEl.addEventListener('input', () => this.checkName(inputEl));
            }

            if (inputEl.name === 'email') {
                inputEl.addEventListener('input', () => this.checkEmail(inputEl));
            }

            if (inputEl.name === 'phone') {
                inputEl.addEventListener('input', () => this.checkPhone(inputEl));
            }
        }

        this.formEl.addEventListener('submit', e => this.formSubmit(e));
    }

    formSubmit(e) {
        e.preventDefault();

        if (this.validate()) {

            this.inputStringify();
            this.fetchForm();
        }
    }

    validate() {
        let isValid = true;

        const phoneValue = this.formEl['phone'].value;
        const emailValue = this.formEl['email'].value;
        const message = 'Одно из полей должно быть заполнено';

        if (phoneValue === '' && emailValue === '') {
            this.validFunction(this.formEl['phone'], message);
            this.validFunction(this.formEl['email'], message);
            isValid = false;
        }

        for (let input of this.inputNames) {
            const inputEl = this.formEl[`${input}`];

            if (inputEl.name === 'name') {

                if (!this.checkName(inputEl)) {
                    isValid = false;
                }
            }

            if (inputEl.name === 'phone' && inputEl.value) {

                if (!this.checkPhone(inputEl)) {
                    isValid = false;
                } else if (!this.formEl['email'].value) {

                    this.setValidField(this.formEl['email']);
                } else {
                    if (!this.checkEmail(this.formEl['email'])) {
                        isValid = false;
                    }
                }
            }

            if (inputEl.name === 'email' && inputEl.value) {

                if (!this.checkEmail(inputEl)) {

                    isValid = false;
                } else if (this.formEl['phone'].value === '') {

                    this.setValidField(this.formEl['phone']);
                } else {
                    if (!this.checkPhone(this.formEl['phone'])) {
                        isValid = false;
                    }
                }
            }
        }

        return isValid;
    }

    checkName(inputEl) {
        let message = null;
        const regexp = /[^a-zа-я]|(^$)/gi;

        regexp.test(inputEl.value) ?
            (inputEl.value === '' ? message = 'Поле обязательно для заполнения' :
                message = 'Поле должно содержать только буквы')
            : null;

        return this.validFunction(inputEl, message);
    }

    checkPhone(inputEl) {
        let message = null;
        const phone = phoneMask.on('complete', () => {
        });

        phone.unmaskedValue.length !== 11 ? message = ' Поле обязательно для заполнения' : null;

        return this.validFunction(inputEl, message);
    }

    checkEmail(inputEl) {
        let message = null;

        const regexp = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;

        !regexp.test(inputEl.value) ?
            (inputEl.value === '' ? message = 'Поле обязательно для заполнения' :
                message = 'Проверьте правильность введенных данных')
            : null;

        return this.validFunction(inputEl, message);
    }

    validFunction(inputEl, message) {

        let isValid = true;

        if (message !== null) {
            this.setInvalidField(inputEl, message);
            isValid = false;
        } else {
            this.setValidField(inputEl);
        }

        return isValid;
    }

    setInvalidField(inputEl, message) {

        const field = document.querySelector(`.communication__field-${inputEl.name}`);
        const label = document.querySelector(`.${inputEl.name}-label`);
        field.innerHTML = message;

        inputEl.classList.add('error');
        label.classList.add('error');
    }

    setValidField(inputEl) {

        const field = document.querySelector(`.communication__field-${inputEl.name}`);
        const label = document.querySelector(`.${inputEl.name}-label`);
        field.innerHTML = '';

        inputEl.classList.remove('error');
        label.classList.remove('error');
    }

    inputStringify() {
        let inputValue = {};

        for (let input of this.inputNames) {

            const inputEl = this.formEl[`${input}`];
            inputValue[input] = inputEl.value;
        }

        return inputValue;
    }

    fetchForm() {
        this.formValue = this.inputStringify();
        console.log(this.formValue);

        fetch(this.apiURL, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(this.formValue)
        })
            .then(res => res.json())
            .then(responseOK => {
                this.accept();
            })
            .catch(err => console.log(err));

        // Функция должна вызываться в случае ответа сервера ОК
        this.accept();
    }

    accept() {
        this.submitBtn.disabled = true;

        for (let input of this.formEl) {

            input.value = '';
        }
    }
}

const api = 'http://.../api/';
const inputs = [
    'name',
    'email',
    'phone',
    'check'
];
const formSelector = '.communication__form';
const btnSubmitSelector = '.communication__button';


const send = new SubmitForm(api, inputs, formSelector, btnSubmitSelector);

const btnSubmit = document.querySelector('#submit');

btnSubmit.addEventListener('click', () => {
    send.init();
});










