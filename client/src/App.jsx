import Header from "./components/Header";
import { Outlet } from "react-router-dom";

const App = () => {
  return (
    <div className="bg-black w-full h-full">
      <Header />
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default App;
