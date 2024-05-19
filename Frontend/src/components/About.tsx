import Navbar from "./NavBar";
import Footer from "./Footer";
import bird from "../assets/bird.png";

function About() {
  return (
    <>
      <Navbar></Navbar>
      <main className="container mt-5">
        <h1 className="text-center mb-20rem">Про додаток</h1>
        <div className="row">
          <div className="col-md-4">
            <img src={bird} alt="Емблема додатку" className="img-fluid"></img>
          </div>
          <div className="col-md-8">
            <p>
              Ласкаво просимо до нашого додатку для обліку робочого часу. Зручно
              керуйте своїм робочим часом, фіксуючи час початку та завершення
              робочих сесій. Використовуйте таймер для точного відстеження часу
              та підвищення ефективності вашої роботи.
            </p>
            <p>
              Ми пропонуємо зручний інтерфейс та корисні функції для кращого
              управління вашим часом. Нехай ваш робочий день буде ефективним та
              організованим!
            </p>
          </div>
        </div>
      </main>
      <Footer></Footer>
    </>
  );
}

export default About;
