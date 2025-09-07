const surfaces = [];

export function addSurfaceToDataPanel(surface, mesh) {
  surfaces.push({ surface, mesh });
  updateDataPanel();
}

export function removeSurfaceFromDataPanel(mesh) {
  const idx = surfaces.findIndex(s => s.mesh === mesh);
  if (idx !== -1) {
    surfaces.splice(idx, 1);
    updateDataPanel();
  }
}

export function createDataPanel() {
  const container = document.createElement('div');
  container.className = 'data-panel-content';
  container.innerHTML = `<div class="data-file-list"></div>`;
  updateDataPanel(container);
  return container;
}


function updateDataPanel(containerOverride) {
  const container = containerOverride ||
    document.querySelector('.data-panel-content');
  if (!container) return;
  const list = container.querySelector('.data-file-list');
  if (!list) return;

  list.innerHTML = surfaces.map(({ surface, mesh }, i) => `
    <div class="data-file">
      <div class="data-file-name">${surface.name || 'Unnamed Surface'}</div>
      <ul class="data-file-children">
        <li class="data-file-child">
          <span style="font-size:1.2em;vertical-align:middle;">&#x25A3;</span>
          <span style="margin-left:8px;">Surface mesh</span>
        </li>
      </ul>
    </div>
  `).join('');
}