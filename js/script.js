
const title = document.getElementsByTagName('h1')[0];

const buttonPlus = document.querySelector('.screen-btn');

const otherItemsPercent = document.querySelectorAll('.other-items.percent');

const otherItemsNumber = document.querySelectorAll('.other-items.number');

const inputRange = document.querySelector('.rollback input');

const inputRangeValue = document.querySelector('.rollback .range-value');

const startBtn = document.getElementsByClassName('handler_btn')[0];

const resetBtn = document.getElementsByClassName('handler_btn')[1];

const total = document.getElementsByClassName('total-input')[0];

const totalCount = document.getElementsByClassName('total-input')[1];

const totalCountOther = document.getElementsByClassName('total-input')[2];

const fullTotalCount = document.getElementsByClassName('total-input')[3];

const totalCountRollback = document.getElementsByClassName('total-input')[4];

let screens = document.querySelectorAll('.screen');


const appData = {

    title: '',
    screens: [],
    screenPrice: 0,
    adaptive: true,
    rollback: 10,
    ServicePricesPercent: 0,
    ServicePricesNumber: 0,
    fullPrice: 0,
    fullPriceRollback: 0,
    projectTitle: '',
    servicePercentPrice: 0,
    servicesPercent: {},
    servicesNumber: {},
    count: 0,
    init: function () {

        this.addTitle();

        startBtn.addEventListener('click', () => {
            this.start();
        });

        resetBtn.addEventListener('click', () => {
            this.reset();
        });

        buttonPlus.addEventListener('click', () => {
            this.addScreenBlock();
        });

        inputRange.addEventListener('input', () => {

            inputRangeValue.textContent = inputRange.value + '%';

            this.rollback = +inputRange.value;

        });

    },


    addTitle: function () {

        document.title = title.textContent;

    },


    start: function () {

        if (this.isEmptyFild() === true) {

            this.screens = [];
            this.screenPrice = 0;
            this.ServicePricesPercent = 0;
            this.ServicePricesNumber = 0;
            this.fullPrice = 0;
            this.fullPriceRollback = 0;
            this.servicePercentPrice = 0;
            this.servicesPercent = {};
            this.servicesNumber = {};
            this.count = 0;

            this.addScreens();
            this.addServices();
            this.addPrices();
            this.logger();
            this.showResult();
            this.disabled();


            resetBtn.style.display = 'block';

            startBtn.style.display = 'none';


        } else {

            alert('Заполните все поля экранов');

        }

    },


    reset: function () {

        const allScreens = document.querySelectorAll('.screen');

        const selects = document.querySelectorAll('.main-total__items select');

        const inputs = document.querySelectorAll('.main-total__items input[type=text]');

        const inputS = document.querySelector('.main-controls__input input[type=text]');


        allScreens.forEach((screen, index) => {

            if (index > 0) {

                screen.remove();

            }

        });



        inputs.forEach((item) => {

            item.removeAttribute('disabled');

            item.value = '';

        });



        selects.forEach((item) => {

            item.removeAttribute('disabled');

        });


        

        inputS.removeAttribute('disabled');


      

        resetBtn.style.display = 'none';

        startBtn.style.display = 'block';


        

        this.screens = [];
        this.screenPrice = 0;
        this.ServicePricesPercent = 0;
        this.ServicePricesNumber = 0;
        this.fullPrice = 0;
        this.fullPriceRollback = 0;
        this.servicePercentPrice = 0;
        this.servicesPercent = {};
        this.servicesNumber = {};
        this.count = 0;

        total.value = '';
        totalCountOther.value = '';
        totalCount.value = '';
        fullTotalCount.value = '';
        totalCountRollback.value = '';

        screens = document.querySelectorAll('.screen');

    },


    isString: function (str) {

        return typeof str === 'string' &&

            str.trim() !== '' &&

            isNaN(Number(str));

    },


    addScreens: function () {

        screens = document.querySelectorAll('.screen');

        screens.forEach((screen, index) => {

            const select = screen.querySelector('select');

            const input = screen.querySelector('input');


            const selectName =
                select.options[select.selectedIndex].textContent;

            const price = +select.value * +input.value;


            this.screens.push({

                id: index,

                name: selectName,

                price: price,

                count: +input.value

            });

        });

    },


    showResult: function () {

        total.value = this.screenPrice;

        totalCountOther.value =
            this.ServicePricesPercent + this.ServicePricesNumber;

        totalCount.value = this.count;

        fullTotalCount.value = this.fullPrice;

        totalCountRollback.value = this.fullPriceRollback;

    },


    isEmptyFild: function () {

        screens = document.querySelectorAll('.screen');


        let result = true;


        screens.forEach((screen) => {

            const select = screen.querySelector('select');

            const input = screen.querySelector('input');


            if (select.value === '' || input.value.trim() === '') {

                result = false;

            }


            if (
                isNaN(Number(input.value)) ||
                Number(input.value) <= 0
            ) {

                result = false;

            }

        });


        return result;

    },


    disabled: function () {

        const selects = document.querySelectorAll('.main-total__items select');

        const inputs = document.querySelectorAll('.main-total__items input[type=text]');

        const inputS = document.querySelector('.main-controls__input input[type=text]');


        inputs.forEach((item) => {

            item.setAttribute('disabled', 'disabled');

        });


        selects.forEach((item) => {

            item.setAttribute('disabled', 'disabled');

        });


        inputS.setAttribute('disabled', 'disabled');

    },


    addServices: function () {

        otherItemsPercent.forEach((item) => {

            const check = item.querySelector('input[type=checkbox]');

            const label = item.querySelector('label');

            const input = item.querySelector('input[type=text]');


            if (check.checked) {

                this.servicesPercent[label.textContent] = +input.value;

            }

        });


        otherItemsNumber.forEach((item) => {

            const check = item.querySelector('input[type=checkbox]');

            const label = item.querySelector('label');

            const input = item.querySelector('input[type=text]');


            if (check.checked) {

                this.servicesNumber[label.textContent] = +input.value;

            }

        });

    },


    addScreenBlock: function () {

        const cloneScreen = screens[0].cloneNode(true);

        screens[screens.length - 1].after(cloneScreen);

        screens = document.querySelectorAll('.screen');

    },


    addPrices: function () {

        for (let screen of this.screens) {

            this.screenPrice += +screen.price;

            this.count += +screen.count;

        }


        for (let key in this.servicesNumber) {

            this.ServicePricesNumber += this.servicesNumber[key];

        }


        for (let key in this.servicesPercent) {

            this.servicePercentPrice += this.screenPrice *

                (this.servicesPercent[key] / 100);

        }


        this.ServicePricesPercent = this.servicePercentPrice;


        this.fullPrice = +this.screenPrice +

            this.ServicePricesNumber +

            this.servicePercentPrice;


        this.fullPriceRollback = this.fullPrice -

            (this.fullPrice * (this.rollback / 100));

    },


    getServicePercentPrice: function () {

        this.servicePercentPrice = this.fullPrice -

            (this.fullPrice * (this.rollback / 100));

    },


    logger: function () {

        for (let key in this) {

            console.log(key, this[key]);

        }

    }

};


appData.init();