import * as ol from 'openlayers'
export class RotateSouth extends ol.control.Control {
  constructor(opts?) {
    console.log(opts)
    let button = document.createElement('button')
    button.innerHTML = 'N'
    let element = document.createElement('div')
    element.className = 'rotate-north ol-unselectable ol-control'
    element.append(button)
    let options = opts || {}
    button.addEventListener('click', () => {
      this.handler()
    })
    super({
      element: element,
      target: options.target
    })
  }

  handler() {
    this.getMap()
      .getView()
      .setRotation(Math.PI)
  }
}
