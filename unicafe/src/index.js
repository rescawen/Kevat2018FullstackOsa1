import React from 'react'
import ReactDOM from 'react-dom'

function precisionRound(number, precision) {
    var factor = Math.pow(10, precision);
    return Math.round(number * factor) / factor;
}

function keskiarvo(a, b, c) {

    return precisionRound((a - c) / (a + b + c), 1)
}

function positiivisia(a, b, c) {

    return precisionRound((a / (a + b + c)) * 100, 1)
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
    width: '100px'

};

const Statistic = (props) => {
    return (
        <div>

            <table >
                <tbody>
                    <tr>
                        <td style={tdStyle} >{props.unicafe}</td>
                        <td >{props.counter}{props.percentage}</td>
                    </tr>
                </tbody>
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
    statistic: [
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

    AlwaysThere = (props) => {
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
            </div>
        )
    }

    Statistics = (props) => {
        return (
            <div>
                <Statistic unicafe={unicafe.statistic[0].nimi} counter={this.state.positive} />
                <Statistic unicafe={unicafe.statistic[1].nimi} counter={this.state.neutral} />
                <Statistic unicafe={unicafe.statistic[2].nimi} counter={this.state.negative} />
                <Statistic unicafe={unicafe.statistic[3].nimi} counter={keskiarvo(this.state.positive, this.state.neutral, this.state.negative)} />
                <Statistic unicafe={unicafe.statistic[4].nimi} counter={positiivisia(this.state.positive, this.state.neutral, this.state.negative)} percentage={'%'} />
            </div>
        )
    }

    render() {

        if (this.state.positive === 0 && this.state.neutral === 0 && this.state.negative === 0) {
            return (
                <div>
                    <this.AlwaysThere />
                    <p>ei yhtään palautetta annettu</p>
                </div>
            )
        }

        return (
            <div>
                <this.AlwaysThere />
                <this.Statistics />
            </div>
        )
    }
}

ReactDOM.render(
    <App />,
    document.getElementById('root')
)