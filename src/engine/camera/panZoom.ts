import { CAMERA } from '../gameplay/constants';

export interface CameraState {
  zoom: number;
  panX: number;
  panY: number;
}

export function createCamera(): CameraState {
  return { zoom: 1, panX: 0, panY: 0 };
}

export function clampZoom(zoom: number): number {
  return Math.min(CAMERA.MAX_ZOOM, Math.max(CAMERA.MIN_ZOOM, zoom));
}

export function zoomAtPoint(
  camera: CameraState,
  delta: number,
  focalX: number,
  focalY: number,
  sceneWidth: number,
  sceneHeight: number,
): CameraState {
  const oldZoom = camera.zoom;
  const newZoom = clampZoom(oldZoom + delta);
  if (newZoom === oldZoom) return camera;

  const zoomRatio = newZoom / oldZoom;
  const panX = focalX - (focalX - camera.panX) * zoomRatio;
  const panY = focalY - (focalY - camera.panY) * zoomRatio;

  return clampPan({ zoom: newZoom, panX, panY }, sceneWidth, sceneHeight);
}

export function clampPan(
  camera: CameraState,
  sceneWidth: number,
  sceneHeight: number,
): CameraState {
  if (camera.zoom <= 1) {
    return { ...camera, panX: 0, panY: 0 };
  }
  const maxPanX = Math.max(0, sceneWidth * camera.zoom - sceneWidth);
  const maxPanY = Math.max(0, sceneHeight * camera.zoom - sceneHeight);
  return {
    ...camera,
    panX: Math.min(0, Math.max(-maxPanX, camera.panX)),
    panY: Math.min(0, Math.max(-maxPanY, camera.panY)),
  };
}

export function screenToScene(
  screenX: number,
  screenY: number,
  camera: CameraState,
  containerRect: DOMRect,
  sceneWidth: number,
  sceneHeight: number,
): { x: number; y: number } {
  const scaleX = (containerRect.width / sceneWidth) * camera.zoom;
  const scaleY = (containerRect.height / sceneHeight) * camera.zoom;
  const offsetX = (containerRect.width - sceneWidth * (containerRect.width / sceneWidth) * camera.zoom) / 2;
  const offsetY = (containerRect.height - sceneHeight * (containerRect.height / sceneHeight) * camera.zoom) / 2;

  const relX = screenX - containerRect.left;
  const relY = screenY - containerRect.top;

  const x = (relX - camera.panX * (containerRect.width / sceneWidth) - offsetX) / scaleX;
  const y = (relY - camera.panY * (containerRect.height / sceneHeight) - offsetY) / scaleY;

  return { x, y };
}

export function panBy(
  camera: CameraState,
  dx: number,
  dy: number,
  sceneWidth: number,
  sceneHeight: number,
): CameraState {
  if (camera.zoom <= 1) return camera;
  return clampPan(
    { ...camera, panX: camera.panX + dx, panY: camera.panY + dy },
    sceneWidth,
    sceneHeight,
  );
}

export function resetCamera(): CameraState {
  return createCamera();
}

export function zoomStep(camera: CameraState, direction: 1 | -1): CameraState {
  const delta = direction * CAMERA.ZOOM_STEP;
  return { ...camera, zoom: clampZoom(camera.zoom + delta) };
}
