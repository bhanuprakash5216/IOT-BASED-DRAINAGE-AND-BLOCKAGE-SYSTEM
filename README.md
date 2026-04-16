# IoT-Enabled Intelligent Drainage Blockage Detection System

A modern, real-time dashboard for monitoring drainage levels, visualizing sensor data, and detecting blockages using intelligent alerts. This project simulates an IoT environment where hardware (ESP8266) sends data to a cloud database (Supabase), which is then visualized on this frontend.

> **Note:** This version of the project runs in **Demo Mode**, using simulated real-time data to demonstrate functionality without requiring active hardware or database connections.

## 🚀 Features

- **Real-Time Monitoring**: Live visualization of Water and Gas levels with automatic updates every 3 seconds.
- **Intelligent Alerts**:
  - **Water Level Alert**: Triggered when water level exceeds **26 cm**.
  - **Gas Level Alert**: Triggered when gas level exceeds **230 ppm**.
- **Hardware-Sync Indicators**: Visual status indicators that mimic physical LED alerts (Green for Normal, Red for Alert).
- **Interactive Charts**: Dynamic area charts showing historical trends for both water and gas metrics.
- **Responsive Design**: Fully responsive UI built with Tailwind CSS, optimized for desktop and mobile viewing.

## 🛠️ Tech Stack

- **Frontend**: [React](https://react.dev/) + [Vite](https://vitejs.dev/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **Visualization**: [Recharts](https://recharts.org/)
- **Icons**: [Lucide React](https://lucide.dev/)

## ⚙️ Setup & Installation

Follow these steps to run the project locally:

1.  **Clone the repository** (or download the source code).

2.  **Install Dependencies**:
    Open your terminal in the project directory and run:
    ```bash
    npm install
    ```

3.  **Run the Development Server**:
    Start the local server with:
    ```bash
    npm run dev
    ```

4.  **Open in Browser**:
    Navigate to the URL shown in your terminal (usually `http://localhost:5173`) to view the dashboard.

## 📂 Project Structure

- `src/components/`: Reusable UI components (Hero, StatusCard, DataChart, AlertBanner).
- `src/hooks/`: Custom React hooks (`useDrainageData`) for managing data logic and simulation.
- `src/App.jsx`: Main application layout and logic.
- `src/main.jsx`: Application entry point.

## ⚠️ Simulation Mode

Currently, the application is configured to run independently of a backend.
- **Data Generation**: Random water and gas values are generated client-side.
- **Alert Simulation**: Alerts are triggered automatically based on the defined thresholds (Water > 26, Gas > 230) or a random 10% chance for demonstration purposes.

---
*Developed for IoT Drainage Monitoring Project*
