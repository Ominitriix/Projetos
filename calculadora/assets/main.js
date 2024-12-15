const input = document.querySelector("#text_area");
const btn_number = document.querySelectorAll(".button-number");
const btn_sinal = document.querySelectorAll(".calc-button-sinal");
const btn_calcular = document.querySelector("#calc_button_calcular");
const btn_limpar = document.querySelector("#calc_button_limpar");
const resultado = document.querySelector("#res");

btn_number.forEach((button, index) => {
  // uso o proprio index para servir como numero para as somas
  let i = ++index;

  button.addEventListener("click", () => {
    // Valida se o ultimo botao foi clicado
    if (i >= 10) {
      // Confere se tem mas de um numero
      if (input.value.length <= 1) {
        input.value = 0;
      } else {
        input.value += 0;
      }
    } else {
      // Basicamente não deixo o 0 se repetir sendo o primeiro caractere
      let firstNumber = input.value.substr(0, 1);

      if (Number(firstNumber) === 0) {
        input.value = i;
      } else {
        input.value += i;
      }
    }
  });
});

btn_sinal.forEach((button, index) => {
  button.addEventListener("click", () => {
    switch (index) {
      case 0:
        input.value += "+";
        break;
      case 1:
        input.value += "-";
        break;
      case 2:
        input.value += "*";
        break;
      case 3:
        input.value += "/";
        break;
      case 4:
        input.value += "%";
        break;
      case 5:
        input.value += ".";
        break;
      default:
        input.value = "Error";
    }
  });
});

btn_limpar.addEventListener("click", () => {
  input.value = "";
  resultado.textContent = "";
});

btn_calcular.addEventListener("click", Soma);

function Soma() {
  try {
    // Captura a expressão
    let exp = /\d+|\*|\/|\+|\-/g;
    let arrayValues = input.value.match(exp);

    // Avisa caso o campo esteja vazio
    if (!arrayValues) throw new Error("Espaço invalido!");

    // Captura o primeiro numero salvo
    let res = parseFloat(arrayValues[0]);

    for (let i = 1; i < arrayValues.length; i += 2) {
      // Organiza as operações
      let operador = arrayValues[i];
      let numero = parseFloat(arrayValues[i + 1]);

      // Identifica e calcula
      switch (operador) {
        case "*":
          res *= numero;
          break;
        case "/":
          res /= numero;
          break;
        case "+":
          res += numero;
          break;
        case "-":
          res -= numero;
          break;

        default:
          throw new Error("Operação não identificada!");
      }
    }
    //
    resultado.innerHTML = res;
  } catch (error) {
    //
    console.log(error);
  }
}
