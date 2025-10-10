# Smart Complaint Analysis System (SCA)

A web application to manage and analyze user complaints with AI-powered sentiment and category analysis. Users can submit complaints, and authorities can view all complaints with insights. Built with **React**, **Node.js**, **Express**, **MongoDB**, and **ML Transformers**.

---

## Features

### User

- Register and login
- Submit complaints with title and description
- View own complaints with:
  - Sentiment (Positive/Negative)
  - Category (e.g., Road Issue, Waste Management, Water Supply, Electricity, Noise Pollution)
  - Confidence score of analysis
  - Status (Pending/Resolved)

### Authority

- Login as authority
- View all complaints from all users
- Update complaint status
- Visual insights of complaints (charts, statistics)

---

## Technologies Used

- **Frontend**: React, React Router, Tailwind CSS
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **ML**: Transformers (`@xenova/transformers`) for:
  - Sentiment analysis
  - Zero-shot classification for complaint categories
- **HTTP Client**: Axios

---
