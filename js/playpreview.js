/* ================================================================
    THE SHATTERED CROWN — playpreview.js
    Powers the interactive branching story on the Play Preview page.
    Uses Vue 3 (loaded via CDN script tag in the HTML).

    How it works:
      - SCENES holds all the story content and choices
      - currentScene finds the right scene object based on sceneId
      - choose() saves the player's choice and moves to the next scene
      - ENDING_DATA holds the three possible ending texts
      - endingText picks a personalised paragraph based on the choices made
================================================================ */


/* ================================================================
   SCENES
   Each scene has:
     id       — a unique name used to navigate between scenes
     chapter  — shown in the progress bar label
     speaker  — shown above the scene (who is speaking)
     scene    — the location label shown on the card
     progress — 0 to 100, drives the progress bar width
     content  — an array of text blocks (narration, dialogue, emphasis)
     choices  — buttons the player can click to move to the next scene
     isEnding — true on the final scenes (shows the ending card instead of choices)
     endingType — which ending this is (alliance, caution, or alone)
================================================================ */
var SCENES = [

  /* ------ OPENING ------ */
  {
    id:       'start',
    chapter:  'Prologue',
    speaker:  '',
    scene:    'The Twilight Forest, Deep Night',
    progress: 8,
    content: [
      { type: 'narration', text: 'The Twilight Forest does not feel like day and it does not feel like night. It feels like both at once, which is exactly why it makes most people uncomfortable and exactly why it is the only place left where people like Amara and Aria can go.' },
      { type: 'narration', text: 'Amara arrived first. She has been here three days and has not quite stopped looking over her shoulder. She is sitting near a small fire when she hears it: footsteps. Not animal ones. Human ones, moving carefully through the undergrowth, trying not to be heard.' },
      { type: 'narration', text: 'She puts her hand out. The fire goes a little darker. She waits.' },
    ],
    choices: [
      { label: 'Call out into the dark and ask who is there',                         resultText: 'You spoke first. Your voice carried through the trees.',             logText: 'Called out into the dark',     next: 'call_out'       },
      { label: 'Stay quiet and watch to see who it is before doing anything',         resultText: 'You held still and let the forest do the talking.',                  logText: 'Stayed quiet and watched',    next: 'watch_and_wait' },
      { label: 'Let the dark magic rise a little and be ready for whatever comes',    resultText: 'The dark magic answered before you decided what to say.',            logText: 'Reached for the dark magic',  next: 'ready_magic'    },
    ],
  },

  /* ------ BRANCH A: CALL OUT ------ */
  {
    id:       'call_out',
    chapter:  'Act I',
    speaker:  'Amara',
    scene:    'The Forest Edge, A Voice in the Dark',
    progress: 28,
    content: [
      { type: 'dialogue',  text: '"I can hear you. I am not going to hurt you. But I need you to come where I can see you or I am putting this fire out and we can both sit in the dark."' },
      { type: 'narration', text: 'The footsteps stop. Then, slowly, a girl steps into the edge of the firelight. She looks exhausted. She looks like she has been walking for a long time. Her hands are open at her sides, which is either a sign of trust or a sign that she is too tired to be defensive anymore.' },
      { type: 'dialogue',  text: '"I am not from Solmere," the girl says, as if this is the most important thing. "My name is Aria."' },
    ],
    choices: [
      { label: 'Invite her to sit by the fire and ask where she came from',         resultText: 'You made space at the fire. She took it.',                               logText: 'Invited Aria to the fire',         next: 'invite_sit' },
      { label: 'Ask how she found this part of the forest, it is not easy to find', resultText: 'You asked the practical question. It told you more than you expected.',   logText: 'Asked how she found the forest',    next: 'ask_how'    },
    ],
  },

  {
    id:       'invite_sit',
    chapter:  'Act II',
    speaker:  'Amara',
    scene:    'The Campfire, A Careful Beginning',
    progress: 55,
    content: [
      { type: 'dialogue',  text: '"Sit down. You look like you are about to fall over."' },
      { type: 'narration', text: 'Aria sits. For a moment they just look at each other across the fire. Two girls. One with warmth flickering gold in her eyes. One with something deep and starless behind hers.' },
      { type: 'dialogue',  text: '"You have dark magic," Aria says, very quietly. Not an accusation. Just a recognition. "I saw the way the fire moved when you heard me."' },
      { type: 'narration', text: 'Amara does not deny it.' },
      { type: 'dialogue',  text: '"You have light," she says instead. "You are doing everything you can not to let it show."' },
      { type: 'narration', text: 'Another silence. Something in the forest shifts. Far away, something large and old and patient moves through the trees toward them, drawn by what it senses in this clearing: two halves of something that has been waiting a long time to be whole.' },
    ],
    choices: [
      { label: 'Tell Aria about the crown pieces you have felt stirring beneath the forest', resultText: 'You told her the truth. She listened without looking away.',       logText: 'Told Aria about the crown stirring',  next: 'ending_alliance' },
      { label: 'Ask if Aria is being hunted and by whom',                                    resultText: 'You asked the practical question. The answer made you careful.',   logText: 'Asked Aria if she was being hunted',  next: 'ending_caution'  },
    ],
  },

  {
    id:       'ask_how',
    chapter:  'Act II',
    speaker:  'Aria',
    scene:    'The Forest Edge, A Question Answered',
    progress: 55,
    content: [
      { type: 'narration', text: 'Aria pauses at the question. She looks at the trees around them as if measuring something.' },
      { type: 'dialogue',  text: '"I followed the place where the light stops trying to be brighter than everything else. I followed the place where the dark stops trying to swallow everything. The middle."' },
      { type: 'narration', text: 'Amara looks at her more carefully.' },
      { type: 'dialogue',  text: '"You have light magic," she says.' },
      { type: 'dialogue',  text: '"You have dark," Aria says back.' },
      { type: 'narration', text: 'Neither of them is frightened by this. Both of them have spent enough time being frightened of themselves that there is something almost restful about being recognized by someone who already knows the shape of the secret.' },
      { type: 'emphasis',  text: 'Something in the forest stirs. The Dusk Wolves are moving closer. They have been waiting for this moment longer than either girl has been alive.' },
    ],
    choices: [
      { label: 'Stay where you are and let whatever is in the forest come to you', resultText: 'You held your ground. The forest noticed.',                  logText: 'Stayed still and waited for the forest', next: 'ending_alliance' },
      { label: 'Suggest moving deeper into the forest where it is safer',          resultText: 'You chose caution. Aria followed without argument.',         logText: 'Moved deeper into the forest',           next: 'ending_caution'  },
    ],
  },

  /* ------ BRANCH B: WATCH AND WAIT ------ */
  {
    id:       'watch_and_wait',
    chapter:  'Act I',
    speaker:  '',
    scene:    'The Campfire, Staying Still',
    progress: 28,
    content: [
      { type: 'narration', text: 'Amara goes very still. The fire stays low. She breathes carefully, the way you breathe when you have had to be invisible before.' },
      { type: 'narration', text: 'The footsteps come closer. A branch moves. And then she sees a girl at the edge of the light, stopping herself a few feet short of the clearing, also very still, also watching.' },
      { type: 'narration', text: 'For a moment they stare at each other across the dark. Two people who have been trained by different kingdoms to be afraid of different things, standing in the only place where both of them can breathe.' },
      { type: 'narration', text: 'Then the girl at the edge of the clearing does something unexpected. She sits down right where she is, still outside the firelight, and says in a clear, tired voice:' },
      { type: 'dialogue',  text: '"I am not a threat. I am just very tired. I will stay over here if that is easier."' },
    ],
    choices: [
      { label: 'Expand the firelight toward her side of the clearing', resultText: 'The fire grew toward her. She understood what it meant.',    logText: 'Extended the firelight toward Aria', next: 'expand_fire' },
      { label: 'Ask her name before doing anything else',              resultText: 'You asked her name. It was the right first question.',       logText: 'Asked for her name first',          next: 'ask_name'    },
    ],
  },

  {
    id:       'expand_fire',
    chapter:  'Act II',
    speaker:  'Amara',
    scene:    'The Campfire, A Small Gesture',
    progress: 55,
    content: [
      { type: 'narration', text: 'Amara reaches toward the fire. The flame responds to her, growing a little wider, casting light further across the clearing until it reaches the girl sitting in the undergrowth.' },
      { type: 'narration', text: 'It is not an obvious thing, the way she does it. But it is also not something you can do without magic, and the girl sees it.' },
      { type: 'narration', text: 'She does not run. She looks at the fire, then at Amara, and then something in her own hands starts to glow, very faintly, the kind of light that a person tries very hard not to produce and produces anyway.' },
      { type: 'dialogue',  text: '"I am Aria. From Umbrath. I have light magic. They were going to kill me for it."' },
      { type: 'narration', text: 'Amara listens to this. Then she says:' },
      { type: 'dialogue',  text: '"I am Amara. From Solmere. I have dark magic. They were going to kill me for it."' },
      { type: 'narration', text: 'A pause.' },
      { type: 'dialogue',  text: '"So." Aria looks around at the forest. "Where do we go from here?"' },
    ],
    choices: [
      { label: 'Tell her about the feeling you have had since you arrived, that something here is waking up', resultText: 'You told her the thing you had not told anyone. She understood it immediately.',  logText: 'Told Aria something was waking in the forest', next: 'ending_alliance' },
      { label: 'Say you do not know yet, but you think you should figure it out together',                    resultText: 'You did not have an answer yet. You offered her the question instead.',            logText: 'Said you would figure it out together',        next: 'ending_caution'  },
    ],
  },

  {
    id:       'ask_name',
    chapter:  'Act II',
    speaker:  'Amara',
    scene:    'The Forest Edge, First Words',
    progress: 55,
    content: [
      { type: 'dialogue',  text: '"What is your name?"' },
      { type: 'dialogue',  text: '"Aria." "Where are you from?" "Umbrath. You?" "Solmere."' },
      { type: 'narration', text: 'Another silence. Umbrath and Solmere are not friends. Everyone knows this. Everyone also knows that two girls sitting on opposite sides of a campfire in the only forest in the world that is neither light nor dark is not a normal situation.' },
      { type: 'dialogue',  text: '"You have magic," Amara says.' },
      { type: 'dialogue',  text: '"So do you," Aria says. "The wrong kind, for where you are from."' },
      { type: 'dialogue',  text: '"Same for you."' },
      { type: 'narration', text: 'Aria moves into the firelight. She looks at Amara steadily.' },
      { type: 'dialogue',  text: '"Do you think it is a coincidence that we are both here?" she asks.' },
    ],
    choices: [
      { label: 'Say no, you do not think it is a coincidence at all', resultText: 'You said it plainly. She did not look surprised.',  logText: 'Said it was not a coincidence',   next: 'ending_alliance' },
      { label: 'Say you are not sure yet, but you are willing to find out', resultText: 'You gave the honest answer. She respected it.', logText: 'Said you were willing to find out', next: 'ending_caution'  },
    ],
  },

  /* ------ BRANCH C: READY MAGIC ------ */
  {
    id:       'ready_magic',
    chapter:  'Act I',
    speaker:  '',
    scene:    'The Campfire, Ready',
    progress: 28,
    content: [
      { type: 'narration', text: 'The dark magic rises easily. It always does, which is part of why it frightens her. It pools at her fingertips, ready but not yet doing anything, just waiting to be told what to do.' },
      { type: 'narration', text: 'The footsteps stop. A voice comes from the dark, very carefully:' },
      { type: 'dialogue',  text: '"Whatever that is, I can see it from here and it is not from Solmere, which means you are not either. I have light magic. I am not pointing it at you. Please do not point whatever that is at me."' },
      { type: 'narration', text: 'Amara keeps the magic ready for one more second. Then she lets it go.' },
      { type: 'dialogue',  text: '"Come where I can see you," she says.' },
      { type: 'narration', text: 'A girl steps into the firelight. She looks tired and honest and very much like someone who is used to being prepared for things to go wrong.' },
    ],
    choices: [
      { label: 'Apologize for the magic and ask if she is okay',  resultText: 'You apologized. It cost you nothing and changed something.',  logText: 'Apologized for raising the magic',  next: 'ask_name'      },
      { label: 'Do not apologize. Ask if she has been followed here', resultText: 'You skipped the apology and got to what mattered.',        logText: 'Asked if she had been followed',    next: 'followed_here' },
    ],
  },

  {
    id:       'followed_here',
    chapter:  'Act II',
    speaker:  'Aria',
    scene:    'The Forest Edge, Are You Being Hunted',
    progress: 55,
    content: [
      { type: 'dialogue',  text: '"Two days ago. I lost them in a river crossing." She sits down without being invited. "You?"' },
      { type: 'dialogue',  text: '"Three days. Maybe more. Hard to tell in here."' },
      { type: 'dialogue',  text: '"The king\'s hunters?"' },
      { type: 'dialogue',  text: '"Solmere\'s, yes. You?"' },
      { type: 'dialogue',  text: '"Umbrath\'s. And I suspect by now Solmere\'s too, since they have been talking to each other about us."' },
      { type: 'narration', text: 'This is not good news. But there is something clarifying about hearing it said plainly. Amara looks at this girl who has light magic and no fear of saying difficult things out loud.' },
      { type: 'narration', text: 'She thinks about the crown pieces she has felt stirring beneath the forest floor since she arrived, a low and ancient vibration she has not been able to explain. She thinks that maybe she is not supposed to be alone in whatever this is.' },
    ],
    choices: [
      { label: 'Tell her about the vibration and ask if she has felt it too', resultText: 'You told her the thing you could not explain. She had felt it too.', logText: 'Told her about the vibration under the forest', next: 'ending_alliance' },
      { label: 'Say nothing yet. Trust takes time, but you are listening',    resultText: 'You kept quiet. Sometimes that is the most honest thing you can offer.', logText: 'Stayed quiet and listened',                 next: 'ending_alone'    },
    ],
  },

  /* ------ ENDINGS ------ */
  {
    id:         'ending_alliance',
    chapter:    'Ending',
    speaker:    '',
    scene:      'The Twilight Forest, Something Stirs',
    progress:   100,
    isEnding:   true,
    endingType: 'alliance',
    content: [
      { type: 'narration', text: 'The Dusk Wolves arrive at the edge of the clearing sometime after midnight. There are four of them. They do not growl. They do not posture. They simply stand there in a loose ring around the fire, looking at the two girls with the patient attention of creatures who have been waiting for something for a very long time.' },
      { type: 'narration', text: 'Amara and Aria sit still. Neither of them runs. Neither of them reaches for their magic.' },
      { type: 'narration', text: 'Under the earth beneath them, something old and broken shifts. One of the Celestial Crown\'s shards, buried deep in the forest for years, warms by a fraction of a degree.' },
      { type: 'emphasis',  text: 'Neither girl knows what it means yet. But both of them feel it. And both of them, without discussing it, know that they are going to find out.' },
    ],
    choices: [],
  },

  {
    id:         'ending_caution',
    chapter:    'Ending',
    speaker:    '',
    scene:      'The Twilight Forest, A Careful Truce',
    progress:   100,
    isEnding:   true,
    endingType: 'caution',
    content: [
      { type: 'narration', text: 'They do not become friends that night. They become something more careful and more honest than friends: two people who have decided that being cautious together is better than being cautious apart.' },
      { type: 'narration', text: 'Aria sleeps on one side of the fire. Amara keeps watch on the other. In the morning they swap. Neither of them speaks much but the silence is not uncomfortable. It is the silence of two people who have both been very alone for a long time and have not yet learned how to stop being that.' },
      { type: 'emphasis',  text: 'In the forest around them, the Dusk Wolves wait. Under the earth, the crown does not yet stir. But it is paying attention. Some things cannot be rushed.' },
    ],
    choices: [],
  },

  {
    id:         'ending_alone',
    chapter:    'Ending',
    speaker:    '',
    scene:      'The Twilight Forest, Two Fires',
    progress:   100,
    isEnding:   true,
    endingType: 'alone',
    content: [
      { type: 'narration', text: 'By morning, Aria has moved further into the forest. Not gone. Just at a distance. She built her own small fire.' },
      { type: 'narration', text: 'Amara can see the glow of it through the trees. She knows Aria can see hers.' },
      { type: 'narration', text: 'This is not the worst thing. Both of them are alive. Both of them are safe, for now. But the crown shards are restless beneath the earth and the Dusk Wolves that have been circling both camps all night are going to have to make a decision soon.' },
      { type: 'emphasis',  text: 'Some things cannot stay apart forever. Some things were broken specifically so that the right people would have to choose to put them back together. The forest will make sure they find each other again. It is patient, and it has been waiting a very long time.' },
    ],
    choices: [],
  },

];


