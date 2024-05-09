import { sendExperimentData } from "./index.js";

const urlParams = new URLSearchParams(window.location.search);
const time = 7;//urlParams.get('time') ? urlParams.get('time') : 7; // Default value 0.7 s
const imgSize = 150;//urlParams.get('imgSize') ? urlParams.get('imgSize') : 150; // Default value 150 px
const fadeInOutTime = time * 100;

let timeWhenIconShow = [];
let timeEnterPress = [];
const imageWanted = [1084,1080,1074,1073,1069,1022,1062,1058,1024,1040,1003,1010,1049,1020,1035,1082,1011,1004,1016];//urlParams.get('img') ? JSON.parse(urlParams.get('img')) : [1084,1080,1074,1073,1069,1022,1062,1058,1024,1040,1003,1010,1049,1020,1035,1082,1011,1004,1016];
let nbClick = 0;
let imageSelected = [];
let firstExperimentFinished = false;
const delayToAccessIconDetection = (fadeInOutTime * 4); // Time to get conscious (Need to check with John)
let timeOfTheLastClick = Date.now();
let lastClickedImage = null;
// https://elevenlabs.io/ (text to speech)
/*let audioDescription = ["assets/audio/Walruses.mp3", "assets/audio/Strawberries.mp3", "assets/audio/Lioness.mp3",
    "assets/audio/ManyOpenBooks.mp3", "assets/audio/AJellyfish.mp3", "assets/audio/GreenNortherLights.mp3",
    "assets/audio/ADogInABlanketOnABed.mp3", "assets/audio/FootbalStadium.mp3", "assets/audio/Vulture.mp3",
    "assets/audio/WhiteCastleSurroundedByForest.mp3", "assets/audio/DoeADeer.mp3", "assets/audio/AChildReadingTheBible.mp3",
    "assets/audio/SmallIslandReflectedInWater.mp3", "assets/audio/Bear.mp3", "assets/audio/HumanUnderWaterfallAndRainbow.mp3",
    "assets/audio/TwoHandsOnAPianoKeyboard.mp3", "assets/audio/WomanSittingInACanoe.mp3", "assets/audio/CoupleKissingInTheSnowAtNight.mp3",
    "assets/audio/OrangeMountain.mp3"];

let englishAudioDescription = ["assets/audio/Walruses.mp3", "assets/audio/Strawberries.mp3", "assets/audio/Lioness.mp3",
    "assets/audio/ManyOpenBooks.mp3", "assets/audio/AJellyfish.mp3", "assets/audio/GreenNortherLights.mp3",
    "assets/audio/ADogInABlanketOnABed.mp3", "assets/audio/FootbalStadium.mp3", "assets/audio/Vulture.mp3",
    "assets/audio/WhiteCastleSurroundedByForest.mp3", "assets/audio/DoeADeer.mp3", "assets/audio/AChildReadingTheBible.mp3",
    "assets/audio/SmallIslandReflectedInWater.mp3", "assets/audio/Bear.mp3", "assets/audio/HumanUnderWaterfallAndRainbow.mp3",
    "assets/audio/TwoHandsOnAPianoKeyboard.mp3", "assets/audio/WomanSittingInACanoe.mp3", "assets/audio/CoupleKissingInTheSnowAtNight.mp3",
    "assets/audio/OrangeMountain.mp3"];
let frenchAudioDescription = ["assets/audio/OrangeMountain.mp3", "assets/audio/OrangeMountain.mp3", "assets/audio/OrangeMountain.mp3"];
*/
let audioDescription = [
    "01_Walruses.mp3",
    "02_Strawberries.mp3",
    "03_Lioness.mp3",
    "04_ManyOpenBooks.mp3",
    "05_AJellyfish.mp3",
    "06_GreenNorthernLights.mp3",
    "07_ADogInABlanketOnABed.mp3",
    "08_AFootballStadium.mp3",
    "09_AVulture.mp3",
    "10_AWhiteCaslteInAForest.mp3",
    "11_DoeADeer.mp3",
    "12_AChildReadingTheBible.mp3",
    "13_ASmallIslandReflectedInWater.mp3",
    "14_ABear.mp3",
    "15_AHumanUnderARainbowUnderAWaterfall.mp3",
    "16_TwoHandsOnAPiano.mp3",
    "17_AWomanSittingInACanoe.mp3",
    "18_ACoupleKissingInTheSnowAtNight.mp3",
    "19_AnOrangeMountain.mp3"
];
/*
let englishAudioDescription = [
    "01_Walruses.mp3",
    "02_Strawberries.mp3",
    "03_Lioness.mp3",
    "04_ManyOpenBooks.mp3",
    "05_AJellyfish.mp3",
    "06_GreenNorthernLights.mp3",
    "07_ADogInABlanketOnABed.mp3",
    "08_AFootballStadium.mp3",
    "09_AVulture.mp3",
    "10_AWhiteCaslteInAForest.mp3",
    "11_DoeADeer.mp3",
    "12_AChildReadingTheBible.mp3",
    "13_ASmallIslandReflectedInWater.mp3",
    "14_ABear.mp3",
    "15_AHumanUnderARainbowUnderAWaterfall.mp3",
    "16_TwoHandsOnAPiano.mp3",
    "17_AWomanSittingInACanoe.mp3",
    "18_ACoupleKissingInTheSnowAtNight.mp3",
    "19_AnOrangeMountain.mp3"
];

let frenchAudioDescription = [
    "01_Walruses.mp3",
    "02_Strawberries.mp3",
    "03_Lioness.mp3",
    "04_ManyOpenBooks.mp3",
    "05_AJellyfish.mp3",
    "06_GreenNorthernLights.mp3",
    "07_ADogInABlanketOnABed.mp3",
    "08_AFootballStadium.mp3",
    "09_AVulture.mp3",
    "10_AWhiteCaslteInAForest.mp3",
    "11_DoeADeer.mp3",
    "12_AChildReadingTheBible.mp3",
    "13_ASmallIslandReflectedInWater.mp3",
    "14_ABear.mp3",
    "15_AHumanUnderARainbowUnderAWaterfall.mp3",
    "16_TwoHandsOnAPiano.mp3",
    "17_AWomanSittingInACanoe.mp3",
    "18_ACoupleKissingInTheSnowAtNight.mp3",
    "19_AnOrangeMountain.mp3"
];
*/
function getRandomArbitrary(min, max) {
    return Math.random() * (max - min) + min;
}

