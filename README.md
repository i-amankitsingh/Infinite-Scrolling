# Infinite-Scrolling

This React component implements infinite scrolling to fetch and display product data from a backend API. The component dynamically loads more products as the user scrolls down, creating an uninterrupted browsing experience.

Table of Contents
Technologies Used
Features
Prerequisites
Setup Instructions
Code Overview
Usage
Technologies Used
React with TypeScript: For building the front-end UI.
Material-UI: For layout and styling components.
Axios: For making API requests to the backend.
MERN Stack: Backend built using MongoDB, Express.js, and Node.js.
Features
Infinite Scrolling: Automatically fetches more data when the user reaches the bottom of the page.
Asynchronous Data Fetching: Uses Axios to fetch data from a REST API.
Responsive Design: Optimized for different screen sizes using Material-UI components.
Dynamic Product Display: Shows product details including image, title, description, price, and rating.
Prerequisites
Node.js
MongoDB
A running backend server (e.g., http://localhost:8000/api/v1/data/products) with a RESTful API that provides product data.
Setup Instructions
Clone the repository and navigate into the project folder:

bash
Copy code
git clone https://github.com/yourusername/your-repo-name.git
cd your-repo-name
Install Dependencies:

bash
Copy code
npm install
Run the Application:

bash
Copy code
npm start
Ensure that your backend server is running and accessible at http://localhost:8000/api/v1/data/products.

Code Overview
The core of this component is a React functional component using hooks to manage state, effects, and infinite scrolling logic.

Main Hooks and State
State Variables:

products: Stores an array of products fetched from the API.
page: Keeps track of the current page for paginated API requests.
isFetching: Indicates if data is currently being fetched.
Custom Hooks:

useEffect: Fetches initial data on mount and sets up the scroll event listener.
useCallback: Defines the scroll event handler to detect when the user is near the bottom of the page.
Infinite Scrolling Logic
When the user scrolls to within 100px of the page’s bottom, handleScroll is triggered, which increments the page state to load additional products.

API Request
The fetchData function is an async function that fetches product data from the backend API using Axios. Pagination is handled by passing page and limit as query parameters.

Example Code Snippet
javascript
Copy code
const fetchData = async (page: number, limit: number): Promise<Product[]> => {
    const res = await axios.get("http://localhost:8000/api/v1/data/products", {
        params: { page, limit }
    });
    return res.data.data;
};
Usage
After setup, run the application with npm start. When you scroll to the bottom of the page, more products will load automatically. The component displays each product’s image, title, description, price, and rating.

Component Structure
Box: Wrapper for the main section with background styling.
Container: Provides padding and width control for responsive design.
Grid2: Responsive layout with Material-UI’s grid system for each product card.
Card Components: Each card shows a product with an image, description, rating, and price.
Button: A call-to-action for ordering the product.