import React, { useEffect, useState } from 'react';
import { MenuItem,FormControl, Select, Card, CardContent} from '@material-ui/core';
import InfoBox from './InfoBox';
import Table from './Table';
import Map from './Map';
import LineGraph from './LineGraph';
import './App.css';
import { sortData } from './util';


function App() {

  const [countries, setCountries] = useState([]);
  const [country, setCountry] = useState("worldwide")
  const [countryInfo, setCountryInfo] = useState({});
  const [tableData, setTableData] = useState([]);

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
        
        const sortedData = sortData(data);
        setTableData(sortedData);
        setCountries(countries);
      })
    };
    getCountriesData();
  }, [countries]);

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

            

            {/*Map*/}
            <Map></Map>
        

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
