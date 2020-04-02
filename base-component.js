export default class BaseComponent extends HTMLElement {
  constructor(stylesheetPath, ...args){
    const self = super(...args)
    this.addComponentStyles(stylesheetPath)
    return self
  }

  addComponentStyles(stylesheetPath) {
    this.stylesLink = document.head.querySelector(`link[rel="stylesheet"][href="${stylesheetPath}"]`)
    if(this.stylesLink) {
      return
    }

    this.stylesLink = document.createElement('link')
    this.stylesLink.rel = 'stylesheet'
    this.stylesLink.href = stylesheetPath
    this.stylesLink.className = 'mulberry-link'
    document.head.append(this.stylesLink)
  }
}