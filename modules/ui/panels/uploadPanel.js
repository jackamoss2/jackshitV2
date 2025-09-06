import { handleFile } from '../../fileHandlers.js';
import { scene } from '../../../main.js';

export function createUploadPanel() {
  const container = document.createElement('div');
  container.className = 'upload-panel-content';
  container.innerHTML = `
    <div class="upload-drop-area">
      <div class="upload-drop-visual">
        <img src="/images/icons/upload.svg" alt="Upload" class="upload-drop-icon">
      </div>
      <span class="upload-drop-text">
        Click here<br>or<br>drag and drop
      </span>
      <input type="file" multiple style="display:none;">
    </div>
    <div class="upload-accepted-types">
      accepted file types: LandXML, DEM
    </div>
  `;

  const dropArea = container.querySelector('.upload-drop-area');
  const input = container.querySelector('input[type="file"]');

  dropArea.removeAttribute('tabindex');

  dropArea.addEventListener('click', (e) => {
    if (e.target === input) return;
    input.click();
    dropArea.blur && dropArea.blur();
  });

  dropArea.addEventListener('dragover', (e) => {
    e.preventDefault();
    dropArea.classList.add('dragover');
  });

  dropArea.addEventListener('dragleave', () => {
    dropArea.classList.remove('dragover');
  });
  dropArea.addEventListener('drop', (e) => {
    e.preventDefault();
    dropArea.classList.remove('dragover');
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFile(e.dataTransfer.files[0], mesh => {
        scene.add(mesh);
        console.log('Added mesh to scene:', mesh);
      });
    }
  });

  dropArea.addEventListener('mouseenter', () => {
    dropArea.classList.add('dragover');
  });
  dropArea.addEventListener('mouseleave', () => {
    dropArea.classList.remove('dragover');
  });

  input.addEventListener('change', () => {
    dropArea.classList.remove('dragover');
    if (input.files && input.files.length > 0) {
      handleFile(input.files[0], mesh => {
        scene.add(mesh);
        console.log('Added mesh to scene:', mesh);
      });
    }
  });

  return container;
}