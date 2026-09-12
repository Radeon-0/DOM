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

        appData.addTitle();

        startBtn.addEventListener('click', appData.start);

        buttonPlus.addEventListener('click', appData.addScreenBlock);


        inputRange.addEventListener('input', function () {

            inputRangeValue.textContent = inputRange.value + '%';

            appData.rollback = +inputRange.value;

        });

    },


    addTitle: function () {

        document.title = title.textContent;

    },


    start: function () {

        if (appData.isEmptyFild() == true) {

            appData.screens = [];
            appData.screenPrice = 0;
            appData.ServicePricesPercent = 0;
            appData.ServicePricesNumber = 0;
            appData.fullPrice = 0;
            appData.fullPriceRollback = 0;
            appData.servicePercentPrice = 0;
            appData.servicesPercent = {};
            appData.servicesNumber = {};
            appData.count = 0;


            appData.addScreens();
            appData.addServices();
            appData.addPrices();
            appData.logger();
            console.log(appData);
            appData.showResult();

        } else {

            alert("Заполните все поля экранов");

        }

    },


    isString: function (str) {

        return typeof str === "string" &&

            str.trim() !== "" &&

            isNaN(Number(str));

    },


    addScreens: function () {

        screens = document.querySelectorAll('.screen');


        screens.forEach(function (sreen, index) {

            const select = sreen.querySelector('select');

            const input = sreen.querySelector('input');


            const selectName = select.options[select.selectedIndex].textContent;

            const price = +select.value * +input.value;


            appData.screens.push({

                id: index,
                name: selectName,
                price: price,
                count: +input.value

            });

        });

    },


    showResult: function () {

        total.value = appData.screenPrice;
        totalCountOther.value = appData.ServicePricesPercent + appData.ServicePricesNumber;
        totalCount.value = appData.count;
        fullTotalCount.value = appData.fullPrice;
        totalCountRollback.value = appData.fullPriceRollback;

    },


    isEmptyFild: function () {

        screens = document.querySelectorAll('.screen');


        let result = true;


        screens.forEach(function (sreen) {

            const select = sreen.querySelector('select');
            const input = sreen.querySelector('input');


            if (select.value === '' || input.value.trim() === '') {

                result = false;

            }


            if (isNaN(Number(input.value)) || Number(input.value) <= 0) {

                result = false;

            }

        });


        return result;

    },


    addServices: function () {

        otherItemsPercent.forEach(function (item) {

            const check = item.querySelector('input[type=checkbox]');
            const label = item.querySelector('label');
            const input = item.querySelector('input[type=text]');


            if (check.checked) {

                appData.servicesPercent[label.textContent] = +input.value;

            }

        });


        otherItemsNumber.forEach(function (item) {

            const check = item.querySelector('input[type=checkbox]');
            const label = item.querySelector('label');
            const input = item.querySelector('input[type=text]');


            if (check.checked) {

                appData.servicesNumber[label.textContent] = +input.value;

            }

        });

    },


    addScreenBlock: function () {

        const cloneScreen = screens[0].cloneNode(true);
        screens[screens.length - 1].after(cloneScreen);
        screens = document.querySelectorAll('.screen');

    },


    addPrices: function () {

        for (let screen of appData.screens) {

            appData.screenPrice += +screen.price;
            appData.count += +screen.count;

        }


        for (let key in appData.servicesNumber) {

            appData.ServicePricesNumber += appData.servicesNumber[key];

        }


        for (let key in appData.servicesPercent) {

            appData.servicePercentPrice += appData.screenPrice *

                (appData.servicesPercent[key] / 100);

        }


        appData.ServicePricesPercent = appData.servicePercentPrice;


        appData.fullPrice = +appData.screenPrice +

            appData.ServicePricesNumber +
            appData.servicePercentPrice;


        appData.fullPriceRollback = appData.fullPrice -

            (appData.fullPrice * (appData.rollback / 100));

    },


    getServicePercentPrice: function () {

        appData.servicePercentPrice = appData.fullPrice -
            (appData.fullPrice * (appData.rollback / 100));

    },


    logger: function () {

        for (let key in this) {
            console.log(key, this[key]);

        }

    }

};


appData.init();