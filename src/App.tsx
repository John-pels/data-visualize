import { Checkbox } from "./components/Checkbox";

function App() {
  return (
    <div className="container">
      <Checkbox
        onChange={() => { }}
        value={'false'}
        name="checkbox"
        id="checkbox"
        label="Market High"
      />
    </div>
  );
}
export default App;
