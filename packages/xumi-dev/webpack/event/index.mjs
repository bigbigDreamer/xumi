import { EventEmitter } from 'node:events';

const globalEventBus = new EventEmitter();
export default globalEventBus;
