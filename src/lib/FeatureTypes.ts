import type { StatNames } from "./Enums";
import type { Tag } from "./Items";
import { Skill, Skills } from "./Structures";

export class Feature {
  name: string;
  description: string;

  constructor(name: string, description: string) {
    this.name = name;
    this.description = description;
  }
}

export class ASIFeature extends Feature {
  stat: StatNames;
  value: number;

  /**
   * ASIFeature
   *
   * Default Ability Score Increase (Class Implementation)
   */
  constructor();
  /**
   * ASIFeature
   *
   * Creates a global Ability Score Increase
   * @param value Increase each Ability Score by this amount
   */
  constructor(value: number);
  /**
   * ASIFeature
   *
   * Creates a specific Ability Score Increase
   * @param value Increase specified Ability Score by this amount
   * @param stat The Ability Score to increase
   */
  constructor(value: number, stat: StatNames);
  constructor(value: number = 0, stat?: StatNames) {
    if (stat == null) {
      if (value == 0) {
        super(
          "Ability Score Increase",
          "You get 2 points to increase your stats, or you may choose a Feat"
        );
      } else {
        super(
          "Ability Score Increase",
          `Your ability scores each increase by ${value}`
        );
      }
    } else {
      super(
        "Ability Score Increase",
        `Your ${stat} score increases by ${value}`
      );
    }
    this.stat = stat;
    this.value = value;
  }
}

export class FeatureSet extends Feature {
  features: Feature[];
  expandable: boolean;
  choice: boolean;

  constructor(
    name: string,
    description: string,
    features: Feature[],
    expandable: boolean = true,
    choice: boolean = false
  ) {
    super(name, description);
    this.features = features;
    this.expandable = expandable;
    this.choice = choice;
  }
}

export class FeatureProficiency extends Feature {
    proficiency: Skill | Tag
  half: boolean;

  constructor(skill: Skill, name: string);
  constructor(item: Tag, name: string);
  constructor(proficiency: Skill | Tag, name: string, half: boolean = false) {
    if (proficiency.constructor === Skill) {
        super(name, `You gain proficiency in the ${proficiency.name}`);
    }
    super(name, `You gain proficiency in the `);
    this.half = half
  }
}
