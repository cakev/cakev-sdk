export declare class Singleton<T> {
    private static instance;
    static Instance<T>(obj?: any): T;
}
export default class Factory<T> extends Singleton<T> {
}
