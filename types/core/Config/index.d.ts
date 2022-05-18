import Factory from '../Base/factory';
export default class Config extends Factory<Config> {
    head: never[];
    api: {
        widgetVersionList: string;
        widgetLoad: string;
        fileUpload: string;
        previewUrl: string;
    };
    animations: {
        label: string;
        value: string;
    }[];
    setConfig(option?: {
        api: {};
        head: never[];
    }): void;
}
