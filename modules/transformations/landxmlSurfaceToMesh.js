import * as THREE from 'three';

// LandXML: X (east), Y (north), Z (elev)
// Three.js: X (right), Y (up), Z (back)
// Typical mapping: X -> X, Y -> Z, Z -> Y

export function landxmlSurfaceToMesh(surface, material = null) {
  const geometry = new THREE.BufferGeometry();
  const vertices = [];
  const indices = [];

  // Transform and push vertices
  surface.pnts.forEach(({ x, y, z }) => {
    vertices.push(x, z, -y); // X, Z, -Y mapping
  });

  // Faces (indices)
  surface.faces.forEach(idxArr => {
    if (idxArr.length === 3) {
      // LandXML indices are 1-based
      indices.push(idxArr[0] - 1, idxArr[1] - 1, idxArr[2] - 1);
    }
  });

  geometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));
  geometry.setIndex(indices);
  geometry.computeVertexNormals();

  if (!material) {
    material = new THREE.MeshStandardMaterial({ color: 0x6699cc, side: THREE.DoubleSide, flatShading: true });
  }

  return new THREE.Mesh(geometry, material);
}