// Удаляет элементы с указанными классами
const removeElementsByClass = (formElem, arr) => {
  const elements = formElem.querySelectorAll(arr);

  for (const element of elements) {
    element.remove();
  }
};

// Удаляет атрибуты style у элементов формы
const removeStyleAttributes = (formElem) => {
  const elements = [...formElem.querySelectorAll("[style]"), formElem];

  for (const element of elements) {
    element.removeAttribute("style");
  }
};

// Отключает таблицы стилей по умолчанию
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

// Удаляет Custom CSS
const removeCustomStyles = (formElem) => {
  const tag = formElem.querySelector("style");

  if (tag) {
    tag.remove();
  }
};

// Если внутри .mktoFormRow есть два элемента .mktoFormCol, то .mktoFormRow становится флекс-контейнером
const setRowFlexContainer = (formElem) => {
  const rows = formElem.querySelectorAll(".mktoFormRow");

  for (const row of rows) {
    const cols = row.querySelectorAll(".mktoFormCol");

    if (cols.length === 2) {
      row.classList.add("mktoFormFlexRow");
    }
  }
};

// Исправляет расположение текста относительно type="checkbox" / type="radio"
const setCheckboxListFlexContainer = (formElem) => {
  const checkboxes = formElem.querySelectorAll(".mktoCheckboxList");

  for (const checkbox of checkboxes) {
    checkbox.classList.add("mktoCheckboxListFlexRow");
  }
};

// Добавляет текст из label в атрибут placeholder у элементов формы
const addPlaceholders = (formElem) => {
  const elements = formElem.querySelectorAll(".mktoField.mktoHasWidth");

  for (const element of elements) {
    const label = formElem.querySelector(`[for=${element.id}]`);

    if (!element.placeholder) {
      element.placeholder = label.textContent.replace(/[*:]/g, "");
    }
  }
};

// Добавляет кнопки инкремента/декремента к полю с типом number
const customInputNumber = (formElem) => {
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

if ("MktoForms2" in window) {
  MktoForms2.whenRendered((form) => {
    const formElem = form.getFormElem()[0];
    const classNames = [".mktoAsterix", ".mktoClear", ".mktoGutter", ".mktoOffset"];

    removeElementsByClass(formElem, classNames);
    removeStyleAttributes(formElem);
    removeStyleSheets();
    removeCustomStyles(formElem);
    setRowFlexContainer(formElem);
    setCheckboxListFlexContainer(formElem);
    addPlaceholders(formElem);
    customInputNumber(formElem);
  });
}
