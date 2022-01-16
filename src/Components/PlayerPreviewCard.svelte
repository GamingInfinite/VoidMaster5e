<script>
  // Code here
  import "../../public/pagecss/PlayerCard.less";

  export let characterName;
  export let characterRace;
  export let characterClasses;

  let name;
  let race;
  let classes;
  let stats;

  if (characterClasses.length > 1) {
    classes = "Classes: ";
    for (let i = 0; i < characterClasses.length; i++) {
      switch (i) {
        case 0:
          classes += characterClasses[i];
          break;

        default:
          classes += ", " + characterClasses[i];
          break;
      }
    }
  } else {
    classes = "Class: " + characterClasses[0];
  }
</script>

<div class="player-wrapper d-flex">
  <div class="avatar">
    <img
      src="https://www.dndbeyond.com/content/skins/waterdeep/images/characters/default-avatar-builder.png"
      alt="alt"
      class="avatarImage"
    />
  </div>
  <div class="info">
    <div class="cardTitle">
      <div class="name">
        {characterName}
      </div>
    </div>
    <div class="cardBody">
      <div class="race">
        Race: {characterRace}
      </div>
      <div class="classes">
        {classes}
      </div>
    </div>
    <div class="cardStats">
      {stats}
    </div>
  </div>
</div>
