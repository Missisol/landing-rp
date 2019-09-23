'use strict';

const element = document.querySelector('#phone');

const phoneMask = IMask(element, {
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

            if (inputEl.name !== 'userPhone') {
                inputEl.addEventListener('input', () => this.checkName(inputEl));
            }

            if (inputEl.name === 'userPhone') {
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

        for (let input of this.inputNames) {
            const inputEl = this.formEl[`${input}`];

            if (inputEl.name !== 'userPhone') {
                if (!this.checkName(inputEl)) {
                    isValid = false;
                }
            }

            if (inputEl.name === 'userPhone') {
                if (!this.checkPhone(inputEl)) {
                    isValid = false;
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

        const field = document.querySelector(`.connection__field-${inputEl.name}`);
        field.innerHTML = message;

        inputEl.classList.add('error');
    }

    setValidField(inputEl) {

        const field = document.querySelector(`.connection__field-${inputEl.name}`);
        field.innerHTML = '';

        inputEl.classList.remove('error');
    }

    inputStringify() {
        let inputValue = '';

        for (let input of this.inputNames) {

            const inputEl = this.formEl[`${input}`];
            inputValue += `${input}=${inputEl.value}; `;
        }

        return inputValue;
    }

    fetchForm() {
        this.formValue.input = this.inputStringify();
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
        document.querySelector('.connection__acceptWrap')
            .classList.remove('invisible');

        this.submitBtn.disabled = true;

        for (let input of this.formEl) {

            input.disabled = true;
        }
    }
}

const api = 'http://localhost:3000/api/users';
const inputs = [
    'userName',
    'userPhone',
    'userCity'
];
const formSelector = '.connection__form';
const btnSubmitSelector = '.connection__submit';

const send = new SubmitForm(api, inputs, formSelector, btnSubmitSelector);
send.init();

