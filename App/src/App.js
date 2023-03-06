import { useContext } from "react";
import "./App.css";
import LoaderContext from "./Components/Context/LoaderContext";
import ListUsers from "./Components/ListUsers/ListUsers";
import Loader from "./Components/Loader/Loader";

function App() {
  const [isLoading] = useContext(LoaderContext);
  return <div>{isLoading ? <Loader /> : <ListUsers />}</div>;
}

export default App;
