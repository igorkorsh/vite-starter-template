export const deStyleMarketo = (form) => {
  const formElem = form.getFormElem()[0];

  const removeElementsByClass = (arr) => {
    const elements = formElem.querySelectorAll(arr);

    for (const element of elements) {
      element.remove();
    }
  };

  const removeStyleAttributes = () => {
    const elements = [...formElem.querySelectorAll("[style]"), formElem];

    for (const element of elements) {
      element.removeAttribute("style");
    }
  };

  const removeStyleSheets = () => {
    const styleSheets = [...document.styleSheets];

    for (const styles of styleSheets) {
      if (styles.ownerNode.id.includes("mktoForms2")) {
        styles.disabled = true;
      }

      const nextElem = styles.ownerNode.nextElementSibling;
      if (nextElem && nextElem.tagName === "STYLE") {
        nextElem.disabled = true;
      }
    }
  };

  const removeCustomStyles = () => {
    const tag = formElem.querySelector("style");

    if (tag) {
      tag.remove();
    }
  };

  const setRowFlexContainer = () => {
    const rows = formElem.querySelectorAll(".mktoFormRow");

    for (const row of rows) {
      const cols = row.querySelectorAll(".mktoFormCol");

      if (cols.length === 2) {
        row.classList.add("mktoFormFlexRow");
      }
    }
  };

  const setCheckboxListFlexContainer = () => {
    const checkboxes = formElem.querySelectorAll(".mktoCheckboxList");

    for (const checkbox of checkboxes) {
      checkbox.classList.add("mktoCheckboxListFlexRow");
    }
  };

  const addPlaceholders = () => {
    const elements = formElem.querySelectorAll(".mktoField.mktoHasWidth");

    for (const element of elements) {
      const label = formElem.querySelector(`[for=${element.id}]`);

      if (!element.placeholder) {
        element.placeholder = label.textContent.replace(/[*:]/g, "");
      }
    }
  };

  const customInputNumber = () => {
    const inputs = formElem.querySelectorAll('input[type="number"]');

    const customizeInput = (element) => {
      const wrapper = element.closest(".mktoFieldWrap");

      const increment = () => {
        const button = document.createElement("button");
        button.dataset.value = "up";

        button.addEventListener("click", (event) => {
          event.preventDefault();

          const oldValue = parseFloat(element.value);
          const maxValue = element.max ? parseFloat(element.max) : Number.MAX_SAFE_INTEGER;
          let newValue;

          if (isNaN(oldValue)) {
            newValue = 1;
          } else if (oldValue >= maxValue) {
            newValue = maxValue;
          } else {
            newValue = oldValue + 1;
          }
          element.value = newValue;
        });

        return button;
      };
      const decrement = () => {
        const button = document.createElement("button");
        button.dataset.value = "down";

        button.addEventListener("click", (event) => {
          event.preventDefault();

          const oldValue = parseFloat(element.value);
          const minValue = element.min ? parseFloat(element.min) : 0;
          let newValue;

          if (isNaN(oldValue)) {
            newValue = minValue;
          } else if (oldValue <= minValue) {
            newValue = minValue;
          } else {
            newValue = oldValue - 1;
          }
          element.value = newValue;
        });

        return button;
      };

      wrapper.classList.add("mktoCustomNumberField");
      wrapper.appendChild(increment());
      wrapper.appendChild(decrement());
    };

    for (const input of inputs) {
      customizeInput(input);
    }
  };

  //
  // Инициализация
  //
  // Удаляет элементы с указанными классами
  removeElementsByClass([".mktoAsterix", ".mktoClear", ".mktoGutter", ".mktoOffset"]);

  // Удаляет атрибуты style у элементов формы
  removeStyleAttributes();

  // Отключает таблицы стилей по умолчанию
  removeStyleSheets();

  // Удаляет Custom CSS
  removeCustomStyles();

  // Если внутри .mktoFormRow есть два элемента .mktoFormCol, то .mktoFormRow становится флекс-контейнером
  setRowFlexContainer();

  // Исправляет расположение текста относительно type="checkbox" / type="radio"
  setCheckboxListFlexContainer();

  // Добавляет текст из label в атрибут placeholder у элементов формы
  addPlaceholders();

  // Добавляет кнопки инкремента/декремента к полю с типом number
  customInputNumber();
};
