import ReactDOM from "react-dom/client";
import { BrowserRouter} from "react-router-dom";
import { Z_ThemeProvider } from "./contexts/ThemeContext";
import { AppRoutes } from "./routes";
import Z_ScrollToTop from "./components/common/Z_ScrollTop";

import "./style/index.css";
import "devicon/devicon.min.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <Z_ThemeProvider>
      <Z_ScrollToTop />
      <AppRoutes />
    </Z_ThemeProvider>
  </BrowserRouter>
);
