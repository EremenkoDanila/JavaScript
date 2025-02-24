window.onload = function () {
  let a = ''; // Первое число
  let b = ''; // Второе число
  let selectedOperation = null; // Выбранная операция

  const outputElement = document.getElementById("result");

  function updateScreen(value) {
    outputElement.innerHTML = value;
  }

  // Обработка цифровых кнопок (включая точку)
  document.querySelectorAll('[id^="btn_digit_"]').forEach(button => {
    button.onclick = function () {
      const digitValue = button.innerText;

      // Если операция ещё не выбрана, работаем с первым числом
      if (!selectedOperation) {
        // Предотвращаем ввод нескольких точек
        if (digitValue === '.' && a.includes('.')) return;
        a += digitValue;
        updateScreen(a);
      } else {
        // Если операция выбрана – работаем со вторым числом
        if (digitValue === '.' && b.includes('.')) return;
        b += digitValue;
        updateScreen(b);
      }
    };
  });

  // Обработчики для операций
  document.getElementById("btn_op_plus").onclick = function () {
    if (a === '') return;
    selectedOperation = '+';
  };

  document.getElementById("btn_op_minus").onclick = function () {
    if (a === '') return;
    selectedOperation = '-';
  };

  document.getElementById("btn_op_mult").onclick = function () {
    if (a === '') return;
    selectedOperation = 'x';
  };

  document.getElementById("btn_op_div").onclick = function () {
    if (a === '') return;
    selectedOperation = '/';
  };

  document.getElementById("btn_sircul").onclick = function () {
    if (a === '') return;
    selectedOperation = '(+)';
  };

  // Кнопка "C" - сброс
  document.getElementById("btn_op_clear").onclick = function () {
    a = '';
    b = '';
    selectedOperation = null;
    updateScreen("0");
  };

  // Кнопка процента "%"
  document.getElementById("btn_op_percent").onclick = function () {
    if (selectedOperation && b !== '') {
      b = (parseFloat(b) / 100).toString();
      updateScreen(b);
    } else if (a !== '') {
      a = (parseFloat(a) / 100).toString();
      updateScreen(a);
    }
  };
  
// Кнопка изменения знака "+/-"
document.getElementById("btn_op_sign").onclick = function () {
  if (selectedOperation && b !== '') {
    b = (-parseFloat(b)).toString();
    updateScreen(b);
  } else if (a !== '') {
    a = (-parseFloat(a)).toString();
    updateScreen(a);
  }
};

  // Кнопка "=" - вычисление результата
  document.getElementById("btn_op_equal").onclick = function () {
    if (a === '' || b === '' || !selectedOperation) return;

    let result;
    switch (selectedOperation) {
      case '+':
        result = parseFloat(a) + parseFloat(b);
        break;
      case '-':
        result = parseFloat(a) - parseFloat(b);
        break;
      case 'x':
        result = parseFloat(a) * parseFloat(b);
        break;
      case '(+)':
          result = (parseFloat(a) + parseFloat(b)) % 16;
          break;
      case '/':
        if (parseFloat(b) === 0) {
          updateScreen("Ошибка");
          a = '';
          b = '';
          selectedOperation = null;
          return;
        }
        result = parseFloat(a) / parseFloat(b);
        break;
      default:
        return;
    }

    // После вычисления результат становится первым числом
    a = result.toString();
    b = '';
    selectedOperation = null;
    updateScreen(a);
  };
};




document.getElementById("theme-toggle").addEventListener("click", function () {
document.body.classList.toggle("light-theme");

const thinTextElements = document.querySelectorAll(".thin-text");
if (document.body.classList.contains("light-theme")) {
    this.textContent = "☀️";
    thinTextElements.forEach(el => el.style.color = "black");
    document.getElementById("theme-toggle").style.backgroundColor = "rgb(38, 38, 38)";
} else {
    this.textContent = "🌙";
    thinTextElements.forEach(el => el.style.color = "white");
    document.getElementById("theme-toggle").style.backgroundColor = "white";
}
});


