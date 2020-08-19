import React from 'react';

function ChartItems(props) {
    const { name } = props.info;
    const { population } = props.info;
    const { deaths } = props.info.latest_data;

    const deathsPerMillion = ( deaths / population ) * 1000000;
    const barLength = deathsPerMillion * 3;

    console.log(population)

    const test = 200;

    const rowStyle = {
        display: 'flex',
        float: 'left'
    }

    const nameStyle = {
        color: 'black',
        backgroundColor: 'green',
        height: '25px',
        width: '160px',
        textAlign: 'right',
        float: 'left'
    }

    const spacerStyle = {
        width: '5px',
        float: 'left',
        color: 'red',
        backgroundColor: 'red',
        float: 'left'
    }

    const barWrapperStyle = {
        display: 'flex',
        alignItems: 'center',
        width: '5000px',
        height: '25px',
        float: 'left',
        border: '1px solid rgba(140, 140, 140)',
        borderBottom: 'none',
        float: 'left'
    }

    const barStyle = {
        width: `${barLength}px`,
        height: '17px',
        backgroundColor: 'blue'
    }

    return (
        <div style={rowStyle}>
            <div style={nameStyle}>
                {name}
            </div>
            <div style={spacerStyle}>-</div>
            <div style={barWrapperStyle}>
                <div style ={barStyle}/>
            </div>
            <br/>
        </div>
    );
}

export default ChartItems;