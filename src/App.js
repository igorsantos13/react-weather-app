import { useState } from "react";
function App() {
  const [city, setCity] = useState("");
  const [weatherForecast, setWeatherForecast] = useState(null);

  const [isLoading, setLoading] = useState(false)

  const handleSearch = () => {
    fetch(
      `http://api.weatherapi.com/v1/current.json?key=cbe32a39721442abbe3185822212210&q=${city}&lang=pt`
    )
      .then((res) => {
        
        if (res.status === 200) {
          setLoading(true)
          return res.json();
        }else if (res.status !== 200){
          alert('Algo deu errado, verifique os campos ou reinicie a página')
        }
      })
      .then((data) => {
        setLoading(false)
        console.log(data);
        setWeatherForecast(data);
        setCity('')
      });
  };

  return (
    <>
      <div>
        <nav className="navbar navbar-expand-md navbar-dark bg-dark mb-4">
          <a className="navbar-brand" href="#search">
            EBAC Weather
          </a>
        </nav>
      </div>

      <main className="container" id="search">
        <div className="jumbotron">
          <h1>Verique agora a previsão do tempo na sua cidade!</h1>
          <p className="lead">
            Digite da sua cidade no campo abaixo o nome da sua cidade em seguida
            clique em pesquisar.
          </p>
          <div className="row mb-4">
            <div className="col-md-6">
              <input
                id='input'
                type="text"
                className="form-control"
                value={city}
                onChange={(e) => setCity(e.target.value)}
              />
            </div>
          </div>
          <button className="btn btn-lg btn-primary" onClick={handleSearch}>
            {isLoading ? 'Carregando...' : 'Pesquisar'}
          </button>

          {weatherForecast ? (
            <>
              <div className="mt-4 d-flex align-items-center">
                <div className="col-sm-1">
                  <img
                    src={`${weatherForecast.current.condition.icon}`}
                    alt="Weather Icon"
                  />
                </div>
                <div>
                  <h3>
                    Hoje o dia está: {weatherForecast.current.condition.text}
                  </h3>
                  <p className="lead">
                    Temp: {weatherForecast.current.temp_c}&#8451; <br />
                    País: {weatherForecast.location.country} - 
                    Estado: {weatherForecast.location.region} - 
                    Cidade: {weatherForecast.location.name} 
                    <hr />
                    <h3>Outras informações:</h3>
                    Humidade: {weatherForecast.current.humidity} <br />
                    Velocidade do vento: {weatherForecast.current.wind_kph} Km/h <br />
                    Visibilidade: {weatherForecast.current.vis_km} Km <br />
                  </p>
                </div>
              </div>
            </>
          ) : null}
        </div>
      </main>
    </>
  );
}

export default App;
