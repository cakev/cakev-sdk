import Base from '../IndexDB/base';
export default class ScreenCache extends Base {
    add(name: string, value: any): Promise<any>;
    get(name: string): Promise<any>;
}
