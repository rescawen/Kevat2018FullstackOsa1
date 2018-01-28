import React from 'react'
import ReactDOM from 'react-dom'

function keskiarvo(a, b, c) {

    return (a-c)/(a+b+c)
}

function positiivisia(a, b, c) {

    return a/(a+b+c)
}



const Otsikko = (props) => {
    return (
        <div>
            <h1>{props.unicafe}</h1>
        </div>
    )
}

const tdStyle = {
    padding: '0.1em',
    width:'100px'
    
  };

const Osa = (props) => {
    return (
        <div>

            <table >
                <tr>
                    <td style={tdStyle} >{props.unicafe}</td>
                    <td >{props.counter}</td>
                </tr>
            </table>


        </div>
    )
}




const Button = ({ handleClick, text }) => (
    <button onClick={handleClick}>
        {text}
    </button>
)

const unicafe = {
    otsikko: [
        {
            nimi: 'anna palautetta'
        },
        {
            nimi: 'statistiikka'
        }

    ],
    osat: [
        {
            nimi: 'hyvä',


        },
        {
            nimi: 'neutraali',


        },
        {
            nimi: 'huono',


        },
        {
            nimi: 'keskiarvo',

        },
        {
            nimi: 'positiivisia',

        }
    ]
}

class App extends React.Component {

    constructor(props) {

        super(props)
        this.state = {
            positive: 0,
            neutral: 0,
            negative: 0
        }
    }

    asetaArvoon = (arvo, name) => {

        return () => {

            if (name === "positive") {
                this.setState({ positive: arvo })
            } else if (name === "neutral") {
                this.setState({ neutral: arvo })
            } else if (name === "negative") {
                this.setState({ negative: arvo })
            }


        }
    }

    render() {
        return (
            <div>
                <Otsikko unicafe={unicafe.otsikko[0].nimi} />
                <div>
                    <Button
                        handleClick={this.asetaArvoon(this.state.positive + 1, "positive")}
                        text="hyvä"
                    />
                    <Button
                        handleClick={this.asetaArvoon(this.state.neutral + 1, "neutral")}
                        text="neutraali"
                    />
                    <Button
                        handleClick={this.asetaArvoon(this.state.negative + 1, "negative")}
                        text="huono"
                    />
                </div>
                <Otsikko unicafe={unicafe.otsikko[1].nimi} />
                <Osa unicafe={unicafe.osat[0].nimi} counter={this.state.positive} />
                <Osa unicafe={unicafe.osat[1].nimi} counter={this.state.neutral} />
                <Osa unicafe={unicafe.osat[2].nimi} counter={this.state.negative} />
                <Osa unicafe={unicafe.osat[3].nimi} counter={keskiarvo(this.state.positive, this.state.neutral, this.state.negative)}/>
                <Osa unicafe={unicafe.osat[4].nimi} counter={positiivisia(this.state.positive, this.state.neutral, this.state.negative)}/>
            </div>
        )
    }
}

ReactDOM.render(
    <App />,
    document.getElementById('root')
)