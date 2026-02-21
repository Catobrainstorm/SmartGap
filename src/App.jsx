import Navbar from './components/Navbar';
import Hero from './components/Hero';
import StatsBar from './components/StatsBar';
import Philosophy from './components/Philosophy';
import Progress from './components/Progress';
import Waitlist from './components/Waitlist';

function App() {
  return (
    <main className="relative w-full bg-white">
      <Navbar />
      
      {/* Hero now stands alone and takes up the full first view */}
      <Hero />

      {/* StatsBar now lives here, so it only shows up once the user scrolls */}
      <StatsBar />

      <Philosophy />
      <Progress />
      <Waitlist />
    </main>
  );
}

export default App;