// Firebase Configuration
// const firebaseConfig = {
//     apiKey: "AIzaSyDuUTjGO3Of0Gxg4jmxsBYCUOXwbuZcEtw",
//     authDomain: "login-form-1d57b.firebaseapp.com",
//     projectId: "login-form-1d57b",
//     storageBucket: "login-form-1d57b.appspot.com", // Corrected storageBucket
//     messagingSenderId: "1025555037575",
//     appId: "1:1025555037575:web:18eab285d362d6f3d22722",
//     measurementId: "G-RG4HXKZ19E"
// };

// Firebase Initialization
// const app = firebase.initializeApp(firebaseConfig);
// const db = firebase.firestore();  // Firestore access

// Function to Save Score to Firestore
// Function to Save Score to Firestore
function saveScoreToFirestore(score, username) {
    db.collection("leaderboard").add({
        username: username,
        score: score,
        timestamp: firebase.firestore.FieldValue.serverTimestamp()
    }).then(() => {
        console.log("Score saved successfully!");
    }).catch((error) => {
        console.error("Error saving score: ", error);
    });
}


// Function to Display Leaderboard from Firestore
function displayLeaderboard() {
    const leaderboardContainer = document.getElementById("leaderboard");

    db.collection("leaderboard")
        .orderBy("score", "desc")
        .limit(10)
        .get()
        .then(querySnapshot => {
            querySnapshot.forEach(doc => {
                const data = doc.data();
                const leaderboardEntry = document.createElement("div");
                leaderboardEntry.textContent = `${data.username}: ${data.score}`;
                leaderboardContainer.appendChild(leaderboardEntry);
            });
        }).catch((error) => {
            console.error("Error fetching leaderboard: ", error);
        });
}






const canvas = document.getElementById('gameCanvas');
const c = canvas.getContext('2d');

// Set canvas size to match CSS styling
canvas.width = canvas.offsetWidth;
canvas.height = canvas.offsetHeight;

let fallingDownCount = 0; // Counter for fruits that fall
let totalFruits = 0; // Total number of fruits spawned
let score = 0; // Game score
let bombsliced = false;
let angle = 0;
const gravity = 0.1;


// Load fruit images
const fruitImages = [
    'Apple.png',   // Replace with actual file paths
    'Banana.png',
    'Melon.png',
    'Orange.png',
    'Grape-Black.png',
    'Lychee.png',
    'Mango.png',
    'PineApple.png',
    'Cherimoya.png',
    'Bomb.png',
    'Bomb.png'

];

// Helper to load images
function loadImage(src) {
    const img = new Image();
    img.src = src;
    img.onload = () =>
        console.log(`${src} loaded`);
    img.onerror = () =>
        console.error(`${src} failed loading`);
    return img;
}

const loadedImages = fruitImages.map(loadImage);

class Fruit {
    constructor() {
        this.image = loadedImages[Math.floor(Math.random() * loadedImages.length)];
        this.position = {
            x: Math.random() * canvas.width / 2,
            y: canvas.height,
        };
        this.velocity = {
            x: Math.random() * 4 + 1, // Random horizontal velocity
            y: Math.random() * 3 + 9, // Initial upward velocity
        };
        this.width = 100;
        this.height = 100;
        this.gravity = gravity;
        this.visible = true; // Fruit visibility flag
        this.isFalling = false; // Is fruit falling
        this.isCut = false; // Is fruit sliced
    }

    draw() {
        if (this.visible) {
            c.save();
            c.translate(this.position.x + this.width / 2, this.position.y + this.height / 2);
            angle += 0.02
            c.rotate(angle);
            c.drawImage(this.image, -this.width / 2, -this.height / 2, this.width, this.height);
            c.restore();
        }
    }

