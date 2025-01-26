import { config } from './utils/config';
import { Ext } from './classes/Extension';

export let ext = new Ext(config);

ext.run();