import React, {Component} from 'react';
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

class App extends Component {
  state = {
    data: [],
    maxDeathsRatio: 0
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

    let updatedData = [];

    data.forEach((country, index) => {
      const singleArray = [country.name, country.population, (country.latest_data.deaths / country.population) * 1000000];
      if (singleArray[1] >= 1000000 && singleArray[2] > 0) {
        updatedData.push(singleArray);
      } else {
        return
      }
      if ((country.latest_data.deaths / country.population) > this.state.maxDeathsRatio) {
        this.setState({
          maxDeathsRatio: (country.latest_data.deaths / country.population)
        })
      } else {
        return
      }
    });

    updatedData = updatedData.sort(function(a, b) {
      return b[2] - a[2];
    });

    this.setState({
      data: updatedData,
    });
  }

  render() {
    const { data, maxDeathsRatio } = this.state;

    const chartStyle = {
      padding: '5px'
    };

    const titleBoxStyle = {
      display: 'flex',
      justifyContent: 'center',
      backgroundColor: 'rgba(232, 232, 232, 1)',
      borderRadius: '3px',
    };

    const title19Style = {
      color: 'rgba(170, 0, 0, 0.8)'
    };

    const footnotesBoxStyle = {
      display: 'flex',
      margin: '20px',
      paddingTop: '10px',
      border: '2px solid rgba(130, 130, 130, 0.6)',
      borderRadius: '4px',
      backgroundColor: 'rgba(232, 232, 232, 0.1)',
    };

    const footnotesTitleStyle = {
      fontWeight: 'bold',
      marginBottom: '0px',
    };

    const footnotesListStyle = {
      marginTop: '1px',
      paddingRight: '1%',
    };

    const hrStyle = {
      marginLeft: '165px',
      border: '1px solid rgba(140, 140, 140)',
      borderBottom: 'none',
      lineStyleType: 'none',
      color: 'white',
      width: '10006px',
    }

    return(
      <div>
        <div style={titleBoxStyle}>
            <h3>COVID-<span style={title19Style}>19</span> deaths per million people*</h3>
        </div>
        <div style={chartStyle}>
          {data.map((country, index) => {
            return (<ChartItems info={country} maxDeathsRatio={maxDeathsRatio}/>)
          })}
        </div>
        <div>
          <hr style={hrStyle}/>
        </div>
        <div style={footnotesBoxStyle}>
          <ul style={footnotesListStyle}><div style={footnotesTitleStyle}>Notes</div>
              <li>Data taken from <a href='https://about-corona.net/' target='blank'>https://about-corona.net/</a></li>
              <li>Only countries with populations over 1,000,000 shown</li>
              <li>Countries with 0 deaths excluded</li>
              <li>API shows USA population as ~310,000,000. Chart corrects to ~330,138,000, per <a href='https://www.census.gov/popclock/' target='blank'>https://www.census.gov/popclock/</a></li>
          </ul>
        </div>
      </div>
    )
  };
}

export default App;
