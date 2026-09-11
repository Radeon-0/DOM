const books = document.querySelector(".books");
const book = document.querySelectorAll(".book");
const body = document.querySelector("body");
const reklama = document.querySelector(".adv");
const liElement = document.createElement("li");
const listBook2 = book[0].querySelectorAll("ul li");
const listBook3 = book[5].querySelectorAll("ul li");
const book2 = book[0].querySelector("ul");
const book3 = book[5].querySelector("ul");

books.append(
    book[1],
    book[0],
    book[4],
    book[3],
    book[5],
    book[2]
);


body.style.backgroundImage = 'url(/image/you-dont-know-js.jpg)';
book[4].querySelector("h2 a").textContent = "Книга 3. this и Прототипы Объектов";
reklama.remove();
liElement.textContent = "Глава 8: За пределами ES6";
book[2].querySelector("ul").append(liElement);


book2.append(
    listBook2[0],
    listBook2[1],
    listBook2[3],
    listBook2[6],
    listBook2[8],
    listBook2[4],
    listBook2[5],
    listBook2[7],
    listBook2[9],
    listBook2[2],
    listBook2[10]
);

book3.append(
    listBook3[0],
    listBook3[1],
    listBook3[9],
    listBook3[3],
    listBook3[4],
    listBook3[2],
    listBook3[6],
    listBook3[7],
    listBook3[5],
    listBook3[8],
    listBook3[10]
);