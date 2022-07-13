errors = [false, false];  //for [pass, pass2]
password_strength = [false, false, false, false, false]; // for [small, big, number, spec_char, length]
let button = document.querySelector('button');
let password_input = document.getElementById('password');
let password_check_input = document.getElementById('password2');
let eye_icon = document.getElementById('eye');

function password_check() {
    tips = document.querySelector('.tips ul').children;
    value = password_input.value;
    value.search(/[a-z]/) >= 0 ? password_strength[0] = true : password_strength[0] = false;
    value.search(/[A-Z]/) >= 0 ? password_strength[1] = true : password_strength[1] = false;
    value.search(/[0-9]/) >= 0 ? password_strength[2] = true : password_strength[2] = false;
    value.search(/[!@#$%^&*]/) >= 0 ? password_strength[3] = true : password_strength[3] = false;
    value.length >= 10 ? password_strength[4] = true : password_strength[4] = false;

    password_strength[0] == true ? tips[0].classList.add('checked') : tips[0].classList.remove('checked');
    password_strength[1] == true ? tips[1].classList.add('checked') : tips[1].classList.remove('checked');
    password_strength[2] == true ? tips[2].classList.add('checked') : tips[2].classList.remove('checked');
    password_strength[3] == true ? tips[3].classList.add('checked') : tips[3].classList.remove('checked');
    password_strength[4] == true ? tips[4].classList.add('checked') : tips[4].classList.remove('checked');
    let checker = arr => arr.every(v => v === true);

    if(checker(password_strength)) {
        errors[0] = true;
        password_input.parentElement.setAttribute('valid', '');
    } else {
        errors[0] = false;
        password_input.parentElement.removeAttribute('valid');
    }
}

function buttonCheck() {
    if (password_input.value != password_check_input.value){
        errors[1] = false;
        if(password_check_input.value.length > 0) {
            document.querySelector('.error').classList.add('visible');
        }
        password_check_input.parentElement.removeAttribute('valid');
    }  else {
        document.querySelector('.error').classList.remove('visible');
        errors[1] = true;
        password_check_input.parentElement.setAttribute('valid', '');
    }
    
    if(errors[0] == true && errors[1] == true) {
        button.removeAttribute('disabled');
    } else {
        button.setAttribute('disabled', '');
    }
}

password_input.addEventListener('input', function() {
    password_check();
    document.querySelector('.error').classList.remove('visible');
    buttonCheck();
})

password_check_input.addEventListener('input', function() {
    buttonCheck();
});

password_input.addEventListener('focus', function() {
    document.querySelector('.tips').setAttribute('opened', '');
});

password_input.addEventListener('focusout', function() {
    document.querySelector('.tips').removeAttribute('opened');
});

eye_icon.parentElement.addEventListener('mousedown', function(e) {
    e.preventDefault();
    if (password_input.getAttribute('type') == 'password') {
        eye_icon.setAttribute('src', '/assets/icons/eye-open.svg');
        password_input.setAttribute('type', 'text');
    } else {
        eye_icon.setAttribute('src', '/assets/icons/eye-closed.svg');
        password_input.setAttribute('type', 'password');
    }
});