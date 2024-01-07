export class Item {
  name: string;
  tags: Tag[];

  constructor(name: string, tags: Tag[]) {
    this.name = name;
    this.tags = tags;
    this.tags.push(new Tag(name));
    Tags[name] = new Tag(name);
  }
}

export class Tag {
  name: string;

  constructor(name: string) {
    this.name = name;
  }
}

export const Tags = {
  lightArmor: new Tag("Light Armor"),
  mediumArmor: new Tag("Medium Armor"),
  heavyArmor: new Tag("Heavy Armor"),
  simpleWeapons: new Tag("Simple Weapons"),
  martialWeapons: new Tag("Martial Weapons"),
  artisanTools: new Tag("Artisan's Tools"),
  pistols: new Tag("Pistols"),
  shields: new Tag("Shields"),
  muskets: new Tag("Muskets"),
};

export const Items: { [key: string]: Item } = {
  smithTools: new Item("Smith's Tools", [Tags.artisanTools]),
};

export function getItemsOfTag(tag: Tag): Item[] {
  let items: Item[] = [];
  for (let item of Object.getOwnPropertyNames(Items)) {
    if (Items[item].tags.includes(tag)) {
      items.push(Items[item]);
    }
  }
  return items;
}
