// forum.js - Earthy color sticky note forum

// Initialize Firebase (replace with your config)
const firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_AUTH_DOMAIN",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_STORAGE_BUCKET",
    messagingSenderId: "YOUR_SENDER_ID",
    appId: "YOUR_APP_ID"
  };
  
  firebase.initializeApp(firebaseConfig);
  const db = firebase.firestore();
  
  // Earthy colour palette
  const earthyColors = [
    "#A47551", // warm brown
    "#C2B280", // sand
    "#8B6F47", // olive brown
    "#A7A99E", // sage grey
    "#D4A373", // clay
    "#6B705C", // deep moss
    "#CB997E", // terracotta
    "#B7B7A4"  // soft stone
  ];
  
  function randomEarthyColor() {
    return earthyColors[Math.floor(Math.random() * earthyColors.length)];
  }
  
  // Submit a new note
  const form = document.getElementById('noteForm');
  const noteInput = document.getElementById('noteInput');
  const notesContainer = document.getElementById('notes');
  
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const text = noteInput.value.trim();
    if (!text) return;
  
    await db.collection('notes').add({
      text,
      color: randomEarthyColor(),
      timestamp: Date.now()
    });
  
    noteInput.value = "";
  });
  
  // Display notes in real time
  db.collection('notes')
    .orderBy('timestamp', 'desc')
    .onSnapshot((snapshot) => {
      notesContainer.innerHTML = "";
  
      snapshot.forEach((doc) => {
        const data = doc.data();
        const note = document.createElement('div');
        note.className = 'note';
        note.style.background = data.color;
        note.textContent = data.text;
        notesContainer.appendChild(note);
      });
    });
  
  // Optional: simple style for floating earthy notes
  document.addEventListener('DOMContentLoaded', () => {
    const style = document.createElement('style');
    style.textContent = `
      #notes {
        display: flex;
        flex-wrap: wrap;
        gap: 12px;
      }
      .note {
        padding: 12px 14px;
        border-radius: 8px;
        width: fit-content;
        max-width: 260px;
        font-family: "Inter", sans-serif;
        color: #2b2b2b;
        box-shadow: 0 3px 6px rgba(0,0,0,0.15);
        animation: fadeIn 0.4s ease;
      }
      @keyframes fadeIn {
        from { opacity: 0; transform: translateY(4px); }
        to { opacity: 1; transform: translateY(0); }
      }
    `;
    document.head.appendChild(style);
  });
  