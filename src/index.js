import 'vue-toast-notification/dist/theme-sugar.css';
import './styles/index.css'
import './styles/character.css'
import './styles/stats.css'
import './styles/toast.css'
import Vue from 'vue'
import VueToast from 'vue-toast-notification';
import {getRandomSpriteIndex, getSprite} from "./characterParts";
import {characters, Character, Appearance, Option, randomElement} from "./gameCharacters";


Vue.use(VueToast, {
    containerClassName: "dialogue__option",
    position: 'top',
    duration: 2000
})

let character = new Vue({
    el: '#character',
    data: {
        name: '',
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
            if (id === Option.endId()) {
                nextRandomStranger()
            } else {
                app.current_option = app.current_character.dialogue[id]
                let action = app.current_option.action
                handleAction(action);
                app.displayReply = true
                setTimeout(() => {
                    app.displayReply = false;
                // }, 1000 + ((app.current_option.reply.length / 50) * 1500))
                }, 200 + ((app.current_option.reply.length / 50) * 500))
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
        hp: 10,
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
        character.name = newStranger.name;
        character.displayed = true;
    }, 3000)
}

function notification(item, value) {
    if (value === 0)
        return
    else if (value > 0)
        Vue.$toast.default(`+ ${value} ${item}`)
    else if (value < 0)
        Vue.$toast.default(`- ${-value} ${item}`)
}

function handleAction(action) {
    if (action !== undefined) {
        if (action.money !== undefined) {
            stats.money += action.money
            notification('$', action.money)
        }
        if (action.hp !== undefined) {
            stats.hp += action.hp
            notification('HP', action.hp)
        }
        if (action.food !== undefined) {
            stats.food += action.food
            notification('еды', action.food)
        }
        if (action.ammo !== undefined) {
            stats.ammo += action.ammo
            notification('пуль', action.ammo)
        }
    }
}


nextRandomStranger()
