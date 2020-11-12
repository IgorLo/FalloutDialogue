import './styles/index.css'
import './styles/character.css'
import './styles/stats.css'
import Vue from 'vue'
import {getRandomSpriteIndex, getSprite} from "./characterParts";
import {characters, Character, Appearance, Option, randomElement} from "./gameCharacters";

let character = new Vue({
    el: '#character',
    data: {
        displayed: false,
        appearance: Appearance.default()
    },
    methods: {
        getSprite: (part, index) => {
            return getSprite(part, index)
        }
    }
})

let app = new Vue({
    el: '#app',
    data: {
        displayReply: false,
        current_option: Option.emptyOption(),
        current_character: null
    },
    // определяйте методы в объекте `methods`
    methods: {
        choose: (id) => {
            playSound("sound__ok");
            if (id === Option.endId()){
                nextRandomStranger()
            } else {
                app.current_option = app.current_character.dialogue[id]
                app.displayReply = true
                setTimeout(() => {
                    app.displayReply = false;
                }, 1000 + ((app.current_option.reply.length / 50) * 1500))
            }
        },
        hover: () => {
            playSound("sound__focus");
        },
        onOut: () => {
            stopSound("sound__focus");
        },
        textOfId: (id) => {
            return app.current_character.dialogue[id].text
        }
    }
})

let stats = new Vue({
    el: '#stats',
    data: {
        money: 100,
        food: 10,
        HP: 10,
        ammo: 30
    },
})

function randomizeAppearance() {
    character.appearance = new Appearance(
        getRandomSpriteIndex('eyes'),
        getRandomSpriteIndex('brows'),
        getRandomSpriteIndex('nose'),
        getRandomSpriteIndex('mouth')
    )
}


function playSound(soundName) {
    let sound = document.getElementById(soundName);
    sound.currentTime = 0;
    sound.play();
}

function stopSound(soundName) {
    let sound = document.getElementById(soundName);
    sound.pause();
    sound.currentTime = 0;
}

function nextRandomStranger() {
    playSound('sound__steps')
    character.displayed = false;
    app.current_option = Option.emptyOption();
    let newStranger = randomElement(characters);

    setTimeout(() => {
        playSound('sound__steps')
        app.current_option = newStranger.dialogue[Option.startId()];
        app.current_character = newStranger;
        // character.appearance = newStranger.appearance;
        randomizeAppearance();
        character.displayed = true;
    }, 3000)
}

nextRandomStranger()
