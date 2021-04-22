const nav = document.querySelector('.nav')
window.addEventListener('scroll', fixNav)

function fixNav(){
    if(window.scrollY > nav.offsetHeight + 150) {
        nav.classList.add('nav-active')
    } else {
        nav.classList.remove('nav-active')
    }
}  