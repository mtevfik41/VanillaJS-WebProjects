const word = document.getElementById('word');
const text = document.getElementById('text');
const scoreEl = document.getElementById('score');
const timeEl = document.getElementById('time');
const endgameEl = document.getElementById('end-game-container');
const settingsBtn = document.getElementById('settings-btn');
const settings = document.getElementById('settings');
const settingsForm = document.getElementById('settings-form');
const difficultySelect = document.getElementById('difficulty');
const start = document.getElementById('start');

// Word array
const words = ["exultingly", "candlelighters", "pycnotic", "thwarter", "eventide", "rafter", "authoress", "pyrometallurgy", "repaved", "fusional", "adornment", "quadrillions", "unseals", "bilsted", "eudaemons", "senor", "amidins", "orangeades", "urinemic", "popularity", "repacify", "sequent", "plasmin", "beetler", "consummators", "oboles", "appetence", "outthieves", "rationalizable", "leveler", "biflagellate", "outhowls", "cladophylls", "bibulous", "scapose", "prestigeful", "nominally", "curbed", "ketosteroids", "bandannas", "trigos", "reliques", "honeworts", "structurally", "florence", "decanters", "homology", "nondemands", "cichlids", "stylizations", "restriven", "buddhas", "choplogic", "bandore", "armfuls", "trunkfish", "gerardias", "arisen", "ammos", "pupate", "determinations", "galley", "rusted", "pectic", "dissect", "dreamlike", "lusting", "aubrietias", "odometries", "knittable", "sages", "aldicarbs", "illatively", "rerecord", "gainliest", "categories", "neoliberal", "tactlessly", "untwilled", "backblocks", "slippers", "masterdom", "nonuniversity", "neomorphs", "seasickness", "ochone", "stymying", "bottoming", "minimalists", "corelate", "jete", "arillate", "backfire", "greenwood", "vestral", "jnana", "sylphish", "slaty", "dendrogram", "pidgin", "declaimed", "cerebrals", "chechako", "gooniest", "mim", "knouting", "clipboard", "itinerated", "exclaves", "sugarcanes", "absurdist", "stead", "huaraches", "conclave", "trafficable", "disable", "literatus", "quicklime", "ambiversions", "medlar", "superinfection", "lards", "choppered", "coenduring", "glamourized", "blaubok", "mansarded", "nobler", "syngas", "decalogue", "ancienter", "bacterium", "joannes", "glassine", "neurulations", "feudalism", "samovars", "interfluve", "moratorium", "honour", "chromatographer", "responsum", "blebs", "livelong", "drink", "unsex", "disarticulated", "iodising", "externship", "unionizing", "tellingly", "grommets", "cowages", "rightly", "antiforeigner", "dah", "pinheaded", "outtraveling", "oarfish", "disembowel", "ionophore", "said", "shammy", "prefix", "amazons", "nurd", "jeopardies", "kevels", "reelevating", "arsenite", "primatologists", "sics", "revaccinates", "crimson", "regauged", "midlifers", "palimpsest", "digressiveness", "thoroughness", "sended", "tzaddikim", "biophysical", "gonenesses", "boggling", "lyricist", "billboarding", "bio", "payably", "dampeners", "peninsulas", "saponin", "carnations", "screeding", "skewer", "chromatins", "subcultures", "gonadotrophin", "skyrocket", "hawed", "bosom"];




// Set difficulty to value in ls or medium
let difficulty =
    localStorage.getItem('difficulty') !== null
        ? localStorage.getItem('difficulty')
        : 'medium';

// Set difficulty select value
difficultySelect.value =
    localStorage.getItem('difficulty') !== null
        ? localStorage.getItem('difficulty')
        : 'medium';


start.addEventListener('click', () => {
    text.value = '';
    // Init word
    let randomWord;

    // Init score
    let score = 0;

    // Init time
    let time = 15;


    // Focus on text on start
    text.focus();

    // Start counting down
    const timeInterval = setInterval(updateTime, 1000);

    // Generate random word from array
    function getRandomWord() {
        return words[Math.floor(Math.random() * words.length)];
    }

    // Add word to DOM
    function addWordToDOM() {
        randomWord = getRandomWord();
        word.innerHTML = randomWord;
    }

    // Update score
    function updateScore() {
        score++;
        scoreEl.innerHTML = score;
    }

    // Update time
    function updateTime() {
        time--;
        timeEl.innerHTML = time + 's';

        if (time === 0) {
            clearInterval(timeInterval);
            // end game
            gameOver();
        }
    }

    // Game over, show end screen
    function gameOver() {
        endgameEl.innerHTML = `
    <h1>Time ran out</h1>
    <p>Your final score is ${score}</p>
    <button onclick="location.reload()">Reload</button>
  `;

        endgameEl.style.display = 'flex';
    }

    addWordToDOM();

    // Event listeners

    // Typing
    text.addEventListener('input', e => {
        const insertedText = e.target.value;

        if (insertedText === randomWord) {
            addWordToDOM();
            updateScore();

            // Clear
            e.target.value = '';

            if (difficulty === 'hard') {
                time += 2;
            } else if (difficulty === 'medium') {
                time += 3;
            } else {
                time += 5;
            }

            updateTime();
        }
    });

})
// Settings btn click
settingsBtn.addEventListener('click', () => settings.classList.toggle('hide'));

// Settings select
settingsForm.addEventListener('change', e => {
    difficulty = e.target.value;
    localStorage.setItem('difficulty', difficulty);
});