import Agent from '../Editor/base';
export default class Editor extends Agent {
    init(res?: any): any;
    clear(): void;
    zoomIn(step?: number): void;
    zoomOut(step?: number): void;
    resetZoom(): void;
    get currentSceneWidget(): import("../Screen/lay").default[];
    get currentMaxZIndex(): number;
    get currentMinZIndex(): number;
    get rulerStyle(): any;
}
