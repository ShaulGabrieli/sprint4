import { HomePage } from "./pages/home-page.jsx";
import { AboutUs } from "./pages/about-us.jsx";
import { GigIndex } from "./pages/gig-index.jsx";
import { ReviewIndex } from "./pages/review-index.jsx";
import { ChatApp } from "./pages/chat-app.jsx";
import { AdminApp } from "./pages/admin-app.jsx";
import { GigPayment } from "./pages/gig-payment.jsx";

// Routes accesible from the main navigation (in AppHeader)
const routes = [
  {
    path: "/",
    component: <HomePage />,
    // label: 'Home 🏠',
  },
  {
    path: "gig",
    component: <GigIndex />,
    label: "Gigs",
  },
  {
    path: "review",
    component: <ReviewIndex />,
    label: "Reviews",
  },
  {
    path: "chat",
    component: <ChatApp />,
    label: "Chat",
  },
  {
    path: "about",
    component: <AboutUs />,
    label: "About us",
  },
  {
    path: "admin",
    component: <AdminApp />,
    label: "Admin Only",
  },

  {
    path: "payments",
    component: <GigPayment />,
    label: "Payments",
  },
];

export default routes;
