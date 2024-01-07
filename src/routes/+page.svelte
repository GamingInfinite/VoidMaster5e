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
                  on:change={() => {
                    if (creationData.getTotalLevel() > 20) {
                      creationData.classes[i].level -=
                        creationData.getTotalLevel() - 20;
                    }
                  }}
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
                    class="btn btn-primary join-item"
                    on:click={() => {
                      creationData.baseStats[stat] = rollStat();
                    }}
                  >
                    <svg
                      class="w-8 h-8 fill-current"
                      viewBox="110 250 350 400"
                    >
                      <path
                        d="m328.73 272.36c-1.0593-0.0232-2.2036 0.23919-3.6546 0.73073l-160.8 47.216c-1.338 0.31267-1.2603 0.67334-0.14622 1.5349l142.74 113.95c2.6283 2.179 3.8646 2.4492 7.5282 1.3156l160.06-55.474c3.6722-1.3494 3.9274-1.6778 0.14636-4.1662l-140.48-102.76c-2.1688-1.5284-3.6434-2.3048-5.4085-2.3387zm-18.345 13.814c3.2021-0.0232 6.5824 0.32827 10.086 1.0963 14.016 3.073 23.956 11.638 22.146 19.076-1.8102 7.4379-14.635 10.967-28.651 7.8935-14.016-3.0731-23.956-11.565-22.146-19.003 1.3576-5.5786 8.9586-9.0156 18.564-9.063zm-90.63 27.555c3.2021-0.0232 6.6554 0.32813 10.159 1.0964 14.016 3.073 23.883 11.565 22.073 19.003-1.8102 7.4381-14.635 11.04-28.651 7.9667-14.016-3.073-23.883-11.638-22.073-19.076 1.3577-5.5786 8.8855-8.9426 18.491-8.99zm137.33 7.0164c3.202-0.0232 6.6555 0.40133 10.159 1.1695 14.016 3.0728 23.883 11.565 22.073 19.003-1.8102 7.438-14.635 10.967-28.651 7.8935-14.016-3.0729-23.883-11.565-22.073-19.003 1.3577-5.5783 8.8855-9.0156 18.492-9.063zm-202.89 8.8438c-0.2935 0.0748-0.38831 0.53334-0.58471 1.4619l-36.252 181.33c-0.42235 1.8862-0.3482 2.3536 1.3887 3.8739l137.7 118.7c3.2029 3.0612 3.8757 3.0218 4.3122-0.73091l40.126-183.89c0.84081-2.5054-0.0249-3.8837-1.4618-5.0432l-143.77-114.81c-0.74001-0.62428-1.1682-0.95149-1.4618-0.87718zm111.83 20.684c3.202-0.0232 6.6554 0.32815 10.159 1.0965 14.016 3.073 23.883 11.565 22.073 19.003-1.8102 7.4381-14.635 10.967-28.651 7.8937-14.016-3.073-23.883-11.565-22.073-19.003 1.3576-5.5787 8.8856-8.9426 18.491-8.9901zm138.8 6.0664c3.202-0.0232 6.6554 0.32815 10.159 1.0963 14.016 3.0731 23.883 11.565 22.073 19.003-1.8102 7.4381-14.635 11.04-28.651 7.9668-14.016-3.0731-23.883-11.638-22.073-19.076 1.3577-5.5783 8.8856-8.9423 18.492-8.9899zm-241.71 6.651c0.54012-0.0537 1.1314-0.0294 1.681 0 6.5957 0.3492 13.738 6.5306 17.907 16.445 5.5583 13.219 3.7052 28.055-4.093 33.109-7.7982 5.0539-18.634-1.5446-24.192-14.764-5.5583-13.219-3.7054-28.055 4.093-33.109 1.4621-0.94771 2.9845-1.5207 4.6046-1.6812zm150.64 23.827c3.202-0.0231 6.6554 0.32816 10.159 1.0965 14.016 3.0728 23.883 11.565 22.073 19.003-1.8103 7.438-14.635 10.967-28.651 7.8936-14.016-3.0731-23.883-11.565-22.073-19.003 1.3576-5.5785 8.8855-8.9425 18.491-8.99zm168.18 5.0431c-0.30728 0.0632-0.73942 0.17087-1.2425 0.36543l-164.38 57.02c-3.348 1.3784-3.2476 1.9411-3.8007 4.4584l-40.053 183.31c-0.13597 2.6988-1.1302 3.9269 2.0465 2.4852l161.97-60.518c3.1428-1.5036 3.7452-1.7677 4.093-4.8238l42.026-180.75c0.34821-1.2733 0.26378-1.7272-0.65777-1.5348zm-26.677 29.747c4.6284 0.0748 8.2604 2.3262 9.8671 6.6512 3.2131 8.6497-2.9745 22.494-13.887 30.916-10.912 8.4224-22.368 8.2114-25.581-0.43849-3.2134-8.6498 2.9744-22.494 13.887-30.917 5.4562-4.2113 11.086-6.2873 15.714-6.2127zm-199.24 15.86c6.6789 0.17076 13.965 6.4487 18.199 16.518 5.5583 13.219 3.7783 28.055-4.0199 33.109s-18.634-1.6175-24.192-14.837c-5.5583-13.219-3.7054-27.982 4.093-33.036 1.4622-0.94772 2.9841-1.5209 4.6046-1.6812 0.43892-0.0453 0.87044-0.0842 1.3156-0.0726zm-58.69 21.196c6.6788 0.17077 13.965 6.4488 18.199 16.518 5.5583 13.219 3.7783 28.055-4.0199 33.109s-18.634-1.6176-24.192-14.837c-5.5583-13.219-3.7052-27.982 4.093-33.036 1.4621-0.94772 2.9841-1.521 4.6045-1.6812 0.43892-0.0453 0.87046-0.0842 1.3157-0.0726zm-57.813 20.976c0.53992-0.0537 1.1313-0.0273 1.6809 0 6.5957 0.3492 13.665 6.6037 17.834 16.518 5.5583 13.219 3.7784 27.982-4.0198 33.036-7.7983 5.054-18.634-1.5446-24.192-14.764-5.5583-13.219-3.7053-28.055 4.093-33.109 1.4622-0.94772 2.9845-1.5208 4.6046-1.6812zm254.06 17.541c4.529 0.1474 8.1393 2.3938 9.7208 6.6512 3.2134 8.6498-3.0476 22.494-13.96 30.916-10.912 8.4224-22.368 8.2115-25.581-0.43849-3.2134-8.6497 3.0476-22.494 13.96-30.916 4.7742-3.6848 9.6414-5.7376 13.887-6.1395 0.68233-0.0653 1.3264-0.0937 1.9734-0.0726zm-164.23 58.691c0.54-0.0537 1.1313-0.0273 1.681 0 6.5956 0.34922 13.738 6.5305 17.907 16.445 5.5583 13.219 3.7053 28.055-4.093 33.109-7.7982 5.054-18.561-1.5446-24.119-14.764-5.5583-13.219-3.7784-28.055 4.0198-33.109 1.4622-0.94739 2.9845-1.5206 4.6046-1.6809zm97.281 19.003c4.6285 0.0748 8.2603 2.2531 9.867 6.578 3.2132 8.6497-2.9744 22.494-13.887 30.916-10.912 8.4224-22.368 8.2844-25.581-0.36546-3.2132-8.6496 2.9744-22.494 13.887-30.917 5.4562-4.2111 11.086-6.287 15.714-6.2123z"
                      />
                    </svg>
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
        <p>
          {#if creationData.getTotalLevel() > 0}
            {creationData.getTotalLevel()}
          {/if}
          {#if creationData.classes.length > 0 && creationData.race}
            {#if creationData.race.subraces[creationData.subRace]}
              {creationData.race.subraces[creationData.subRace].descriptor}
            {:else}
              {creationData.race.descriptor}
            {/if}
          {:else if creationData.race}
            {#if creationData.race.subraces[creationData.subRace]}
              {creationData.race.subraces[creationData.subRace].name}
            {:else}
              {creationData.race.name}
            {/if}
          {/if}
          {#each creationData.classes as classt}
            {#if classt}
              {classt.name + " (" + classt.level + ") "}
            {/if}
          {/each}
        </p>
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
            <FeatureList list={classt.features} level={classt._level} />
            <!-- #endregion -->
          {/if}
        {/each}
      {/if}
      <!-- #endregion -->
    {/if}
  </div>
</div>

<div class="fixed left-4 bottom-4">
  <div class="dropdown dropdown-top">
    <div tabindex="0" role="button" class="btn m-1">
      Theme
      <svg
        width="12px"
        height="12px"
        class="h-2 w-2 fill-current opacity-60 inline-block"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 2048 2048"
        ><path d="M1799 349l242 241-1017 1017L7 590l242-241 775 775 775-775z"
        ></path></svg
      >
    </div>
    <!-- svelte-ignore a11y-no-noninteractive-tabindex -->
    <ul
      tabindex="0"
      class="dropdown-content z-[1] p-2 shadow-2xl bg-base-300 rounded-box w-52"
    >
      <li>
        <input
          type="radio"
          name="theme-dropdown"
          class="theme-controller btn btn-sm btn-block btn-ghost justify-start"
          aria-label="Dark"
          value="dark"
        />
      </li>
      <li>
        <input
          type="radio"
          name="theme-dropdown"
          class="theme-controller btn btn-sm btn-block btn-ghost justify-start"
          aria-label="Retro"
          value="retro"
        />
      </li>
      <li>
        <input
          type="radio"
          name="theme-dropdown"
          class="theme-controller btn btn-sm btn-block btn-ghost justify-start"
          aria-label="Valentine"
          value="valentine"
        />
      </li>
      <li>
        <input
          type="radio"
          name="theme-dropdown"
          class="theme-controller btn btn-sm btn-block btn-ghost justify-start"
          aria-label="Autumn"
          value="autumn"
        />
      </li>
    </ul>
  </div>
</div>
