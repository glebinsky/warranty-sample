import { SubscriptionDataMap, subscribe } from "./store.js"

// let count = 0

export default class WarrantyOffers extends HTMLElement {
  connectedCallback() {
    subscribe(SubscriptionDataMap.WARRANTY_OFFERS, this.content.bind(this))
  }

  content(data) {
    // console.log(count++)
    const newFragment = new DocumentFragment()
    newFragment.append(this.createHeader())
    newFragment.append(this.createMain(data))
    this.innerHTML = null
    this.append(newFragment)
  }

  createHeader() {
    const el = document.createElement('header')
    el.innerText = 'Warranty Info'
    return el
  }

  createMain(data) {
    const el = document.createElement('main')
    el.innerHTML = JSON.stringify(data)
    return el
  }
}