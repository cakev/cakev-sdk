import Factory from '../Base/factory';
import WidgetTask from '../Widget/task';
interface widgetType {
    widgetTypeName: string;
    widgetTypeId: string;
    children?: widgetType[];
}
export default class Local extends Factory<Local> {
    widgets: {
        [key: string]: WidgetTask[];
    };
    widgetType: widgetType[];
    setWidgetTypes(value: widgetType[]): void;
    setWidgets(value: WidgetTask[]): void;
}
export {};
