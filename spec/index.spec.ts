import { describe, it, expect } from 'vitest';
import { createStore } from '../src';

describe('olallie exports', () => {
  it('Should export #createStore', () => {
    expect(createStore).toBeDefined();
  });
});
