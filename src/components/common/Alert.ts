import { ModalComponent } from '../core/Modal';
import { PageComponent } from '../core/Page';

class Alert extends ModalComponent {
  public constructor(page: PageComponent, text: string, size?: 'large' | 'medium' | 'small') {
    super(page, text, size);
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

    labelText.innerText = this.modalContent;

    return labelText;
  }
}

export { Alert };
