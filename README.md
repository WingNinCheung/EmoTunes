# EmoTunes

EmoTunes is a web application that uses advanced emotion recognition technology to analyze your mood and recommend music playlists that align with your current emotional state. Capture your mood through the camera, and let EmoTunes curate a personalized music experience for you.

![Screen Shot 2024-06-15 at 2 07 11 PM](https://github.com/WingNinCheung/EmoTunes/assets/96600317/48bf5195-32aa-42d2-b53e-75290214723a)

## Features

- **Real-time Emotion Recognition**: Utilizes webcam input to analyze facial expressions and determine the user's emotional state.
- **Personalized Music Recommendations**: Based on detected emotions, EmoTunes recommends Spotify playlists that match the user's mood.
- **Interactive User Interface**: Simple and intuitive design makes it easy for users to capture their mood and enjoy personalized music recommendations.

## Technologies Used

- **Frontend**: React.js, TypeScript, Tailwind CSS
- **Backend**: Python, Flask
- **API Integration**: Spotify API for music recommendations
- **Emotion Recognition**: Deepface for real-time emotion detection

## Usage

- **Capture Your Mood**: Click on "Capture Your Mood" to open the camera. Capture your facial expression to analyze your mood.
- **Discover Music**: Based on your mood analysis, EmoTunes will recommend Spotify playlists that match your emotions.
- **Re-Capture**: If needed, click on "Re-Capture" to try again.

## Getting Started

### Prerequisites

- **Python 3.6+**: Ensure Python 3.6 or higher is installed on your system.
- **Pipenv**: Install pipenv if you haven't already. It will manage dependencies and virtual environments for your project.

## Installation

To run this project locally, follow these steps:

1. Clone the repository:

```bash
git clone https://github.com/WingNinCheung/EmoTunes.git
cd emtunes
```

2. Install dependencies:

```
// Install frontend dependencies

npm install

// Install backend dependencies

cd server
pipenv install
pipenv shell
```

This command will create a virtual environment and install all dependencies specified in your Pipfile and Pipfile.lock.

## Set up environment variables:

### 1. Create a Spotify Developer Account

- Go to the [Spotify Developer Dashboard](https://developer.spotify.com/dashboard) and log in or create an account.

### 2. Create a New App & Retrieve Client ID and Client Secret

- After creating your app, you will see your Client ID and Client Secret displayed on the app's dashboard.

### 3. Create a .env file in the root directory and add the following:

```
CLIENT_ID=<your-spotify-client-id>
CLIENT_SECRET=<your-spotify-client-secret>
FLASK_PORT=5001
```

## Run the application:

```
// Start the backend server (from the server directory)

flask run

# Start the frontend development server (from the root directory)

npm run dev
```

The application will be available at http://localhost:5173.
