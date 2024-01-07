import { FeatureType, Language, Size, StatNames, UnlockType } from "./Enums";
import { ASIFeature, Feature } from "./FeatureTypes";
import { Tags, type Tag } from "./Items";
import { Skill, Skills } from "./Structures";

class PlayerCharacter {
  name: string;
  race: Race;
  subRace: SubRace;
  classes: Class[];

  constructor(playerData: PlayerCreationData) {
    this.name = playerData.name;
    this.race = playerData.race;
    this.classes = playerData.classes;
    this.subRace = this.race.subraces[playerData.subRace];
  }
}

export class PlayerCreationData {
  name: string;
  race: Race;
  subRace: number;
  classes: Class[] = [];
  baseStats: StatBlock;

  constructor() {
    this.baseStats = new StatBlock();
  }

  public getTotalLevel() {
    let level = 0;
    for (let classt of this.classes) {
      if (!classt) {
        continue;
      }
      level += classt.level;
    }
    return level;
  }
}

class StatBlock {
  str: number;
  dex: number;
  con: number;
  int: number;
  wis: number;
  cha: number;

  constructor() {
    this.str = 10;
    this.dex = 10;
    this.con = 10;
    this.int = 10;
    this.wis = 10;
    this.cha = 10;
  }

  includes(num: number): boolean {
    if (
      this.str == num ||
      this.dex == num ||
      this.con == num ||
      this.int == num ||
      this.wis == num ||
      this.cha == num
    ) {
      return true;
    }
    return false;
  }
}

class Race {
  name: string;
  descriptor: string;
  plural: string;
  movement: number;
  maxAge: number;
  size: Size;
  languages: Language[];
  ASIFeatures: Feature[];
  RacialAbilities: Feature[];
  subraces: SubRace[];

  constructor(
    stringArgs: { name: string; descriptor: string; plural: string },
    stats: { movement: number; maxAge: number; size: Size } = {
      movement: 30,
      maxAge: 100,
      size: Size.Medium,
    },
    ASIFeatures: Feature[] = [],
    RacialAbilities: Feature[] = [],
    languages: Language[] = [Language.Common],
    subraces: SubRace[] = []
  ) {
    this.name = stringArgs.name;
    this.descriptor = stringArgs.descriptor;
    this.plural = stringArgs.plural;
    this.movement = stats.movement;
    this.maxAge = stats.maxAge;
    this.size = stats.size;
    this.ASIFeatures = ASIFeatures;
    this.RacialAbilities = RacialAbilities;
    this.languages = languages;
    this.subraces = subraces;
  }
}

class SubRace extends Race {
  constructor(
    stringArgs: { name: string; descriptor: string; plural: string },
    stats: { movement: number; maxAge: number; size: Size } = {
      movement: 30,
      maxAge: 100,
      size: Size.Medium,
    },
    ASIFeatures: Feature[] = [],
    RacialAbilities: Feature[] = [],
    languages: Language[] = []
  ) {
    super(stringArgs, stats, ASIFeatures, RacialAbilities, languages);
  }
}

class Class {
  name: string;
  level: number;
  // features: ClassFeature[][];
  hitDice: number;
  savingThrows: StatNames[];
  skillProficiencies: Skill[];
  armorProficiencies: Tag[];
  weaponProficiencies: Tag[];
  toolProficiencies: Tag[];

  constructor(
    name: string,
    // features: ClassFeature[][] = [],
    level = 1,
    dice: number,
    savingThrows: StatNames[],
    skills: Skill[],
    armor: Tag[] = [],
    weapons: Tag[] = [],
    tools: Tag[] = []
  ) {
    this.name = name;
    // this.features = features;
    this.level = level;
    this.hitDice = dice;
    this.savingThrows = savingThrows;
    this.skillProficiencies = skills;
    this.armorProficiencies = armor;
    this.weaponProficiencies = weapons;
    this.toolProficiencies = tools;
  }
}

