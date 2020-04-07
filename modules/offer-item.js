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

    this.section = document.createElement('section')
    this.renderHeader()
    this.renderCoverageDetails()

    this.innerHTML = null
    this.append(this.section)
  }

  renderCoverageDetails() {
    const { coverage_details } = this.data

    const coverageDetails = document.createElement('coverage-details')
    coverageDetails .setAttribute('data', JSON.stringify(coverage_details))
    this.section.append(coverageDetails)
  }

  renderHeader() {
    const {
      duration_months,
      cost,
      service_type,
    } = this.data

    const header = document.createElement('div')
    header.className = 'offer-header'

    const duration = document.createElement('h3')
    duration.className = 'duration'
    duration.innerText = `${duration_months} Months`
    header.append(duration)

    const serviceType = document.createElement('h3')
    serviceType.className = 'service-type'
    serviceType.innerText = service_type
    header.append(serviceType)

    const price = document.createElement('h3')
    price.className = 'price'
    price.innerText = `$${cost}`
    header.append(price)

    this.section.prepend(header)
  }
}