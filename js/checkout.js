const formulario = document.getElementById("formulario");
const inputs = document.querySelectorAll("#formulario input");

const expresiones = {
  names: /^[a-zA-ZÀ-ÿ\s]{3,40}$/, // Letras y espacios, pueden llevar acentos.
  password: /^.{6,15}$/, // 6 a 15 digitos.
  email: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
  phone: /^\d{9,9}$/, // 9 a 14 numeros.
};

const campos = {
  fName: false,
  email: false,
  address: false,
  lastName: false,
  password: false,
  phone: false,
};

const validarFormulario = (e) => {
  switch (e.target.name) {
    case "fName":
      validarCampo(expresiones.names, e.target, "fName");
      break;
    case "email":
      validarCampo(expresiones.email, e.target, "email");
      break;
    case "address":
      validarCampo(expresiones.names, e.target, "address");
      break;
    case "lastName":
      validarCampo(expresiones.names, e.target, "lastName");
      break;
    case "password":
      validarCampo(expresiones.password, e.target, "password");
      break;
    case "phone":
      validarCampo(expresiones.phone, e.target, "phone");
      break;
  }
};

const validarCampo = (expresion, input, campo) => {
  if (expresion.test(input.value)) {
    document
      .getElementById(`cont_${campo}`)
      .classList.remove("formulario__grupo-incorrecto");
    document
      .getElementById(`cont_${campo}`)
      .classList.add("formulario__grupo-correcto");
    document.querySelector(`#cont_${campo} i`).classList.add("fa-check-circle");
    document
      .querySelector(`#cont_${campo} i`)
      .classList.remove("fa-times-circle");
    document
      .querySelector(`#cont_${campo} .formulario__input-error`)
      .classList.remove("formulario__input-error-activo");
    campos[campo] = true;
  } else {
    document
      .getElementById(`cont_${campo}`)
      .classList.add("formulario__grupo-incorrecto");
    document
      .getElementById(`cont_${campo}`)
      .classList.remove("formulario__grupo-correcto");
    document.querySelector(`#cont_${campo} i`).classList.add("fa-times-circle");
    document
      .querySelector(`#cont_${campo} i`)
      .classList.remove("fa-check-circle");
    document
      .querySelector(`#cont_${campo} .formulario__input-error`)
      .classList.add("formulario__input-error-activo");
    campos[campo] = false;
  }
};

inputs.forEach((input) => {
  input.addEventListener("keyup", validarFormulario);
  input.addEventListener("blur", validarFormulario);
});

formulario.addEventListener("submit", (e) => {
  e.preventDefault();

  if (
    campos.fName &&
    campos.email &&
    campos.address &&
    campos.lastName &&
    campos.password &&
    campos.phone
  ) {
    formulario.reset();
    alert("Registro realizado con éxito");
  }
});
