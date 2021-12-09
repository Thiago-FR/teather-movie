import React from 'react';

const line = 10;
const column = 10;

class TheaterBoard extends React.Component {
  constructor() {
    super();

    this.state = {
      available: [],
      confirmed: [],
      reserverd: [],
      ConvertReserverd: []
    };
  }

  componentDidMount() {
    this.initialChair();
  }

  initialChair = () => {
    const initialChair = [];
    [...Array(line)].forEach((eachLine, row) => {
      [...Array(column)].forEach((eachColumn, armchair) => {
        initialChair.push(`${row.toString()}-${armchair.toString()}`);
      })
    })
    this.setState({ available: initialChair});
  }

  selectChair = ({ target }, row, armchair) => {
    if (target.className.includes('selected')) {
      target.className = 'chair';
      target.style.backgroundPosition = 'right';
      this.cancelReservation(row, armchair);
    } else {
      target.className = 'chair selected';
      target.style.backgroundPosition = 'center';
      this.reserveChair(row, armchair);
    }
  }

  reserveChair = (row, armchair) => {
    const { available } = this.state;
    const selectedArmchair = `${row.toString()}-${armchair.toString()}`;
    const convertArmchair = `${String.fromCharCode((row + 1) + 64)}-${(armchair + 1).toString()} `;
    const newAvailable = available.filter((currentSeat) => currentSeat !== selectedArmchair);
    this.setState((previous) => ({
      available: newAvailable,
      reserverd: [...previous.reserverd, selectedArmchair],
      ConvertReserverd: [...previous.ConvertReserverd, convertArmchair],
    }));
  }

  cancelReservation = (row, armchair) => {
    const { reserverd, confirmed, ConvertReserverd } = this.state;
    const selectedArmchair = `${row.toString()}-${armchair.toString()}`
    const selectedConvertArmchair = `${String.fromCharCode((row + 1) + 64)}-${(armchair + 1).toString()} `;
    const newReserverd = reserverd.filter((currentSeat) => currentSeat !== selectedArmchair);
    const newConfirmed = confirmed.filter((currentSeat) => currentSeat !== selectedArmchair);
    const newConvertArmchair = ConvertReserverd.filter((currentSeat) => currentSeat !== selectedConvertArmchair);
    this.setState((previous) => ({
      available: [...previous.available, selectedArmchair],
      confirmed: newConfirmed,
      reserverd: newReserverd,
      ConvertReserverd: newConvertArmchair,
    }));
  }

  colorReservation = (reserverd) => {
    reserverd.forEach((armchair) => {
      const armchairID = document.getElementById(armchair);
      armchairID.style.backgroundPosition = 'left';
    });
  }

  confirmReservation = () => {
    const { reserverd } = this.state;
    this.colorReservation(reserverd);
    this.setState((previous) => ({
      confirmed: [...previous.confirmed, ...reserverd],
      reserverd: [],
      ConvertReserverd: [],
    }));
  }
  
  render() {
    const { available, confirmed, reserverd, ConvertReserverd } = this.state;
    return(
      <div className="theater-container">
        <div className="subtitle-container">
          <div className="subtitle">
            <div className="subtitle-line">available: <p className="subtitle-color subtitle-available"></p></div>
            <div className="subtitle-line">| confirmed: <p className="subtitle-color subtitle-confirmed"></p></div>
            <div className="subtitle-line">| reserverd: <p className="subtitle-color subtitle-reserverd"></p></div>
          </div>
          <div className="subtitle-info">
            <p>available: { available.length }</p>
            <p>confirmed: { confirmed.length }</p>
            <p>reserverd: { reserverd.length }</p>
            <p>Amount Collected R$: { confirmed.length * 20 },00</p>
          </div>
          <div className="display-container">
            <p>Selected Seats</p>
            <div className="display-reserved">
            { ConvertReserverd }
            </div>
          </div>
        </div>
        <div className="room-container">
          <dir className="tv"></dir>
          {
          [...Array(line)].map((eachLine, row) => {
            return(
              <div className="chair-container" key={`${eachLine}-${row}`}>
                <span className="row-identifier">{ String.fromCharCode((row + 1) + 64) }</span>
                {
                  [...Array(column)].map((eachColumn, armchair) => {
                    return(
                      <div
                        id={`${row.toString()}-${armchair.toString()}`}
                        key={`${eachLine}-${row}-${armchair}`}
                        className="chair"
                        onClick={ (event) => this.selectChair(event, row, armchair) }
                      >
                      </div>
                    );
                  })
                }
              </div>
            );
          })
          }
          <button className="btn-confirm" type="button" onClick={ this.confirmReservation }>CONFIRM</button>
        </div>
        
      </div>
    );
  }
}

export default TheaterBoard;