import React from 'react'; // Importa React, necesario para la creación de componentes en JSX
import HeroSection from '../components/HeroSection'; // Importa el componente HeroSection, que se muestra en la parte superior de la página
import BookingForm from '../components/BookingForm'; // Importa el componente BookingForm, que permite realizar reservas
import Header from '../components/Header'; // Importa el componente Header, que contiene la barra de navegación
import Footer from '../components/Footer'; // Importa el componente Footer, que contiene la información al final de la página

// Componente Home que estructura la página principal
const Home = () => {
  return (
    <>
      {/* Componente Header que contiene la barra de navegación */}
      <Header />

      {/* Componente HeroSection que generalmente contiene el encabezado principal y contenido atractivo */}
      <HeroSection>
        {/* Componente BookingForm que se pasa como children al HeroSection */}
        <BookingForm />
      </HeroSection>

      {/* Componente Footer que contiene la información de contacto y los enlaces a redes sociales */}
      <Footer />
    </>
  );
};

// Exporta el componente Home para ser usado en otras partes de la aplicación
export default Home;
