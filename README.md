# Slider - готовий до використання слайдер

## Опис
Цей клас реалізує створення слайдеру з необмеженою кількістю зображень. Є можливість відображати або приховувати 
елементи керування, змінювати колір елементів відповідно до вашої теми, створювати делькілька слайдерів
на одній сторінці та інше.

## Використання
### Скопіюйте цей HTML в свій код
```html
<div id="slider" class="wrapper">
  <div class="left">
    &#10094;
  </div>
  <div class="content">
    <div class="content-item">

    </div>
  </div>
  <div  class="right">
    &#10095;
  </div>
  <div class="slide-control">
    <img src="images/play.svg" alt="">
  </div>
  <div class="circle-control">

  </div>
</div>
```
### Необхідний CSS
```css
* {
    box-sizing: border-box;
}

.wrapper {
    width: 400px;
    display: grid;
    grid-template-columns: 7% 1fr 7%;
    grid-template-rows: 1fr 40px;
    margin-bottom: 20px;
}

.left, .right {
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: deepskyblue;
    font-size: 50px;
    color: white;
    cursor: pointer;
    height: 95%;
    width: 100%;
}

.content-item img{
    width: 100%;
    height: 85%;
}

.content-item {
    display: flex;
    flex-wrap: nowrap;
    aspect-ratio: 16 / 9;
    transition: transform 1s;
}

.content {
    overflow: hidden;
}

.circle {
    width: 20px;
    height: 20px;
    border-radius: 50%;
    border: 2px solid black;
}

.circle-control {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 15px;
}

.label {
    text-align: center;
    width: 100%;
}

.active {
    background-color: #00bfff;
    border: 0;
}

.content-title {
    aspect-ratio: 16 / 9;
    display: flex;
    flex-direction: column;
}

.content-title p {
    text-align: center;
    font-size: 20px;
    margin:  5px 0;
}

.left:hover, .right:hover {
    background-color: #9bd4e6;
    font-size: 70px;
}

.slide-control {
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #00bfff;
    height: 30px;
    width: 30px;
    margin: 0 auto;
}
```

### Код JavaScript
```javascript
import {Slider} from "./Slider.js";

const imagesList = [
  'wallpaperflare.com_wallpaper.jpg',
  'wallpaperflare.com_wallpaper (1).jpg',
  'wallpaperflare.com_wallpaper (2).jpg',
  'wallpaperflare.com_wallpaper (3).jpg',
  'wallpaperflare.com_wallpaper(5).jpg'
];

const imagesText = [
  'Картинка пляж',
  'Картинка гори',
  'Картинка поле',
  'Картинка кіт',
  'Картинка монах'
];

const slider = new Slider({
  slideId: 'slider',
  images: imagesList,
  text: imagesText,
  timeSlider: 3,
  isCircleHidden: true,
  isButtonPlaying: true,
  primaryColor: 'coral',
});

```

## Опис коду
- **`Slider`** — клас наповнює слайдер зображеннями, описом та елементами керування.
- **Конструктор** приймає декілька параметрів:
- **`slideId`** — приймає id блоку слайдера, обов`язковий параметр.
- **`images`** — приймає колекцію зображень яку треба відобразити, обов`язковий параметр.
- **`text`** — приймає текст опису зображень яку треба відобразити, обов`язковий параметр.
- **`timeSlider`** — затримка при автоматичному перегортанні в секундах, за замовчуванням 2 сек. 
- **`isCircleHidden`** — відповідає за приховування точок навігації, за замовчуванням false - відображати.
- **`isButtonPlaying`** — відповідає за приховування кнопки автоматичного перегортання, за замовчуванням false - відображати.
- **`primaryColor`** вказати свій колір для елементів керування.

## Автор
Федоров Сергій

