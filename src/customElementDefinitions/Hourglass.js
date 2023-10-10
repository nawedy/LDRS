import reflect from '../lib/reflect'
import applyDefaultProps from '../lib/applyDefaultProps'
import styles from './Hourglass.scss'

const template = document.createElement('template')

export default class Hourglass extends HTMLElement {
  static get observedAttributes() {
    return ['size', 'color', 'speed', 'bg-opacity']
  }

  constructor() {
    super()
    if (!this.shadow) {
      this.shadow = this.attachShadow({ mode: 'open' })
    }
    reflect(this, ['size', 'color', 'speed', 'bg-opacity'])
  }

  connectedCallback() {
    applyDefaultProps(this, {
      size: 40,
      color: 'black',
      speed: 1.75,
      'bg-opacity': 0.1,
    })

    template.innerHTML = `
      <div class="container">
        <div class="half"></div>
        <div class="half"></div>
      </div>
      <style>
        :host{
          --uib-size: ${this.size}px;
          --uib-color: ${this.color};
          --uib-speed: ${this.speed}s;
          --uib-bg-opacity: ${this['bg-opacity']};
        }
        ${styles}
      </style>
    `

    this.shadow.replaceChildren(template.content.cloneNode(true))
  }

  attributeChangedCallback() {
    const styleEl = this.shadow.querySelector('style')

    if (!styleEl) return

    styleEl.innerHTML = `
      :host{
        --uib-size: ${this.size}px;
        --uib-color: ${this.color};
        --uib-speed: ${this.speed}s;
        --uib-bg-opacity: ${this['bg-opacity']};
      }
      ${styles}
    `
  }
}
