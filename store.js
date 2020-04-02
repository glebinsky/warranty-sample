import { post } from '/fetch.js'

export {
  SubscriptionDataMap,
  subscribe,
  unsubscribe
}


const storeData = {}
const subscriptions = {}

const SubscriptionDataMap = {
  WARRANTY_OFFERS: 'WARRANTY_OFFERS',
  PRODUCT: 'PRODUCT'
}

const dataGetters = {
  WARRANTY_OFFERS: getWarrantyOffers,
  PRODUCT: getProduct
}

function subscribe(name, fn) {
  if(!SubscriptionDataMap[name]) return Promise.reject()

  if(!subscriptions[name]){
    subscriptions[name] = new Map()
  }
  if(typeof fn === 'function') {
    subscriptions[name].set(fn)
  }

  if(storeData[name]) {
    fn(storeData[name])
    return Promise.resolve()
  } else {
    return dataGetters[name]()
      .then(data => storeAndPublish(name, data))
      .catch(e => console.log(name, e))
  }
}

function unsubscribe(name, fn) {
  subscriptions[name].delete(fn)
}

function storeAndPublish(name, newData) {
  if(JSON.stringify(newData) === JSON.stringify(storeData[name])) return

  storeData[name] = newData
  subscriptions[name].forEach((value, key) => key(storeData[name]))
}


function getWarrantyOffers() {
  let promise = Promise.resolve()

  if(!storeData[SubscriptionDataMap.PRODUCT]) {
    promise = subscribe(SubscriptionDataMap.PRODUCT)
  }

  return promise.then(() =>
    post('https://partner-staging.getmulberry.com/api/get_personalized_warranty', { product: storeData[SubscriptionDataMap.PRODUCT] })
  )
}

function getProduct() {
  return Promise.resolve({
    "id":"SOFA-36",
    "price":"300.99",
    "title":"Amazing Blue Sofa",
    "mulberry_category":"furniture"
  })
}

if(true){
  const interval = setTimeout(() => getWarrantyOffers().then(data => storeAndPublish(SubscriptionDataMap.WARRANTY_OFFERS, [...data,...data,...data,...data,...data])), 1000)
  setTimeout(() => unsubscribe(SubscriptionDataMap.WARRANTY_OFFERS, subscriptions[SubscriptionDataMap.WARRANTY_OFFERS].entries().next().value[0]), 10000)
  // setTimeout(() => clearInterval(interval), 15000)
}