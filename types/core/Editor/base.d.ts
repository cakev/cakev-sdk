import Factory from '../Base/factory';
import ScreenTask from '../Screen/task';
import Current from '../Current';
import Http from '../Http';
import Config from '../Config';
import Local from '../Local';
import ScreenCache from '../IndexDB/screenCache';
export default class EditorBase extends Factory<EditorBase> {
    screen: ScreenTask;
    current: Current;
    http: Http;
    config: Config;
    local: Local;
    screenCache: ScreenCache;
    rulerContainerId: string;
    screenId: string;
    editorStatus: string;
    marketComponentLoading: boolean;
    widgetLoaded: {};
    updateWidgetLoaded(key: string): void;
    updateEditorStatus(status: string): void;
    get currentSceneIndex(): string | number;
    openScene(id: string): void;
    closeScene(id: string): void;
    get zoom(): number;
    constructor();
}
