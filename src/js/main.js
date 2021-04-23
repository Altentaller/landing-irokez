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

/* form validate */


function validateForm(form){
    $(form).validate({
      rules: {
        name: "required",
        tel: "required",
        email: {
          email: true
        }
      },
      messages: {
        name: "Пожалуйста, укажите Ваше имя",
        tel: "Пожалуйста, укажите Ваш телефон",
        email: {
          email: "Неправильно введен адрес почты"
        }
      }
    });      
  };

  validateForm('#main-form form');

  $('input[name=tel]').mask("+7 (999) 999-99-99");//маска поля тел
  
  $('form').submit(function(e){
    e.preventDefault();
    $.ajax({
      type: "POST",
      url: "mailer/smart.php",
      data: $(this).serialize()
    }).done(function(){
          $(this).find("input").val("");
          $(this).find("textarea").val("");
          $('.thanks').fadeIn('slow');
          $('form').trigger('reset');
    });
    return false
  });

/* scroll to links */

$(function(){
    $("a[href^='#']").click(function(){
            var _href = $(this).attr("href");
            $("html, body").animate({scrollTop: $(_href).offset().top+"px"});
            return false;
    });
});

/* scroll to top  */

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