# Next.js / TypeScript E-Commerce BookStore

A modern, full-stack e-commerce application for managing and purchasing digital or physical books. This project is built using Next.js and TypeScript, leveraging Firebase for robust backend services and integrating Stripe for secure payment processing.

## ✨ Features

* **Secure Authentication:** User sign-up and sign-in powered by Firebase Authentication.
* **Persistent User Data:** Storage and synchronization of user-specific data (e.g., library, cart, profile) using Google Firestore.
* **E-Commerce Functionality:** Integrated Stripe for handling secure checkout and processing payments.
* **Modern Frontend:** Built with React/Next.js for performance and SEO, with TypeScript for enhanced code quality.
* **Responsive Design:** Optimized for mobile, tablet, and desktop viewing.

## 💻 Tech Stack

| Category | Technology | Description |
| :--- | :--- | :--- |
| **Frontend Framework** | Next.js | React framework for server-side rendering (SSR) and static site generation. |
| **Language** | TypeScript | Superset of JavaScript that enforces static typing for better scalability. |
| **Authentication** | Firebase Auth | Handles user identity management and secure sessions. |
| **Database** | Firebase Firestore | NoSQL cloud database used for storing book catalog and user data. |
| **Payments** | Stripe | Integrated for reliable and scalable handling of all transactions. |

## 🚀 Getting Started

Follow these steps to set up the project locally.

### Prerequisites

* Node.js (LTS recommended)
* npm or Yarn
* Firebase Project configured with Auth and Firestore.
* Stripe Account for API keys.

### 1. Installation

Clone the repository and install dependencies:

```bash
git clone [YOUR_REPO_URL]
cd [project-name]
npm install
```

### 2. Environment Variables

Create a `.env.local` file and add the following keys:

```
# Firebase Configuration
NEXT_PUBLIC_FIREBASE_API_KEY=your_firebase_api_key
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
# ... (Other Firebase keys)

# Stripe Configuration
STRIPE_SECRET_KEY=your_stripe_secret_key
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key
```

### 3. Run the Development Server

```bash
npm run dev
```

Open `http://localhost:3000` to view the application.

## 📄 License

This project is licensed under the MIT License.