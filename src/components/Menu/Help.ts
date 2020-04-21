import { ModalComponent, PageComponent } from '../../core/components';

import { GAME_CELL_SIZE_VMIN } from '../../constants/game';

import { getCellSize } from '../../core/utils/game';
import { renderAvatar } from '../Game/render/avatar';
import { renderWall } from '../Game/render/wall';
import { renderSquare } from '../Game/render/square';
import { renderSoil } from '../Game/render/soil';
import { renderButterfly } from '../Game/render/butterfly';
import { renderBoulder } from '../Game/render/boulder';
import { renderBrickWall } from '../Game/render/brickWall';
import { renderDiamond } from '../Game/render/diamond';
import { renderGreenLava } from '../Game/render/greenLava';

import { ImageProps } from '../../core/components/types';

class Help extends ModalComponent {
  protected cellSize: number;

  public images: {
    avatarIdle: ImageProps;
  };

  public constructor(page: PageComponent) {
    super(page, { className: 'balderdoush', size: 'large' });
  }

  public init(): void {
    this.cellSize = getCellSize(GAME_CELL_SIZE_VMIN);

    this.images = {
      avatarIdle: {
        src: './static/avatar-idle.svg',
      },
    };

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

  public afterMount(): void {
    const avatarCanvas: HTMLCanvasElement = document.getElementById('help-avatar-canvas') as HTMLCanvasElement;
    const wallCanvas: HTMLCanvasElement = document.getElementById('help-wall-canvas') as HTMLCanvasElement;
    const squareCanvas: HTMLCanvasElement = document.getElementById('help-square-canvas') as HTMLCanvasElement;
    const soilCanvas: HTMLCanvasElement = document.getElementById('help-soil-canvas') as HTMLCanvasElement;
    const butterflyCanvas: HTMLCanvasElement = document.getElementById('help-butterfly-canvas') as HTMLCanvasElement;
    const boulderCanvas: HTMLCanvasElement = document.getElementById('help-boulder-canvas') as HTMLCanvasElement;
    const brickWallCanvas: HTMLCanvasElement = document.getElementById('help-brick-wall-canvas') as HTMLCanvasElement;
    const diamondCanvas: HTMLCanvasElement = document.getElementById('help-diamond-canvas') as HTMLCanvasElement;
    const greenLavaCanvas: HTMLCanvasElement = document.getElementById('help-green-lava-canvas') as HTMLCanvasElement;

    avatarCanvas.width = wallCanvas.width = squareCanvas.width = soilCanvas.width = butterflyCanvas.width =
      boulderCanvas.width = brickWallCanvas.width = diamondCanvas.width = greenLavaCanvas.width = this.cellSize;
    avatarCanvas.height = wallCanvas.height = squareCanvas.height = soilCanvas.height = butterflyCanvas.height =
      boulderCanvas.height = brickWallCanvas.height = diamondCanvas.height = greenLavaCanvas.height = this.cellSize;

    renderAvatar.call(this, 0, 0, 1, avatarCanvas.getContext('2d'));
    renderWall.call(this, 0, 0, wallCanvas.getContext('2d'));
    renderSquare.call(this, 0, 0, 1, squareCanvas.getContext('2d'));
    renderSoil.call(this, 0, 0, soilCanvas.getContext('2d'));
    renderButterfly.call(this, 0, 0, 1, butterflyCanvas.getContext('2d'));
    renderBoulder.call(this, 0, 0, boulderCanvas.getContext('2d'));
    renderBrickWall.call(this, 0, 0, 1, brickWallCanvas.getContext('2d'));
    renderDiamond.call(this, 0, 0, diamondCanvas.getContext('2d'));
    renderGreenLava.call(this, 0, 0, greenLavaCanvas.getContext('2d'));
  }

  public render(): HTMLElement {
    const labelText = document.createElement('div');

    labelText.innerHTML = (`
      <div class="help">
        <h3>Balderdoush help</h3>
        <div class="col">
          <canvas id="help-avatar-canvas"></canvas>
          <div class="description">
            Rockford. You can move him in every direction with arrow keys. You can pick up
            diamonds or dig without moving by pressing a direction key together with the
            "pick up" key.
          </div>
        </div>
        <div class="row">
          <div class="col">
            <canvas id="help-wall-canvas"></canvas>
            <div class="description">
              An indestructible wall, or, perhaps, the exit door.
            </div>
          </div>
          <div class="col">
            <canvas id="help-square-canvas"></canvas>
            <div class="description">
              A square monster. Explode it to break the brick walls.
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col">
            <canvas id="help-soil-canvas"></canvas>
            <div class="description">
              A piece of soil. Dig it carefully. It's a good protection against monsters.
            </div>
          </div>
          <div class="col">
            <canvas id="help-butterfly-canvas"></canvas>
            <div class="description">
              A butterfly monster. Explode it to obtain more diamonds.
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col">
            <canvas id="help-boulder-canvas"></canvas>
            <div class="description">
              A boulder. Use it to explode monsters. Beware of unbalanced boulders.
            </div>
          </div>
          <div class="col">
            <canvas id="help-brick-wall-canvas"></canvas>
            <div class="description">
              A brick wall. Some brick walls transform boulders into diamonds.
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col">
            <canvas id="help-diamond-canvas"></canvas>
            <div class="description">
              A diamond. Collect all diamonds to open the exit door.
            </div>
          </div>
          <div class="col">
            <canvas id="help-green-lava-canvas"></canvas>
            <div class="description">
              Green lava. It explodes monsters. You can also enclose it to transform it into diamonds.
            </div>
          </div>
        </div>
        <div>
          <strong>Shift</strong>: Pick up<br />
          <strong>P</strong>: pause game.<br />
          <strong>Esc</strong>: quit game and return to the main menu.
        </div>
      </div>
    `);

    return labelText;
  }
}

export { Help };
