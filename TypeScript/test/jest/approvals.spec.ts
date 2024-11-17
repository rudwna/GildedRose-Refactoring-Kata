import { Item, GildedRose } from '@/gilded-rose';

/**
 * This unit test uses [Jest Snapshot](https://goo.gl/fbAQLP).
 * 
 * There are two test cases here with different styles:
 * <li>"foo" is more similar to the unit test from the 'Java' version
 * <li>"thirtyDays" is more similar to the TextTest from the 'Java' version
 *
 * I suggest choosing one style to develop and deleting the other.
 */

describe('Gilded Rose Approval', () => {

  let gameConsoleOutput: string;
  let originalConsoleLog: (message: any) => void;
  let originalProcessArgv: string[]

  function gameConsoleLog(msg: string) {
    if (msg) {
      gameConsoleOutput += msg;
    }
    gameConsoleOutput += "\n";
  }

  beforeEach(() => {
    // prepare capturing console.log to our own gameConsoleLog.
    gameConsoleOutput = "";
    originalConsoleLog = console.log;
    console.log = gameConsoleLog;
    originalProcessArgv = process.argv;
  });

  afterEach(() => {
    // reset original console.log
    console.log = originalConsoleLog;
    process.argv = originalProcessArgv;
  });

  it('should foo', () => {
    const gildedRose = new GildedRose([new Item('foo', 0, 0)]);
    const items = gildedRose.updateQuality();
  
    expect(items).toMatchSnapshot();
  });

  it('should decrease quality if sellIn > 0', () => {
    const gildedRose = new GildedRose([new Item('foo', 1, 1)]);
    const items = gildedRose.updateQuality();
  
    expect(items).toStrictEqual([new Item('foo', 0, 0)]);
  })

  it('should foo past 2 day', () => {
    const gildedRose = new GildedRose([new Item('foo', 0, 0)]);
    const items = gildedRose.updateQuality();
    const itemsDay2 = gildedRose.updateQuality();
  
    expect(itemsDay2).toMatchSnapshot();
  });

  it('quality of an item should never be negative', () => {
    const glidedRose = new GildedRose([new Item('foo', 1, 0)]);
    const items = glidedRose.updateQuality();

    expect(items).toMatchSnapshot();
  })

  it('after sell by date pass quality degrade will be double', () => {
    const glidedRose = new GildedRose([new Item('foo', 2, 20)]);
    let items;
    for(let day = 5; day > 0; day--){
      items = glidedRose.updateQuality();
    }

    expect(items).toMatchSnapshot();
  })

  it('Aged Brie test', () => {
    const glidedRose = new GildedRose([new Item('Aged Brie', 2, 10)]);
    let items;
    for(let day = 5; day > 0; day--){
      items = glidedRose.updateQuality();
    }

    expect(items).toMatchSnapshot();
  })

  it('quality of item should never gets more than 50', () => {
    const glidedRose = new GildedRose([new Item('Aged Brie', -1, 49)]);
    const items = glidedRose.updateQuality();
    
    expect(items).toMatchSnapshot();
  })

  it('sellIn and quality of Sulfuras should never alter even the date has passed', () => {
    const gildedRose = new GildedRose([new Item('Sulfuras, Hand of Ragnaros', -5, 80)]);
    const items = gildedRose.updateQuality();
    
    expect(items).toMatchSnapshot();
  })

  it('Backstage day 12 to 8', () => {
    const glidedRose = new GildedRose([new Item('Backstage passes to a TAFKAL80ETC concert', 12, 10)]);
    let items;
    for(let day = 5; day > 1; day--){
      items = glidedRose.updateQuality();
    }

    expect(items).toMatchSnapshot();
  })

  it('Backstage day 7 to 3', () => {
    const glidedRose = new GildedRose([new Item('Backstage passes to a TAFKAL80ETC concert', 7, 10)]);
    let items;
    for(let day = 5; day > 1; day--){
      items = glidedRose.updateQuality();
    }

    expect(items).toMatchSnapshot();
  })

  it('Backstage day 2 to -2', () => {
    const glidedRose = new GildedRose([new Item('Backstage passes to a TAFKAL80ETC concert', 2, 24)]);
    let items;
    for(let day = 5; day > 1; day--){
      items = glidedRose.updateQuality();
    }

    expect(items).toMatchSnapshot();
  })

  it('conjured items should degrade in quality twice as fast when sellIn is lower than 0', () => {
    const glidedRose =  new GildedRose([new Item('Conjured Mana Cake', 1, 3)]);
    glidedRose.updateQuality();
    const items = glidedRose.updateQuality();

    expect(items).toMatchSnapshot();
  })

  it('should thirtyDays', () => {
    process.argv = ["<node>", "<script", "30"];
    require('../golden-master-text-test.ts');
       
    expect(gameConsoleOutput).toMatchSnapshot();
  });

});
