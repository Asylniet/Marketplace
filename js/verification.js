let inputs = document.querySelectorAll('.number');
let countdown = document.querySelector('.countdown');
let again_button = document.querySelector('.send_code_again');
let start = 60;
let running = true;
let verification_code = 123456;

let deleting = false;

let filled = [0, 0, 0, 0, 0, 0];

function send_code_again() {
    countdown.innerHTML = start;
    start--;
    if (start == 0) {
        running = false;
        countdown.parentElement.classList.remove('visible');
        countdown.parentElement.classList.add('invisible');
        again_button.classList.remove('disabled');
        again_button.classList.add('active');
        again_button.addEventListener('click', function(e) {
            e.preventDefault();
            if(running == false) {
                again_button.classList.remove('active');
                again_button.innerHTML = 'Код был отправлен повторно';
                setTimeout(function() {
                    running = true;
                    start = 60;
                    countdown.innerHTML = start;
                    again_button.innerHTML = 'Отправить код повторно';
                    countdown.parentElement.classList.remove('invisible');
                    countdown.parentElement.classList.add('visible');
                    again_button.classList.add('disabled');
                }, 5000);
            }
        });
    }
}

window.addEventListener('load', function() {
    inputs[0].focus();
    let checker = arr => arr.every(v => v === 1);
    inputs.forEach(function(input, index) {
        input.addEventListener('input', function() {
            document.querySelector('.error').classList.remove('visible');
            if (input.value.length < 1) {
                filled[index] = 0
            } else {
                filled[index] = 1
            }

            if (input.value.length == 1) {
                if (index != inputs.length - 1) {
                    inputs[index + 1].focus();
                }
            } else if (input.value.length > 1) {
                value = input.value[1];
                input.value = input.value.substr(0, input.value.length - 1);
                inputs[index + 1].value = value;
                inputs[index + 2].focus();
            }

            checker(filled) ? document.querySelector('button').removeAttribute('disabled') : document.querySelector('button').setAttribute('disabled', '');
        });
        let pressed = 0;
        input.onkeydown = function(event) {
            var key = event.keyCode || event.charCode;
            
            if (input.value.length == 0 && key == 8) {
                pressed++;
            }
            if( key == 8 && pressed == 1){
                pressed = 0;
                if(index != 0) {
                    inputs[index - 1].focus();
                }
            }
        };
    });


    setInterval(function() {
        send_code_again();
    }, 1000);

    if (document.querySelector('.error_phone') == null) {
        document.querySelector('form').addEventListener('submit', function(e){
            let code = '';
            inputs.forEach(function(input) {
                code += input.value;
            });
            if (parseInt(code) != verification_code) {
                e.preventDefault();
                document.querySelector('.error').classList.add('visible');
                document.querySelector('button').classList.add('button_error');
                document.querySelector('button').setAttribute('disabled', '');
                inputs.forEach(function(input) {
                    input.value = '';
                });
                setTimeout(function() {
                    document.querySelector('button').classList.remove('button_error');
                }, 300);
                filled = [0, 0, 0, 0, 0, 0];
                inputs[0].focus();
            }
        }); 
    }
})