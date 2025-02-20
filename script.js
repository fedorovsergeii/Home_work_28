'use strict';

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

const imagesMovieList = [
  'aktery-dzhoker_joker-kino-lyudi-19297.jpeg',
  'kino-prizrachnyj_gonschik_ghost_rider-4043.jpeg',
  'kino-reddi_ryuger_freddy_krueger-21227.jpeg',
  'movie-deadpool-736504.jpeg',
  'movie-transformers_age_of_extinction-optimus_prime-337224.jpeg',
  'movie-x_men-hugh_jackman-water_drop-wolverine-250605.jpeg'
];

const imagesMovieText = [
  'Джокер',
  'Примарний вершник',
  'Фредді Крюгер',
  'Дедпул',
  'Оптімус Прайм',
  'Росомаха'
];

const slider = new Slider({
  slideId: 'slider',
  images: imagesList,
  text: imagesText,
  primaryColor: 'coral',
});

const sliderMovie = new Slider({
  slideId: 'sliderMovie',
  images: imagesMovieList,
  text: imagesMovieText,
  isCircleHidden: true,
});

