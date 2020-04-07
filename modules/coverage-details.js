import BaseComponent from '/base-component.js'

export default class CoverageDetails extends BaseComponent {
  constructor(...args){
    const self = super('modules/coverage-details.css', ...args)
  }

  connectedCallback() {
    const data = JSON.parse(this.getAttribute('data'))
    const [details] = data

    this.article = document.createElement('article')
    this.renderIcon()

    this.innerHTML = null
    this.append(this.article)

    setTimeout(() => {
      this.renderDetailsList(details.short, 'short-list')
      this.renderDetailsList(details.long, 'long-list')
    }, 1000)
  }

  renderIcon() {
    const toggle = document.createElement('i')
    toggle.addEventListener('click', this.toggleExpand.bind(this))

    toggle.className = 'expand-icon'
    toggle.innerText = '+'

    this.article.append(toggle)
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
  }

  toggleExpand() {
    const className = 'expanded'
    if (this.article.className === className) {
      this.article.className = ''
    } else {
      this.article.className = className
    }
  }
}