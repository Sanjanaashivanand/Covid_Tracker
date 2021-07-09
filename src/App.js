import React, { useEffect, useState } from 'react';
import { MenuItem,FormControl, Select, Card, CardContent} from '@material-ui/core';
import InfoBox from './InfoBox';
import InfoAccodion from './InfoAccodion';
import Table from './Table';
import Map from './Map';
import LineGraph from './LineGraph';
import './App.css';
import { sortData } from './util';
import "leaflet/dist/leaflet.css";


function App() {

  const [countries, setCountries] = useState([]);
  const [country, setCountry] = useState("worldwide")
  const [countryInfo, setCountryInfo] = useState({});
  const [mapCountries, setMapCountries] = useState([]);
  const [tableData, setTableData] = useState([]);
  const [mapCenter, setMapCenter] = useState({ lat: 34.80746, lng: -40.4796});
  const [mapZoom, setMapZoom] = useState(3);
 

  useEffect(() => {
    fetch('https://disease.sh/v3/covid-19/all')
    .then((response) => response.json())
    .then((data)=>{
      setCountryInfo(data);
    })
  },[])

  useEffect(() => {
    //the code **ONLY** runs once when app/component loads, if a variable is put in [] it runs once when app loads and once that variable changes
    const getCountriesData = async () => {
      await fetch("https://disease.sh/v3/covid-19/countries")
        .then((response) => response.json())
        .then((data)=> {
          const countries = data.map((country) => ({
            name: country.country,
            value: country.countryInfo.iso2,
          }));
        
        let sortedData = sortData(data);
        setTableData(sortedData);
        setMapCountries(data);
        setCountries(countries);
      })
    };
    getCountriesData();
  }, []);

  const onCountryChange = async (event) => {
    const countryCode = event.target.value;
    setCountry(countryCode);
    const url = 
      countryCode === "worldwide" 
      ? 'https://disease.sh/v3/covid-19/all' : 
      `https://disease.sh/v3/covid-19/countries/${countryCode}`;
    
    await fetch(url)
    .then(response => response.json())
    .then(data => {
      setCountry(countryCode);
      setCountryInfo(data);
      setMapCenter([data.countryInfo.lat, data.countryInfo.long]);
      setMapZoom(4);
    })
  }

  return (
    <div className="app">
      <div className="app-left">

            <div className = "app_header">
              {/*Title + selector*/}
              <h1>COVID-19 TRACKER</h1>
              <FormControl className="app_dropdown">
                <Select varient = "outlined" onChange={onCountryChange} value = {country}>
                      <MenuItem value="worldwide">Worldwide</MenuItem>
                      {
                        countries.map(country => (
                          <MenuItem value = {country.value}>{country.name}</MenuItem>
                        ))
                      }
                </Select>
              </FormControl>
            </div>

            <div className="app_stats">
                <InfoBox title="Coronavirus Cases"  total={countryInfo.cases}/>

                <InfoBox title="Recovered" total={countryInfo.recovered}/>

                <InfoBox title="Deaths" total={countryInfo.deaths}/>
            </div>

            <div className="app_stats2">
              <InfoAccodion title="Active" sub_title="Currently active cases" total={countryInfo.active}></InfoAccodion>
              <InfoAccodion title="Closed" sub_title="Cases with an outcome" total={countryInfo.recovered}></InfoAccodion>
            </div>

            

            {/*Map*/}
            <Map 
              countries={mapCountries}
              center={mapCenter}
              zoom = {mapZoom}
            />
        

      </div>

      <Card className="app-right">
        <CardContent>

          {/* TABLE */}
          <h1>Live Cases by Country</h1>
          <Table countries={tableData}></Table>
          <LineGraph/>
        </CardContent>
      </Card>

    </div>
      
  );
}

export default App;
