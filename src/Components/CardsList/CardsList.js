import React, { Component } from 'react'
import CardItem from '../CardItem/CardItem'
import './CardsList.css'

export default class CardsList extends Component {

    state = {
        url: "http://localhost:7777/notes",
        cards: [],
        content: "",
    }

    componentDidMount = () => {
        this.loadCards();
    }

    componentDidUpdate = () => {
        this.loadCards();
    }

    loadCards = () => {
        fetch(this.state.url)
            .then(response => response.json())
            .then(cards => {
                this.setState({ cards: cards })
            })
    }

    handleAdd = () => {
        const card = {
            content: this.state.content,
        }

        fetch(this.state.url, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(card)
        })

        this.loadCards();
        this.setState({ content: "" });
    }

    handleDelete = (id) => {
        fetch(this.state.url + '/' + id, {
            method: "DELETE"
        })

        this.loadCards();
    }

    handleUpdate = () => {
        this.loadCards();
    }

    handleChange = (event) => {
        event.preventDefault();
        this.setState({ content: event.target.value })
    }

    render() {
        const cards = this.state.cards;
        return (
            <div className="CardsList-container">

                <div className="CardsList-update">
                    <h2>Notes</h2>
                    <a href="#" className="CardsList-update-btn" onClick={this.handleUpdate}>⟳</a>
                </div>

                <div className="CardsList">
                    {cards.map(card => {
                        return (<CardItem key={card.id} id={card.id} content={card.content} onDel={this.handleDelete} />)
                    })}
                </div>

                <form action="#" className="CardsList-form">
                    <label htmlFor="newNote">New Note</label>
                    <textarea name="newNote" id="newNote" onChange={this.handleChange}  cols="30" rows="10">{this.state.content}</textarea>
                    <a href="#" className="CardsList-add-btn" onClick={this.handleAdd}>▶</a>
                </form>

            </div>
        )
    }
}
