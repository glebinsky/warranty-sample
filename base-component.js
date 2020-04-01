export default class BaseComponent extends HTMLElement {
  constructor(stylesheetPath, ...args){
    const self = super(...args)
    this.addStyles(stylesheetPath)
    return self
  }

  disconnectedCallback() {
    this.removeStyles()
  }

  addStyles(stylesheetPath) {
    this.stylesLink = document.head.querySelector(`link[rel="stylesheet"][href="${stylesheetPath}"]`)
    if(this.stylesLink) {
      return
    }

    this.stylesLink = document.createElement('link')
    this.stylesLink.rel = 'stylesheet'
    this.stylesLink.href = stylesheetPath
    document.head.append(this.stylesLink)
  }

  removeStyles() {
    if(document.querySelector(this.localName)) return

    document.head.removeChild(this.stylesLink)
  }
}