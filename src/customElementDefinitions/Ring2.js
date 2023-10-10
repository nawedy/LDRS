import reflect from '../lib/reflect'
import applyDefaultProps from '../lib/applyDefaultProps'
import styles from './Ring2.scss'

const template = document.createElement('template')

export default class Ring2 extends HTMLElement {
  static get observedAttributes() {
    return ['size', 'color', 'stroke', 'speed', 'bg-opacity']
  }

  constructor() {
    super()
    if (!this.shadow) {
      this.shadow = this.attachShadow({ mode: 'open' })
    }
    reflect(this, ['size', 'color', 'stroke', 'speed', 'bg-opacity'])
  }

  connectedCallback() {
    applyDefaultProps(this, {
      size: 40,
      color: 'black',
      stroke: 5,
      speed: 0.7,
      'bg-opacity': 0.1,
    })

    template.innerHTML = `
      <svg
        class="container"
        viewBox="${this.size / 2} ${this.size / 2} ${this.size} ${this.size}"
        height="${this.size}"
        width="${this.size}"
      >
        <circle 
          class="track"
          cx="${this.size}" 
          cy="${this.size}" 
          r="${this.size / 2 - this.stroke / 2}" 
          stroke-width="${this.stroke}px" 
          fill="none" 
        />
        <circle 
          class="car"
          cx="${this.size}" 
          cy="${this.size}" 
          r="${this.size / 2 - this.stroke / 2}" 
          pathlength="100" 
          stroke-width="${this.stroke}px" 
          fill="none" 
        />
      </svg>
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
    const svgEl = this.shadow.querySelector('svg')
    const circleEls = this.shadow.querySelectorAll('circle')

    if (!styleEl) return

    svgEl.setAttribute('height', this.size)
    svgEl.setAttribute('width', this.size)
    svgEl.setAttribute(
      'viewBox',
      `${this.size / 2} ${this.size / 2} ${this.size} ${this.size}`,
    )

    circleEls.forEach((circleEl) => {
      circleEl.setAttribute('cx', this.size)
      circleEl.setAttribute('cy', this.size)
      circleEl.setAttribute('r', this.size / 2 - this.stroke / 2)
      circleEl.setAttribute('stroke-width', this.stroke)
    })

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
