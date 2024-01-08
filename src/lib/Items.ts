export class Item {
  name: string;
  tags: ItemTag[];

  constructor(name: string, tags: ItemTag[]) {
    this.name = name;
    this.tags = tags;
    this.tags.push(new ItemTag(name));
    Tags[name] = new ItemTag(name);
  }
}

export class ItemTag {
  name: string;

  constructor(name: string) {
    this.name = name;
  }
}

export const Tags = {
  lightArmor: new ItemTag("Light Armor"),
  mediumArmor: new ItemTag("Medium Armor"),
  heavyArmor: new ItemTag("Heavy Armor"),
  simpleWeapons: new ItemTag("Simple Weapons"),
  martialWeapons: new ItemTag("Martial Weapons"),
  artisanTools: new ItemTag("Artisan's Tools"),
  pistols: new ItemTag("Pistols"),
  shields: new ItemTag("Shields"),
  muskets: new ItemTag("Muskets"),
};

export const Items: { [key: string]: Item } = {
  smithTools: new Item("Smith's Tools", [Tags.artisanTools]),
};

export function getItemsOfTag(tag: ItemTag): Item[] {
  let items: Item[] = [];
  for (let item of Object.getOwnPropertyNames(Items)) {
    if (Items[item].tags.includes(tag)) {
      items.push(Items[item]);
    }
  }
  return items;
}
