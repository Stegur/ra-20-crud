import React, { Component } from 'react'
import PropTypes from 'prop-types'
import './CardItem.css'

export default class CardItem extends Component {
    static propTypes = {
        id: PropTypes.number.isRequired,
        content: PropTypes.string.isRequired,
        onDel: PropTypes.func.isRequired,
    }

    handleClick = (event) => {
        this.props.onDel(event.target.id)
    }

    render() {
        return (
            <div className="CardItem">
                <a href="#" className="CardItem-del-btn" id={this.props.id} onClick={this.handleClick}>X</a>
                {this.props.content}
            </div>
        )
    }
}
