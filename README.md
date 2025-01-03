# CrisisCradle

**Project Execution Video** - [https://drive.google.com/file/d/1mKEzFawKf-MajRaIKSrIvtbtGGlNv-Ii/view?usp=drive_link](https://drive.google.com/file/d/1mKEzFawKf-MajRaIKSrIvtbtGGlNv-Ii/view?usp=drive_link)

## Project Overview
CrisisCradle is a full-stack MERN application designed to facilitate real-time and efficient NGO operations in disaster management. This platform provides essential features for both users and administrators to streamline disaster reporting, communication, and resource deployment.

## Functionalities

### User
- **Report a Disaster**  
  Users can submit detailed reports with information such as name, city, town, state, disaster type, and a description of the disaster.

- **Community Chat with Admin**  
  Real-time chat with the admin to stay updated on the relief progress for specific disasters.

- **Secure Donations**  
  Safe and efficient donations can be made to the NGO using the Razorpay API.

### Admin
- **Secure Sign-In**  
  Authenticated access to admin features with secure login.

- **Data Visualization**  
  Visualize reported disaster data through charts and graphs.

- **View Disaster Reports**  
  Access detailed information on reported disasters.

- **Deploy Resources**  
  Manage and deploy resources to affected areas.

- **Community Chat with Users**  
  Engage in real-time communication with users to update them on relief efforts.

- **Logout**  
  Safe and efficient logout functionality.

## Frontend
The frontend is built with Vite and React, encapsulating all UI logic in the `src` folder. Axios is used to communicate with backend APIs.

### Routes
- `/` - Main Page
- `/report` - Disaster Reporting by User
- `/signin` - Admin Sign-In
- `/userchat` - User Chat
- `/checkout` - Payment Page
- `/visualization` - Disaster Data Visualization
- `/disaster` - List of Reported Disasters
- `/resources` - Resource Deployment Form
- `/adminchat` - Admin Chat

### Frontend Technologies
- **ChartJS** - Provides disaster data visualizations with histograms, line graphs, and pie charts.
- **Axios** - Fetches backend APIs to the frontend.
- **Geolocation API** - Retrieves user's current longitude and latitude.
- **Razorpay API** - Manages transactions with secure payment and verification.

## Backend
The backend is built with Node.js and follows an MVC architecture for clean code organization and readability. It leverages Node's real-time I/O capabilities for efficient performance.

### Backend Technologies
- **CORS (Cross-Origin Resource Sharing)** - Enables secure communication between client and server across different origins.
- **BcryptJS** - Encrypts passwords for secure storage.
- **jsonwebtoken (JWT)** - Manages secure authentication tokens for verified access.
- **Mongoose** - An ORM to streamline backend interactions with MongoDB.
- **Zod** - Validates user input, ensuring correct data types and structures.
- **RazorPay API** - Facilitates safe transactions, handling creation and verification of payments.
- **Socket.IO** - Powers the real-time chat application by enabling duplex communication between client and server for an interactive experience.

### Middlewares
- **admin.js** - Checks if the admin’s email exists in the database and validates credentials.
- **report.js** - Validates user input when reporting disasters.
- **jwtchecker.js** - Ensures JWT tokens are correctly formatted in the authorization header (`Bearer jwt`).

## Database
The database is hosted on MongoDB Atlas, accessible via MongoDB Compass through a connection string.

### Database Collections
- **Admin Database** - Stores admin credentials and details.
- **Chat Database** - Logs community chat messages.
- **Disaster Information Database** - Holds reported disaster details.
- **Deployed Resources Database** - Tracks resource deployment information.

---
