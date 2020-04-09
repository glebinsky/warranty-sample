import BaseComponent from '/base-component.js'

import CoverageDetails from '/modules/coverage-details.js'
customElements.define('coverage-details', CoverageDetails)

export default class OfferItem extends BaseComponent {
  constructor(...args) {
    const self = super('modules/offer-item.css', ...args)
    this.observer = new MutationObserver(this.toggleCoverageDetails.bind(this))
    this.observer.observe(this, { attributes: true })
    return self
  }

  connectedCallback() {
    this.data = JSON.parse(this.getAttribute('data'))

    this.section = document.createElement('section')

    this.renderHeader()
    this.renderCoverageDetails()
    this.renderToggleIcon()

    this.innerHTML = null
    this.append(this.section)
  }

  toggleCoverageDetails(mutationList, observer) {
    mutationList.forEach(mutation => {
      if(this.hasAttribute('expanded')) {
        this.coverageDetails.toggleAttribute('expanded', true)
      } else {
        this.coverageDetails.toggleAttribute('expanded', false)
      }
    })
  }

  renderToggleIcon() {
    const div = document.createElement('div')
    div.className = 'icon'
    this.toggleIcon = document.createElement('i')
    this.toggleIcon.innerText = '^'

    div.append(this.toggleIcon)
    this.section.append(div)
  }

  renderCoverageDetails() {
    const { coverage_details } = this.data

    this.coverageDetails = document.createElement('coverage-details')
    this.coverageDetails .setAttribute('data', JSON.stringify(coverage_details))
    this.section.append(this.coverageDetails)
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