import AppRoutes from "./routes/Routes.jsx";
import { AuthProvider } from "./context/ContextAuth.jsx";

function App() {
  return (
    <AuthProvider>
      <AppRoutes />
    </AuthProvider>
  );
}

export default App;