function setCSSFadeUp() {
    const overlay = document.getElementById('overlay-container');
    overlay.style.transitionDuration = time / 10 + 's';
    overlay.style.width = imgSize + 'px';
    overlay.style.height = imgSize + 'px';
}


function showFlow() {
    return new Promise((resolve) => {
        const overlay = document.getElementById('overlay-container');

        overlay.classList.add('show');
        timeWhenIconShow.push(Date.now())

        setTimeout(function () {
            overlay.classList.add('hide');

            // Delay the removal of the 'show' class to allow the fade-out effect to be visible
            setTimeout(function () {
                overlay.classList.remove('show');
                overlay.classList.remove('hide');
                resolve();
            }, fadeInOutTime * 2);
        }, fadeInOutTime * 2);
    });
}

let stopTrigger = false;

async function triggerShowFlow() {
    while (!stopTrigger) {
        await showFlow(); // Wait for showFlow to complete
        await new Promise((resolve) => setTimeout(resolve, getRandomArbitrary(4000, 10000))); // Random delay between 4s and 10s
    }
}

document.body.onkeyup = function(e) {
    if (e.code == "Enter") {
        timeEnterPress.push(Date.now());
    }
}

function exampleHighlight(imgExample) {
    imgExample.classList.add('highlight');
    setTimeout(function () {
        imgExample.classList.remove('highlight');
    }, 1500)
}

