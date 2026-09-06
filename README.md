# Duit. ✔️

**Duit.** is a refined, distraction-free reminder and to-do application built entirely with vanilla JavaScript. Designed with a sleek, minimalist interface, it helps you organize your tasks, filter your priorities, and manage custom projects without the bloat of a heavy framework.

![HTML5](https://img.shields.io/badge/html5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/css3-%231572B6.svg?style=for-the-badge&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)
![Webpack](https://img.shields.io/badge/webpack-%238DD6F9.svg?style=for-the-badge&logo=webpack&logoColor=black)

## ✨ Features

- **Organize by Time:** Instantly view tasks due **Today** or check what's **Upcoming** in your schedule.
- **Custom Lists:** Group your tasks logically by creating dedicated Projects (e.g., Work, Groceries, Fitness).
- **Full CRUD:** Seamlessly add, edit, or delete both tasks and entire lists.
- **Lightning Fast Search:** Quickly find specific tasks by title or description using the built-in search.
- **Persistent Storage:** Your data never vanishes. Everything is securely saved to your browser's `localStorage`.
- **Responsive Design:** A beautifully structured, desktop-first layout that gracefully adapts to mobile screens.

## 🛠 Tech Stack

- **Vanilla JavaScript (ES6+):** Core application logic, DOM manipulation, and state management.
- **Webpack 5:** Module bundling and development server environment.
- **date-fns:** Lightweight, reliable date formatting and logic parsing.
- **Vercel:** Seamlessly deployed to the web.

## 🚀 Getting Started

If you want to run **Duit.** locally on your machine, follow these steps:

### Prerequisites
Make sure you have [Node.js](https://nodejs.org/) installed on your machine.

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/your-username/duit.git
   cd duit
   ```

2. **Install the dependencies:**
   ```bash
   npm install
   ```

3. **Spin up the development server:**
   ```bash
   npm start
   ```
   *The app will automatically open in your browser at `http://localhost:8080/`.*

### Building for Production
To bundle the files for deployment, run:
```bash
npm run build
```
This will compile the optimized code into the `/dist` directory.

## 🌐 Deployment
This project is configured out-of-the-box for [Vercel](https://vercel.com/). A `vercel.json` file is included to direct the build output to the `dist` folder natively, ensuring a smooth, one-click deployment process. 



