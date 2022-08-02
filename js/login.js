errors = [false, false, true]; //for [phone, pass, pass2]
password_strength = [false, false, false, false, false]; // for [small, big, number, spec_char, length]
let button = document.getElementById("login_btn") || document.querySelector('button');
let name_input = document.getElementById("name");
let phone_input = document.getElementById("phone");
let password_input = document.getElementById("password");
let password_check_input = document.getElementById("password2");
let eye_icon = document.getElementById("eye");

let deleting = false;

let phone = "+7 (777) 777 77 77";
let password = "Asylniet";

function buttonCheck() {
  if (password_check_input != null) {
    password_input.value != password_check_input.value
      ? (errors[2] = false)
      : (errors[2] = true);

    phone_input.value.length == 18
      ? phone_input.parentElement.setAttribute("valid", "")
      : phone_input.parentElement.removeAttribute("valid");

    if (errors[2] == true) {
      document.querySelector(".error").classList.remove("visible");
      password_check_input.parentElement.setAttribute("valid", "");
    } else if (password_check_input.value.length > 0) {
      document.querySelector(".error").classList.add("visible");
      password_check_input.parentElement.removeAttribute("valid");
    }
    password_check_input.value.length == 0
      ? password_check_input.parentElement.removeAttribute("valid")
      : errors;
  }
  if (errors[0] == true && errors[1] == true && errors[2] == true) {
    if (name_input != null) {
      if (name_input.value.length > 0) {
        button.removeAttribute("disabled");
        document.querySelector(".error").classList.remove("visible");
      } else {
        button.setAttribute("disabled", "");
      }
    } else {
      button.removeAttribute("disabled");
      document.querySelector(".error").classList.remove("visible");
    }
  } else {
    button.setAttribute("disabled", "");
  }
}

function password_check() {
  tips = document.querySelector(".tips ul").children;
  value = password_input.value;
  value.search(/[a-z]/) >= 0
    ? (password_strength[0] = true)
    : (password_strength[0] = false);
  value.search(/[A-Z]/) >= 0
    ? (password_strength[1] = true)
    : (password_strength[1] = false);
  value.search(/[0-9]/) >= 0
    ? (password_strength[2] = true)
    : (password_strength[2] = false);
  value.search(/[!@#$%^&*]/) >= 0
    ? (password_strength[3] = true)
    : (password_strength[3] = false);
  value.length >= 10
    ? (password_strength[4] = true)
    : (password_strength[4] = false);

  password_strength[0] == true
    ? tips[0].classList.add("checked")
    : tips[0].classList.remove("checked");
  password_strength[1] == true
    ? tips[1].classList.add("checked")
    : tips[1].classList.remove("checked");
  password_strength[2] == true
    ? tips[2].classList.add("checked")
    : tips[2].classList.remove("checked");
  password_strength[3] == true
    ? tips[3].classList.add("checked")
    : tips[3].classList.remove("checked");
  password_strength[4] == true
    ? tips[4].classList.add("checked")
    : tips[4].classList.remove("checked");
  let checker = (arr) => arr.every((v) => v === true);

  if (checker(password_strength)) {
    errors[1] = true;
    password_input.parentElement.setAttribute("valid", "");
  } else {
    errors[1] = false;
    password_input.parentElement.removeAttribute("valid");
  }
}

window.addEventListener("load", function () {
  if (name_input != null) {
    name_input.addEventListener("input", function () {
      buttonCheck();
    });
  }
  phone_input.onkeydown = function (event) {
    const key = event.key;
    key == "Backspace" ? (deleting = true) : (deleting = false);
  };

  phone_input.addEventListener("input", function () {
    document.querySelector(".error").classList.remove("visible");
    let phone_value = phone_input.value;
    if (phone_value.length > 0 && deleting == false) {
      if (phone_value.length == 1) {
        phone_value == "8"
          ? (phone_input.value = "+7 (")
          : (phone_input.value = `+7 (${phone_value}`);
      } else if (phone_value.length == 7) {
        phone_input.value += ") ";
      } else if (phone_value.length == 12 || phone_value.length == 15) {
        phone_input.value += " ";
      } else if (phone_value.length > 18) {
        phone_input.value = phone_value.substr(0, phone_value.length - 1);
      }
    } else if (phone_value.length > 0 && deleting == true) {
      if (phone_value.length == 4) {
        phone_input.value = "";
      } else if (phone_value.length == 8) {
        phone_input.value = phone_value.substr(0, phone_value.length - 2);
      } else if (phone_value.length == 12 || phone_value.length == 15) {
        phone_input.value = phone_value.substr(0, phone_value.length - 1);
      }
    }

    phone_value.length >= 18 ? (errors[0] = true) : (errors[0] = false);
    buttonCheck();
  });

  if (password_input != null) {
    password_input.addEventListener("input", function () {
      if (password_check_input != null) {
        password_check();
      } else {
        password_input.value.length > 0
          ? (errors[1] = true)
          : (errors[1] = false);
      }
      document.querySelector(".error").classList.remove("visible");
      buttonCheck();
    });
  }

  if (password_check_input != null) {
    password_check_input.addEventListener("input", function () {
      buttonCheck();
    });

    password_input.addEventListener("focus", function () {
      document.querySelector(".tips").setAttribute("opened", "");
    });

    password_input.addEventListener("focusout", function () {
      document.querySelector(".tips").removeAttribute("opened");
    });
  }

  if (eye_icon != null) {
    eye_icon.parentElement.addEventListener("mousedown", function (e) {
      e.preventDefault();
      if (password_input.getAttribute("type") == "password") {
        eye_icon.setAttribute("src", "/assets/icons/eye-open.svg");
        password_input.setAttribute("type", "text");
      } else {
        eye_icon.setAttribute("src", "/assets/icons/eye-closed.svg");
        password_input.setAttribute("type", "password");
      }
    });
  }

  if (password_check_input == null) {
    document
      .getElementById("close_demo")
      .addEventListener("click", function () {
        document.querySelector(".demo_window").classList.add("invisible");
        setTimeout(() => {
          document.querySelector(".demo_window").style.display = "none";
        }, 200);
      });
    document.querySelector("form").addEventListener("submit", function (e) {
      if (password_input.value != password || phone_input.value != phone) {
        e.preventDefault();
        document.querySelector(".error").classList.add("visible");
        button.classList.add("button_error");
        password_input.value = "";
        setTimeout(function () {
          button.classList.remove("button_error");
        }, 300);
        errors = [true, false, true];
        buttonCheck();
        password_input.focus();
      }
    });
  }
});
