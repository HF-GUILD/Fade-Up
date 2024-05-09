const numberOfClones = 100;
const container = document.getElementById('clone');
const originalElement = document.querySelector('.col-lg-3.col-sm-6');
let picsumId = 1084; // Biggest id on https://picsum.photos/
const images = [];

imagesForThisTest = [];

while (images.length < numberOfClones) {
    const imageUrl = `https://picsum.photos/id/${picsumId}/250`;
    images.push(imageUrl)
    picsumId--;
}
let shuffledImages = images.sort((a, b) => 0.5 - Math.random());

function getRandomNumber(n) {
    return Math.floor(Math.random() * n) + 1;
}

// Function to handle image loading errors when the id does not exist on lorem picsum
function handleImageError(event) {
    let index = imagesForThisTest.indexOf(event.target.src);
    imagesForThisTest[index] = `https://picsum.photos/id/${picsumId}/250`
    event.target.src = `https://picsum.photos/id/${picsumId}/250`;
    picsumId--;
}

for (let i = 0; i < numberOfClones; i++) {
    const clone = originalElement.cloneNode(true);
    clone.classList.add("firstImg");

    // Set a random stream picture
    const imgStream = clone.querySelector('img[id="imgStream"]');
    imgStream.src = shuffledImages[i];
    imagesForThisTest.push(shuffledImages[i])
    imgStream.onerror = handleImageError;

    // Set a random image avatar
    //clone.querySelector('img[id="imgAvatar"]').src=`assets/images/avatar-${getRandomNumber(4).toString().padStart(2, '0')}.jpg`;

    // Set a random title for the stream
    //clone.querySelector('h4[id="title"]').textContent = shuffledTitles[i];

    // Set a random streamer name
    //clone.querySelector('span[id="streamerName"]').textContent = shuffledStreamers[i];

    container.appendChild(clone);
}
shuffledImages = images.sort((a, b) => 0.5 - Math.random());
for (let i = 0; i < numberOfClones; i++) {
    const clone = originalElement.cloneNode(true);
    clone.classList.add("secondImg");

    // Set a random stream picture
    const imgStream = clone.querySelector('img[id="imgStream"]');
    imgStream.src = shuffledImages[i];
    imagesForThisTest.push(shuffledImages[i])
    imgStream.onerror = handleImageError;

    // Set a random image avatar
    //clone.querySelector('img[id="imgAvatar"]').src=`assets/images/avatar-${getRandomNumber(4).toString().padStart(2, '0')}.jpg`;

    // Set a random title for the stream
    //clone.querySelector('h4[id="title"]').textContent = shuffledTitles[i];

    // Set a random streamer name
    //clone.querySelector('span[id="streamerName"]').textContent = shuffledStreamers[i];

    container.appendChild(clone);
}