export const Races: Race[] = [
  new Race(
    { name: "Human", descriptor: "Human", plural: "Humans" },
    { movement: 30, maxAge: 100, size: Size.Medium },
    [new ASIFeature(1)],
    [],
    [Language.Common, Language.Extra]
  ),
  //#region Viera
  new Race(
    { name: "Viera", descriptor: "Vieran", plural: "Viera" },
    { movement: 35, maxAge: 240, size: Size.Medium },
    [new Feature({ dex: 2 }, "ASI", "ASI", FeatureType.ASI)],
    [],
    [Language.Common, Language.Vieran],
    [
      new SubRace(
        { name: "Rava", descriptor: "Rava", plural: "Rava" },
        { movement: 35, maxAge: 240, size: Size.Medium },
        [new ASIFeature(1, StatNames.wis)],
        [
          new Feature(
            {
              type: UnlockType.SkillProficiency,
              unlock: Skills.intimidation,
            },
            "Powerful Presence",
            "You gain proficiency in the Intimidate skill",
            FeatureType.Unlock
          ),
        ]
      ),
      new SubRace(
        { name: "Veena", descriptor: "Veena", plural: "Veena" },
        { movement: 35, maxAge: 240, size: Size.Medium },
        [new Feature({ int: 1 }, "ASI", "ASI", FeatureType.ASI)],
        [
          new Feature(
            {
              type: UnlockType.SkillProficiency,
              unlock: Skills.persuasion,
            },
            "Approachable",
            "You gain proficiency in the Persuasion skill",
            FeatureType.Unlock
          ),
        ]
      ),
    ]
  ),
  //#endregion
  //#region Genasi
  new Race(
    { name: "Genasi", descriptor: "Genasi", plural: "Genasi" },
    { movement: 30, maxAge: 120, size: Size.Medium },
    [new Feature({ con: 2 }, "ASI", "ASI", FeatureType.ASI)],
    [],
    [Language.Common, Language.Primordial],
    [
      new SubRace(
        { name: "Genasi (Air)", descriptor: "Air Genasi", plural: "Genasi" },
        { movement: 30, maxAge: 120, size: Size.Medium },
        [new Feature({ dex: 1 }, "ASI", "ASI", FeatureType.ASI)],
        []
      ),
      new SubRace(
        {
          name: "Genasi (Earth)",
          descriptor: "Earth Genasai",
          plural: "Genasai",
        },
        { movement: 30, maxAge: 120, size: Size.Medium },
        [new Feature({ str: 1 }, "ASI", "ASI", FeatureType.ASI)],
        []
      ),
      new SubRace(
        { name: "Genasi (Fire)", descriptor: "Fire Genasi", plural: "Genasi" },
        { movement: 30, maxAge: 120, size: Size.Medium },
        [new Feature({ int: 1 }, "ASI", "ASI", FeatureType.ASI)],
        []
      ),
      new SubRace(
        {
          name: "Genasi (Water)",
          descriptor: "Water Genasi",
          plural: "Genasi",
        },
        { movement: 30, maxAge: 120, size: Size.Medium },
        [new Feature({ wis: 1 }, "ASI", "ASI", FeatureType.ASI)],
        []
      ),
    ]
  ),
  //#endregion
  //#region Aasimar
  new Race(
    { name: "Aasimar", descriptor: "Aasimar", plural: "Aasimar" },
    { movement: 30, maxAge: 160, size: Size.Medium },
    [new Feature({ cha: 2 }, "ASI", "ASI", FeatureType.ASI)],
    [],
    [Language.Common, Language.Celestial],
    [
      new SubRace(
        {
          name: "Aasimar (Fallen)",
          descriptor: "Fallen Aasimar",
          plural: "Aasimar",
        },
        { movement: 30, maxAge: 160, size: Size.Medium },
        [new Feature({ str: 1 }, "ASI", "ASI", FeatureType.ASI)],
        []
      ),
      new SubRace(
        {
          name: "Aasimar (Protector)",
          descriptor: "Protector Aasimar",
          plural: "Aasimar",
        },
        { movement: 30, maxAge: 160, size: Size.Medium },
        [new Feature({ wis: 1 }, "ASI", "ASI", FeatureType.ASI)],
        []
      ),
      new SubRace(
        {
          name: "Aasimar (Scourge)",
          descriptor: "Scourge Aasimar",
          plural: "Aasimar",
        },
        { movement: 30, maxAge: 160, size: Size.Medium },
        [new Feature({ con: 1 }, "ASI", "ASI", FeatureType.ASI)],
        []
      ),
    ]
  ),
  //#endregion
];
export const Classes: Class[] = [
  new Class(
    "Fighter",
    [],
    1,
    10,
    [StatNames.str, StatNames.con],
    [
      Skills.acrobatics,
      Skills.animalHandling,
      Skills.athletics,
      Skills.history,
      Skills.insight,
      Skills.intimidation,
      Skills.perception,
      Skills.survival,
    ],
    [Tags.lightArmor, Tags.mediumArmor, Tags.heavyArmor, Tags.shields],
    [Tags.simpleWeapons, Tags.martialWeapons]
  ),
  new Class(
    "Gunbreaker",
    [],
    1,
    10,
    [StatNames.str, StatNames.dex],
    [
      Skills.athletics,
      Skills.acrobatics,
      Skills.history,
      Skills.investigation,
      Skills.intimidation,
      Skills.persuasion,
      Skills.stealth,
      Skills.survival,
    ],
    [Tags.lightArmor, Tags.mediumArmor, Tags.heavyArmor, Tags.shields],
    [Tags.simpleWeapons, Tags.martialWeapons, Tags.pistols, Tags.muskets],
    [Tags["Smith's Tools"]]
  ),
];
