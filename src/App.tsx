import './App.css';
import Button from './components/Button/Button';
import Input from './components/Input/Input';

function App() {
  return (
    <div className="app">
      <main>
        <header className="text-center">
          <h1> Search repos </h1>
        </header>
        <form className="flex justify-center">
          <Input
            placeholder="username"
            name="username"
            type={'search'}
            className="rounded-r-none"
          />
          <Button
            type="submit"
            variant="outline"
            color="black"
            className="bg-white rounded-l-none"
          >
            Submit
          </Button>
        </form>
      </main>
    </div>
  );
}

export default App;
