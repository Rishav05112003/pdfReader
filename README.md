# PDF Reader and Conversational AI Application

## Overview

This project is a full-stack application that allows users to upload PDF documents and then ask questions about their content using a conversational AI. The application processes the PDF, extracts the text, and uses a language model (Google's Gemini) to provide answers to user queries.

## Features

* **PDF Upload:** Users can upload PDF files through a web interface.
* **Text Extraction:** The application extracts text content from the uploaded PDFs.
* **Conversational AI:** Users can ask questions about the content of the PDF, and the AI will provide answers.
* **Session Management:** The application maintains user sessions, allowing for context-aware conversations.
* **Full-Stack Architecture:** The project includes both a frontend (built with React) and a backend (built with FastAPI).

## Technologies Used

* **Backend:**
    * FastAPI (Python web framework)
    * Google Generative AI (for language model and embeddings)
    * Langchain (for orchestrating the AI components)
    * FAISS (for vector similarity search)
    * Pypdf (for PDF text extraction)
    * Uvicorn (ASGI server)
* **Frontend:**
    * React (JavaScript library for user interface)
    * Axios (for making HTTP requests)
* **Other:**
    * CORS (for handling Cross-Origin Resource Sharing)
    * UUID (for generating unique session IDs)

## Architecture

1.  **PDF Upload:**

    * The user uploads a PDF file through the React frontend.
    * The frontend sends the file to the FastAPI backend's `/upload` endpoint.
    * The backend receives the PDF, extracts the text, splits it into chunks, and creates a vector store (FAISS) of the text chunks.
    * The backend generates a unique session ID and stores the vector store and conversation chain in memory, associated with the session ID.
    * The backend returns the session ID to the frontend.

2.  **Question Answering:**

    * The user asks a question through the React frontend.
    * The frontend sends the question and the session ID to the FastAPI backend's `/ask` endpoint.
    * The backend retrieves the corresponding vector store and conversation chain using the session ID.
    * The backend uses the conversation chain to process the question, retrieve relevant text chunks from the vector store, and generate an answer using the Gemini language model.
    * The backend returns the answer to the frontend.
    * The frontend displays the answer to the user.

## Setup Instructions

### Prerequisites

* Python 3.x
* Node.js and npm
* A Google Cloud account and API key for the Gemini API.

### Backend Setup

1.  **Clone the repository:**

    ```
    git clone <your_repository_url>
    cd backend
    ```

2.  **Create a virtual environment (recommended):**

    ```
    python -m venv venv
    source venv/bin/activate  # On Linux/macOS
    venv\Scripts\activate  # On Windows
    ```

3.  **Install dependencies:**

    ```
    pip install -r requirements.txt
    ```

4.  **Set up environment variables:**

    * Create a `.env` file in the `backend` directory.
    * Add your Google API key to the `.env` file:

        ```
        GOOGLE_API_KEY=<your_google_api_key>
        ```

5.  **Run the FastAPI application:**

    ```
    uvicorn main:app --reload
    ```

### Frontend Setup

1.  **Navigate to the frontend directory:**

    ```
    cd ../frontend
    ```

2.  **Install dependencies:**

    ```
    npm install
    ```

3.  **Run the React application:**

    ```
    npm start
    ```

### Usage

1.  **Open the application in your browser:** The React frontend should be running at `http://localhost:3000` (or a similar address).
2.  **Upload a PDF:** Use the upload button to select a PDF file from your computer.
3.  **Ask questions:** Once the PDF is uploaded, you can type questions related to the PDF's content in the chat window. The AI will generate answers based on the document.

## Future Enhancements

* User authentication and session management.
* Conversation history display.
* More robust error handling and feedback.
* Support for more file types (DOCX, TXT, etc.).
* Improved question-answering capabilities.
* Database integration for persistent data storage.
* Cloud storage for uploaded files.

## Credits

* This project uses the following libraries and services:
    * FastAPI
    * Google Generative AI
    * Langchain
    * FAISS
    * React
    * Axios

## Author

Rishavdeep Maity
