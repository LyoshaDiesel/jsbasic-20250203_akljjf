export default class StepSlider {
  constructor({ steps, value = 0 }) {
    this.steps = steps;
    this.value = value;

    this.elem = this.createSlider();
    this.addEventListeners();
  }

  createSlider() {
    const slider = document.createElement("div");
    slider.classList.add("slider");

    const thumb = document.createElement("div");
    thumb.classList.add("slider__thumb");
    thumb.innerHTML = `<span class="slider__value">${this.value}</span>`;
    slider.append(thumb);

    const progress = document.createElement("div");
    progress.classList.add("slider__progress");
    slider.append(progress);

    const sliderSteps = document.createElement("div");
    sliderSteps.classList.add("slider__steps");
    for (let i = 0; i < this.steps; i++) {
      const step = document.createElement("span");
      if (i === this.value) {
        step.classList.add("slider__step-active");
      }
      sliderSteps.append(step);
    }
    slider.append(sliderSteps);

    return slider;
  }

  addEventListeners() {
    this.elem.addEventListener("click", (event) => {
      const left = event.clientX - this.elem.getBoundingClientRect().left;
      const leftRelative = left / this.elem.offsetWidth;
      const segments = this.steps - 1;
      const approximateValue = leftRelative * segments;
      const value = Math.round(approximateValue);

      if (value !== this.value) {
        this.value = value;
        this.updateSlider();
        this.emitSliderChange();
      }
    });
  }

  updateSlider() {
    const thumb = this.elem.querySelector(".slider__thumb");
    const progress = this.elem.querySelector(".slider__progress");
    const sliderValue = this.elem.querySelector(".slider__value");
    const sliderSteps = this.elem.querySelectorAll(".slider__steps span");

    const valuePercents = (this.value / (this.steps - 1)) * 100;

    thumb.style.left = `${valuePercents}%`;
    progress.style.width = `${valuePercents}%`;
    sliderValue.textContent = this.value;

    sliderSteps.forEach((step, index) => {
      step.classList.toggle("slider__step-active", index === this.value);
    });
  }

  emitSliderChange() {
    const event = new CustomEvent("slider-change", {
      detail: this.value,
      bubbles: true,
    });
    this.elem.dispatchEvent(event);
  }
}
