'use strict'

/*
Пользователь может оформить доставку товара к себе в страну, указав ее при посещении страницы в prompt. Учти, что пользователь может ввести имя страны не только буквами нижнего регистра, а к примеру 'кИтАЙ'.

Напиши скрипт который выводит сообщение о стоимости доставки в указанную страну. Формат сообщения: 'Доставка в [страна] будет стоить [цена] кредитов'.

Но доставка есть не везде, если указанной страны нет в списке, то выводи в консоль сообщение 'В вашей стране доставка не доступна'.

Ниже приведен список стран и стоимость доставки.

китай - 100 кредитов
южная америка - 250 кредитов
австралия - 170 кредитов
индия - 80 кредитов
ямайка - 120 кредитов
PS: используй switch
*/

let inputUserDelivery = prompt('Укажите страну доставки');
let priceDelivery;
let message;

if (!inputUserDelivery) {
    message = 'Отменено пользователем!';
} else {
    let inputDeliveryToLower = inputUserDelivery.toLowerCase();
    switch(inputDeliveryToLower) {
        case 'китай':
            inputUserDelivery = inputUserDelivery.toUpperCase();
            priceDelivery = 100;
            message = `Доставка в ${inputUserDelivery} будет стоить ${priceDelivery} кредитов`;
            break;
        case 'южная америка':
            inputUserDelivery = inputUserDelivery.toUpperCase();
            priceDelivery = 250;
            message = `Доставка в ${inputUserDelivery} будет стоить ${priceDelivery} кредитов`;
            break;
        case 'австралия':
            inputUserDelivery = inputUserDelivery.toUpperCase();
            priceDelivery = 170;
            message = `Доставка в ${inputUserDelivery} будет стоить ${priceDelivery} кредитов`;
            break;
        case 'индия':
            inputUserDelivery = inputUserDelivery.toUpperCase();
            priceDelivery = 80;
            message = `Доставка в ${inputUserDelivery} будет стоить ${priceDelivery} кредитов`;
            break;
        case 'ямайка':
            inputUserDelivery = inputUserDelivery.toUpperCase();
            priceDelivery = 120;
            message = `Доставка в ${inputUserDelivery} будет стоить ${priceDelivery} кредитов`;
            break;
        default: 
            message = 'В вашей стране доставка не доступна';
    }
}
console.log(message);