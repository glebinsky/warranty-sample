import WarrantyOffers from '/modules/warranty-offers.js'

customElements.define('warranty-offers', WarrantyOffers)

class Mulberry extends HTMLElement {
  connectedCallback() {
    this.append(document.createElement('warranty-offers'))
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