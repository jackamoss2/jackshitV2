import * as THREE from 'three';

export class SceneObjectManager {
  constructor(scene) {
    this.scene = scene;
    this.objects = new Map(); // key: id or name, value: mesh/object3D
  }

  addObject(id, object3D) {
    this.objects.set(id, object3D);
    this.scene.add(object3D);
  }

  removeObject(id) {
    const obj = this.objects.get(id);
    if (obj) {
      this.scene.remove(obj);
      this.objects.delete(id);
    }
  }

  setVisibility(id, visible) {
    const obj = this.objects.get(id);
    if (obj) obj.visible = visible;
  }

  setColor(id, color) {
    const obj = this.objects.get(id);
    if (obj && obj.material && obj.material.color) {
      obj.material.color.set(color);
    }
  }

  getObject(id) {
    return this.objects.get(id);
  }
}