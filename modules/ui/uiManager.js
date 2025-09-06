import { UIPanelManager } from './panelManager.js';
import { panelButtons } from './panelButtons.js';

export class UIManager {
  constructor(onResize) {
    this.leftPanelManager = new UIPanelManager('.left-panel-div', 'left', onResize);
    this.rightPanelManager = new UIPanelManager('.right-panel-div', 'right', onResize);

    // Add buttons from config
    panelButtons.forEach(cfg => {
      if (cfg.side === 'left') {
        this.addLeftPanelButton(cfg);
      } else if (cfg.side === 'right') {
        this.addRightPanelButton(cfg);
      }
    });
  }

  addLeftPanelButton({ id, icon, panelContent }) {
    const button = document.createElement('button');
    button.className = 'sidebar-icon';
    button.innerHTML = icon;
    button.onclick = (e) => {
      this.leftPanelManager.togglePanel({ id, content: panelContent });
      e.currentTarget.blur();
    };
    document.querySelector('.left-sidebar').appendChild(button);
  }

  addRightPanelButton({ id, icon, panelContent }) {
    const button = document.createElement('button');
    button.className = 'sidebar-icon';
    button.innerHTML = icon;
    button.onclick = (e) => {
      this.rightPanelManager.togglePanel({ id, content: panelContent });
      e.currentTarget.blur();
    };
    document.querySelector('.right-sidebar').appendChild(button);
  }
}