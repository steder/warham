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
    
    },
    playerScores(state) {
        state.playerScore++;
    },
    opponentScores(state) {
        state.opponentScore++;
    },
    reset (state) {
        state.turn = 1;
        state.playerScore = 0;
        state.opponentScore = 0;
    }
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
        <div>
            <span>Turn {{this.$store.state.turn}}</span>
        </div>
        <div>
            <span>{{this.$store.state.playerScore}}</span>
            <span>-</span>
            <span>{{this.$store.state.opponentScore}}</span>
        </div>
        <div>
            <button v-on:click="playerScores">Player +</button>
            <button v-on:click="opponentScores">Opponent +</button>
        </div>
        <div>
            <button v-on:click="advanceTurn">Turn</button>
            <button v-on:click="reset">Reset</button>
        </div>
    </div>
    `
  })


var app = new Vue({ 
    el: '#app',
    store: store,
    data: {
        message: 'Hello Vue!',
        hoverMessage: 'Hello Hover!',
        player1: 'Player Name',
        player2: 'Other Player Name',
        accessMessage: 'You loaded this page on ' + new Date().toLocaleString(),
        ready: false,
        todos: [{text: 'Learn some basics'}, {text: 'Layout a dashboard'}, {text:'With interconnected toggles and state'}],
        phases: [
            {text:'Command', isActive:false}, 
            {text:'Movement', isActive:false},
            {text:'Psychic', isActive:false},
            {text:'Shooting', isActive:false},
            {text:'Charge', isActive:false},
            {text:'Fight', isActive:false}, 
            {text:'Morale', isActive:false},
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
