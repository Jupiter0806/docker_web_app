import { expect } from 'chai';
import { describe, it } from 'mocha';

import { Logger } from './Logger';

describe('Logger', () => {
  it('getLogger with label', () => {
    Logger.getLogger('abc').info('info');
  })
});