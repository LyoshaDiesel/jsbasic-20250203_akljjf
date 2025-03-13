import createElement from "../../assets/lib/create-element.js";

export default class RibbonMenu {
  constructor(categories) {
    this.categories = categories;
    this.elem = this.createRibbonMenu();
  }

  createRibbonMenu() {
    const ribbon = createElement(`
      <div class="ribbon">
       <button class="ribbon__arrow ribbon__arrow_left ">
        <img src="/assets/images/icons/angle-icon.svg" alt="icon">
       </button>
       <nav class="ribbon__inner"></nav>
      <button class="ribbon__arrow ribbon__arrow_right ribbon__arrow_visible">
        <img src="/assets/images/icons/angle-icon.svg" alt="icon">
      </button>
       </div>
      `);

    const ribbonInner = ribbon.querySelector(".ribbon__inner");

    this.categories.forEach((category, index) => {
      const categoryElement = createElement(`
        <a href="#" class="ribbon__item ${
          index === 0 ? "ribbon__item_active" : ""
        }" data-id="${category.id}">${category.name}</a>
        `);

      ribbonInner.append(categoryElement);
    });

    const arrowLeft = ribbon.querySelector(".ribbon__arrow_left");
    const arrowRight = ribbon.querySelector(".ribbon__arrow_right");

    arrowLeft.addEventListener("click", () => {
      ribbonInner.scrollBy(-350, 0);
    });
    arrowRight.addEventListener("click", () => {
      ribbonInner.scrollBy(350, 0);
    });

    ribbonInner.addEventListener("scroll", () => {
      const scrollLeft = ribbonInner.scrollLeft;
      const scrollWidth = ribbonInner.scrollWidth;
      const clientWidth = ribbonInner.clientWidth;
      const scrollRight = scrollWidth - scrollLeft - clientWidth;

      if (scrollLeft === 0) {
        arrowLeft.classList.remove("ribbon__arrow_visible");
      } else {
        arrowLeft.classList.add("ribbon__arrow_visible");
      }

      if (scrollRight < 1) {
        arrowRight.classList.remove("ribbon__arrow_visible");
      } else {
        arrowRight.classList.add("ribbon__arrow_visible");
      }
    });

    ribbonInner.addEventListener("click", (event) => {
      if (event.target.classList.contains("ribbon__item")) {
        event.preventDefault();
      }
      const activeItem = ribbonInner.querySelector(".ribbon_item_active");
      if (activeItem) {
        activeItem.classList.remove("ribbon_item_active");
      }

      event.target.classList.add("ribbon_item_active");
      const categoryId = event.target.dataset.id;
      const customEvent = new CustomEvent("ribbon-select", {
        detail: categoryId,
        bubbles: true,
      });
      ribbon.dispatchEvent(customEvent);
    });
    return ribbon;
  }
}
