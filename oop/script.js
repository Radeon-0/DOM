'use strict'

const DomElement = function (selector, height, width, bg, fontSize) {
    this.selector = selector;
    this.height = height;
    this.width = width;
    this.bg = bg;
    this.fontSize = fontSize;

    this.createElement = function () {
        let element;

        if (this.selector.startsWith('.')) {
            element = document.createElement('div');
            element.classList.add(this.selector.slice(1));
        }
        else if(this.selector.startsWith('#')){
            element = document.createElement('p');
            element.id = this.selector.slice(1);
        } else{
            alert('Неверный селектор');
            return;
        }

        element.style.cssText = `
            height: ${this.height};
            width: ${this.width};
            background: ${this.bg};
            font-size: ${this.fontSize};
        `;

        document.body.append(element);
    }

}

const block = new DomElement(
    '#block',
    '200px',
    '300px',
    'lightblue',
    '24px');

const block2 = new DomElement(
    '.block',
    '200px',
    '300px',
    'black',
    '24px');

block.createElement();
block2.createElement();


// class Person {
//     constructor(name,age){
//         this.name = name;
//         this.age = age;
//     }
//     sayHello(){
//         console.log(`Привет! меня зовут ${this.name}`);
//     }
// }

// class FrontEndDev extends Person {
//     constructor(name,age,skills = []){
//         super(name,age);
//         this._skills = skills;
//     }
//     get skills(){
//         return this._skills;
//     }

//     set skills(str){
//         this.skills.push(str);
//     }

// }

// const dev = new FrontEndDev('vlad',23);
// dev.skills = 'text';
// dev.skills = 'text2';
// dev.skills = 'text3';
// console.log(dev.skills);


// const user = {
//     name:'Alex',
//     age:33,
//     isAuth:false,
//     project:{
//         first: 'first',
//         secound: 'secound'
//     }
// };

// const {name,age,isAuth,project,project:{first,secound}} = user;

// console.log(project);
// console.log(first);
// console.log(secound);

// const names = ['artyom','Max','Vasya',['Petya','Alex']];

// const [art,max,vasya,[petya,alex]] = names;

// console.log(art);
// console.log(petya);
// console.log(alex);

// const logger = ({first,second,third})=>{
//     console.log(second);
// };

// logger({first:'I',second:'Js',third:"2"})