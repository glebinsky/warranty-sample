import BaseComponent from '/base-component.js'

import CoverageDetails from '/modules/coverage-details.js'
customElements.define('coverage-details', CoverageDetails)

export default class Offer extends BaseComponent {
  constructor(...args) {
    const self = super('modules/offer.css', ...args)
    return self
  }

  connectedCallback() {
    this.data = JSON.parse(this.getAttribute('data'))
    this.innerHTML = null
    this.append(this.render())
  }

  render() {
    const {
      duration_months,
      cost,
      service_type,
      coverage_details
    } = this.data

    const fragment = new DocumentFragment()

    const duration = document.createElement('h3')
    duration.innerText = `${duration_months} Month`
    fragment.append(duration)

    const price = document.createElement('h4')
    price.innerText = `$${cost}`
    fragment.append(price)

    const serviceType = document.createElement('p')
    serviceType.innerText = service_type
    fragment.append(serviceType)

    const coverageDetails = document.createElement('coverage-details')
    coverageDetails .setAttribute('data', JSON.stringify(coverage_details))
    fragment.append(coverageDetails)

    return fragment
  }
}