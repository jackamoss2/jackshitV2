import { UIPanelManager } from './panelManager.js';
import { panels } from './panels.js';

export class UIManager {
  constructor(onResize) {
    this.leftPanelManager = new UIPanelManager('.left-panel-div', 'left', onResize);
    this.rightPanelManager = new UIPanelManager('.right-panel-div', 'right', onResize);

    // add buttons from config
    panels.forEach(cfg => {
      if (cfg.side === 'left') {
        this.addLeftPanelButton(cfg);
      } else if (cfg.side === 'right') {
        this.addRightPanelButton(cfg);
      }
    });
  }

  addLeftPanelButton({ id, icon, panelContent, title }) {
    const button = document.createElement('button');
    button.className = 'sidebar-icon';
    button.innerHTML = icon;
    if (title) button.title = title;
    button.onclick = (e) => {
      this.leftPanelManager.togglePanel({ id, content: panelContent });
      e.currentTarget.blur();
    };
    document.querySelector('.left-sidebar').appendChild(button);
  }


  // not used but keeping for future reference
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