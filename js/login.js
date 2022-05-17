errors = [false, false, true];
let button = document.querySelector('button');
let phone_input = document.getElementById('phone');
let password_input = document.getElementById('password');
let password_check_input = document.getElementById('password2');
let eye_icon = document.getElementById('eye');

let deleting = false;

let phone = '+7 (778) 703 98 50';
let password = 'Yerke';

function buttonCheck() {
    if(password_check_input != null) {
        password_input.value != password_check_input.value ? errors[2] = false : errors[2] = true;
    }
    if(errors[0] == true && errors[1] == true && errors[2] == true) {
        button.removeAttribute('disabled');
        document.querySelector('.error').classList.remove('visible');
    } else {
        if(errors[2] == true) {
            document.querySelector('.error').classList.remove('visible');
        } else if (password_check_input.value.length > 0){ 
            document.querySelector('.error').classList.add('visible');
        }
        button.setAttribute('disabled', '');
    }
}

window.addEventListener('load', function() {
    phone_input.onkeydown = function(event) {
        const key = event.key;
        key == "Backspace" ? deleting = true : deleting = false;
    };

    phone_input.addEventListener('input', function() {
        let phone_value = phone_input.value;
        if (phone_value.length > 0 && deleting == false) {
            if (phone_value.length == 1) {
                phone_value == '8' ? phone_input.value = '+7 (' : phone_input.value = `+7 (${phone_value}`;
            } else if (phone_value.length == 7) {
                phone_input.value += ') ';
            } else if (phone_value.length == 12 || phone_value.length == 15) {
                phone_input.value += ' ';
            }else if (phone_value.length > 18) {
                phone_input.value = phone_value.substr(0, phone_value.length - 1);
            }
            errors[0] = true;
        } else if (phone_value.length > 0 && deleting == true) {
            if (phone_value.length == 4) {
                phone_input.value = '';
            } else if (phone_value.length == 8) {
                phone_input.value = phone_value.substr(0, phone_value.length - 2);
            } else if (phone_value.length == 12 || phone_value.length == 15) {
                phone_input.value = phone_value.substr(0, phone_value.length - 1);
            }
        } else {
            errors[0] = false;
        }

        buttonCheck();
    });

    password_input.addEventListener('input', function() {
        if (password_input.value.length > 0) {
            errors[1] = true;
        } else {
            errors[1] = false;
        }

        buttonCheck();
    })

    if(password_check_input != null) {
        password_check_input.addEventListener('input', function() {
            buttonCheck();
        })
    }

    eye_icon.parentElement.addEventListener('click', function() {
        if (password_input.getAttribute('type') == 'password') {
            eye_icon.setAttribute('src', '/assets/icons/eye-open.svg');
            password_input.setAttribute('type', 'text');
        } else {
            eye_icon.setAttribute('src', '/assets/icons/eye-closed.svg');
            password_input.setAttribute('type', 'password');
        }
    });

    if (password_check_input == null) {
        document.querySelector('form').addEventListener('submit', function(e){
            if (password_input.value != password || phone_input.value != phone) {
                e.preventDefault();
                document.querySelector('.error').classList.add('visible');
                document.querySelector('button').classList.add('button_error');
                password_input.value = '';
                phone_input.value = '';
                setTimeout(function() {
                    document.querySelector('button').classList.remove('button_error');
                }, 300);
                errors = [false, false];
                buttonCheck();
            }
        }); 
    }
})