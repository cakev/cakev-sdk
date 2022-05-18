import Task from './task';
import Factory from '../Base/factory';
import WidgetTask from '../Widget/task';
export default class Http extends Factory<Http> {
    limit: number;
    loopPool: {
        [key: string]: Task;
    };
    waitPool: Array<Task>;
    currentPool: Array<Task>;
    loading: boolean;
    timer: any;
    request(widget: WidgetTask, { domain, headers }: {
        domain: any;
        headers: any;
    }): void;
    pushOne(task: Task, id: string): void;
    push2Wait(task: Task): void;
    retry(t: Task, res: any): void;
    startInterval(): void;
    run(): void;
    abortOne(id: string): void;
    abortAll(): void;
    stop(): void;
    stopLoop(): void;
}
