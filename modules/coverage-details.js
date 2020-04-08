import BaseComponent from '/base-component.js'

export default class CoverageDetails extends BaseComponent {
  constructor(...args){
    const self = super('modules/coverage-details.css', ...args)
    this.observer = new MutationObserver(this.expandDetailsList.bind(this))
    this.observer.observe(this, { attributes: true })
  }

  connectedCallback() {
    this.article = document.createElement('article')
    this.article.style.height = 0
    this.article.style.overflow = 'hidden'

    const data = JSON.parse(this.getAttribute('data'))
    const [details] = data
    this.shortList = this.renderDetailsList(details.short, 'short-list')
    this.longList = this.renderDetailsList(details.long, 'long-list')

    this.innerHTML = null
    this.append(this.article)
  }

  renderDetailsList(list, className) {
    const listWrapper = document.createElement('ul')
    listWrapper.className = className
    list.forEach(detail => {
      const listItem = document.createElement('li')
      listItem.innerText = detail
      listWrapper.append(listItem)
    })
    this.article.prepend(listWrapper)
    return listWrapper
  }

  expandDetailsList(mutationList, observer) {
    mutationList.forEach(mutation => {
      if(this.hasAttribute('expanded')) {
        this.article.style.height = this.longList.clientHeight + this.shortList.clientHeight + 'px'
      } else {
        this.article.style.height = 0
      }
    })
  }
}