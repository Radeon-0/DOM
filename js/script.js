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
    projectTitle: '',
    servicePercentPrice: 0,
    servicesPercent: {},
    servicesNumber: {},
    count: 2,
    init: function () {
        appData.addTitle();
        startBtn.addEventListener('click', appData.start);
        buttonPlus.addEventListener('click', appData.addScreenBlock);
    },
    addTitle: function () {
        document.title = title.textContent;
    },
    start: function () {
        appData.addScreens();
        appData.addServices();
        appData.addPrices();
        // appData.getServicePercentPrice();

        // appData.logger();
        console.log(appData);
        appData.showResult();
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
                price: price
            })
        });
    },
    showResult:function(){
        // alert("showResult");
        total.value = appData.screenPrice;
        totalCountOther.value = appData.ServicePricesPercent + appData.ServicePricesNumber;
        totalCount.value = appData.count;
        fullTotalCount.value = appData.fullPrice;
    },
    addServices: function(){
        otherItemsPercent.forEach(function(item){
            const check = item.querySelector('input[type=checkbox]');
            const label = item.querySelector('label');
            const input = item.querySelector('input[type=text]');
            if(check.checked){
                appData.servicesPercent[label.textContent] = +input.value;
            }
        });

         otherItemsNumber.forEach(function(item){
            const check = item.querySelector('input[type=checkbox]');
            const label = item.querySelector('label');
            const input = item.querySelector('input[type=text]');
            if(check.checked){
                appData.servicesNumber[label.textContent] = +input.value;
            }
        });

        
    },
    addScreenBlock: function () {
        const cloneScreen = screens[0].cloneNode(true);

        screens[screens.length - 1].after(cloneScreen);

    },
    addPrices: function () {
        for (let screen of appData.screens) {
            appData.screenPrice += +screen.price;
        }
        for (let key in appData.servicesNumber) {
            appData.ServicePricesNumber += appData.servicesNumber[key];
        }

         for (let key in appData.servicesPercent) {
            appData.servicePercentPrice += appData.screenPrice * (appData.servicesPercent[key] / 100)
        }
        appData.fullPrice = +appData.screenPrice + appData.ServicePricesNumber + appData.servicePercentPrice;
    },
    getServicePercentPrice: function () {
        appData.servicePercentPrice = appData.fullPrice - (appData.fullPrice * (appData.rollback / 100));
    },
    logger: function () {
        for (let key in this) {
            console.log(key, this[key]);
        }

    }
};

appData.init();