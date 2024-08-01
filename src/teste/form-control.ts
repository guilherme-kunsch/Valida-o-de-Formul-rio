import isEmail from "validator/lib/isEmail";

const SHOW_ERROR_MESSAGES = "show-error-message";

const form = document.querySelector(".form") as HTMLFormElement;
const username = document.querySelector(".username") as HTMLInputElement;
const email = document.querySelector(".email") as HTMLInputElement;
const password = document.querySelector(".password") as HTMLInputElement;
const password2 = document.querySelector(".password2") as HTMLInputElement;

form.addEventListener("submit", function (event: Event) {
  event.preventDefault();
  hideErrorMessages(this);
  checkForEmptyFields(username, email, password, password2);
  checkEmail(email);
  checkEqualPasswords(password, password2);
  checkLengthPasswords(password, password2);
  if (shouldSendForm(this)) form.submit();
});

function checkForEmptyFields(...inputs: HTMLInputElement[]): void {
  inputs.forEach((input) => {
    if (!input.value) showErrorMessage(input, "Campo não pode ficar vazio");
  });
}

function checkEmail(input: HTMLInputElement) {
  if (!isEmail(input.value)) showErrorMessage(input, "Email inválido");
}

function checkEqualPasswords(
  password: HTMLInputElement,
  password2: HTMLInputElement
) {
  if (password.value !== password2.value) {
    showErrorMessage(password, "Senhas não coincidem");
    showErrorMessage(password2, "Senhas não coincidem");
  }
}

function checkLengthPasswords(
  password: HTMLInputElement,
  password2: HTMLInputElement
) {
    if(password.value.length < 8 && password2.value.length < 8){
        showErrorMessage(password, 'Senha precisa 8 caracteres');
        showErrorMessage(password2, 'Senha precisa 8 caracteres');
    }
}

function hideErrorMessages(form: HTMLFormElement): void {
  form
    .querySelectorAll("." + SHOW_ERROR_MESSAGES)
    .forEach((item) => item.classList.remove(SHOW_ERROR_MESSAGES));
}

function showErrorMessage(input: HTMLInputElement, msg: string): void {
  const formFields = input.parentElement as HTMLDivElement;
  const erroMessage = formFields.querySelector(
    ".error-message"
  ) as HTMLSpanElement;
  erroMessage.innerText = msg;
  formFields.classList.add(SHOW_ERROR_MESSAGES);
}

function shouldSendForm(form: HTMLFormElement): boolean {
  let send = true;
  form
    .querySelectorAll("." + SHOW_ERROR_MESSAGES)
    .forEach(() => (send = false));
  return send;
}
