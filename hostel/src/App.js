import Header from './components/Header';
import HeroSection from './components/HeroSection';
import BookingForm from './components/BookingForm';
import Footer from './components/Footer';
import 'react-datepicker/dist/react-datepicker.css';


function App() {
  return (
    <div>
      <Header />
      <HeroSection>
        <BookingForm />
      </HeroSection>
      <Footer />
    </div>
  );
}
export default App;	