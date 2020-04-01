import {
  SubscriptionDataMap,
  subscribe,
  unsubscribe
} from '/store.js'

import Offer from '/modules/offer.js'
customElements.define('offer-item', Offer)

export default class WarrantyOffers extends HTMLElement {
  constructor(){
    const self = super()
    this.boundRender = this.render.bind(this)
    return self
  }

  connectedCallback() {
    subscribe(SubscriptionDataMap.WARRANTY_OFFERS, this.boundRender)
  }

  disconnectedCallback() {
    unsubscribe(SubscriptionDataMap.WARRANTY_OFFERS, this.boundRender)
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
    const el = document.createElement('header')
    el.innerText = 'Warranty Info'
    return el
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
    offers.forEach(item => {
      const offer = document.createElement('offer-item')
      offer.setAttribute('data', JSON.stringify(item))
      list.append(offer)
    })
    return list
  }
}