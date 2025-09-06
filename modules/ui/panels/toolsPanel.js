export function createToolsPanel() {
  const container = document.createElement('div');
  container.className = 'tools-panel-content';
  container.innerHTML = `
    <div style="text-align:center; margin-top: 48px; font-size: 1.2em; color: #888;">
      Coming soon
    </div>
  `;
  return container;
}