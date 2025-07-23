MooN Thrifts - E-commerce Website

MooN Thrifts is a full-stack e-commerce platform built with the MERN stack (MongoDB, Express.js, React.js, Node.js). The website allows users to browse products, add them to the cart, and place orders. Only an admin (with a specific email) can add new products. The UI has a modern black-and-white aesthetic with responsive layouts and animations.
🚀 Features
Frontend (React + Tailwind CSS)
- Responsive UI built with Tailwind CSS and mobile-friendly layouts.
- Video Background: The home page has a full-screen looping video background.
- User Authentication with JWT (Login & Register).
- User data (token, email, username) stored in localStorage.
- Product Management: View all products, admin-only product addition with image upload.
- Multiple images per product using Cloudinary.
- Cart Functionality: Add, remove, and update product quantities.
- Real-time price updates with totals.
- Profile Page: View and edit username & profile picture, see number of uploaded products.
- Custom Toast Notifications with react-hot-toast.
- Product Carousel & Modal with smooth animations.
- Footer: Social media links (Instagram, Twitter, Facebook).
Backend (Node.js + Express.js)
- User Authentication & JWT with secure login and registration.
- verifyToken middleware for protected routes.
- Product Management linked to the user who uploads them.
- Only ashwinparashar1018@gmail.com can add products.
- Cart API: Add to cart, remove, update quantity, and fetch cart.
- Image Upload: Images are uploaded to Cloudinary with multiple image uploads supported.
- MongoDB Atlas Integration for storing user, product, and cart data.
🛠️ Tech Stack
Frontend:
- React.js
- React Router DOM
- Tailwind CSS
- React Dropzone
- React Hot Toast
- Lucide-react
Backend:
- Node.js
- Express.js
- MongoDB (Mongoose)
- JWT (JSON Web Tokens)
- Bcrypt
- Cloudinary
- CORS
- dotenv
📦 Project Structure
ecommerce/
├── client/                 # React Frontend
│   ├── src/
│   │   ├── components/     # Navbar, Footer, ProductCard
│   │   ├── pages/          # Home, Login, Register, Products, Cart, Profile
│   │   ├── api/            # Axios API calls
│   │   ├── App.jsx         # Routes
│   │   └── main.jsx        # Entry Point
│   └── package.json
│
├── server/                 # Node.js Backend
│   ├── routes/             # auth.routes, product.routes, cart.routes, upload.routes
│   ├── models/             # User.js, Product.js, Cart.js
│   ├── middleware/         # verifyToken.js
│   ├── controllers/        # auth.js
│   ├── server.js           # Main server file
│   └── package.json
│
└── README.md
🔧 Installation and Setup
1. Clone the repository
git clone https://github.com/yourusername/moon-thrifts.git
cd moon-thrifts
2. Backend Setup
cd server
npm install
Create a `.env` file in the `server/` directory:

PORT=5000
MONGO_URI=your_mongodb_atlas_url
JWT_SECRET=your_jwt_secret
CLOUDINARY_CLOUD_NAME=your_cloudinary_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret

Start the backend:
npm run dev
3. Frontend Setup
cd ../client
npm install
npm run dev

The website will run at: http://localhost:5173
🔐 Authentication
JWT token is stored in `localStorage`. Only users with the email `ashwinparashar1018@gmail.com` can access the Add Product page. Unauthorized users will see an error message.
📚 API Endpoints
Auth:
- POST /api/auth/register
- POST /api/auth/login
- GET /api/auth/profile (protected)
- PUT /api/auth/profile (update profile)

Products:
- GET /api/products
- POST /api/products (admin-only)

Cart:
- GET /api/cart
- POST /api/cart/add
- PUT /api/cart/update
- DELETE /api/cart/remove/:productId

Uploads:
- POST /api/upload (image upload to Cloudinary)
✨ Upcoming Features
- Checkout flow with payment integration.
- Wishlist functionality.
- Order history for users.
- Search and filter functionality for products.
👨‍💻 Author
Ashwin Parashar
- Instagram: https://www.instagram.com/_ashwin018
- Twitter: https://x.com/ashwinpara3542?s=21
- Email: ashwinparashar1018@gmail.com
