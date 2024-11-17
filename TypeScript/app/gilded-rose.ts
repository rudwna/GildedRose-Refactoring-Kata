export class Item {
  name: string;
  sellIn: number;
  quality: number;

  constructor(name, sellIn, quality) {
    this.name = name;
    this.sellIn = sellIn;
    this.quality = quality;
  }
}

enum ItemType {
  SULFURAS = 'Sulfuras, Hand of Ragnaros',
  AGED_BRIE = 'Aged Brie',
  BACKSTAGE_PASS = 'Backstage passes to a TAFKAL80ETC concert',
  CONJURED = 'Conjured',
  DEFAULT = 'Default'
}

export class GildedRose {
  items: Array<Item>;

  constructor(items = [] as Array<Item>) {
    this.items = items;
  }

  updateQuality2() {
    for (let i = 0; i < this.items.length; i++) {
      if (this.items[i].name != 'Aged Brie' && this.items[i].name != 'Backstage passes to a TAFKAL80ETC concert') {
        if (this.items[i].quality > 0) {
          if (this.items[i].name != 'Sulfuras, Hand of Ragnaros') {
            this.items[i].quality = this.items[i].quality - 1
          }
        }
      } else {
        if (this.items[i].quality < 50) {
          this.items[i].quality = this.items[i].quality + 1
          if (this.items[i].name == 'Backstage passes to a TAFKAL80ETC concert') {
            if (this.items[i].sellIn < 11) {
              if (this.items[i].quality < 50) {
                this.items[i].quality = this.items[i].quality + 1
              }
            }
            if (this.items[i].sellIn < 6) {
              if (this.items[i].quality < 50) {
                this.items[i].quality = this.items[i].quality + 1
              }
            }
          }
        }
      }
      if (this.items[i].name != 'Sulfuras, Hand of Ragnaros') {
        this.items[i].sellIn = this.items[i].sellIn - 1;
      }
      if (this.items[i].sellIn < 0) {
        if (this.items[i].name != 'Aged Brie') {
          if (this.items[i].name != 'Backstage passes to a TAFKAL80ETC concert') {
            if (this.items[i].quality > 0) {
              if (this.items[i].name != 'Sulfuras, Hand of Ragnaros') {
                this.items[i].quality = this.items[i].quality - 1
              }
            }
          } else {
            this.items[i].quality = this.items[i].quality - this.items[i].quality
          }
        } else {
          if (this.items[i].quality < 50) {
            this.items[i].quality = this.items[i].quality + 1
          }
        }
      }
    }

    return this.items;
  }



  getItemType(itemName: string): ItemType {
    if (itemName === 'Sulfuras, Hand of Ragnaros') {
      return ItemType.SULFURAS;
    }
    if (itemName === 'Aged Brie') {
      return ItemType.AGED_BRIE;
    }
    if (itemName === 'Backstage passes to a TAFKAL80ETC concert') {
      return ItemType.BACKSTAGE_PASS
    }
    if (itemName.startsWith('Conjured')) {
      return ItemType.CONJURED;
    }
    return ItemType.DEFAULT
  }

  updateQuality() {
    for (const item of this.items) {
      let qualityChange = 0;
      switch (this.getItemType(item.name)) {
        case ItemType.SULFURAS:
          continue;
        case ItemType.BACKSTAGE_PASS:
          if (item.sellIn < 11) {
            qualityChange++;
          }
          if (item.sellIn < 6) {
            qualityChange++;
          }
          qualityChange++;
        
          item.quality += qualityChange;
          if (item.sellIn <= 0) {
            item.quality = 0;
          }
          break;
        case ItemType.AGED_BRIE:
          if (item.sellIn <= 0) {
            qualityChange++;
          }
          qualityChange++;

          item.quality += qualityChange;
          break;
        case ItemType.CONJURED:
          if (item.sellIn <= 0) {
            qualityChange--;
          }
          qualityChange--;
          qualityChange *= 2;

          item.quality += qualityChange;
          break;
        default:
          if (item.sellIn <= 0) {
            qualityChange--;
          }
          qualityChange--;
          item.quality += qualityChange;
          break;
        }

      item.sellIn--;

      if(item.quality >= 50){
        item.quality = 50;
      }
      if(item.quality <=0){
        item.quality = 0;
      }

    }
      
    return this.items;
  }
}
