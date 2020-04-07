import WarrantyOffers from '/modules/warranty-offers.js'

customElements.define('warranty-offers', WarrantyOffers)

function removeAllMulberryStyles() {
  document.head.querySelectorAll('.mulberry-link').forEach(link => link.remove())
}