    update() {
        if (this.visible) {
            // If fruit is not falling yet (rising phase)
            if (!this.isFalling) {
                this.position.y -= this.velocity.y;
                this.position.x += this.velocity.x;
                this.velocity.y -= this.gravity;

                // When fruit starts falling
                if (this.velocity.y <= 0) {
                    this.isFalling = true;
                }
            } else {
                // Fruit falls down
                this.position.y += this.velocity.y;
                this.velocity.y += this.gravity;
                this.position.x += this.velocity.x;

                // Check if fruit hits the bottom
                if (this.position.y + this.height >= canvas.height) {
                    this.position.y = canvas.height - this.height;
                    this.visible = false; // Mark fruit as missed

                    // Only increment fallingDownCount if the fruit is not a bomb
                    if (this.image.src.indexOf('Bomb.png') === -1) {
                        fallingDownCount++;
                    }
                }
            }

            // Check for horizontal collisions with canvas walls
            if ((this.position.x + this.width) > canvas.width) {
                this.velocity.x = -Math.random() * 4 - 1; // Bounce off right wall
            }
            if (this.position.x < 0) {
                this.velocity.x = 4; // Bounce off left wall
            }

            this.draw();
        }
    }



}





















// aao Bomb banate hai :)



let fruits = [];
const fruitScores = {
    'Apple.png': 5,
    'Banana.png': 3,
    'Melon.png': 4,
    'Orange.png': 6,
    'Grape-Black.png': 7,
    'Lychee.png': 8,
    'Mango.png': 3,
    'PineApple.png': 12,
    'Cherimoya.png': 15,
    'Bomb.png': 0
};



function spawnFruits() {
    const numberOfFruits = Math.floor(Math.random() * 2) + 3; // Between 3 and 6 fruits
    fruits = []; // Clear previous fruits
    totalFruits = numberOfFruits; // Update total fruits
    for (let i = 0; i < numberOfFruits; i++) {
        fruits.push(new Fruit()); // Push fruits to array
    }

    // Add a bomb with some probability
    if (Math.random() < 0.9) { // 30% chance of spawning a bomb
        fruits.push(new Bomb());
    }
};




let isDragging = false;
let lastMousePosition = null;
let currentMousePosition = { x: 0, y: 0 };

function animate() {
    requestAnimationFrame(animate);
    c.clearRect(0, 0, canvas.width, canvas.height);

    // Update fruits
    fruits.forEach((fruit) => fruit.update());

    // Draw slicing line
    if (isDragging && lastMousePosition) {
        document.getElementById("Slice").play();
        c.beginPath();
        c.moveTo(lastMousePosition.x, lastMousePosition.y);
        c.lineTo(currentMousePosition.x, currentMousePosition.y);
        c.strokeStyle = "white";
        c.lineWidth = 11;
        c.lineJoin = "round";
        c.lineCap = "round";
        c.shadowColor = "aqua";
        c.shadowBlur = 20;
        c.stroke();

        // Check for fruit slicing (collision detection)
        fruits.forEach((fruit) => {
            if (
                fruit.visible &&
                currentMousePosition.x > fruit.position.x &&
                currentMousePosition.x < fruit.position.x + fruit.width &&
                currentMousePosition.y > fruit.position.y &&
                currentMousePosition.y < fruit.position.y + fruit.height
            ) {
                if (fruit.image.src.includes("Bomb.png")) {
                    // Bomb sliced - Immediate Game Over
                    fruit.visible = false;
                    fallingDownCount += 3;
                    document.getElementById("BombSliced").play() // Make bomb invisible
                } else {
                    fruit.visible = false; // Hide fruit
                    score += fruitScores[fruit.image.src.split('/').pop()]; // Add score
                    document.getElementById("FruitSlice").play()
                }
            }
        });


    }

    // Update lastMousePosition to currentMousePosition
    if (isDragging) {
        lastMousePosition = { ...currentMousePosition };
    }






    // Game Over Condition: 3 fruits have fallen
    // Game Over ke baad score save karna
    if (fallingDownCount >= 3) {
        c.clearRect(0, 0, canvas.width, canvas.height);
        c.fillStyle = "red";
        c.font = "40px Arial";
        c.fillText("Game Over", canvas.width / 2 - 100, canvas.height / 2);
        c.fillStyle = "white";
        c.font = "25px Arial";
        c.fillText("Score: " + score, canvas.width / 2 - 55, canvas.height / 2 + 30);
        replayButton.style.display = 'block';
    
        // Save score to Firestore
        // let username = prompt("Enter your username:");
    
        // if (username) {
            // Save score and username to Firestore
            // saveScoreToFirestore(score, username);
    
            // Show leaderboard after saving the score
            // displayLeaderboard();
        // } else {
            // In case no username is entered
            // alert("You need to enter a username!");
        // }
    
        // Show game over message or any other logic
        // alert("Game Over! Your score: " + score);
        // return; // Stop the animation loop once game over
    }



    // Check if all fruits are invisible or missed and respawn
    const allFruitsGone = fruits.every(fruit => !fruit.visible);
    if (allFruitsGone && fallingDownCount < 3) {
        setTimeout(() => {
            spawnFruits(); // Respawn new fruits
        }, 0); // Wait 1 second before respawning
    }

    // Display score
    c.fillStyle = "white";
    c.font = "20px Arial";
    c.fillText("Score: " + score, 20, 30);


    c.fillStyle = "white";
    c.font = "20px Arial";
    c.fillText("Chance: " + (3 - fallingDownCount), canvas.width - 110, 30);
}


