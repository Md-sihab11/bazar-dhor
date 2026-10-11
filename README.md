# 🛒 বাজার দর | BazarDor

**An Essential Commodities Price Monitoring Platform for Bangladesh**

Bazar Dor is a modern web application designed to make daily market prices of essential commodities in Bangladesh easily accessible to the public. It helps users monitor daily price updates, track price fluctuations, compare prices across local markets, and explore category-wise product information to make informed purchasing decisions.

## 🌟 Key Features

1. **📈 Real-Time Price Ticker / Marquee**
   - Displays an animated, infinitely scrolling ticker featuring daily price fluctuations of essential commodities.
   - Uses upward (▲) and downward (▼) indicators to highlight price increases and decreases.

2. **📅 Automatic Bengali Calendar and Date**
   - Displays the current Bengali date, including the day, month, and year.
   - Provides a modern interface for users to view the Bengali calendar alongside market information.

3. **📊 Detailed Product Analysis**
   - Provides product-wise price comparisons with the previous day.
   - Displays minimum, maximum, and average prices.
   - Presents comparative price lists from major local markets.

4. **🔐 Secure Authentication and Protected Routes**
   - Implements authentication using Better Auth.
   - Supports email/password authentication and social login through Google and GitHub.
   - Restricts access to protected product detail pages to authorized users.

5. **👤 User Profile and Account Management**
   - Allows users to view their account information.
   - Supports profile name updates and secure sign-out functionality.

6. **🏷️ Category Filtering and Dynamic Sorting**
   - Organizes products into categories such as vegetables, fish and meat, rice and lentils.
   - Supports sorting products by price in ascending or descending order.

7. **📱 Responsive and Accessible Design**
   - Provides a user-friendly interface for mobile phones, tablets, and desktop devices.
   - Uses responsive layouts to deliver a consistent browsing experience across screen sizes.

## 🛠️ Technologies Used

| Technology | Purpose |
|---|---|
| [Next.js](https://nextjs.org/) | React framework with App Router |
| [React 19](https://react.dev/) | User interface development |
| [TypeScript](https://www.typescriptlang.org/) | Type-safe development |
| [Tailwind CSS](https://tailwindcss.com/) | Utility-first styling |
| [DaisyUI](https://daisyui.com/) | UI components and styling |
| [Better Auth](https://www.better-auth.com/) | Authentication and OAuth |
| [MongoDB Atlas](https://www.mongodb.com/atlas) | Cloud database |
| [React Toastify](https://fkhadra.github.io/react-toastify/) | Notifications and toast messages |
| [React Icons](https://react-icons.github.io/react-icons/) | Icon library |
| [Google Fonts](https://fonts.google.com/) | Typography, including Anek Bangla |

## 🚀 Getting Started

Follow these steps to run Bazar Dor locally.

### 1. Clone the Repository

```bash
git clone https://github.com/Md-sihab11/bazar-dor.git
cd bazar-dor
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Environment Variables

Create a `.env` file in the root directory and add the following variables:

```env
MONGO_DB_URL=your_mongodb_connection_string

BETTER_AUTH_SECRET=your_long_random_secret
BETTER_AUTH_BASE_URL=http://localhost:3000

GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret

GITHUB_CLIENT_ID=your_github_client_id
GITHUB_CLIENT_SECRET=your_github_client_secret
```

Replace the placeholder values with your actual credentials.

- **MongoDB:** Configure your MongoDB connection string.
- **Better Auth:** Generate a secure, random authentication secret.
- **Google OAuth:** Configure your Google OAuth client credentials and authorized redirect URI.
- **GitHub OAuth:** Configure your GitHub OAuth application and callback URL.

**Important:** Keep your `.env` file and secret credentials private. Never commit real credentials to GitHub.

Make sure the environment variable names match those used in your application's database and authentication configuration.

### 4. Start the Development Server

```bash
npm run dev
```

Open your browser and visit:

[http://localhost:3000](http://localhost:3000)

## 📂 Project Structure

```text
bazar-dor/
├── public/                 # Static assets and images
├── src/
│   ├── app/
│   │   ├── (auth)/         # Login and signup pages
│   │   ├── api/            # API routes and Better Auth handlers
│   │   ├── categories/     # Category pages and loading skeletons
│   │   ├── detailpage/     # Product detail pages
│   │   ├── profile/        # User profile page
│   │   ├── loading.tsx     # Global loading UI
│   │   ├── not-found.tsx   # Custom 404 page
│   │   └── page.tsx        # Home page
│   ├── components/         # Reusable UI components
│   ├── lib/                # Authentication and database configuration
│   └── types/              # TypeScript type definitions
├── .env                    # Environment variables (not committed)
├── package.json
├── tsconfig.json
└── README.md
```

*Note: The folder structure above is illustrative. Update it to match the actual repository structure.*

## 🎯 Project Objective

Bazar Dor aims to make essential commodity prices more transparent and accessible to the people of Bangladesh. By presenting market information, price trends, and product comparisons in one place, the platform helps users understand market movements and make more informed purchasing decisions.

---

**Bazar Dor | বাজার দর**

*Making daily market prices easier to access, understand, and compare.*
