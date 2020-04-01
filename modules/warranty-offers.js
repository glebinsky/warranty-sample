import {
  SubscriptionDataMap,
  subscribe,
  unsubscribe
} from "./store.js"

let count = 0

export default class WarrantyOffers extends HTMLElement {
  constructor(){
    super()
    this.boundRender = this.render.bind(this)
  }

  connectedCallback() {
    subscribe(SubscriptionDataMap.WARRANTY_OFFERS, this.boundRender)
  }

  disconnectedCallback() {
    unsubscribe(SubscriptionDataMap.WARRANTY_OFFERS, this.boundRender)
  }

  render(data) {
    console.log(count++)
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