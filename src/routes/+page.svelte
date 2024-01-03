<script lang="ts">
  import { Classes, PlayerCreationData, Races } from "$lib/Character";
  import { diceRoll } from "$lib/DiceUtils";
  import { FeatureType, Language, Size, StatNames } from "$lib/Enums";
  import FeatureList from "$lib/components/FeatureList.svelte";
  import { toasts } from "../stores";

  enum StatModes {
    Dice = "Dice",
    stdArray = "Standard Array",
    pntBuy = "Point Buy",
    Manual = "Manual",
  }

  // test stuff because im making the character creator to start
  let creationData: PlayerCreationData = new PlayerCreationData();
  let statMode = StatModes.Dice;
  const standardArray = [8, 10, 12, 13, 14, 15];

  const digitRegex = /[0-9]/;

  function rollStat(): number {
    let dice = [0, 0, 0, 0];
    let diceSum = 0;
    for (let i = 0; i < dice.length; i++) {
      let die = diceRoll(6);
      if (die == 1) {
        diceRoll(6);
      }
      dice[i] = die;
    }
    let indexLowest = 0;
    for (let i = 0; i < dice.length; i++) {
      if (dice[i] < dice[indexLowest]) {
        indexLowest = i;
      }
    }
    let toastString = "";
    for (let i = 0; i < dice.length; i++) {
      const element = dice[i];
      toastString += "<p";
      if (i == indexLowest) {
        toastString += " class='line-through'>";
      } else {
        toastString += " class='font-bold'>";
      }
      toastString += element + "</p>";
    }
    dice.splice(indexLowest, 1);
    for (let die of dice) {
      diceSum += die;
    }
    toastString += "<p class='font-bold'>= " + diceSum + "</p>";
    $toasts = [
      ...$toasts,
      { title: "Dice Roll", body: toastString, dice: "4d6kh3" },
    ];
    return diceSum;
  }
</script>

<svelte:head>
  <title>VoidMaster 5e</title>
</svelte:head>

