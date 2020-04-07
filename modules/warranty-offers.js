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

    const list = document.createElement('ul')
    list.className = 'offer-list'
    offers.forEach(item => {
      const li = document.createElement('li')
      const offer = document.createElement('offer-item')
      offer.setAttribute('data', JSON.stringify(item))
      li.append(offer)
      list.append(li)
    })
/*
    for(let i = 0; ((i + offers.length) % 3) > 0; i++){
      const spacer = document.createElement('li')
      spacer.className = 'offer-item-spacer'
      spacer.setAttribute('aria-hidden', true)
      list.append(spacer)
    }
*/
    this.fragment.append(list)
  }
}