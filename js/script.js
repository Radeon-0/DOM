const title = document.getElementById("title");
const handlerBtn = document.getElementsByClassName("handler_btn");
const screenBtn = document.querySelector(".screen-btn");
const otherItemsPercent = document.querySelectorAll(".other-items.percent");
const otherItemsNumber = document.querySelectorAll(".other-items.number");
const rollback = document.querySelector(".rollback");
const range = rollback.querySelector("input[type=range]");
const rangeValue = rollback.querySelector("span.range-value");
const totalInput = document.getElementsByClassName("total-input");
let screen  = document.querySelectorAll(".screen");

for (let input of totalInput) {
    console.log(input);
}