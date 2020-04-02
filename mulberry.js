import WarrantyOffers from '/modules/warranty-offers.js'
import BaseComponent from '/base-component.js'

customElements.define('warranty-offers', WarrantyOffers)

class Mulberry extends BaseComponent {
  constructor(...args) {
    const self = super('mulberry.css', ...args)
    return self
  }

  connectedCallback() {
    this.append(this.createHeader())
    this.append(document.createElement('warranty-offers'))
  }

  disconnectedCallback() {
    this.removeAllMulberryStyles()
  }

  createHeader() {
    const header = document.createElement('h1')
    header.innerText = 'Mulberry'
    return header
  }

  removeAllMulberryStyles() {
    document.head.querySelectorAll('.mulberry-link').forEach(link => link.remove())
  }

}

customElements.define('mulberry-app', Mulberry)