
export class Slider {

  currentSlide = 0;
  isSlidePlaying = false;
  timerId;
  startX = 0;
  endX = 0;
  threshold = 50;


  constructor(params) {
    if(!params.slideId) {
      throw new Error('Slider ID not specified!');
    }

    if(!Array.isArray(params.images) || params.images.length === 0) {
      throw new Error('No images to display!');
    }

    if(!Array.isArray(params.text) || params.text.length === 0) {
      throw new Error('No description for images!');
    }

    const defaultParams = {
      slideId: '',
      images: [],
      text: [],
      timeSlider: 2,
      isCircleHidden: false,
      isButtonPlaying: false,
      primaryColor: '#00bfff',
    }

    const options = {
      ...defaultParams,
      ...params,
    }

    this.sliderId = `#${options.slideId}`;
    this.slideCont = options.images.length;
    this.imagesList = options.images;
    this.imagesText = options.text;
    this.timeSlider = options.timeSlider;
    this.isCircleHidden = options.isCircleHidden;
    this.isButtonPlaying = options.isButtonPlaying;
    this.primaryColor = options.primaryColor;

    this.bindElements();
    this.createElementDom();

  }

  bindElements() {
    this.nextButton = document.querySelector(`${this.sliderId} .right`);
    this.prevButton = document.querySelector(`${this.sliderId} .left`);
    this.containerElement = document.querySelector(`${this.sliderId} .content-item`);
    this.circleElement = document.querySelector(`${this.sliderId} .circle-control`);
    this.bottomElement = document.querySelector(`${this.sliderId} .slide-control`);
  }

  createCircles () {
    if(!this.isCircleHidden) {
      let newBlock = '';
      for (let i = 0; i < this.slideCont; i++) {
        newBlock += `<div class="circle" data-count="${i}"></div>`;
      }
      document.getElementsByClassName('circle-control')[0].innerHTML = newBlock;
      document.querySelector(`${this.sliderId} div[data-count = "0"]`).classList.add('active');
      document.querySelector(`${this.sliderId} div[data-count = "0"]`).style.background = this.primaryColor;
    }
  }

  createImages() {
    let resultHtml = '';
    this.imagesList.forEach((image, index) => {
      resultHtml += `
       <div id="content" class="content-title">
                <img src="images/${image}" alt="">
                <p>${this.imagesText[index]}</p>
            </div>
       `
    })
    this.containerElement.innerHTML = resultHtml;
  }

  createElementDom () {
    this.createImages();
    this.createCircles();
    this.creatingSubscriber();
    this.imageElement = document.querySelector('img');

    if(this.isButtonPlaying) {
       document.querySelector(`${this.sliderId} .slide-control`).remove();
    } else{
      document.querySelector(`${this.sliderId} .slide-control`).style.background = this.primaryColor;
    }
    document.querySelector(`${this.sliderId} .right`).style.background = this.primaryColor;
    document.querySelector(`${this.sliderId} .left`).style.background = this.primaryColor;
    this.nextButton.style.height = this.imageElement.offsetHeight + 'px';
    this.prevButton.style.height = this.imageElement.offsetHeight + 'px';
  }

  updateCircleActive() {
    if(!this.isCircleHidden) {
      const activeElement = document.querySelector('#slider .active');
      activeElement.classList.remove('active');
      activeElement.style.background = 'none';
      const newActiveElement = document.querySelector(`${this.sliderId} div[data-count = "${this.currentSlide}"]`);
      newActiveElement.classList.add('active');
      newActiveElement.style.background = this.primaryColor;
    }
  }

  slideRight() {
    this.currentSlide ++;
    if(this.currentSlide === this.slideCont){
      this.currentSlide = 0;
    }
    this.containerElement.style.transform = 'translateX(-'+this.imageElement.offsetWidth * this.currentSlide+'px)';
    this.updateCircleActive ();
  }

  slideLeft() {
    this.currentSlide --;
    if(this.currentSlide <0){
      this.currentSlide = 4;
    }
    this.containerElement.style.transform = 'translateX(-'+this.imageElement.offsetWidth * this.currentSlide+'px)';
    this.updateCircleActive() ;
  }

  startPauseSlide (event) {
    if(this.isSlidePlaying){
      clearInterval(this.timerId);
      this.bottomElement.innerHTML = '<img src="images/play.svg" alt="">';
      this.isSlidePlaying = false;
    } else {
      this.timerId = setInterval(this.slideRight.bind(this), 1000 * this.timeSlider);
      this.bottomElement.innerHTML = '<img src="images/pause.svg" alt="">';
      this.isSlidePlaying = true;
    }
  }

  handleSwipe() {
    if (this.startX - this.endX > this.threshold) {
      this.slideRight();
    } else if (this.endX - this.startX > this.threshold) {
      this.slideLeft();
    }
  }

  onCircleClick (event) {
    if (event.target.classList.contains('circle-control')) {
      return;
    }
    this.currentSlide  = event.target.dataset.count;
    this.containerElement.style.transform = 'translateX(-'+this.imageElement.offsetWidth * this.currentSlide+'px)';
    this.updateCircleActive();
  }

  creatingSubscriber () {
    this.nextButton.addEventListener('click', this.slideRight.bind(this));
    this.prevButton.addEventListener('click', this.slideLeft.bind(this));
    this.circleElement.addEventListener('click', this.onCircleClick.bind(this));
    window.addEventListener('resize', () => {
      this.containerElement.style.transform = 'translateX(-'+this.imageElement.offsetWidth * this.currentSlide+'px)';
      this.updateCircleActive();
      this.nextButton.style.height = this.imageElement.offsetHeight + 'px';
      this.prevButton.style.height = this.imageElement.offsetHeight + 'px';
    });

    document.addEventListener('keydown', (e) => {
      if (e.key.toLocaleLowerCase() === 'arrowright') {
        this.slideRight();
      } else if (e.key.toLocaleLowerCase() === 'arrowleft') {
        this.slideLeft();
      }
    });
    this.bottomElement.addEventListener('click', event => {
      this.startPauseSlide(event);
    });
    this.containerElement.addEventListener('touchstart', (e) => {
      this.startX = e.touches[0].clientX;
    });
    this.containerElement.addEventListener('touchend', (e) => {
      this.endX = e.changedTouches[0].clientX;
      this.handleSwipe();
    });
  }
}