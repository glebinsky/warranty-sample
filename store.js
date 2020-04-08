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
    .then(data => [...data, ...data, ...data, ...data])
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

/*
[{
    "cost": "50.80",
    "coverage_details": [{
      "long": [
        "Stains from food/beverage and human/pet bodily fluids",
        "Rips & tears",
        "Seam separation",
        "Burn or heat marks (up to one inch in length)",
        "Breakage of frames",
        "Any electrical components",
        "Defects in materials or workmanship",
        "Normal wear and tear",
        "Repair or replacement for your damaged product",
        "Coverage begins day one of purchase"
      ],
      "short": [
        "Stains, rips & tears",
        "Seam separation",
        "Burn & heat marks",
        "Frame breakage"
      ]
    }],
    "created_date": "2020-03-30 20:51:13.638747+00:00",
    "customer_cost": "50.80",
    "duration_months": "36",
    "external_product_id": null,
    "id": "7034",
    "mb_category": "furniture",
    "product": {
      "name": "Amazing Blue Sofa",
      "price": "300.99",
      "retailer": {
        "company_name": null,
        "customer_support_email": null,
        "customer_support_phone": null,
        "integration": "custom",
        "retailer_claim_flow": false
      }
    },
    "service_type": "Repair",
    "warranty_hash": "25fc5f156914532cc62eb66c938e872cf6fca595c56b3b199f198deaebfd63b0"
  },
  {
    "cost": "62.47",
    "coverage_details": [{
      "long": [
        "Stains from food/beverage and human/pet bodily fluids",
        "Rips & tears",
        "Seam separation",
        "Burn or heat marks (up to one inch in length)",
        "Breakage of frames",
        "Any electrical components",
        "Defects in materials or workmanship",
        "Normal wear and tear",
        "Repair or replacement for your damaged product",
        "Coverage begins day one of purchase"
      ],
      "short": [
        "Stains, rips & tears",
        "Seam separation",
        "Burn & heat marks",
        "Frame breakage"
      ]
    }],
    "created_date": "2020-03-30 20:51:14.014778+00:00",
    "customer_cost": "62.47",
    "duration_months": "60",
    "external_product_id": null,
    "id": "7035",
    "mb_category": "furniture",
    "product": {
      "name": "Amazing Blue Sofa",
      "price": "300.99",
      "retailer": {
        "company_name": null,
        "customer_support_email": null,
        "customer_support_phone": null,
        "integration": "custom",
        "retailer_claim_flow": false
      }
    },
    "service_type": "Repair",
    "warranty_hash": "e84611aa5ce4c1491b2d46c000842560b81087dd1746a7c3aa2fc2068bf6a93a"
  }
]
*/