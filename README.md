# Sentiment Analysis Application 🌟
A web application that performs real-time sentiment analysis on text inputs using Google Cloud's Natural Language Processing API. This project demonstrates the integration of cloud computing, serverless architecture, and full-stack web development.

🚀 Features
Frontend: A responsive and interactive user interface built with ReactJS.
Backend: A robust backend created using Node.js, which handles API requests and responses.
Cloud Function: A serverless Google Cloud Function that connects to the NLP API, ensuring scalable and efficient processing.
Sentiment Analysis: Provides insights into the emotional tone (positive, negative, or neutral) of the given text.

🛠️ Technologies Used
Frontend: ReactJS, HTML, CSS, TailwindCSS
Backend: Node.js, Express.js
Cloud Platform: Google Cloud Platform (GCP)
Google Cloud Functions
Google Natural Language API

📂 Project Structure
plaintext
Copy code
project/
├── client/       # ReactJS frontend  
├── server/       # Node.js backend  
└── cloud-function/  # Google Cloud Function for NLP API integration  

🌐 How It Works
User Input: Text is entered in the ReactJS-based frontend.
API Request: The input is sent to the Node.js backend.
Cloud Processing: The backend triggers a Google Cloud Function to process the input with the NLP API.
Sentiment Result: The analyzed sentiment (positive, negative, or neutral) is returned to the frontend and displayed to the user.

📖 How to Run
Clone the repository:
bash
Copy code
git clone [repo-url]
Navigate to the respective directories and install dependencies:
bash
Copy code
cd client && npm install  
cd ../server && npm install  
Start the development servers:
Frontend:
bash
Copy code
npm run dev
Backend:
bash
Copy code
npm start
Deploy the Google Cloud Function for NLP API integration.

🏆 Learnings
This project allowed me to:

Explore Google Cloud Functions for serverless architecture.
Integrate and utilize the Google Natural Language API.
Develop a full-stack application with cloud-based solutions.

# Note for Users:
Before running the project, add your own Google Cloud Function URL to the backend. Replace 'your-cloud-function-api-url' in the axios.post call with your actual Cloud Function URL.
