# Academia de Mate (Math Academy)

Academia de Mate is an interactive, educational web application designed to help children practice fundamental math operations (addition, subtraction, multiplication, and division) in a fun and engaging way. The platform includes standard math drills as well as interactive mini-games to maintain student interest.

## Features

- **Math Drills**: Practice specific operations (➕, ➖, ✖️, ➗) or mixed calculations.
- **Interactive Mini-Games**:
  - **Math Bingo**: Solve math problems to fill a 3x3 or 5x5 Bingo board.
  - **Wood Jump**: Help a frog cross a river by solving math problems and jumping on the correct logs.
- **Live Scoring & Feedback**: Real-time visual feedback for correct/incorrect answers.
- **Progress Tracking**: Records student performance and saves it securely to the cloud.
- **Data Analytics**: Generates performance graphs and reports for parents/teachers using Python.

## Architecture & Technologies

The project is built with a lightweight, modular architecture without heavy frontend frameworks, relying on a modern Backend-as-a-Service (BaaS) for data storage.

### Frontend
- **Vanilla HTML5/CSS3/JavaScript**: Ensures fast load times and zero dependencies.
- **Modular JS Design**: The logic is split into dedicated files based on responsibility:
  - `engine.js`: Core math generation logic.
  - `ui.js`: DOM manipulation and user notifications (toasts, overlays).
  - `script.js`: Event listeners and core application loop.
  - `games.js` & `woodjump.js`: Dedicated logic and game loops for mini-games.
  - `menu.js`: Navigation and sidebar management.
  - `stats.js`: Cloud integration for submitting and fetching scores.
- **State & Storage**: Uses global state variables for active sessions and `localStorage` to persist the user's name across reloads.

### Backend & Database
- **Supabase**: Used as a serverless backend. The application communicates directly with Supabase via its JS SDK to insert session data (correct/incorrect scores, operation types, timestamps) into the `rezultate_mate` table.

### Data Analytics
- **Python Pipeline**: `analiza_rezultate.py` fetches data from Supabase.
- **Pandas & Matplotlib**: Used to aggregate student data and plot visual progress reports (e.g., accuracy percentages over time).

## Setup & Running

1. **Frontend**: Open `index.html` in any modern web browser. No local server is required for basic gameplay, but a local server (like Live Server) is recommended.
2. **Analytics**:
   - Install Python dependencies: `pip install pandas matplotlib supabase`
   - Run the script: `python analiza_rezultate.py`

## Project Structure

```text
/
├── index.html              # Main application entry point
├── style.css               # Application styling
├── script.js               # Core answer validation and event listeners
├── engine.js               # Math operation generation logic
├── ui.js                   # UI utilities, toasts, name saving
├── menu.js                 # Sidebar and navigation logic
├── games.js                # Bingo mini-game logic
├── woodjump.js             # Wood Jump mini-game logic
├── stats.js                # Supabase DB connection and session saving
├── config.js               # General configurations
├── analiza_rezultate.py    # Python script for data visualization
└── *.jpeg / *.png          # Game assets
```