canvas.addEventListener("mousedown", (event) => {
    isDragging = true;
    currentMousePosition = getMousePos(event);
    lastMousePosition = { ...currentMousePosition };
});

canvas.addEventListener("mousemove", (event) => {
    if (isDragging) {
        currentMousePosition = getMousePos(event);
    }
});

canvas.addEventListener("mouseup", () => {
    isDragging = false;
    lastMousePosition = null; // Reset last position
});

// Function to get mouse position relative to the canvas
function getMousePos(event) {
    const rect = canvas.getBoundingClientRect();
    return {
        x: event.clientX - rect.left,
        y: event.clientY - rect.top,
    };
}

// Touch support (for mobile devices)
canvas.addEventListener("touchstart", (event) => {
    isDragging = true;
    const touch = event.touches[0];
    currentMousePosition = getTouchPos(touch);
    lastMousePosition = { ...currentMousePosition };
});

canvas.addEventListener("touchmove", (event) => {
    if (isDragging) {
        const touch = event.touches[0];
        currentMousePosition = getTouchPos(touch);
    }
});

canvas.addEventListener("touchend", () => {
    isDragging = false;
    lastMousePosition = null; // Reset last position
});

// Function to get touch position relative to the canvas
function getTouchPos(touch) {
    const rect = canvas.getBoundingClientRect();
    return {
        x: touch.clientX - rect.left,
        y: touch.clientY - rect.top,
    };
}


















// SidebarSetup:)

const sidebar = document.getElementById("sidebar");
const togglebtn = document.getElementById("togglebtn");

sidebar.style.left = "-15vw"
togglebtn.style.left = "0px"
navbar.style.left = "-15vw"



togglebtn.addEventListener("click", () => {
    if (sidebar.style.left === "0px") {
        sidebar.style.left = "-15vw"
    } else {
        sidebar.style.left = "0px"
    }
});

togglebtn.addEventListener("click", () => {
    if (togglebtn.style.left === "0px") {
        togglebtn.style.left = "12vw"
    } else {
        togglebtn.style.left = "0px"
    }
});

togglebtn.addEventListener("click", () => {
    if (navbar.style.left === "0px") {
        navbar.style.left = "-15vw"
    } else {
        navbar.style.left = "0px"
    }
});




const topbar = document.getElementById("topbar");
const fogglebtn = document.getElementById("fogglebtn");

topbar.style.top = "-11vmin"
fogglebtn.style.top = "0px"



fogglebtn.addEventListener("click", () => {
    if (topbar.style.top === "0px") {
        topbar.style.top = "-11vmin"
    } else {
        topbar.style.top = "0px"
    }
});

fogglebtn.addEventListener("click", () => {
    if (fogglebtn.style.top === "0px") {
        fogglebtn.style.top = "3.5vmin"
    } else {
        fogglebtn.style.top = "0px"
    }
});




// Saare variables aur helper functions yahan honge (jaise Fruit class, spawnFruits(), animate(), etc.)

// Yeh code last mein add karein
const playButton = document.getElementById('play-button');
const replayButton = document.getElementById('replay-button');

// Play button functionality
playButton.addEventListener('click', () => {
    playButton.style.display = 'none';
    animate();
});

// Replay button functionality
replayButton.addEventListener('click', () => {
    replayButton.style.display = 'none';
    score = 0;
    fallingDownCount = 0;
    bombsliced = false;
    fruits = [];
    angle = 0;
});

