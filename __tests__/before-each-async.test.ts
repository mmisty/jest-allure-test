import {allureT, delay, log, wait} from '../src/test-helper';
import {fail} from "assert";

describe('before-each-test', () => {
  const beforeErr=[];
  beforeEach(async () => {
    log('before each 1');
    await delay(100);
    const err = new Error('Fail in before each');
    beforeErr.push(err);
    throw err;
    log('before each 1 finished');
  });

  beforeEach(async () => {
    log('before each 2');
    await wait(3000,() => beforeErr.length > 0);
    fail('xxxx');
  });

  it('async test after before', async () => {
    await delay(10000, 'Message 1');
    await delay(10000, 'Message 2');
    await delay(10000, 'Message 3');
  });

  describe('beforeEach', function () {
    beforeEach(function () {
      fail();
    });

    it("doesn't terminate tests if it raises an Exception", function () {
      allureT.step('first');
    });
  });
});
