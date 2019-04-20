
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

'use strict'

let inputUserDelivery = prompt('Укажите страну доставки');
const priceDeliveryChina = 100;
const priceDeliverySouthAmerica = 250;
const priceDeliveryAustralia = 170;
const priceDeliveryIndia = 80;
const priceDeliveryJamaica = 120;

if (inputUserDelivery === null) {
    console.log('Отменено пользователем!');
} else {
    switch(inputUserDelivery.toLowerCase()) {
        case 'китай':
            console.log(`Доставка в ${inputUserDelivery.toUpperCase()} будет стоить ${priceDeliveryChina} кредитов`);
            break;
        case 'южная америка':
            console.log(`Доставка в ${inputUserDelivery.toUpperCase()} будет стоить ${priceDeliverySouthAmerica} кредитов`);
            break;
        case 'австралия':
            console.log(`Доставка в ${inputUserDelivery.toUpperCase()} будет стоить ${priceDeliveryAustralia} кредитов`);
            break;
        case 'индия':
            console.log(`Доставка в ${inputUserDelivery.toUpperCase()} будет стоить ${priceDeliveryIndia} кредитов`);
            break;
        case 'ямайка':
            console.log(`Доставка в ${inputUserDelivery.toUpperCase()} будет стоить ${priceDeliveryJamaica} кредитов`);
            break;
        default: 
            console.log('В вашей стране доставка не доступна');
    }
}