/* ================================================================
   ENDING DATA
   Holds the label, title, and personalised text for each ending.
   The personalised text changes based on how bold or cautious
   the player's choices were throughout the story.
================================================================ */
var ENDING_DATA = {
  alliance: {
    label: 'Ending: The Crown Wakes',
    title: 'The Crown Remembers',
    texts: {
      bold:     'You spoke first, acted first, chose openness at every turn. The crown responds to people like you, the ones who do not wait for permission to trust.',
      mixed:    'Trust came first. Everything else will follow. The Shattered Crown has been waiting for exactly this: two halves of something, finally in the same place, finally willing to look at each other.',
      cautious: 'Even taking your time, you arrived here. The crown does not care how long it took. It only cares that you showed up.',
    },
  },
  caution: {
    label: 'Ending: A Careful Beginning',
    title: 'Something Worth Keeping',
    texts: {
      bold:     'You moved fast and then slowed down exactly when it mattered. The forest noticed that balance.',
      mixed:    'Not every important thing happens all at once. They have time. The forest has kept its secrets for longer than either of them has been alive. It can wait a little longer.',
      cautious: 'You were careful at every step. There is wisdom in that. Some crowns can only be mended by people who know what it costs to break something.',
    },
  },
  alone: {
    label: 'Ending: Two Fires',
    title: 'Not Yet',
    texts: {
      bold:     'You reached for your magic first and held back your words last. Next time, try it the other way around.',
      mixed:    'Distance is not always the wrong answer. Sometimes it is the only honest one. The Shattered Crown will not sleep forever, and when it calls, it calls both of them.',
      cautious: 'You were careful right to the end. So careful that you are still alone. That is not failure. That is a first chapter, not a whole story.',
    },
  },
};


