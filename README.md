# 💥 Marvel React App

## 🇺🇸 English Version

This is a small React application that allows users to browse information about Marvel universe characters using the official [Marvel API](https://developer.marvel.com/).

### 🧩 Technologies Used

- React
- React Router
- Axios
- Marvel API
- CSS Modules

### 📦 Installation

Make sure you have Node.js and npm or yarn installed.

```bash
git clone https://github.com/YuriiVychivskii/marvel-react-app.git
cd marvel-react-app
npm install
# or
yarn install
````

### 🚀 Run the App

```bash
npm start

or

yarn start
```

The app will run at: [http://localhost:3000](http://localhost:3000)

### ⚙️ Marvel API Setup

To fetch data, you need a public API key from [Marvel Developer Portal](https://developer.marvel.com/).

1. Sign up or log in at [https://developer.marvel.com/](https://developer.marvel.com/)
2. Create a new project and get your **public key**
3. Create a `.env` file in the project root:

```
REACT_APP_MARVEL_API_KEY=your_public_key_here
```

> 🔐 **Note:** You only need the public key for this project.

### 📁 Project Structure

```
marvel-react-app/
├── public/
├── src/
│   ├── components/
│   ├── services/
│   ├── pages/
│   ├── styles/
│   └── App.jsx
├── .env
├── package.json
└── README.md
```

### 📄 License

This project was created for educational purposes. All rights to Marvel content belong to Marvel.

---
