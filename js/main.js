let add_btn = document.querySelector('.add_bank');
let popup = document.querySelector('.popup');
let close_btn = document.querySelector('.close_container');
let tooltip_container = document.querySelector('.tooltip_hover');
let tooltip = document.querySelector('.tooltip');

window.addEventListener('load', function() {
    add_btn.addEventListener('click', function() {
        popup.classList.add('visible');
    });
    close_btn.addEventListener('click', function() {
        popup.classList.remove('visible');
    }); 
});