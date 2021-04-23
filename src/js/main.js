const nav = document.querySelector('.nav')
const logo = document.querySelector('.logo')
window.addEventListener('scroll', fixNav)

function fixNav(){
    if(window.scrollY > nav.offsetHeight + 150) {
        nav.classList.add('nav-active');
        logo.classList.add('logo-black');
    } else {
        nav.classList.remove('nav-active');
        logo.classList.remove('logo-black');
    }
}  


/* to top  */

$(document).ready(function(){   
    $(window).scroll(function () {
        if ($(this).scrollTop() > 500) {
            $('#scroller').fadeIn();
        } else {
            $('#scroller').fadeOut();
        }
    });
    $('#scroller').click(function () {
        $('body,html').animate({
            scrollTop: 0
        }, 400);
        return false;
    });

    new WOW().init();
});