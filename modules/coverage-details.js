import BaseComponent from '/base-component.js'

export default class CoverageDetails extends BaseComponent {
  constructor(...args){
    const self = super('modules/coverage-details.css', ...args)
    this.boundExpand = this.expand.bind(this)
    this.boundCollapse = this.collapse.bind(this)
  }

  connectedCallback() {
    this.data = JSON.parse(this.getAttribute('data'))
    this.renderShortList()
  }

  renderShortList() {
    const [details] = this.data
    const fragment = new DocumentFragment()

    const detailsList = this.createDetailsList(details.short)
    detailsList.className = 'short-list'
    fragment.append(detailsList)

    const toggle = document.createElement('i')
    toggle.className = 'expand-icon'
    toggle.innerText = '+'

    toggle.addEventListener('click', this.boundExpand)
    fragment.append(toggle)

    this.innerHTML = null
    this.append(fragment)
  }

  renderLongListModal() {
    const [details] = this.data

    const longListModal = document.createElement('div')
    longListModal.className = 'long-list-modal'
    longListModal.addEventListener('click', e => e.stopPropagation())

    const toggle = document.createElement('i')
    toggle.className = 'collapse-icon'
    toggle.innerText = 'X'
    toggle.addEventListener('click', this.boundCollapse)
    longListModal.append(toggle)

    const detailsList = this.createDetailsList(details.long)
    detailsList.className = 'long-list'
    longListModal.append(detailsList)

    this.longListWrapper = document.createElement('div')
    this.longListWrapper.className = 'long-list-wrapper'
    this.longListWrapper.addEventListener('click', this.boundCollapse)
    this.longListWrapper.append(longListModal)

    this.append(this.longListWrapper)
  }

  createDetailsList(list) {
    const listWrapper = document.createElement('ul')
    list.forEach(detail => {
      const listItem = document.createElement('li')
      listItem.innerText = detail
      listWrapper.append(listItem)
    })
    return listWrapper
  }

  expand() {
    this.renderLongListModal()
  }

  collapse() {
    this.longListWrapper.remove()
  }
}