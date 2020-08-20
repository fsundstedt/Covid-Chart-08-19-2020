import React, { useState } from 'react';
import arrow from './arrow-icon.png';

function shortenName(longName) {
    if (longName.length > 10) {
        return longName.substring(0,8) + '..';
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
    const { rank } = props;
    const name = props.info[0];
    const shortName = shortenName(name);
    let population = props.info[1];
    let deathsPerMillion = props.info[2];

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
    };

    const rowStyle = {
        display: 'flex',
        float: 'left'
    };

    const rankStyle = {
        textAlign: 'left',
        float: 'left',
    };

    const nameStyle = {
        color: 'black',
        height: '25px',
        width: '160px',
        textAlign: 'right',
        float: 'left'
    };

    const spacerStyle = {
        width: '6px',
        float: 'left',
        color: 'white',
        border: '1px solid rgba(140, 140, 140)',
        borderBottom: 'none',
        borderLeft: 'none',
        float: 'left'
    };

    const barWrapperStyle = {
        display: 'flex',
        alignItems: 'center',
        width: '10000px',
        height: '25px',
        float: 'left',
        border: '1px solid rgba(140, 140, 140)',
        borderBottom: 'none',
        float: 'left'
    };

    const barStyle = {
        width: `${barLength}px`,
        height: '17px',
        backgroundColor: changeColor(deathsPerMillion),
        border: '1px solid rgba(140, 140, 140, 1)',
        borderLeft: 'none',
    };

    const modalStyle = {
        position: 'absolute',
        display: 'flex',
        justifyContent: 'center',
        marginLeft: '5px',
        marginTop: '5px',
        padding: '4px',
        paddingRight: '6px',
        paddingTop: '0px',
        color: 'white',
        backgroundColor: 'rgba(20, 20, 20, 0.8)',
        borderRadius: '4px',
    };

    const modalListStyle = {
        marginTop: '6px',
        marginBottom: '6px',
        listStyleType: 'none',
        paddingLeft: '2px',
    };

    const modalNameStyle = {
        paddingLeft: '0px'
    };

    const modalArrowStyle = {
        paddingRight: '4px',
    }

    const modalHrStyle = {
        margin: '2px',
        marginTop: '4px',
        height: '1.5px',
        backgroundColor: 'white',
        border: 'none',
        borderColor: 'white',
    };

    const modalOn = (
    <div style={modalStyle}>
        <ul style={modalListStyle}>
            <li style={modalNameStyle}><img style={modalArrowStyle} src={arrow} alt="Arrow Image"/>{name}</li>
            <hr style={modalHrStyle}/>
            <li>Population: {(population / 1000000).toFixed(1)} million</li>
            <li>Deaths: {(deathsPerMillion * (population / 1000000)).toFixed(0)}</li>
            <li>Death Rate: {((deathsPerMillion * (population / 1000000)/population)).toFixed(6)}%</li>
        </ul>
    </div>
    );
    const modalOff = <div></div>

    return (
        <div style={rowStyle}>
            <div style={nameStyle}>
                <div style={rankStyle}>{rank}.</div>{shortName}: {deathsPerMillion.toFixed(1)}
            </div>
            <div style={spacerStyle}>-</div>
            <div style={barWrapperStyle}>
                <div style={barStyle} onMouseEnter={() => toggleModal()} onMouseLeave={() => toggleModal()}>{modal ? modalOn : modalOff} </div>
            </div>
            <br/>
        </div>
    );
};

export default ChartItems;