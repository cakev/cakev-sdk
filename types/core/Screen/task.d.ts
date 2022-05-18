import Factory from '../Base/factory';
import WidgetTask from '../Widget/task';
import LayTask from './lay';
import SceneTask from './scene';
export default class ScreenTask extends Factory<ScreenTask> {
    screenId: string;
    screenName: string;
    screenWidgets: {
        [key: string]: WidgetTask;
    };
    screenWidgetsLays: {
        [key: string]: LayTask;
    };
    screenScene: {
        [key: string]: SceneTask;
    };
    screenAvatar: string;
    screenVersion: string;
    screenLayoutMode: string;
    screenWidth: number;
    screenHeight: number;
    screenBackGroundColor: string;
    screenBackGroundImage: string;
    screenMainScene: string | number;
    screenDomain: string;
    screenHeaders: string;
    screenFilter: {
        enable: boolean;
        grayscale: number;
        opacity: number;
        contrast: number;
        brightness: number;
        saturate: number;
        hueRotate: number;
    };
    clear(): void;
    init(res: ScreenTask): ScreenTask;
    changeLayoutMode(value: string | null): string;
    get screenFilterStyle(): {
        filter: string;
    } | {
        filter?: undefined;
    };
    get screenStyle(): {
        filter: string;
        width: string;
        height: string;
        backgroundColor: string;
        backgroundImage: string;
        overflow: string;
        transform: string;
    } | {
        filter?: undefined;
        width: string;
        height: string;
        backgroundColor: string;
        backgroundImage: string;
        overflow: string;
        transform: string;
    };
    createScene(): string;
    destroyScene(index: number | string): void;
    destroySceneWidgets(index: number | string): void;
    createWidget({ offsetX, offsetY, startX, startY, currentSceneIndex, currentMaxZIndex, widgetLayout, widgetIs, widgetType, widgetAvatar, widgetMarket, widgetApi, widgetBase, widgetConfig, }: {
        offsetX: any;
        offsetY: any;
        startX: any;
        startY: any;
        currentSceneIndex: any;
        currentMaxZIndex: any;
        widgetLayout: any;
        widgetIs: any;
        widgetType: any;
        widgetAvatar: any;
        widgetMarket: any;
        widgetApi: any;
        widgetBase: any;
        widgetConfig: any;
    }): void;
    refreshWidget(widgetId: string): void;
    lockWidget(widgetId: string): void;
    hideWidget(widgetId: string): void;
    dropWidget(widgetId: string): void;
    deleteWidget(widgetId: string): void;
    copyWidget(widgetId: string): void;
    setWidgetZIndex(widgetId: string, zIndex: number): void;
}
