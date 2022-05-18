import { Method } from 'axios';
declare type STATUS_WAIT = 'HTTP_WAIT';
declare type STATUS_RETRY = 'HTTP_RETRY';
declare type STATUS_READY = 'HTTP_READY';
declare type STATUS_LOADING = 'HTTP_LOADING';
declare type STATUS_FINISH = 'HTTP_FINISH';
export default class Task {
    static STATUS_WAIT: STATUS_WAIT;
    static STATUS_READY: STATUS_READY;
    static STATUS_LOADING: STATUS_LOADING;
    static STATUS_RETRY: STATUS_RETRY;
    static STATUS_FINISH: STATUS_FINISH;
    status: STATUS_WAIT | STATUS_READY | STATUS_LOADING | STATUS_RETRY | STATUS_FINISH;
    needCache: boolean;
    cacheTime: number;
    maxErrorCount: number;
    errorCount: number;
    weight: number;
    loopTime: number;
    lastTime: number;
    domain: string;
    method: Method;
    url: string;
    headers: {
        [key: string]: string;
    };
    params: any;
    thenCallBack: Function;
    catchCallBack: Function;
    constructor({ method, url, params, loopTime, domain, headers, }: {
        domain: string;
        headers: {
            [key: string]: string;
        };
        method: Method;
        url: string;
        params: any;
        loopTime: number;
    });
    then(cb: Function): Task;
    catch(cb: Function): Task;
    create(): Promise<any>;
}
export {};
