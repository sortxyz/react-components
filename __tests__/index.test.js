describe('foo', () => {
  let foo = false;
  beforeEach(() => {
    foo = !foo;
  });

  it('expects foo to be 1', () => {
    expect(foo).toBe(true);
  });
});
