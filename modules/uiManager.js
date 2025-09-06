import { UIPanelManager } from './uiPanelManager.js';

export class UIManager {
  constructor(onResize) {
    this.leftPanelManager = new UIPanelManager('.left-panel-div', 'left', onResize);
    this.rightPanelManager = new UIPanelManager('.right-panel-div', 'right', onResize);
  }

  addLeftPanelButton({ id, icon, panelContent }) {
    const button = document.createElement('button');
    button.className = 'sidebar-icon';
    button.innerHTML = icon;
    button.onclick = (e) => {
      this.leftPanelManager.togglePanel({ id, content: panelContent });
      e.currentTarget.blur(); // Remove focus after click
    };
    document.querySelector('.left-sidebar').appendChild(button);
  }

  addRightPanelButton({ id, icon, panelContent }) {
    const button = document.createElement('button');
    button.className = 'sidebar-icon';
    button.innerHTML = icon;
    button.onclick = (e) => {
      this.rightPanelManager.togglePanel({ id, content: panelContent });
      e.currentTarget.blur(); // Remove focus after click
    };
    document.querySelector('.right-sidebar').appendChild(button);
  }
}