# chatGPT-mini

A minimal ChatGPT-like application built with **React**, **Node.js**, and the **OpenAI API**.  
This mini project allows you to send prompts to the ChatGPT model and receive responses, mimicking the behavior of ChatGPT in a sleek, simple interface.

---

## ⚡ Features
- ✅ Simple and clean chat interface
- ✅ Connects to OpenAI API
- ✅ Responsive design for mobile and desktop
- ✅ Supports dark and light themes
- ✅ Clear chat messages
- ✅ Easily extensible

---

## 🛠️ Tech Stack
- ⚛️ **React** (UI)
- 💻 **Node.js** / **Express** (Backend)
- 🤖 **OpenAI API** (For chat responses)

---

## 🚀 Demo
👉 **View Live Demo**: [https://chat-gpt-mini-iota.vercel.app](https://chat-gpt-mini-iota.vercel.app)

*(Replace this link with your actual deployed site.)*

---

## ⚡️ Getting Started

### Prerequisites
- Node.js (v16 or later) & npm
- An OpenAI API Key

---

### ⚙️ Installation
1. Clone this repository:
    ```bash
    git clone https://github.com/Ravisain7851051298/chatgpt-mini.git
    ```
2. Install dependencies:
   1. ```bash
    cd chatgpt-mini
    ```
   2. then 
    ```bash
    cd frontend  
    npm install
    ```
   2. open new terminal
    ```bash
    cd backend  
    npm install
    ```
3. Create a `.env` file and add your OpenAI API key:
    ```
    PORT=5000
    OPENAI_API_KEY=your_api_key_here
    ```
4. Update frontend/sec/services/api.js with your local server
    ```
    const API_URL = 'http://localhost:5000/api/chat';
    ```
5. Start the development servers:
    - Backend:
      ```bash
      npm run dev
      ```
    - Frontend:
      ```bash
      npm run dev
      ```
6. Open your browser and navigate to:
    ```
    http://localhost:5173/
    ```

---

## 🐳 Build for Production
```bash
npm install
```
