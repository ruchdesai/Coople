import { FormatAddressPipe } from './format-address.pipe';

const MockAddress = {
  zip: 'ABC12',
  country: 'India'
};

describe('FormatAddressPipe', () => {
  let pipe: FormatAddressPipe;

  beforeEach(() => {
    pipe = new FormatAddressPipe();
  });

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('providing no value returns fallback', () => {
    expect(pipe.transform(MockAddress)).toBe('ABC12, India');
  });
});
