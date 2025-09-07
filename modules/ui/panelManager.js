export class UIPanelManager {
  static allManagers = [];

  constructor(panelDivSelector, side = 'left', onResize = null) {
    this.panelDiv = document.querySelector(panelDivSelector);
    this.side = side;
    this.currentPanel = null;
    this.onResize = onResize;
    UIPanelManager.allManagers.push(this);
  }

  showPanel({ id, content }) {
    // close all panels in all managers
    UIPanelManager.allManagers.forEach(manager => manager.closePanel());

    // hide any existing panel
    this.panelDiv.innerHTML = '';

    // create and show new panel
    const panel = document.createElement('div');
    panel.className = `ui-panel ui-panel-${this.side}`;
    panel.id = `panel-${id}`;

    if (typeof content === 'string') {
      panel.innerHTML = content;
    } else if (typeof content === 'function') {
      panel.appendChild(content());
    } else if (content instanceof HTMLElement) {
      panel.appendChild(content);
    }

    this.panelDiv.appendChild(panel);
    this.panelDiv.style.width = '240px';
    this.currentPanel = id;
    if (typeof this.onResize === 'function') this.onResize();
  }

  closePanel() {
    this.panelDiv.innerHTML = '';
    this.panelDiv.style.width = '0';
    this.currentPanel = null;
    if (typeof this.onResize === 'function') this.onResize();
  }

  togglePanel({ id, content }) {
    if (this.currentPanel === id) {
      this.closePanel();
    } else {
      this.showPanel({ id, content });
    }
  }
}