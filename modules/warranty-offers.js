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
    this.boundRender = this.render.bind(this)
    return self
  }

  connectedCallback() {
    subscribe(SubscriptionDataMap.WARRANTY_OFFERS, this.boundRender)
  }

  disconnectedCallback() {
    unsubscribe(SubscriptionDataMap.WARRANTY_OFFERS, this.boundRender)
    this.removeStyles()
  }

  count = 0
  render(data) {
    console.log(this.count++)
    const fragment = new DocumentFragment()
    fragment.append(this.createHeader())
    fragment.append(this.createMain(data))
    this.innerHTML = null
    this.append(fragment)
  }

  createHeader() {
    const header = document.createElement('header')
    const heading = document.createElement('h2')
    heading.innerText = 'Warranty Offers'
    header.append(heading)
    return header
  }

  createMain(offers) {
    const main = document.createElement('main')
    if(!offers.length) {
      const p = document.createElement('p')
      p.innerText = 'No offers available'
      main.append(p)
      return main
    }

    main.append(this.createOffers(offers))
    return main
  }

  createOffers(offers) {
    const list = document.createElement('ul')
    list.className = 'offer-list'
    offers.forEach(item => {
      const offer = document.createElement('offer-item')
      offer.setAttribute('data', JSON.stringify(item))
      list.append(offer)
    })
    return list
  }
}