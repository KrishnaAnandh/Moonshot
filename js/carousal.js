/**
 * demo.js
 * http://www.codrops.com
 *
 * Licensed under the MIT license.
 * http://www.opensource.org/licenses/mit-license.php
 * 
 * Copyright 2019, Codrops
 * http://www.codrops.com
 */
 {
    const MathUtils = {
        lineEq: (y2, y1, x2, x1, currentVal) => {
            // y = mx + b 
            var m = (y2 - y1) / (x2 - x1), b = y1 - m * x1;
            return m * currentVal + b;
        },
        lerp: (a, b, n) =>  (1 - n) * a + n * b,
        distance: (x1, x2, y1, y2) => {
            var a = x1 - x2;
            var b = y1 - y2;
            return Math.hypot(a,b);
        },
        randomNumber: (min,max) => Math.floor(Math.random()*(max-min+1)+min)
    };

    let winsize;
    const calcWinsize = () => winsize = {width: window.innerWidth, height: window.innerHeight};
    calcWinsize();
    window.addEventListener('resize', calcWinsize);

    const getMousePos = (ev) => {
        let posx = 0;
        let posy = 0;
        if (!ev) ev = window.event;
        if (ev.pageX || ev.pageY) {
            posx = ev.pageX;
            posy = ev.pageY;
        }
        else if (ev.clientX || ev.clientY) 	{
            posx = ev.clientX + body.scrollLeft + docEl.scrollLeft;
            posy = ev.clientY + body.scrollTop + docEl.scrollTop;
        }
        return {x: posx, y: posy};
    }

    let mousePos = {x: winsize.width/2, y: winsize.height/2};
    window.addEventListener('mousemove', ev => mousePos = getMousePos(ev));

    class Slide {
        constructor(el) {
            this.DOM = {el: el};
            
            this.DOM.number = this.DOM.el.querySelector('.number');
            this.DOM.subtitle = this.DOM.el.querySelector('.caption');
            this.DOM.imgWrap = this.DOM.el.querySelector('.img-wrap');
            this.DOM.img = this.DOM.imgWrap.querySelector('.img');
        }
        move(direction, val) {
            return new Promise((resolve, reject) => {
                const tx = direction === 'left' ? '+=' + val*-1 : '+=' + val;
                const duration = 1.2;
                
                new TimelineMax({onComplete: resolve})
                .to(this.DOM.imgWrap, duration, {
                    x: tx,
                    ease: Quart.easeInOut
                }, 0)
                .to(this.DOM.imgWrap, duration*.5, {
                    scaleX: 1.3,
                    ease: Quart.easeIn
                }, 0)
                .to(this.DOM.imgWrap, duration*.5, {
                    scaleX: 1,
                    ease: Quart.easeOut
                }, duration*.5) 
                .to(this.DOM.number, duration*.95, {
                    x: tx,
                    ease: Quint.easeInOut
                }, 0)
                .to(this.DOM.subtitle, duration*1.1, {
                    x: tx,
                    ease: Quart.easeInOut
                }, 0)
            });
        }
        setCenter() {
            this.isCenter = true;
            this.DOM.el.classList.add('grid__item--center');
            TweenMax.set([this.DOM.el], {opacity: 1});
            
        }
        setRight() {
            this.isRight = this.isCenter = false;
            this.isLeft = true;
            this.DOM.el.classList.add('grid__item--right');
            TweenMax.set([this.DOM.el], {opacity: 1});
            
        }
        setLeft() {
            this.isLeft = this.isCenter = false;
            this.isRight = true;
            this.DOM.el.classList.add('grid__item--left');
            TweenMax.set([this.DOM.el], {opacity: 1});
            
        }
        reset() {
            TweenMax.set([this.DOM.el, this.DOM.imgWrap, this.DOM.number, this.DOM.subtitle], {transform: 'none'});
            TweenMax.set([this.DOM.el], {opacity: 0});
            this.DOM.el.classList = 'grid__item grid__item--slide';
            
        }
        animateElementsOut(contentItem) {
            return new Promise((resolve, reject) => {
                const time = MathUtils.randomNumber(0,100)/500;
                this.elemsTimeline = new TimelineMax({onComplete: resolve})
                .to(this.DOM.number, 1, {
                    y: -500,
                    opacity: 0,
                    ease: Quart.easeInOut
                }, time+0.3)
                .to(this.DOM.imgWrap, 0.8, {
                    y: -500,
                    opacity: 0,
                    ease: Quart.easeInOut
                }, time+0.4)
                .to(this.DOM.imgWrap, .4, {
                    scaleX: 0.95,
                    scaleY: 1.4,
                    ease: Quart.easeIn
                }, time+0.4)
                .to(this.DOM.imgWrap, .4, {
                    scaleX: 1,
                    scaleY: 1,
                    ease: Quart.easeOut
                }, time+0.4 + 0.4)
                .to(this.DOM.subtitle, 1, {
                    y: -500,
                    opacity: 0,
                    ease: Quart.easeInOut
                }, time+0.5);

                if ( this.isCenter ) {
                    const contentItemTitle = contentItem.querySelector('.content__item-header-title');
                    const contentItemImg = contentItem.querySelector('.img--content');
                    this.elemsTimeline.to(contentItemTitle, 0.8, {
                        ease: Expo.easeOut,
                        startAt: {y: '100%', opacity: 0, rotation: -16},
                        y: '0%',
                        rotation: 0,
                        opacity: 1
                    }, time+1.3)
                    .set(contentItemImg, {scale: 1.2}, 0)
                    .to(contentItemImg, 0.8, {
                        ease: Expo.easeOut,
                        scale: 1
                    }, time+1.3)
                    
                }
            });
        }
        animateElementsIn(contentItem) {
            return new Promise((resolve, reject) => {
                const time = MathUtils.randomNumber(0,50)/500;
                this.elemsTimeline = new TimelineMax({onComplete: resolve});
                
                if ( this.isCenter ) {
                    const contentItemTitle = contentItem.querySelector('.content__item-header-title');
                    const contentItemImg = contentItem.querySelector('.img--content');
                    this.elemsTimeline.to(contentItemTitle, 1, {
                        ease: Quint.easeOut,
                        y: '50%',
                        opacity: 0
                    }, 0)
                    .to(contentItemImg, 1, {
                        ease: Quint.easeOut,
                        scale: 1.2
                    }, 0)
                    
                }
                this.elemsTimeline.to(this.DOM.subtitle, 0.8, {
                    y: 0,
                    opacity: 1,
                    ease: Quart.easeOut
                }, time)
                .to(this.DOM.imgWrap, 0.8, {
                    y: 0,
                    opacity: 1,
                    scaleX: 1,
                    scaleY: 1,
                    ease: Quart.easeOut
                }, time+0.1)
                .to(this.DOM.number, 0.8, {
                    y: 0,
                    opacity: 1,
                    ease: Quart.easeOut
                }, time+0.2)
            });
        }
    }

    class Slideshow {
        constructor(el) {
            this.DOM = {el: el};
            
            // The slides instances
            this.slides = [];
            [...this.DOM.el.querySelectorAll('.grid__item--slide')].forEach((slide, pos) => this.slides.push(new Slide(slide)));
            // Total number of slides
            this.slidesTotal = this.slides.length;
            if ( this.slidesTotal < 4 ) return;
            // Center slide's position
            this.center = 1;

            // Content Items
            this.DOM.contentItems = [...document.querySelectorAll('.content__item')];

            // Areas (left, center, right) where to attach the navigation events.
            this.DOM.interaction = {
                left: document.querySelector('.grid__item--left'),
                // center: document.querySelector('.grid__item--center'),
                right: document.querySelector('.grid__item--right')
            };
            
            this.setVisibleSlides();
            this.calculateGap();
            this.initEvents();

            let mouseMoveVals = {translationX: 0, translationY: 0, rotation: -8};
            const render = () => {
                //if ( !this.isAnimating ) {
                    mouseMoveVals.translationX = MathUtils.lerp(mouseMoveVals.translationX, MathUtils.lineEq(-15, 15, winsize.width, 0, mousePos.x), 0.03);
                    // mouseMoveVals.translationY = MathUtils.lerp(mouseMoveVals.translationY, MathUtils.lineEq(-15, 15, winsize.height, 0, mousePos.y), 0.03);
                    //mouseMoveVals.rotation = MathUtils.lerp(mouseMoveVals.rotation, MathUtils.lineEq(-8.5, -7.5, winsize.width, 0, mousePos.x), 0.03);
                    // console.log(this.slides[0].DOM.img)
                    for (let i = 0; i <= this.slidesTotal - 1; ++i) {
                        TweenMax.set(this.slides[i].DOM.img, {x: mouseMoveVals.translationX});
                        TweenMax.set(this.slides[i].DOM.img, {y: mouseMoveVals.translationY});
                    }
                //}
                requestAnimationFrame(render);
            }
            requestAnimationFrame(render);
        }
        setVisibleSlides() {
            this.centerSlide = this.slides[this.center];
            this.rightSlide = this.slides[this.center+1 <= this.slidesTotal-1 ? this.center+1 : 0];
            this.leftSlide = this.slides[this.center-1 >= 0 ? this.center-1 : this.slidesTotal-1];
            this.centerSlide.setCenter();
            this.rightSlide.setRight();
            this.leftSlide.setLeft(); 
        }
        // Distance between 2 slides 
        // The amount to translate the elements that move when we navigate the slideshow
        calculateGap() {
            const s1 = this.slides[0].DOM.el.getBoundingClientRect();
            const s2 = this.slides[1].DOM.el.getBoundingClientRect();
            this.gap = MathUtils.distance(s1.left + s1.width/2, s2.left + s2.width/2, s1.top + s1.height/2, s2.top + s2.height/2);
        }
        // Initialize events
        initEvents() {
            this.clickRightFn = () => this.navigate('right');
            this.DOM.interaction.right.addEventListener('click', this.clickRightFn);
            
            this.clickLeftFn = () => this.navigate('left');
            this.DOM.interaction.left.addEventListener('click', this.clickLeftFn);
            
            // this.clickCenterFn = () => this.openSlide();
            // this.DOM.interaction.center.addEventListener('click', this.clickCenterFn);


            this.resizeFn = () => this.calculateGap();
            window.addEventListener('resize', this.resizeFn);

            this.DOM.contentItems.forEach(item => {
                item.querySelector('.img-wrap--content').addEventListener('click', () => this.closeSlide());
            });
        }
        navigate(direction) {
            if ( this.isAnimating ) {
                return false;
            }
            this.isAnimating = true;
            
            const upcomingPos = direction === 'right' ? 
                    this.center < this.slidesTotal-2 ? this.center+2 : Math.abs(this.slidesTotal-2-this.center):
                    this.center >= 2 ? this.center-2 : Math.abs(this.slidesTotal-2+this.center);

            // Update current.
            this.center = direction === 'right' ? 
                    this.center < this.slidesTotal-1 ? this.center+1 : 0 :
                    this.center > 0 ? this.center-1 : this.slidesTotal-1;

            this.upcomingSlide = this.slides[upcomingPos];
            
            // Position upcomingSlide / upcomingTitle
            TweenMax.set(this.upcomingSlide.DOM.el, {x: direction === 'right' ? this.gap*2 : -1*this.gap*2});
            TweenMax.to(this.upcomingSlide.DOM.el, 1, {opacity: 1});
            
            
            const movingSlides = [this.upcomingSlide, this.centerSlide, this.rightSlide, this.leftSlide];
            let promises = [];
            
            movingSlides.forEach(slide => promises.push(slide.move(direction === 'right' ? 'left' : 'right', this.gap)));
            Promise.all(promises).then(() => {
                
                // After all is moved, update the classes of the 3 visible slides and reset styles
                movingSlides.forEach(slide => slide.reset());
                // Set it again
                this.setVisibleSlides();
                
                // createProjectsScroll()
                this.isAnimating = false;
            });
        }
        openSlide() {
            this.toggleSlide('open');
        }
        closeSlide() {
            this.toggleSlide('close');
        }
        toggleSlide(action) {
            if ( this.isAnimating ) {
                return;
            }
            this.isAnimating = true;

            const contentItem = this.DOM.contentItems[this.center];
            // Cursor styles related class
            this.DOM.el.classList[action === 'open' ? 'add' : 'remove']('content-open');

            const movingSlides = [this.centerSlide, this.rightSlide, this.leftSlide];
            let promises = [];
            movingSlides.forEach(slide => promises.push(slide[action === 'open' ? 'animateElementsOut' : 'animateElementsIn'](contentItem)));
            
            if ( action === 'open' ) {
                contentItem.classList.add('content__item--current');
            }
            Promise.all(promises).then(() => {
                if ( action === 'close' ) {
                    contentItem.classList.remove('content__item--current');
                }
                this.isAnimating = false;
            });
        }
    }

    class Revealer {
        constructor(el) {
            this.DOM = {el: el};
            this.DOM.el.style.width = `calc(100vw * ${Math.cos(8 * Math.PI/180)} + 100vh * ${Math.sin(8 * Math.PI/180)})`;
            this.DOM.el.style.height = `calc(100vw * ${Math.sin(8 * Math.PI/180)} + 100vh * ${Math.cos(8 * Math.PI/180)})`;
        }
    }

    // Revealer element
    // const revealer = new Revealer(document.querySelector('.revealer__inner'));
    // Initialize the slideshow
    var slideShow = new Slideshow(document.querySelector('.grid--slideshow'));

    // Preload all the images in the page
    imagesLoaded(document.querySelectorAll('.img'), {background: true}, () => document.body.classList.remove('loading'));
    
    [...document.querySelectorAll('.frame__mode input[type="radio"]')].forEach(radio => radio.addEventListener('click', () => {
        document.body.classList[radio.parentNode.classList.contains('frame__mode-item--dark') ? 'add' : 'remove']('dark-mode');
    }));
}

// $( window ).scroll(function() {
//     var scroll = $(window).scrollTop()
    
//     if(scroll<180 || scroll>600){
        
//         slideShow.center = 1
//         slideShow.slides.forEach(slide => slide.reset())
//         slideShow.setVisibleSlides()
//     }

// })