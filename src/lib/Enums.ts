export enum Size {
  Tiny,
  Small,
  Medium,
  Large,
  Huge,
  Gargantuan,
}

export enum StatNames {
  str = "Strength",
  dex = "Dexterity",
  con = "Constitution",
  int = "Intelligence",
  wis = "Wisdom",
  cha = "Charisma",
}

export enum Language {
  Common,
  Elvish,
  Vieran,
  Primordial,
  Celestial,
  Extra,
}

export enum ActionTypes {
  Action = "Action",
  BonusAction = "Bonus Action",
  FreeAction = "Free Action",
}

export enum Rests {
  LongRest = "Long Rest",
  ShortRest = "Short Rest",
}

export enum FeatureType {
  ASI, //Handled
  ArchetypeLevel,
  Unlock, //Handled?
  UnlockSet, //Handled?
  RaceFeature,
  ASIFeat, //Handled
  Flavor, //Handled
  Passive,
  Set, //Handled?
  FightingStyle,
  Action,
  Archetype, //Needs Rework
}

export enum UnlockType {
  Spell,
  SkillProficiency,
  HalfProficiency,
  ItemProficiency,
}
