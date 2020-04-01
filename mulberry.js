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

  createHeader() {
    const header = document.createElement('h1')
    header.innerText = 'Mulberry'
    return header
  }
}

customElements.define('mulberry-app', Mulberry)

// import { post } from './modules/fetch.js'

// const mockData = {
//   product: {
//     "id":"SOFA-36",
//     "price":"300.99",
//     "title":"Amazing Blue Sofa",
//     "mulberry_category":"furniture"
//   }
// }
// post('https://partner-staging.getmulberry.com/api/get_personalized_warranty', { ...mockData })