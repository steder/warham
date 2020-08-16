Vue.use(Vuex)

const store = new Vuex.Store({
  state: function () {
    return {
        turn: 1,
        playerScore: 0,
        opponentScore: 0,
  }
},
  mutations: {
    nextTurn (state) {
        state.turn = ((state.turn+1)%6==0) ? 1 : ((state.turn+1)%6);
        localStorage.setItem('turn', state.turn);
    },
    playerScores(state) {
        state.playerScore++;
        localStorage.setItem('playerScore', state.playerScore);
    },
    opponentScores(state) {
        state.opponentScore++;
        localStorage.setItem('opponentScore', state.opponentScore);
    },
    reset (state) {
        state.turn = 1;
        state.playerScore = 0;
        state.opponentScore = 0;
        localStorage.setItem('turn', 1);
        localStorage.setItem('playerScore', 0);
        localStorage.setItem('opponentScore', 0);
    },
    initialiseStore(state) {     
        var version = localStorage.getItem('warham-version');
        if (!version) {
            localStorage.setItem('warham-version', '0.1.0');
            this.reset(state);
        }
        state.turn = localStorage.getItem('turn');
        state.playerScore = localStorage.getItem('playerScore');
        state.opponentScore = localStorage.getItem('opponentScore');
    },
  }
})

Vue.component('warhammer-turn-tracker', {
    data: function () {
      return {
        count: 0
      }
    },
    methods:  {
       playerScores () {
        store.commit('playerScores')
      },
      opponentScores () {
          store.commit('opponentScores')
      },
      reset () {
        store.commit('reset')
      },
      advanceTurn () {
          store.commit('nextTurn');
      }
    },
    template: `
    <div>
        <div class="scoreboard">
            <span>Turn {{this.$store.state.turn}}</span>
        </div>
        <div class="scoreboard">
            <span class="badge badge-success">P1</span>
            <span>{{this.$store.state.playerScore}}</span>
            <span>-</span>
            <span class="badge badge-secondary">P2</span>
            <span>{{this.$store.state.opponentScore}}</span>
        </div>
        <div class="btn-group" role="group">
            <button type="button" class="btn btn-success" v-on:click="playerScores">Player +</button>
            <button type="button" class="btn btn-secondary" v-on:click="opponentScores">Opponent +</button>
            <button type="button" class="btn btn-warning" v-on:click="advanceTurn">Turn</button>
            <button type="button" class="btn btn-danger" v-on:click="reset">Reset</button>
        </div>
    </div>
    `
  })


var app = new Vue({ 
    el: '#app',
    store: store,
    beforeCreate() { this.$store.commit('initialiseStore');},
    data: {
        message: 'Hello Vue!',
        hoverMessage: 'Hello Hover!',
        player1: 'Player Name',
        player2: 'Other Player Name',
        accessMessage: 'You loaded this page on ' + new Date().toLocaleString(),
        ready: false,
        todos: [{text: 'Learn some basics'}, {text: 'Layout a dashboard'}, {text:'With interconnected toggles and state'}],
        phases: [
            {text:'Command', isActive:false, rules:[
                "Battle-forged CP bonus: Gain 1 CP if army is Battle- forged.",
            "Resolve any rules that occur in the Command phase.", 
            "Progress to the Movement phase (pg 10).",
             ],
             definitions: [],
            }, 
            {text:'Movement', isActive:false, rules:[
                "Select a unit in your army to move.",
"When a unit moves it can either make a Normal Move, Advance or Remain Stationary.",
"Units that are within Engagement Range of any enemy models can only either Fall Back or Remain Stationary. Select another unit in your army to move.",
"Once all your units have moved, progress to the Reinforcements step (pg 11).",
            ], definitions: [{"title": "Normal Move", 
            rules:["Normal Move: Models move up to M.",
            "Cannot move within Engagement Range of any enemy models."],},
        ]
        },
            {text:'Movement (Reinforcement)', isActive:false, rules:[
                "Reinforcement unit: Unit that starts the battle in a location other than the battlefield.",
"Set up your Reinforcement units, one at a time, as described by the rules that let them start the battle in locations other than the battlefield.",
"Reinforcement units cannot make a Normal Move, an Advance, Fall Back or Remain Stationary this turn. Reinforcement units always count as having moved this turn.",
"Any Reinforcement unit not set up on the battlefield by the end of the battle counts as destroyed.",
"Once all your Reinforcement units have been set up, progress to the Psychic phase (pg 14).",
            ], definitions:[]},
            /* TODO: add this section:
            {text: 'Movement (Transports), isActive:false, rules:[], definitions: []} 
            */
            {text:'Psychic', isActive:false, rules:[], definitions: []},
            {text:'Shooting', isActive:false, rules:[], definitions: []},
            {text:'Charge', isActive:false, rules:[], definitions: []},
            {text:'Fight', isActive:false, rules:[], definitions: []}, 
            {text:'Morale', isActive:false, rules:[], definitions: []},
        ],
    },
    methods: {
        readyToggle: function () {
          this.ready = !this.ready;
        },
        selectPhase: function(event, eventPhase) {
            console.log(event);
            console.log(eventPhase);
            eventPhase.isActive = true;  
            this.phases.forEach(phase => {
                if (phase.text != eventPhase.text) {
                    phase.isActive = false;
                }
            })
        }
      },
});
