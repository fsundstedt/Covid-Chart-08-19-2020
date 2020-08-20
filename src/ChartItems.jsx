import React, { useState } from 'react';

function shortenName(longName) {
    if (longName.length > 12) {
        return longName.substring(0,8) + '...';
    } else {
        return longName;
    }
};

function checkName(name, pop) {
    if (name === 'USA') {
        return 330138000;
    } else {
        return pop;
    }
}

function ChartItems(props) {
    const [modal, setModal] = useState(false);
    const { maxDeathsRatio } = props;
    const name = props.info[0];
    const shortName = shortenName(name);
    let population = props.info[1];
    let deathsPerMillion = props.info[2];

    if (name === 'USA') {
        const newPopulation = 330138000;
        const totalDeaths = deathsPerMillion * (population / 1000000);
        deathsPerMillion = (totalDeaths / newPopulation) * 1000000;
    }

    const barLength = deathsPerMillion * 10;

    function changeColor(deaths) {
        if (deaths > 0) {
            return `rgba(255, 0, 0, ${deathsPerMillion / 1000})`;
        } else {
            return `rgba(255, 0, 0, 0.0001)`;
        }
    };

    function toggleModal() {
        if (modal) {
            setModal(false);
        } else {
            setModal(true);
        }
       console.log(modal);
    }

    const rowStyle = {
        display: 'flex',
        float: 'left'
    }

    const nameStyle = {
        color: 'black',
        height: '25px',
        width: '160px',
        textAlign: 'right',
        float: 'left'
    }

    const spacerStyle = {
        width: '6px',
        float: 'left',
        color: 'white',
        border: '1px solid rgba(140, 140, 140)',
        borderBottom: 'none',
        borderLeft: 'none',
        float: 'left'
    }

    const barWrapperStyle = {
        display: 'flex',
        alignItems: 'center',
        width: '10000px',
        height: '25px',
        float: 'left',
        border: '1px solid rgba(140, 140, 140)',
        borderBottom: 'none',
        float: 'left'
    }

    const barStyle = {
        width: `${barLength}px`,
        height: '17px',
        backgroundColor: changeColor(deathsPerMillion),
        border: '1px solid rgba(140, 140, 140, 1)',
        borderLeft: 'none',
    }

    return (
        <div style={rowStyle}>
            <div style={nameStyle}>
                {shortName}: {deathsPerMillion.toFixed(1)}
            </div>
            <div style={spacerStyle}>-</div>
            <div style={barWrapperStyle}>
                <div style={barStyle} onClick={() => toggleModal()}></div>
            </div>
            <br/>
        </div>
    );
}

export default ChartItems;