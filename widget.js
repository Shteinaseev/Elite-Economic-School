import { LitElement, html, css } from "https://esm.sh/lit";

class ActivitiesWidget extends LitElement {
    // Types without TypeScript? I guess??
    static properties = {
        count: { type: Number },
        activeActivity: { type: Number }
    };

    constructor() {
        super(); // makes `this` work
        this.activeActivity = 1;
    }

    // DOM-releated stuff needs DOM to be ready.
    connectedCallback() {
        super.connectedCallback();
        this.allActivities = this.querySelectorAll(".activity");
        this.allActivities[0].classList.add("active");
        this.count = this.allActivities.length;
    }

    _makeActive(index) {
        this.allActivities.forEach((activity, i) => {
            activity.classList.remove("active");
        });
        this.allActivities[index].classList.add("active");
        this.classList.add("children-animating");
        this.allActivities[index].addEventListener(
            "animationend",
            () => {
                this.classList.remove("children-animating");
            },
            { once: true }
        );
    }

    _movePrevious(e) {
        this.activeActivity--;
        if (this.activeActivity < 1) {
            this.activeActivity = this.count;
            this._makeActive(this.count - 1);
        } else {
            this._makeActive(this.activeActivity - 1);
        }
    }

    _moveNext(e) {
        this.activeActivity++;
        if (this.activeActivity > this.count) {
            this.activeActivity = 1;
            this._makeActive(0);
        } else {
            this._makeActive(this.activeActivity - 1);
        }
    }

    // Light DOM!
    createRenderRoot() {
        return this;
    }

    // Inject additional stuff into DOM (stays Light DOM), and allow Lit-style reactivity and event handling.
    render() {
        return html`
      <div class="activities-count">${this.activeActivity}/${this.count}</div>

      <nav class="activities-navigation">
        <button aria-label="previous" @click="${this._movePrevious}">⭠</button>
        <button aria-label="next" @click="${this._moveNext}">⭢</button>
      </nav>
    `;
    }
}

customElements.define("activities-widget", ActivitiesWidget);
