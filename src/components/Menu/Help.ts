import { ModalComponent } from '../core/Modal';
import { PageComponent } from '../core/Page';

class Help extends ModalComponent {
  public constructor(page: PageComponent) {
    super(page, 'large');
  }

  public init(): void {
    this.eventHandlers = [
      {
        target: window,
        type: 'keydown',
        listener: (e: KeyboardEvent) => {
          if (e && e.key === 'Escape') {
            this.destroy();
          }
        },
      },
    ];
  }

  public render(): HTMLElement {
    const labelText = document.createElement('div');

    labelText.innerHTML = (`
      <div>Help</div>
    `);

    return labelText;
  }
}

export { Help };
