import { GrasigasFrontendPage } from './app.po';

describe('grasigas-frontend App', () => {
  let page: GrasigasFrontendPage;

  beforeEach(() => {
    page = new GrasigasFrontendPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
