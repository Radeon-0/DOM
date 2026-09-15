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