/* ================================================================
   VUE APP
   Connects the story data above to the HTML on the page.
================================================================ */
var vueApp = Vue.createApp({

  /* data() holds the values that Vue tracks and updates on screen */
  data() {
    return {
      started:    false, /* false = show the intro screen, true = show the story */
      sceneId:    'start', /* the id of the scene currently showing */
      lastResult: '',    /* the result text shown at the top of each new scene */
      choiceLog:  [],    /* list of all choices the player has made so far */
    };
  },

  computed: {

    /* Returns the full scene object for the current sceneId */
    currentScene() {
      return SCENES.find(function(s) { return s.id === this.sceneId; }.bind(this)) || SCENES[0];
    },

    /* Returns the progress bar width as a CSS string e.g. "55%" */
    progress() {
      return this.currentScene.progress + '%';
    },

    /* Returns which ending type the current scene is (alliance, caution, or alone) */
    endingType() {
      return this.currentScene.endingType || 'alliance';
    },

    /* Returns the ending label text */
    endingLabel() {
      return ENDING_DATA[this.endingType] ? ENDING_DATA[this.endingType].label : 'Ending';
    },

    /* Returns the ending title text */
    endingTitle() {
      return ENDING_DATA[this.endingType] ? ENDING_DATA[this.endingType].title : 'The End';
    },

    /* Picks a personalised ending paragraph based on the player's choices.
       It looks at the choiceLog for bold-leaning keywords.
       More bold choices = bold variant, fewer = cautious variant. */
    endingText() {
      var log       = this.choiceLog.join(' ').toLowerCase();

      /* These words appear in the logText of bold/open choices */
      var boldWords = ['called out', 'raised', 'extended', 'told aria', 'said it'];

      /* Count how many bold keywords appear in the player's choice log */
      var boldCount = 0;
      boldWords.forEach(function(word) {
        if (log.includes(word)) boldCount++;
      });

      /* Pick the variant based on the count */
      var variant = 'mixed';
      if (boldCount >= 2) {
        variant = 'bold';
      } else if (boldCount === 0 && log.length > 0) {
        variant = 'cautious';
      }

      return ENDING_DATA[this.endingType].texts[variant]
          || ENDING_DATA[this.endingType].texts.mixed
          || '';
    },
  },

  methods: {

    /* Shows the story screen when the Start button is clicked */
    start() {
      this.started = true;
    },

    /* Runs when the player clicks a choice button.
       1. Saves the result text to show at the top of the next scene.
       2. Adds the choice to the log (used for the ending personalisation).
       3. Updates sceneId — Vue automatically re-renders the page. */
    choose(choice) {
      this.lastResult = choice.resultText || '';
      if (choice.logText) {
        this.choiceLog.push(choice.logText);
      }
      this.sceneId = choice.next;
    },

    /* Resets everything back to the start */
    restart() {
      this.sceneId    = 'start';
      this.lastResult = '';
      this.choiceLog  = [];
      window.scrollTo({ top: 0, behavior: 'smooth' });
    },
  },

});

/* Mount the Vue app to the #app element in the HTML */
document.addEventListener('DOMContentLoaded', function() {
  try {
    vueApp.mount('#app');
  } catch (e) {
    console.error('Vue mount failed:', e);
  }
});
