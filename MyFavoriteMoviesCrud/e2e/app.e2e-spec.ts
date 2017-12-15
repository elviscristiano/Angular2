import { MoshtutorialPage } from './app.po';

describe('moshtutorial App', () => {
  let page: MoshtutorialPage;

  beforeEach(() => {
    page = new MoshtutorialPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
