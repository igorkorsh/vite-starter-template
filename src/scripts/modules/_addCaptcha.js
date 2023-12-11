const GOOGLE_RECAPTCHA_SITE_KEY = "6Lf2eUQUAAAAAC-GQSZ6R2pjePmmD6oA6F_3AV7j";

export const addCaptcha = (form) => {
  if (!grecaptcha) return;

  const formElem = form.getFormElem()[0];
  const div = document.createElement("div");
  const buttonRow = formElem.querySelector(".mktoButtonRow");
  const button = buttonRow ? buttonRow.querySelector(".mktoButton") : null;

  div.id = `g-recaptcha-${form.getId()}`;
  div.classList.add("googleRecaptcha");

  const handleButtonClick = () => {
    const response = grecaptcha && grecaptcha.getResponse();

    if (form.validate()) {
      if (!response) {
        div.setAttribute("data-error", "true");
      } else {
        div.setAttribute("data-error", "false");

        form.addHiddenFields({
          reCAPTCHAFormResponse: response,
        });

        form.submit();
      }
    }
  };

  if (button) {
    button.setAttribute("data-om-cta", "form");
    button.addEventListener("click", handleButtonClick);
  }

  if (buttonRow) {
    formElem.insertBefore(div, buttonRow);
  }

  if (grecaptcha.render) {
    grecaptcha.render(div, {
      sitekey: GOOGLE_RECAPTCHA_SITE_KEY,
    });
  }
};
