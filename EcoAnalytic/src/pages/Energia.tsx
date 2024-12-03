import React from 'react';
import '../styles/Energia.css';
import img1 from '../images/IMG1.jpg'; // Cambiar rutas por las imágenes reales
import img2 from '../images/IMG2.jpg';
import img3 from '../images/IMG3.jpg';
import Card from '../components/Card';


const EnergiaE: React.FC = () => {
  const cardData = [
    {
      img: img1,
      title: '¿Qué es la Energía Eólica?',
      summary: 'Una breve explicación sobre qué es la energía eólica.',
      details: <p> La energía eólica se obtiene del viento, transformando su movimiento en energía eléctrica. <br></br>
        Es una fuente renovable, limpia y cada vez más eficiente, que puede ser aprovechada tanto en áreas rurales como urbanas.<br></br>
        Los aerogeneradores o turbinas eólicas capturan la energía del viento y la convierten en electricidad, contribuyendo a un futuro energético sostenible. <br></br><br></br>
        Tipos de Energía Eólica<br></br>
-Energía eólica terrestre (onshore): Instalada en tierra firme, es la más común y desarrollada.<br></br>
-Energía eólica marina (offshore): Ubicada en el mar, aprovecha vientos más fuertes y constantes </p>,
    },
    {
      img: img2,
      title: 'Beneficios de la Energía Eólica',
      summary: 'Los beneficios clave de utilizar energía eólica.',
      details: <p> La energía eólica tiene numerosos beneficios, incluyendo la reducción de las emisiones de CO2 y la dependencia de los combustibles fósiles.<br></br> 
         Además, su instalación puede generar empleos en la construcción y el mantenimiento de las turbinas.<br></br> 
         El uso de energía eólica también ayuda a diversificar la matriz energética de los países, mejorando la seguridad energética a largo plazo.<br></br><br></br>
         
         -Limpia y sostenible: No emite gases de efecto invernadero durante su operación.<br></br>
-Renovable e inagotable: El viento es un recurso ilimitado.<br></br>
-Económicamente competitiva: Bajos costos de mantenimiento y producción.<br></br>
-Desarrollo local: Genera empleo y riqueza en las comunidades donde se instala.<br></br>
-Independencia energética: Reduce la necesidad de importar combustibles fósiles</p>,
  
    },
    {
      img: img3,
      title: 'Tecnología de los Aerogeneradores',
      summary: 'Conoce cómo funcionan los aerogeneradores.',

      details: <p>Los aerogeneradores convierten la energía cinética del viento en energía mecánica a través de las palas que giran cuando el viento las impulsa. Esta energía mecánica se transmite al generador, donde se convierte en electricidad. Existen diferentes tipos de aerogeneradores, tanto terrestres como marinos, dependiendo del lugar de instalación y la cantidad de viento disponible.</p>,

    },
  ];

  return (
    <div className="home">
      {/* Header */}
      <div className="home-header">
        <h1>Energía Eólica</h1>
        <p className="subtitulo">Todo lo que necesitas saber sobre Energía Eólica</p>
      </div>

      {/* Cards Section */}
      <div className="home-cards">
        {cardData.map((card, index) => (
          <Card
            key={index}
            img={card.img}
            title={card.title}
            summary={card.summary}
            details={card.details}
          />
        ))}
      </div>

      <div className="home-summary">
        
        <div className='imagen'>
        <img src="src\images\IMG2.jpg"></img>
        </div>
       
      
        <div className='texto'>

        <p>La energía eólica se ha consolidado como un pilar fundamental en la transición hacia un modelo energético más sostenible y respetuoso con el medio ambiente. Esta fuente de energía renovable, que aprovecha la fuerza del viento para generar electricidad, ofrece numerosas ventajas que la posicionan como una solución clave para enfrentar los desafíos energéticos y climáticos actuales.<br></br>

        En primer lugar, la energía eólica destaca por su carácter limpio e inagotable. Al no requerir procesos de combustión, contribuye significativamente a la reducción de emisiones de gases de efecto invernadero, ayudando así a combatir el cambio climático.<br></br>
         Además, el viento es un recurso ilimitado, lo que garantiza una fuente de energía a largo plazo y reduce la dependencia de combustibles fósiles</p>
         </div>
      </div>
    </div>
  );
};

export default EnergiaE;