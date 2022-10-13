// const charming = require('charming')
gsap.registerPlugin(ScrollTrigger)

var menuOpened = false
var imgSlidePos = 1

// var tlHomeProjects = new TimelineMax({onUpdate:updatePercentage})

const controller = new ScrollMagic.Controller({refreshInterval:10})

var tlHomeHeroIn= new TimelineMax()

var scHomeHeroIn = ScrollTrigger.create({
    animation: tlHomeHeroIn,
    trigger: ".section-hero",
    // markers: true,
    start: "-10px top",
})

var tlHomeHeroOut = new TimelineMax()

var scHomeHeroOut = ScrollTrigger.create({
    animation: tlHomeHeroOut,
    trigger: ".section-hero",
    // markers: true,
    start: "bottom 80%",
    end: "bottom 40%",
    scrub: true
})

var tlHomeWhatwedo = new TimelineMax()

var whatwedoScroll = ScrollTrigger.create({
    animation: tlHomeWhatwedo,
    trigger: ".section-whatwedo",
    // markers: true,
    start: "top top",
    scrub: true,
    pin: true
})
$('.section-hero h1').lettering()
// var element = document.querySelector(".section-hero h1")
// charming(element)
tlHomeHeroIn.from('.space-canvas',2, {opacity:0})
tlHomeHeroIn.staggerFrom('.section-hero h1 span',1.5, {x:10, y:50, opacity:0, ease:Back.easeOut.config(1.7)}, 0.01)
tlHomeHeroIn.from('.divider',1,{width:1, opacity:0})
tlHomeHeroIn.from('h2',1,{y:10, opacity:0}, "-=0.8")

tlHomeHeroOut.to('.section-hero',1, {opacity:0})
$('.section-heading h4').lettering()
// var projectsScroll = ScrollTrigger.create({scrub: true})

var tlHomeProjects = new TimelineMax()


 var projectsScroll = ScrollTrigger.create({
        animation: tlHomeProjects,
        trigger: ".section-projects",
        // markers: true,
        start: "top 70%",
        end: "top 20%",
        scrub: true
    })


tlHomeProjects.staggerFrom('.section-heading h4 span',2, {x:60, opacity:0}, 0.1)
// tlHomeProjects.set(['.grid__item--left','.grid__item--center','.grid__item--right'], {x:0, opacity:1})
tlHomeProjects.from('.grid__item--left' ,1, {x:200, opacity:0}, "-=1")
tlHomeProjects.from('.grid__item--center' ,1, {x:200, opacity:0}, "-=0.8")
tlHomeProjects.from('.grid__item--right' ,1, {x:200, opacity:0}, "-=0.8") 

for(var i=1; i<=7; i++){
    tlHomeWhatwedo.to(`.section-whatwedo .img-${i}`,1, {opacity: "1", },"-=1")
    tlHomeWhatwedo.to(`.section-whatwedo .cont-${i}`,1, {y: "0%", opacity: "1", },"-=1")
    tlHomeWhatwedo.to(`.section-whatwedo .li-${i} p`,1, {fontSize: "2rem", fontWeight: "600", paddingRight: "10px", })
    tlHomeWhatwedo.to(`.section-whatwedo .li-${i} span`,1, {height: "3px", width: "60px", opacity: "1", },"-=1")
    if(i!=7){
        tlHomeWhatwedo.to(`.section-whatwedo .li-${i} p`,1, {fontSize: "1rem", fontWeight: "400", paddingRight: "25px", },"+=2")
        tlHomeWhatwedo.to(`.section-whatwedo .li-${i} span`,1, {height: "1px", width: "40px", opacity: "0.4", },"-=1")
        tlHomeWhatwedo.to(`.section-whatwedo .cont-${i}`,1, {y: "-100%", opacity: "0", },"-=1")
        tlHomeWhatwedo.to(`.section-whatwedo .img-${i}`,1, {opacity: "0", },"-=1")
    }
}


// function updatePercentage(){
//     tlHomeProjects.progress()
//     console.log(tlHomeProjects.progress())
// }

$('.menu-icon').mouseenter(function(){
    console.log('mouse enter')
    var menuIconHover = new TimelineMax()
    menuIconHover.to(
        ['.menu-icon span:nth-child(1)', '.menu-icon span:nth-child(4)'],
        0.3,
        {scale: 0}
    )
    menuIconHover.to(
        '.menu-icon span:nth-child(2)',
        0.3,
        {y: 17}
    )
    menuIconHover.to(
        '.menu-icon span:nth-child(3)',
        0.3,
        {y: -17}
    )
    menuIconHover.to(
        '.menu-icon span:nth-child(1)',
        0,
        {x: 17}
    )
    menuIconHover.to(
        '.menu-icon span:nth-child(4)',
        0,
        {x: -17}
    )
    menuIconHover.to(
        ['.menu-icon span:nth-child(1)', '.menu-icon span:nth-child(4)'],
        0.3,
        {scale: 1}
    )
})

$('.menu-icon').mouseleave(function(){
    var menuIconHover = new TimelineMax()
    menuIconHover.to(
        '.menu-icon span',
        0.3,
        {x: 0, y:0, scale:1},
        1
    )
})

$('.menu-icon').on('click', function(){
    
    if(menuOpened){
        var menuIconClick = new TimelineMax()
        menuIconClick.to('main', 0.5, {x:0})
        console.log("menu-closed")
        menuOpened = false
    }
    else{
        var menuIconClick = new TimelineMax()
        menuIconClick.to('main', 0.5, {x:-520})
        menuIconClick.to('li',0, {opacity:1})
        menuIconClick.staggerFrom('li a',0.5, {y:30, opacity:0},0.1)
        console.log("menu-opened")
        menuOpened = true
    }

})



$('.interaction div').on('click', function(){
    console.log($(this).data("dir"))
    if($(this).data("dir")=="right"){
        var nextImgSlidePos = ((imgSlidePos+1) > 3)? 1 : (imgSlidePos+1)
        var slideImg = new TimelineMax()

        slideImg.to(`.section-aboutus .img-holder .img-${nextImgSlidePos}`, 0, {left: "100%"})
        slideImg.to(`.section-aboutus .img-holder .img-${imgSlidePos}`, 0.8, {left: "-100%", ease: Back.easeOut.config(1.7)})
        slideImg.to(`.section-aboutus .img-holder .img-${nextImgSlidePos}`, 0.8, {left:"0", ease: Back.easeOut.config(1.7)}, "-=0.8")

        imgSlidePos = nextImgSlidePos
    }
    else{
        var prevImgSlidePos = ((imgSlidePos+1) > 3)? 1 : (imgSlidePos+1)
        var slideImg = new TimelineMax()

        slideImg.to(`.section-aboutus .img-holder .img-${prevImgSlidePos}`, 0, {left: "-100%"})
        slideImg.to(`.section-aboutus .img-holder .img-${imgSlidePos}`, 0.8, {left: "100%", ease: Back.easeOut.config(1.7)})
        slideImg.to(`.section-aboutus .img-holder .img-${prevImgSlidePos}`, 0.8, {left: "0%", ease: Back.easeOut.config(1.7)}, "-=0.8")

        imgSlidePos = prevImgSlidePos
    }
})


//submit button glow
const button = document.querySelector("button");

button.addEventListener("mousemove", (e) => {
  const { x, y, width, height} = button.getBoundingClientRect();
  console.log(x, y, width, height)
  if((e.clientX > x && e.clientX < x+width)&&(e.clientY > y && e.clientY < y+height)){
      button.style.setProperty("--x", e.clientX - x);
    }
});

// $(document).ready(function(){
//     createProjectsScroll()
// })