let noCount = 0;
let yesPressed = false;
const phrases = [
    "Are you sure?", "Good ROI", "What happened to Alchemy culture?", "pls!", "I will cry", "Just this once!", "Pretty please? 🙂"
];

document.addEventListener('DOMContentLoaded', function() {
    setupEventListeners();
});

function setupEventListeners() {
    const yesButton = document.getElementById('yesButton');
    const noButton = document.getElementById('noButton');

    yesButton.addEventListener('click', function() {
        handleYesClick();
    });

    noButton.addEventListener('click', function() {
        handleNoClick();
    });
}

function handleYesClick() {
    yesPressed = true;
    updateUI();
    showPresentationDetails();
}

function handleNoClick() {
  noCount++;
  moveNoButton();
  updateUI();

  document.getElementById("question").textContent = phrases[Math.min(noCount, phrases.length - 1)];
  document.getElementById("name").style.display = "none";
}


function moveNoButton() {
    const noButton = document.getElementById('noButton');
    const maxWidth = window.innerWidth - noButton.offsetWidth;
    const maxHeight = window.innerHeight - noButton.offsetHeight;

    const randomX = Math.floor(Math.random() * maxWidth);
    const randomY = Math.floor(Math.random() * maxHeight);

    noButton.style.position = 'absolute';
    noButton.style.left = randomX + 'px';
    noButton.style.top = randomY + 'px';
}

function updateUI() {
    const yesButton = document.getElementById('yesButton');
    const noButton = document.getElementById('noButton');
    const question = document.getElementById('question');
    const image = document.getElementsByClassName('image')[0];

    if (yesPressed) {
        /** Update for Yes response **/
        question.textContent = 'Awesome sauce! See you there! 🎉';
        image.src = 'images/dance.gif';
        yesButton.style.display = 'none';
        noButton.style.display = 'none';
    } else {
        /** Update for No response **/
        yesButton.style.fontSize = (noCount * 5 + 20) + 'px';
        image.src = 'images/cry.jpg';
    }
}

function showPresentationDetails() {
    const detailsDiv = document.getElementById('presentation-details');
    detailsDiv.style.display = 'block';
    
    const eventDate = new Date('2025-08-21');
    document.getElementById('event-date').textContent = eventDate.toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
    
    document.getElementById('addToCalendar').addEventListener('click', function() {
        addToGoogleCalendar();
    });
}

function addToGoogleCalendar() {
    const presentationDate = new Date('2025-08-21');
    
    const startTime = new Date(presentationDate);
    startTime.setUTCHours(20, 0, 0, 0);
    
    const endTime = new Date(presentationDate);
    endTime.setUTCHours(21, 0, 0, 0);
    
    const title = "Long's Intern Presentation";
    const details = "Join my intern presentation!\\n\\n⏰ Time: 4:00 PM - 5:00 PM Eastern Time (EST/EDT)\\n🔗 Zoom Link: https://alchemy.zoom.us/j/89703048511?jst=2\\n\\n⚠️ Note: Please verify the time in your timezone!";
    const location = "Zoom Meeting";
    
    const formatDate = (date) => {
        return date.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
    };
    
    const googleCalendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE` +
        `&text=${encodeURIComponent(title)}` +
        `&dates=${formatDate(startTime)}/${formatDate(endTime)}` +
        `&details=${encodeURIComponent(details)}` +
        `&location=${encodeURIComponent(location)}`;
    
    window.open(googleCalendarUrl, '_blank');
}