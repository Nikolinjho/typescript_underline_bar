interface Vector<T> {
  width: T;
  left: T;
}

class NavUnderlineAnimation {
  private target: HTMLElement;
  private container: HTMLElement;
  
  private initialIndex: number;

  private containerCoordsRect: Vector<number>

  constructor(private context: string, private selector: string = 'underline-js', initialIndex: number = 2) {
    this.target = document.querySelector('.' + selector)!;
    this.container = document.querySelector('.' + context)!;

    this.containerCoordsRect = this.getCoords(this.container)
    this.initialIndex = initialIndex

    this.container?.addEventListener('click', this.containerClick.bind(this));

    this.setup()
  }

  setup(){
    const items: HTMLCollection = this.container.children

    
    let initialItem: Element

    items.length >= this.initialIndex ? initialItem = items[this.initialIndex] : initialItem = items[0]

    const initialItemCoordsRect: Vector<number> = this.getCoords(initialItem)
    const styles: Vector<string> = {
      width:  initialItemCoordsRect.width + 'px',
      left: initialItemCoordsRect.left - this.containerCoordsRect.left + 'px'
    }

    this.setStyles(this.target, styles)
    
    
  }

  containerClick(e: MouseEvent): void {
    const target = e.target as HTMLElement
    const currentItem: HTMLElement = target.closest('.menu-item') !
    
    const itemRect: DOMRect = currentItem.getBoundingClientRect()

    console.log(itemRect.left, this.containerCoordsRect.left);
    
    const styles: Vector<string>  = {
      width:  itemRect.width + 'px',
      left: itemRect.left - this.containerCoordsRect.left + 'px'
    }

    this.setStyles(this.target, styles)
    
  }

  getCoords(el: HTMLElement | Element): Vector<number> {
    const coords: DOMRect = el.getBoundingClientRect()
    return {
      left: coords.left,
      width: coords.width
    }
  }

  setStyles(item: HTMLElement, styleObj: object): void{
    Object.assign(item.style, styleObj)
  }
}

new NavUnderlineAnimation( 'menu');
