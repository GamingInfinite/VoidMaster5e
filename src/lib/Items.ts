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

export const Items = {
  smithTools: new Item("Smith's Tools", [Tags.artisanTools]),
};
