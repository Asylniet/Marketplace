let input = document.querySelector('input');
let button = document.querySelector('button');
let phone_number = '+7 (777) 777 77 77';
let stage = 1;

input.onkeydown = function(event) {
    const key = event.key;
    key == "Backspace" ? deleting = true : deleting = false;
};

input.addEventListener('input', function() {
    document.querySelector('.error_phone').classList.remove('visible');
    if(input.value.length > 18) {
        input.value = input.value.substr(0, input.value.length - 1);
    }
    if(input.value.length == 18) {
        button.removeAttribute('disabled');
    } else {
        button.setAttribute('disabled', '');
    }

    let phone_value = input.value;
    if (phone_value.length > 0 && deleting == false) {
        if (phone_value.length == 1) {
            phone_value == '8' ? input.value = '+7 (' : input.value = `+7 (${phone_value}`;
        } else if (phone_value.length == 7) {
            input.value += ') ';
        } else if (phone_value.length == 12 || phone_value.length == 15) {
            input.value += ' ';
        }else if (phone_value.length > 18) {
            input.value = phone_value.substr(0, phone_value.length - 1);
        }
    } else if (phone_value.length > 0 && deleting == true) {
        if (phone_value.length == 4) {
            input.value = '';
        } else if (phone_value.length == 8) {
            input.value = phone_value.substr(0, phone_value.length - 2);
        } else if (phone_value.length == 12 || phone_value.length == 15) {
            input.value = phone_value.substr(0, phone_value.length - 1);
        }
    }
});

document.querySelector('form').addEventListener('submit', function(e){
    if (stage == 1) {
        e.preventDefault();
        if (input.value != phone_number) {
            document.querySelector('.error_phone').classList.add('visible');
            button.classList.add('button_error');
            input.value = '';
            setTimeout(function() {
                button.classList.remove('button_error');
            }, 300);
            button.setAttribute('disabled', '');
            input.focus();
        } else {
            input.setAttribute('readonly', '');
            stage = 2;
            document.querySelector('.phone_number').innerHTML += input.value;
            document.querySelector('.code_verification_block').setAttribute('opened', '');
            document.querySelector('.countdown_block').setAttribute('opened', '');
            button.setAttribute('disabled', '');
            button.innerHTML = 'Подтвердить';
            start = 60;
            inputs[0].focus();
        }
    } else {
        let code = '';
        inputs.forEach(function(input) {
            code += input.value;
        });
        if (parseInt(code) != verification_code) {
            e.preventDefault();
            document.querySelector('.error').classList.add('visible');
            button.classList.add('button_error');
            button.setAttribute('disabled', '');
            inputs.forEach(function(input) {
                input.value = '';
            });
            setTimeout(function() {
                button.classList.remove('button_error');
            }, 300);
            filled = [0, 0, 0, 0, 0, 0];
            inputs[0].focus();
        }
    }
});