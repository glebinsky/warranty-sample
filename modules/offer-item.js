import BaseComponent from '/base-component.js'

import CoverageDetails from '/modules/coverage-details.js'
customElements.define('coverage-details', CoverageDetails)

export default class OfferItem extends BaseComponent {
  constructor(...args) {
    const self = super('modules/offer-item.css', ...args)
    return self
  }

  connectedCallback() {
    this.data = JSON.parse(this.getAttribute('data'))
    this.render()
  }

  render() {
    const {
      duration_months,
      cost,
      service_type,
      coverage_details
    } = this.data

    const fragment = new DocumentFragment()
    const header = document.createElement('div')
    header.className = 'offer-header'

    const duration = document.createElement('h3')
    duration.className = 'duration'
    duration.innerText = `${duration_months} Month`
    header.append(duration)

    const price = document.createElement('h3')
    price.className = 'price'
    price.innerText = `$${cost}`
    header.append(price)

    fragment.append(header)

    const serviceType = document.createElement('h3')
    serviceType.className = 'service-type'
    serviceType.innerText = service_type
    fragment.append(serviceType)

    const coverageDetails = document.createElement('coverage-details')
    coverageDetails .setAttribute('data', JSON.stringify(coverage_details))
    fragment.append(coverageDetails)

    this.innerHTML = null
    this.append(fragment)
  }
}