<div class="grid grid-cols-2 gap-4 mt-4">
  <div class="flex flex-col gap-4 justify-self-center w-full">
    <div class="flex flex-row justify-center">
      <input
        type="text"
        placeholder="Character Name"
        class="input input-bordered w-full max-w-xs"
        bind:value={creationData.name}
      />
    </div>
    <div class="flex flex-row justify-center">
      <div class="join">
        <select
          class="select select-bordered w-full max-w-xs join-item"
          bind:value={creationData.race}
        >
          <option disabled selected value={undefined}>Select A Race</option>
          {#each Races as race}
            <option value={race}>{race.name}</option>
          {/each}
        </select>
        {#if creationData.race}
          {#if creationData.race.subraces.length > 0}
            <select
              class="select select-bordered join-item"
              bind:value={creationData.subRace}
            >
              <option disabled selected value={-1}>Select A SubRace</option>
              {#each creationData.race.subraces as subrace, i}
                <option value={i}>{subrace.name}</option>
              {/each}
            </select>
          {/if}
        {/if}
      </div>
    </div>
    <div class="flex flex-row justify-center">
      <div class="flex flex-col w-full gap-2">
        <div class="flex flex-row justify-center">
          <button
            class="btn btn-ghost input-bordered min-w-24"
            on:click={() => {
              creationData.classes.push(undefined);
              creationData.classes = creationData.classes;
            }}>+</button
          >
        </div>
        {#each creationData.classes as _, i}
          <div class="flex flex-row justify-center gap-2">
            <div class="join">
              <select
                class="select select-bordered w-full max-w-xs join-item"
                bind:value={creationData.classes[i]}
              >
                <option disabled selected value={undefined}
                  >Select A Class</option
                >
                {#each Classes as classt}
                  {#if !creationData.classes.includes(classt) || creationData.classes[i] == classt}
                    <option value={classt}>{classt.name}</option>
                  {/if}
                {/each}
              </select>
              {#if creationData.classes[i]}
                <input
                  type="number"
                  class="input input-bordered w-full max-w-xs join-item"
                  max="20"
                  min="1"
                  bind:value={creationData.classes[i].level}
                />
              {/if}
            </div>
            <button
              class="btn btn-error"
              on:click={() => {
                console.log(i);
                creationData.classes.splice(i, 1);
                creationData.classes = creationData.classes;
              }}>X</button
            >
          </div>
        {/each}
      </div>
    </div>
    <div class="flex flex-row justify-center">
      <select
        class="select select-bordered w-full max-w-xs"
        bind:value={statMode}
      >
        <option value={StatModes.Dice}>{StatModes.Dice}</option>
        <option value={StatModes.stdArray}>{StatModes.stdArray}</option>
        <option value={StatModes.pntBuy}>{StatModes.pntBuy}</option>
        <option value={StatModes.Manual}>{StatModes.Manual}</option>
      </select>
    </div>
    <div class="flex flex-row justify-center">
      <div class="grid grid-cols-3 gap-4">
        {#each Object.entries(creationData.baseStats) as [stat, value]}
          <div class="flex flex-col">
            <div class="flex flex-row justify-center">
              {StatNames[stat]}
            </div>
            <div class="flex flex-row justify-center">
              {#if statMode == StatModes.Dice}
                <div class="join">
                  <input
                    type="number"
                    {value}
                    class="input input-bordered w-full max-w-16 join-item"
                    disabled
                  />
                  <button
                    class="btn btn-warning join-item"
                    on:click={() => {
                      creationData.baseStats[stat] = rollStat();
                    }}
                  >
                    <img class="w-8 h-8" src="/icons/dice.svg" alt="Roll" />
                  </button>
                </div>
              {:else if statMode == StatModes.Manual}
                <input
                  type="number"
                  bind:value={creationData.baseStats[stat]}
                  class="input input-bordered w-full max-w-20"
                />
              {:else if statMode == StatModes.stdArray}
                <select
                  class="select select-bordered w-full max-w-xs"
                  bind:value={creationData.baseStats[stat]}
                >
                  <option disabled selected>Select A Value</option>
                  {#each standardArray as stdValue}
                    {#if !creationData.baseStats.includes(stdValue) || creationData.baseStats[stat] == stdValue}
                      <option value={stdValue}>{stdValue}</option>
                    {/if}
                  {/each}
                </select>
              {:else}
                This is not implemented yet
              {/if}
            </div>
          </div>
        {/each}
      </div>
    </div>
  </div>
  <div class="flex flex-col mr-4">
    <div class="flex flex-row font-bold text-4xl">
      {#if creationData.name}
        {creationData.name}
      {:else}
        Unnamed Character
      {/if}
    </div>
    {#if creationData.race || creationData.classes}
      <div class="flex flex-row gap-1">
        {#if creationData.classes.length > 0 && creationData.race}
          <p>
            {#if creationData.race.subraces[creationData.subRace]}
              {creationData.race.subraces[creationData.subRace].descriptor}
            {:else}
              {creationData.race.descriptor}
            {/if}
          </p>
        {:else if creationData.race}
          <p>
            {#if creationData.race.subraces[creationData.subRace]}
              {creationData.race.subraces[creationData.subRace].name}
            {:else}
              {creationData.race.name}
            {/if}
          </p>
        {/if}
        {#each creationData.classes as classt}
          {#if classt}
            <p>
              {classt.name}
            </p>
          {/if}
        {/each}
      </div>
      <!-- #region Race -->
      {#if creationData.race}
        <div class="flex flex-row gap-2">
          <p class="font-bold">Age.</p>
          <p>
            {creationData.race.plural} generally live up to {creationData.race
              .maxAge}.
          </p>
        </div>
        <div class="flex flex-row gap-2">
          <p class="font-bold">Speed.</p>
          <p>Your base walking speed is {creationData.race.movement}ft.</p>
        </div>
        <div class="flex flex-row gap-2">
          <p class="font-bold">Size.</p>
          <p>Your size is {Size[creationData.race.size]}.</p>
        </div>
        <div class="flex flex-row gap-2 items-center">
          <p class="font-bold">Languages.</p>
          <div class="flex flex-row gap-1 items-center">
            <p class="whitespace-nowrap">You can speak, read, and write</p>
            {#each creationData.race.languages as language, i}
              {#if i == creationData.race.languages.length - 2}
                <p class="whitespace-nowrap">{Language[language]}, and</p>
              {:else if i == creationData.race.languages.length - 1}
                {#if language == Language.Extra}
                  <select
                    class="select select-bordered w-full max-w-xs"
                    bind:value={creationData.race.languages[i]}
                  >
                    <option selected disabled value={Language.Extra}
                      >Select A Langauge</option
                    >
                    {#each Object.entries(Language) as [language, value]}
                      {#if !(language == "Common" || language == "Extra" || language.search(digitRegex) != -1)}
                        <option {value}>{language}</option>
                      {/if}
                    {/each}
                  </select>
                {:else}
                  {" " + Language[language]}.
                {/if}
              {:else}
                {Language[language]},
              {/if}
            {/each}
          </div>
        </div>
        <FeatureList list={creationData.race.ASIFeatures} />
        {#if creationData.race.subraces[creationData.subRace]}
          <FeatureList
            list={creationData.race.subraces[creationData.subRace].ASIFeatures}
          />
          <FeatureList
            list={creationData.race.subraces[creationData.subRace]
              .RacialAbilities}
          />
        {/if}
        <FeatureList list={creationData.race.RacialAbilities} />
      {/if}
      <!-- #endregion -->
      <!-- #region Classes -->
      {#if creationData.classes}
        {#each creationData.classes as classt}
          {#if classt}
            <!-- #region Item Proficiencies -->
            <!-- #region Armor Proficiencies -->
            <div class="flex flex-row gap-2">
              <p class="font-bold whitespace-nowrap">Armor.</p>
              <p class="truncate">
                You are proficient with the following Armor Types: {#each classt.armorProficiencies as armor, armorIndex}
                  {#if armorIndex == classt.armorProficiencies.length - 1}
                    {armor.name}.
                  {:else}
                    {armor.name + ", "}
                  {/if}
                {/each}
              </p>
            </div>
            <!-- #endregion -->
            <!-- #region Weapon Proficiencies -->
            <div class="flex flex-row gap-2">
              <p class="font-bold whitespace-nowrap">Weapon.</p>
              <p class="truncate">
                You are proficient with the following Weapon Types: {#each classt.weaponProficiencies as weapon, weaponindex}
                  {#if weaponindex == classt.weaponProficiencies.length - 1}
                    {weapon.name}.
                  {:else}
                    {weapon.name + ", "}
                  {/if}
                {/each}
              </p>
            </div>
            <!-- #endregion -->
            <!-- #region Tool Proficiencies -->
            {#if classt.toolProficiencies.length > 0}
              <div class="flex flex-row gap-2">
                <p class="font-bold whitespace-nowrap">Tools.</p>
                <p class="truncate">
                  You are proficient with the following Tools: {#each classt.toolProficiencies as tool, toolIndex}
                    {#if toolIndex == classt.toolProficiencies.length - 1}
                      {tool.name}.
                    {:else}
                      {tool.name + ", "}
                    {/if}
                  {/each}
                </p>
              </div>
            {/if}
            <!-- #endregion -->
            <!-- #endregion -->
            <!-- #region Saving Throws -->
            <div class="flex flex-row gap-2">
              <p class="font-bold whitespace-nowrap">Saving Throws.</p>
              <p class="truncate">
                You are proficient in the following Saving Throws: {#each classt.savingThrows as savingThrow, throwindex}
                  {#if throwindex == classt.savingThrows.length - 1}
                    {savingThrow}.
                  {:else}
                    {savingThrow + ", "}
                  {/if}
                {/each}
              </p>
            </div>
            <!-- #endregion -->
            <!-- #region Skill Proficiencies -->
            <div class="flex flex-row gap-2">
              <p class="font-bold whitespace-nowrap">Skill Proficiencies.</p>
              <p class="truncate">
                You may become proficient in 2 of the following skills: {#each classt.skillProficiencies as skill, skillIndex}
                  {#if skillIndex == classt.skillProficiencies.length - 1}
                    {skill.name}.
                  {:else}
                    {skill.name + ", "}
                  {/if}
                {/each}
              </p>
            </div>
            <!-- #endregion -->
            <!-- #region Level-Based Class Features -->
            <FeatureList list={classt.features} level={classt.level} />
            <!-- #endregion -->
          {/if}
        {/each}
      {/if}
      <!-- #endregion -->
    {/if}
  </div>
</div>
