const input = document.querySelector("#text_area");
const btn_number = document.querySelectorAll(".button-number");
const btn_sinal = document.querySelectorAll(".calc-button-sinal");
const btn_calcular = document.querySelector("#calc_button_calcular");
const btn_limpar = document.querySelector("#calc_button_limpar");
const resultado = document.querySelector("#res");

// Confere se tem letra
text_area.addEventListener("input", () => {
  let verificarValue = input.value;
  //
  if (isNaN(verificarValue)) {
    //Instrução para remover caractere
    const removeCarac = input.value.slice(0, -1);
    input.value = removeCarac;
  }
});

btn_number.forEach((button, index) => {
  // uso o proprio index para servir como numero para as somas
  let i = ++index;

  button.addEventListener("click", () => {
    let firstNumber = input.value;

    // Valida se o ultimo botao foi clicado
    if (i >= 10) {
      // Confere se o primeiro numero é 0
      if (firstNumber == "0") {
        input.value = 0;
      } else {
        input.value += 0;
      }
    } else {
      // Basicamente não deixo o 0 se repetir sendo o primeiro caractere
      if (firstNumber == "0") {
        input.value = i;
      } else {
        input.value += i;
      }
    }
  });
});

btn_sinal.forEach((button, index) => {
  button.addEventListener("click", () => {
    if (input.value.length > 0) {
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
          const removeCarac = input.value.slice(0, -1);
          input.value = removeCarac;
          resultado.innerHTML = "";
          break;
        case 6:
          input.value += ".";
          break;
        default:
          input.value = "Error";
      }
    }
  });
});

btn_limpar.addEventListener("click", () => {
  input.value = "";
  resultado.textContent = "";
});

function Soma() {
  try {
    // Captura a expressão
    let exp = /\d+([.,]\d)?|\*|\/|\+|\-|\%/g;
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
          res += numero;
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
        case "%":
          res = (parseFloat(arrayValues[i - 1]) * numero) / 100;
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

btn_calcular.addEventListener("click", Soma);
