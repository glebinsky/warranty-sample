import BaseComponent from '/base-component.js'

import {
  SubscriptionDataMap,
  subscribe,
  unsubscribe
} from '/store.js'

import OfferItem from '/modules/offer-item.js'
customElements.define('offer-item', OfferItem)

export default class WarrantyOffers extends BaseComponent {
  constructor(...args){
    const self = super('modules/warranty-offers.css', ...args)
    return self
  }

  connectedCallback() {
    subscribe(SubscriptionDataMap.WARRANTY_OFFERS, this.render.bind(this))
  }

  disconnectedCallback() {
    unsubscribe(SubscriptionDataMap.WARRANTY_OFFERS, this.render.bind(this))
    this.removeStyles()
    this.offerList.removeEventListener('click', this.toggleExpandedOfferList.bind(this))
  }

  render(data) {
    this.fragment = new DocumentFragment()
    this.createTitle()
    this.createOffers(data)
    this.innerHTML = null
    this.append(this.fragment)
  }

  createTitle() {
    const heading = document.createElement('h2')
    heading.innerText = 'Warranty Offers'
    this.fragment.prepend(heading)
    const hr = document.createElement('hr')
    heading.insertAdjacentElement('afterEnd', hr)
  }

  createOffers(offers) {
    if(!offers.length) {
      const p = document.createElement('p')
      p.innerText = 'No offers available'
      this.fragment.append(p)
      return
    }

    this.offerList = document.createElement('ul')
    this.offerList.className = 'offer-list'
    offers.forEach(item => {
      const li = document.createElement('li')
      const offer = document.createElement('offer-item')
      offer.setAttribute('data', JSON.stringify(item))
      li.append(offer)
      this.offerList.append(li)
    })

    this.fragment.append(this.offerList)

    this.offerList.addEventListener('click', this.toggleExpandedOfferList.bind(this))
  }

  toggleExpandedOfferList(ev) {
    const item = ev.target.closest('offer-item')
    item.toggleAttribute('expanded')
  }

}