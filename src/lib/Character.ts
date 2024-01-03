import { FeatureType, Language, Size, StatNames } from "./Enums";
import { Tags, type Tag } from "./Items";

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

export class Feature {
  name: string;
  description: string;
  feature: ArrayLike<unknown> | { [key: string]: unknown };
  type: FeatureType;

  constructor(
    feature: ArrayLike<unknown> | { [key: string]: unknown },
    name: string,
    description: string,
    type: FeatureType
  ) {
    this.feature = feature;
    this.name = name;
    this.description = description;
    this.type = type;
  }
}

class Skill {
  name: string;
  stat: StatNames;

  constructor(name: string, stat: StatNames) {
    this.name = name;
    this.stat = stat;
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
  features: ClassFeature[][];
  hitDice: number;
  savingThrows: StatNames[];
  skillProficiencies: Skill[];
  armorProficiencies: Tag[];
  weaponProficiencies: Tag[];
  toolProficiencies: Tag[];

  constructor(
    name: string,
    features: ClassFeature[][] = [],
    level = 1,
    dice: number,
    savingThrows: StatNames[],
    skills: Skill[],
    armor: Tag[] = [],
    weapons: Tag[] = [],
    tools: Tag[] = []
  ) {
    this.name = name;
    this.features = features;
    this.level = level;
    this.hitDice = dice;
    this.savingThrows = savingThrows;
    this.skillProficiencies = skills;
    this.armorProficiencies = armor;
    this.weaponProficiencies = weapons;
    this.toolProficiencies = tools;
  }
}

class ClassFeature extends Feature {
  constructor(
    feature:
      | ArrayLike<FightingStyle | Archetype | ClassFeature[]>
      | { [key: string]: unknown },
    name: string,
    description: string,
    type: FeatureType
  ) {
    super(feature, name, description, type);
  }
}

export class Archetype extends ClassFeature {
  level: number;
  constructor(
    name: string,
    description: string,
    level: number,
    features: ClassFeature[][]
  ) {
    super(features, name, description, FeatureType.Archetype);
    this.level = level;
  }
}

class FightingStyle extends Feature {
  constructor(
    feature: { [key: string]: unknown },
    name: string,
    description: string,
    type: FeatureType
  ) {
    super(feature, name, description, type);
  }
}

export const Skills = {
  athletics: new Skill("Athletics", StatNames.str),
  acrobatics: new Skill("Acrobatics", StatNames.dex),
  sleightOfHand: new Skill("Sleight of Hand", StatNames.dex),
  stealth: new Skill("Stealth", StatNames.dex),
  arcana: new Skill("Arcana", StatNames.int),
  history: new Skill("History", StatNames.int),
  investigation: new Skill("Investigation", StatNames.int),
  nature: new Skill("Nature", StatNames.int),
  religion: new Skill("Religion", StatNames.int),
  animalHandling: new Skill("Animal Handling", StatNames.wis),
  insight: new Skill("Insight", StatNames.wis),
  medicine: new Skill("Medicine", StatNames.wis),
  perception: new Skill("Perception", StatNames.wis),
  survival: new Skill("Survival", StatNames.wis),
  deception: new Skill("Deception", StatNames.cha),
  intimidation: new Skill("Intimidation", StatNames.cha),
  performance: new Skill("Performance", StatNames.cha),
  persuasion: new Skill("Persuasion", StatNames.cha),
};

export const RaceFeatures = {
  lapineHop: new Feature(
    {},
    "Lapine Hop",
    "Your maximum high jump and long jump distances are 10ft. higher than how it would be normally calculated.",
    FeatureType.RaceFeature
  ),
  lucky: new Feature(
    { reroll: 1 },
    "Lucky",
    "When you roll a 1 on an attack roll, ability check, or saving throw, you can re-roll the die and must use the new roll.",
    FeatureType.RaceFeature
  ),
  maskOfTheWild: new Feature(
    {},
    "Mask of the Wild",
    "You can attempt to hide even when you are only lightly obscured by foliage, heavy rain, falling snow, mist, and other natural phenomena.",
    FeatureType.RaceFeature
  ),
  speakWithSmallAnimals: new Feature(
    {},
    "Speak with Small Beasts",
    "Through sounds and gestures, you can communicate simple ideas with Small or smaller beasts.",
    FeatureType.RaceFeature
  ),
};

export const FightingStyles = {
  archery: new FightingStyle(
    { ranged: 2 },
    "Archery",
    "You gain a +2 bonus to attack rolls you make with ranged weapons.",
    FeatureType.FightingStyle
  ),
  blindFighting: new FightingStyle(
    { blindsight: 10 },
    "Blind Fighting",
    "You have blindsight with a range of 10 feet. Within that range, you can effectively see anything that isn't behind total cover, even if you're blinded or in darkness. Moreover, you can see an invisible creature within that range, unless the creature successfully hides from you.",
    FeatureType.FightingStyle
  ),
  defense: new FightingStyle(
    { armor: 1 },
    "Defense",
    "While you are wearing armor, you gain a +1 bonus to AC.",
    FeatureType.FightingStyle
  ),
  dueling: new FightingStyle(
    { sword: 2 },
    "Dueling",
    "When you are wielding a melee weapon in one hand and no other weapons, you gain a +2 bonus to damage rolls with that weapon.",
    FeatureType.FightingStyle
  ),
  greatWeaponFighting: new FightingStyle(
    {},
    "Great Weapon Fighting",
    "When you roll a 1 or 2 on a damage die for an attack you make with a melee weapon that you are wielding with two hands, you can reroll the die and must use the new roll, even if the new roll is a 1 or a 2. The weapon must have the two-handed or versatile property for you to gain this benefit.",
    FeatureType.FightingStyle
  ),
  gunner: new FightingStyle(
    {},
    "Gunner",
    "You gain a +2 bonus to attack rolls you make with your Gunner Shot Attack action.",
    FeatureType.FightingStyle
  ),
  protection: new FightingStyle(
    {},
    "Protection",
    "When a creature you can see attacks a target other than you that is within 5 feet of you, you can use your reaction to impose disadvantage on the attack roll.",
    FeatureType.FightingStyle
  ),
  twoWeaponFighting: new FightingStyle(
    {},
    "Two-Weapon Fighting",
    "When you engage in two-weapon fighting, you can add your ability modifier to the damage of the second attack.",
    FeatureType.FightingStyle
  ),
};

export const ClassFeatures = {
  abilityScoreImprovement: new ClassFeature(
    {},
    "Ability Score Increase/Feat",
    "You get 2 points to increase your stats or you can choose a Feat",
    FeatureType.ASIFeat
  ),
  archetypeLevel: new ClassFeature({}, "Sub Class Feature", "You gain a feature granted by your Sub Class.", FeatureType.ArchetypeLevel),
  fighterStyle: new ClassFeature(
    [
      FightingStyles.archery,
      FightingStyles.blindFighting,
      FightingStyles.defense,
      FightingStyles.dueling,
      FightingStyles.greatWeaponFighting,
      FightingStyles.protection,
      FightingStyles.twoWeaponFighting,
    ],
    "Fighting Style",
    "You adopt a particular style of fighting as your specialty. Choose one of the following options. You can't take the same Fighting Style option more than once, even if you get to choose again.",
    FeatureType.Set
  ),
  fighterArchetypes: new ClassFeature(
    [
      new Archetype(
        "Arcane Archer",
        "An Arcane Archer studies a unique elven method of archery that weaves magic into attacks to produce supernatural effects. Arcane Archers are some of the most elite warriors among the elves. They stand watch over the fringes of elven domains, keeping a keen eye out for trespassers and using magic-infused arrows to defeat monsters and invaders before they can reach elven settlements. Over the centuries, the methods of these elf archers have been learned by members of other races who can also balance arcane aptitude with archery.",
        1,
        []
      ),
      new Archetype(
        "Battle Master",
        "Those who emulate the archetypal Battle Master employ martial techniques passed down through generations. To a Battle Master, combat is an academic field, sometimes including subjects beyond battle such as weaponsmithing and calligraphy. Not every fighter absorbs the lessons of history, theory, and artistry that are reflected in the Battle Master archetype, but those who do are well-rounded fighters of great skill and knowledge.",
        1,
        [
          [
            new ClassFeature(
              {},
              "Student of War",
              "At 3rd level, you gain proficiency with one type of artisan's tools of your choice.",
              FeatureType.Proficiency
            ),
          ],
        ]
      ),
    ],
    "Martial Archetype",
    "At 3rd level, you choose an archetype from the list available that you strive to emulate in your combat styles and techniques. The archetype you choose grants you features at 3rd level and again at 7th, 10th, 15th, and 18th level.",
    FeatureType.Set
  ),
  gunbreakerStyle: new ClassFeature(
    [
      FightingStyles.defense,
      FightingStyles.dueling,
      FightingStyles.greatWeaponFighting,
      FightingStyles.gunner,
      FightingStyles.protection,
      FightingStyles.twoWeaponFighting,
    ],
    "Fighting Style",
    "You adopt a particular style of fighting as your specialty, Choose one of the following options. You can't take a Fighting Style option more than once, even if you later get to choose again.",
    FeatureType.Set
  ),
  gunbreakerArchetypes: new ClassFeature(
    [],
    "Gunbreaker Archetype",
    "At 3rd level, you select select your Gunbreaker style. The Breaker style focuses on weakening foes with special Munitions, the Lionhart style which focuses on enhancing the damage dealt with the weapon's blows and the Revolver style which focuses on ranged combat.",
    FeatureType.Set
  ),
  secondWind: new ClassFeature(
    { action: "Second Wind" },
    "Second Wind",
    "You have a limited well of stamina that you can draw on to protect yourself from harm. On your turn, you can use a bonus action to regain hit points equal to 1d10 + your fighter level. \nOnce you use this feature, you must finish a short or long rest before you can use it again.",
    FeatureType.Action
  ),
  actionSurge: new ClassFeature(
    { action: "Action Surge" },
    "Action Surge",
    "You can push yourself beyond your normal limits for a moment. On your turn, you can take one additional action. \nOnce you use this feature, you must finish a short or long rest before you can use it again.",
    FeatureType.Action
  ),
  indomitable: new ClassFeature(
    {},
    "Indomitable",
    "You can reroll a saving throw that you fail. If you do so, you must use the new roll, and you can't use this feature again until you finish a long rest.",
    FeatureType.Action
  ),
  extraAttack: new ClassFeature(
    { attack: 1 },
    "Extra Attack",
    "You may make another attack roll when using your Attack action.",
    FeatureType.Action
  ),
  armsSmith: new ClassFeature(
    {},
    "Arms Smith",
    "You have learned how to modify weaponry to incorporate a gunfire into their function. You spend 1 day of time working on your weapon to complete the conversion process.",
    FeatureType.Flavor
  ),
};

export const Races: Race[] = [
  new Race(
    { name: "Human", descriptor: "Human", plural: "Humans" },
    { movement: 30, maxAge: 100, size: Size.Medium },
    [new Feature({ all: 1 }, "ASI", "ASI", FeatureType.ASI)],
    [],
    [Language.Common, Language.Extra]
  ),
  new Race(
    { name: "Viera", descriptor: "Vieran", plural: "Viera" },
    { movement: 35, maxAge: 240, size: Size.Medium },
    [new Feature({ dex: 2 }, "ASI", "ASI", FeatureType.ASI)],
    [
      RaceFeatures.lapineHop,
      RaceFeatures.lucky,
      RaceFeatures.maskOfTheWild,
      RaceFeatures.speakWithSmallAnimals,
    ],
    [Language.Common, Language.Vieran],
    [
      new SubRace(
        { name: "Rava", descriptor: "Rava", plural: "Rava" },
        { movement: 35, maxAge: 240, size: Size.Medium },
        [new Feature({ wis: 1 }, "ASI", "ASI", FeatureType.ASI)],
        [
          new Feature(
            { proficiency: Skills.intimidation },
            "Powerful Presence",
            "You gain proficiency in the Intimidate skill",
            FeatureType.Proficiency
          ),
        ]
      ),
      new SubRace(
        { name: "Veena", descriptor: "Veena", plural: "Veena" },
        { movement: 35, maxAge: 240, size: Size.Medium },
        [new Feature({ int: 1 }, "ASI", "ASI", FeatureType.ASI)],
        [
          new Feature(
            { proficiency: Skills.persuasion },
            "Approachable",
            "You gain proficiency in the Persuasion skill",
            FeatureType.Proficiency
          ),
        ]
      ),
    ]
  ),
];
export const Classes: Class[] = [
  new Class(
    "Fighter",
    [
      [ClassFeatures.fighterStyle, ClassFeatures.secondWind],
      [ClassFeatures.actionSurge],
      [ClassFeatures.fighterArchetypes],
      [ClassFeatures.abilityScoreImprovement],
      [ClassFeatures.extraAttack],
      [ClassFeatures.abilityScoreImprovement],
      [ClassFeatures.archetypeLevel],
      [ClassFeatures.abilityScoreImprovement],
      [ClassFeatures.indomitable],
      [ClassFeatures.archetypeLevel],
      [ClassFeatures.extraAttack],
      [ClassFeatures.abilityScoreImprovement],
      [ClassFeatures.indomitable],
      [ClassFeatures.abilityScoreImprovement],
      [ClassFeatures.archetypeLevel],
      [ClassFeatures.abilityScoreImprovement],
      [ClassFeatures.actionSurge, ClassFeatures.indomitable],
      [ClassFeatures.archetypeLevel],
      [ClassFeatures.abilityScoreImprovement],
      [ClassFeatures.extraAttack],
    ],
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
    [
      [ClassFeatures.armsSmith],
      [ClassFeatures.gunbreakerStyle],
      [],
      [ClassFeatures.abilityScoreImprovement],
      [ClassFeatures.extraAttack],
      [],
      [],
      [ClassFeatures.abilityScoreImprovement],
      [],
      [],
      [],
      [ClassFeatures.abilityScoreImprovement],
      [],
      [],
      [],
      [ClassFeatures.abilityScoreImprovement],
      [],
      [],
      [ClassFeatures.abilityScoreImprovement],
      [],
    ],
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
