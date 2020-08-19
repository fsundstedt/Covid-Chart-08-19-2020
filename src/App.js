import React, {Component} from 'react';
import './App.css';
import ChartItems from './ChartItems.jsx';

let barColor = [];

let allInfo = [];

let maxDeaths = 0;
let totalDeaths = 0;
let rawArrays = [];
let sortedArrays = [];
let sortedShortLabels = [];
let sortedLongLabels = [];
let deathsPerMillion = [];

const dataUrl = 'https://corona-api.com/countries';

function changeColor(deaths) {
    if (deaths > 0) {
        barColor.push(`rgba(255, 0, 0, ${deaths/maxDeaths})`);
    } else {
        barColor.push(`rgba(255, 0, 0, 0.0001)`);
    }
}

function shortenName(country) {
                if (country.name.length > 12) {
                    return country.name.substring(0,8) + '...';
                } else {
                    return country.name;
                }
            };

async function getData(url) {
    const response = await fetch(url, {
        method: 'GET',
    });
    let rawData = await response.json();
    return rawData.data;
};

async function arrangeArray() {
  allInfo.map((country) => {
      if (!isNaN((country.latest_data.deaths / country.population) * 1000000) && country.population >= 1000000 && country.latest_data.deaths > 0) {
          let singleArray = [
              country.name,
              shortenName(country),
              (country.latest_data.deaths / (country.name === 'USA' ? 330138000 : country.population)) * 1000000];
          rawArrays.push(singleArray);
          totalDeaths += country.latest_data.deaths;
      } else {
          return
      };
    });

    sortedArrays = rawArrays.sort(function(a, b) {
        return b[2] - a[2];
    });

    // maxDeaths = sortedArrays[0][2];

    sortedArrays.map((country, index) => {
        sortedLongLabels.push(country[0]);
        sortedShortLabels.push(country[1] + ': ' + country[2].toFixed(1));
        deathsPerMillion.push(country[2].toFixed(1));

        changeColor(country[2]);
    });

  return 1;
};

getData(dataUrl);

arrangeArray();

class App extends Component {
  state = {
    data: []
  };

  async getData(url) {
    const response = await fetch(url, {
        method: 'GET',
    });
    let rawData = await response.json();
    return rawData.data;
};

  async componentDidMount() {
    const data = await this.getData(dataUrl);

    this.setState({
      data: data,
    });
  }

  render() {
    const { data } = this.state;

    const chartStyle = {
      padding: '5px'
    }

    console.log(data);

    return(
      <div>
        <div>
            <h3>COVID-<span>19</span> deaths per million people*</h3>
        </div>
        <div style={chartStyle}>
          {data.map((country, index) => {
            return (<ChartItems info={country}/>)
          })}
        </div>
        <div>
            b
        </div>
        <div>
            <div>
                <div>
                    <h4>
                        Notes:
                    </h4>
                    <ul>
                        <li>Data taken from <a href='https://about-corona.net/' target='blank'>https://about-corona.net/</a></li>
                        <li>Only countries with populations over 1,000,000 shown</li>
                        <li>Countries with 0 deaths excluded</li>
                        <li>API shows USA population as ~310,000,000. Chart corrects to ~330,138,000, per <a href='https://www.census.gov/popclock/' target='blank'>https://www.census.gov/popclock/</a></li>
                    </ul>
                </div>
            </div>
        </div>
      </div>
    )
  };
}

export default App;
