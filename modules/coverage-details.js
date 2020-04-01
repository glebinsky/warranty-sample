import BaseComponent from '/base-component.js'

export default class CoverageDetails extends BaseComponent {
  constructor(...args){
    const self = super('modules/coverage-details.css', ...args)
    this.expanded = false
    this.boundClickHandler = this.clickHandler.bind(this)
  }

  connectedCallback() {
    this.data = JSON.parse(this.getAttribute('data'))
    this.render()
  }

  render() {
    const [details] = this.data
    const { long, short } = details

    const list = document.createElement('ul')
    const items = this.expanded ? long : short
    items.forEach(detail => {
      const item = document.createElement('li')
      item.innerText = detail
      list.append(item)
    })

    list.addEventListener('click', this.boundClickHandler)

    this.innerHTML = null
    this.append(list)
  }

  clickHandler(){
    this.expanded = !this.expanded
    this.render()
  }
}