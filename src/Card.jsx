import React from 'react'

const Card = (props) => {
    return (
        <div id="card">
            <img src={props.url} alt="fail to load" />
        </div>
    )
}

export default Card
