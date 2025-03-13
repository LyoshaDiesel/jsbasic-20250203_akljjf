import createElement from "../../assets/lib/create-element.js";

export default class Modal {
  constructor() {
    this.render();
    this.eventListeners();
  }

  render() {
    this.elem = createElement(`
      <div class="modal">
        <div class="modal__overlay"></div>
        <div class="modal__inner">
          <div class="modal__header">
            <button type="button" class="modal__close">
              <img src="/assets/images/icons/cross-icon.svg" alt="close-icon" />
            </button>
            <h3 class="modal__title"></h3>
          </div>
          <div class="modal__body"></div>
        </div>
      </div>
      `);
  }

  eventListeners() {
    this.elem.querySelector(".modal__close").addEventListener("click", () => {
      this.close();
    });
    document.addEventListener("keydown", this.keyEscape);
  }
  keyEscape = (event) => {
    if (event.code === "Escape") {
      this.close();
    }
  };
  open() {
    document.body.append(this.elem);
    document.body.classList.add("is-modal-open");
  }
  setTitle(title) {
    this.elem.querySelector(".modal__title").textContent = title;
  }
  setBody(node) {
    const body = this.elem.querySelector(".modal__body");
    body.innerHTML = "";
    body.append(node);
  }
  close() {
    document.removeEventListener("keydown", this.keyEscape);
    document.body.classList.remove("is-modal-open");
    this.elem.remove();
  }
}