function experiment(element) {
    const imgSrc = element.querySelector('img').getAttribute('src');
    // Extract the ID from the URL
    const id = imgSrc.match(/\/id\/(\d+)\//);
    lastClickedImage = imageSelected.slice(-1)[0];

    // Check for double click
    let timeOfTheCurrentClick = Date.now();
    if (timeOfTheCurrentClick - timeOfTheLastClick < 2000 && id[1] === lastClickedImage) {
        console.log("Double click");
    } else {
        //firstScroll = true;
        if (id && id[1]) {
            // id[1] contains the isolated ID
            console.log("Isolated ID: " + id[1]);
            imageSelected.push(id[1]);
        } else {
            imageSelected.push(-1);
            console.log("ID not found in the URL.");
        }
        element.classList.add('highlight');
        setTimeout(function () {
            element.classList.remove('highlight');
        }, 1500)
        nbClick++;
        const audio = new Audio("assets/audio/" + audioDescription[nbClick]);
        audio.play();
    }
    timeOfTheLastClick = timeOfTheCurrentClick;

    if (nbClick >= imageWanted.length) {
        const imageSuccess = imageWanted.map((id, index) => id == imageSelected[index]);
        const detectionSuccess = timeWhenIconShow.map((timeIcon, index) => {
            // Check if there's a time in timeEnterPress that's equal or slightly larger (+delayToAccessIconDetection)
            // and if iconDetectionSuccess is true for that index
            const matchingIndex = timeEnterPress.findIndex(
                (timePress) => timePress >= timeIcon && timePress <= timeIcon + delayToAccessIconDetection
            );

            return matchingIndex !== -1;
        });

        const rowsImagesInformation = {
            imageWanted: imageWanted,
            imageSelected: imageSelected,
            imageSuccess: imageSuccess,
            timeWhenIconShow: timeWhenIconShow,
            detectionSuccess: detectionSuccess,
            timeEnterPress: timeEnterPress,
            imagesForThisTest: imagesForThisTest
        }

        const currentDate = new Date();
        sendExperimentData(rowsImagesInformation);
        stopTrigger = true;
        // Remove images first experiment
        let firstImgClass = document.querySelectorAll('.firstImg');
        let firstImgElements = [...firstImgClass];
        firstImgElements.forEach(imgFirstExperiment => {
            imgFirstExperiment.style.display = "none";
        })
        // Add images second experiment
        let secondImgClass = document.querySelectorAll(".secondImg");
        let secondImgElements = [...secondImgClass];
        secondImgElements.forEach(imgSecondExperiment => {
            imgSecondExperiment.style.display = "block";
        })

        if (!firstExperimentFinished) {
            document.getElementById("fpgraph-overlay").src = userImage;
            console.log("End of the first experiment");
            document.getElementById("second-experiment-modal-box").style.display = "block";
            firstExperimentFinished = true;
        } else if (firstExperimentFinished) {
            document.getElementById("ending-screen").style.display = "block";
        }

    }
}

/*async function changeLanguage(language) {
    let h5Description = [...document.querySelectorAll(".description")];
    let h5Summary = [...document.querySelectorAll(".summary")];
    if (language === "UK") {
        audioDescription = englishAudioDescription;
        document.getElementById("languageName").textContent = "English";
        document.getElementById("header-first-mb").textContent = "Welcome to our experiment";
        document.getElementById("rule-header").textContent = "Rules";
        document.getElementById("header-second-mb").textContent = "Second part of the experiment";
        h5Description.forEach(d => {
            // TODO replace the innerHTML with something secure
            d.innerHTML = "Images will be <em>described orally</em>.\n" +
                "        <br>Your goal is to <em>find</em> the corresponding picture and <em>click on it</em>.\n" +
                "        <br>If something unusual happen on the screen, press the <em>Enter key</em>.\n" +
                "        <br><br>When you click on an image, <em>the image will be highlighted</em>, try on this example:"
        });
        h5Summary.forEach(s => {
            s.innerHTML = "<em>Summary:</em><br>1. Accuracy <br>2. Speed <br>3. Press <em>Enter</em> if you see something unusual at the screen"
        });
    } else {
        audioDescription = frenchAudioDescription;
        document.getElementById("languageName").textContent = "Français";
        document.getElementById("header-first-mb").textContent = "Bienvenue dans notre expérience";
        document.getElementById("rule-header").textContent = "Règles";
        document.getElementById("header-second-mb").textContent = "Seconde partie de l'expérience";
        h5Description.forEach(d => {
            // TODO replace the innerHTML with something secure
            d.innerHTML = "Une image va être <em>décrite oralement</em>.\n" +
                "        <br>Votre objectif est de <em>trouver</em> l'image correspondante à la description et de <em>cliquer dessus</em>.\n" +
                "        <br>Si quelque chose apparaît à l'écran, appuyez sur la <em>touche Entrée</em>.\n" +
                "        <br><br>Lorsqu'une image est cliquée, <em>les bordures de l'image sont colorées</em>, essayez sur cet exemple:"
        });
        h5Summary.forEach(s => {
            s.innerHTML = "<em>Résumé:</em><br>1. Sélectionner l'image correspondant à la description <br>2. Le plus rapidement possible <br>3. Appyez sur le <em>touche Entrée</em> si une image apparaît à l'écran"
        });
    }
}*/

async function checkForm(event) {
    //const nameInput = document.getElementById("nameInput");
    //const link = document.getElementById('startSurveyLink');
    //link.href = `survey.html?time=${time}&imgSize=${imgSize}&img=[${imageWanted}]`;
    /*console.log(userImage);
    if (nameInput.value.trim() === "") {
        event.preventDefault();
        alert("Please enter your name before starting the survey.");
    } else */
    if(userImage === undefined) {
        event.preventDefault();
        alert("Please select an image of someone you love before starting the survey.");
    } else {
        document.body.style.overflowY = "auto";
        document.getElementById("first-experiment-modal-box").style.display = "none";
        console.log("Button click and valid")
        //localStorage.setItem("userName", await hashString(nameInput.value.trim()));
        setCSSFadeUp();
        // Initial delay before starting the animation
        setTimeout(triggerShowFlow, 4000);
        const audio = new Audio("assets/audio/" + audioDescription[nbClick]);
        audio.play();
    }
}

async function hashString(input) {
    const encoder = new TextEncoder();
    const data = encoder.encode(input);

    const hashBuffer = await crypto.subtle.digest('SHA-256', data);

    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray.map(byte => byte.toString(16).padStart(2, '0')).join('');

    return hashHex;
}

let userImage;

function readImage(event) {
    console.log("Try to read the image");
    // TODO check if the user canceled or not
    // https://glitch.com/edit/#!/read-image-file?path=static%2Findex.html%3A45%3A7
    if (window.FileList && window.File && window.FileReader) {
        const file = event.target.files[0];
        console.log(file);
        if (!file.type) {
            //status.textContent = 'Error: The File.type property does not appear to be supported on this browser.';
            return;
        }
        if (!file.type.match('image.*')) {
            //status.textContent = 'Error: The selected file does not appear to be an image.'
            return;
        }
        const reader = new FileReader();
        reader.addEventListener('load', event => {
            userImage = event.target.result;
        });
        reader.readAsDataURL(file);
    }
}

function startSecondExperiment() {
    document.getElementById('second-experiment-modal-box').style.display = 'none';
    // Reset everything
    stopTrigger = false;
    nbClick = 0;
    let timeWhenIconShow = [];
    let timeEnterPress = [];
    let imageSelected = [];
    let timeOfTheLastClick = Date.now();
    let lastClickedImage = null;
    setTimeout(triggerShowFlow, 4000);
    const audio = new Audio("assets/audio/" + audioDescription[nbClick]);
    audio.play();
}

document.getElementById('file-selector').addEventListener('change', function(event) {
    readImage(event);
});
/*
document.getElementById('english-picture').addEventListener('click', function() {
    changeLanguage('UK').then();
});

document.getElementById('french-picture').addEventListener('click', function() {
    changeLanguage('FR').then();
});
*/
let imgExample = document.getElementsByClassName('imgExample');
for (let i = 0; i < imgExample.length; i++) {
    imgExample[i].addEventListener('click', function(event) {
        exampleHighlight(this);
    });
}

document.getElementById('second-experiment-start-btn').addEventListener('click', function() {
    startSecondExperiment()
});

let thumbElement = document.getElementsByClassName("thumb");
for (let i = 0; i < thumbElement.length; i++) {
    thumbElement[i].addEventListener('click', function () {
        console.log("aeznazeninaznpienaz");
        experiment(thumbElement[i]);
    })
}

document.getElementById("startSurveyLink").addEventListener("click", function (event) {
    checkForm(event).then();
})