export function processLandXML(xmlString) {
  console.log('Received LandXML data:', xmlString.slice(0, 200) + '...');
}

// move xml to surface out of this function, make this function just parse then call modules needed to return objects list

export function parseLandXML(xmlString) {
  const parser = new DOMParser();
  const xml = parser.parseFromString(xmlString, "application/xml");
  const surfaces = [];
  const surfacesNode = xml.querySelector("Surfaces");
  if (!surfacesNode) return surfaces;

  surfacesNode.querySelectorAll("Surface").forEach(surfaceNode => {
    const name = surfaceNode.getAttribute("name") || "Unnamed Surface";
    const pnts = [];
    const faces = [];

    // Parse points
    const pntsNode = surfaceNode.querySelector("Definition > Pnts");
    if (pntsNode) {
      pntsNode.querySelectorAll("P").forEach(p => {
        const [x, y, z] = p.textContent.trim().split(/\s+/).map(Number);
        pnts.push({ x, y, z });
      });
    }
    
    // Parse faces
    const facesNode = surfaceNode.querySelector("Definition > Faces");
    if (facesNode) {
      facesNode.querySelectorAll("F").forEach(f => {
        const idx = f.textContent.trim().split(/\s+/).map(i => parseInt(i, 10));
        faces.push(idx);
      });
    }
    surfaces.push({ name, pnts, faces });
  });
  return surfaces;
}