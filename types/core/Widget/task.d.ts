import { Method } from 'axios';
export default class WidgetTask {
    widgetLayout: {
        width: number;
        height: number;
        left: number;
        top: number;
        scale: number;
    };
    widgetBase: {
        name: string;
        version: string;
        locked: boolean;
    };
    widgetApi: {
        url: string;
        method: Method;
        params: string;
        path: string;
        data: string;
        autoFetchEnable: boolean;
        autoFetchDuration: number;
        processEnable: boolean;
        processBody: string;
    };
    widgetConfig: {};
    widgetAnimation: {
        transitionEnable: boolean;
        enter: string;
        duration: number;
        delay: number;
    };
    widgetType: string;
    widgetIs: null | string;
    widgetTypeId: string;
    widgetAvatar: string;
    widgetId: string;
    widgetMarket: boolean;
    constructor(obj: any);
}
