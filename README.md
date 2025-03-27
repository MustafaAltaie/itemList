# Järven Skolorna Cafeteria List

Welcome to the **Järven Skolorna Cafeteria List**! This app is a digital cafeteria menu for students at **Järven Skolorna** in **Katrineholm**. It provides a user-friendly interface where students in **Högstadiet** can explore the items available in the school cafeteria. The application allows users to view and interact with the cafeteria list.

## Features
- **Dashboard** for managing and displaying cafeteria items.
- **User View** for students to view available items in the cafeteria.
- **Real-time Data** for keeping the cafeteria list updated.
- **Responsive Design** that works across all devices.
  
## Technologies Used
- **Frontend**: React, Redux Toolkit, Vite
- **Backend**: Node.js, Express
- **Database**: MongoDB
- **CI/CD**: GitHub Actions

## Installation & Setup

To run the project locally, follow these steps:

1. Clone the repository:
   ```bash
   git clone https://github.com/MustafaAltaie/itemList.git
   ```

2. Navigate to the project directory:
   ```bash
   cd itemList
   ```

3. Install all dependencies:
   ```bash
   npm install
   ```

4. Run the project:
   ```bash
   npm run dev
   ```

5. Open the application at http://localhost:5173/.

## Setup the .env file

1. Create `.env` file to the `backend` directory.

2. Open the `.env` file and replace the placeholders with your actual credentials:
   - `MONGO_URI`: Replace with your MongoDB connection string (you can get it from your MongoDB Atlas dashboard).

## CI/CD

This project is integrated with **GitHub Actions** for Continuous Integration and Continuous Deployment (CI/CD). This ensures that every push to the main branch automatically triggers the build and deployment pipeline, keeping the app always up-to-date.

## Author
**Mustafa Altaie**  
Created during my **praktik period** after completing my **utbildning** at **Chas Academy**.