import { parseLandXML } from './landXML.js';
import { landxmlSurfaceToMesh } from './transformations/landxmlSurfaceToMesh.js';
import { addSurfaceToDataPanel } from './ui/panels/dataPanel.js';

export function handleFile(file, addMeshToScene) {
  const ext = file.name.split('.').pop().toLowerCase();
  if (['xml', 'landxml'].includes(ext)) {
    const reader = new FileReader();
    reader.onload = () => {
      const surfaces = parseLandXML(reader.result);
      surfaces.forEach(surface => {
        const mesh = landxmlSurfaceToMesh(surface);
        addMeshToScene(mesh);
        addSurfaceToDataPanel(surface, mesh);
      });
    };
    reader.readAsText(file);
  } else {
    alert('Unsupported file type: ' + ext);
  }
}