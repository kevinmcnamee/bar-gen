/* @flow */

import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import React, { Component } from 'react';
import bwipjs from 'bwip-js';

type Props = {};

type State = {
  activeBtn: string,
  activeNumber: string,
};

class App extends Component<Props, State> {
  _canvas: ?HTMLCanvasElement;

  constructor(props: Props) {
    super(props);
    this.state = {
      activeBtn: 'BIN',
      activeNumber: '',
    };
  }

  componentDidMount() {
    this.genQrCode();
  }

  componentDidUpdate(prevProps: Props, prevState: State) {
    if (
      this.state.activeBtn !== prevState.activeBtn ||
      this.state.activeNumber !== prevState.activeNumber
    ) {
      this.genQrCode();
    }
  }

  getQrCodeText() {
    return `${this.state.activeBtn}:${this.state.activeNumber}`;
  }

  setActiveBtn(nextActiveBtn: string) {
    // Choosing a new type should also reset the number because there's little chance you want the
    // same number for that other type.
    this.setState({
      activeBtn: nextActiveBtn,
      activeNumber: '',
    });
  }

  handleNumpadClick(num: number) {
    this.setState({
      activeNumber: `${this.state.activeNumber}${num}`,
    });
  }

  handleDeleteClick = () => {
    // Can't delete if there's no number.
    if (this.state.activeNumber.length === 0) return;
    this.setState({
      activeNumber: this.state.activeNumber.substr(0, this.state.activeNumber.length - 1),
    });
  };

  genQrCode() {
    bwipjs(
      this._canvas,
      {
        bcid: 'qrcode', // Barcode type
        text: this.getQrCodeText(), // Text to encode
        height: 40, // Bar height, in millimeters
        width: 40,
        includetext: true, // Show human-readable text
        textxalign: 'center', // Always good to set this
      },
      function(err, cvs) {
        if (err) {
          // Decide how to handle the error
          // `err` may be a string or Error object
        } else {
          // Nothing else to do in this example...
        }
      }
    );
  }

  render() {
    return (
      <div className="container text-center" style={{ maxWidth: '540px' }}>
        <canvas
          className="mt-3"
          ref={ref => {
            this._canvas = ref;
          }}
        />
        <h4 className="mt-3">
          <pre>
            {this.getQrCodeText()}
            <span className="cursor" />
          </pre>
        </h4>
        <div className="row">
          <div className="col my-2">
            <button
              className="btn btn-rounded btn-danger px-4"
              disabled={this.state.activeBtn === 'BIN'}
              onClick={this.setActiveBtn.bind(this, 'BIN')}
              type="button">
              <div className="form-check">
                <input
                  checked={this.state.activeBtn === 'BIN'}
                  className="form-check-input"
                  id="resource-type-bin"
                  name="resource-type"
                  readOnly
                  type="radio"
                />
                <label className="form-check-label" htmlFor="resource-type-bin">
                  BIN
                </label>
              </div>
            </button>
          </div>
          <div className="col my-2">
            <button
              className="btn btn-rounded btn-secondary px-3"
              disabled={this.state.activeBtn === 'CASE'}
              onClick={this.setActiveBtn.bind(this, 'CASE')}
              type="button">
              <div className="form-check">
                <input
                  checked={this.state.activeBtn === 'CASE'}
                  className="form-check-input"
                  id="resource-type-case"
                  name="resource-type"
                  readOnly
                  type="radio"
                />
                <label className="form-check-label" htmlFor="resource-type-case">
                  CASE
                </label>
              </div>
            </button>
          </div>
          <div className="col my-2">
            <button
              className="btn btn-rounded btn-primary px-3"
              disabled={this.state.activeBtn === 'TRAY'}
              onClick={this.setActiveBtn.bind(this, 'TRAY')}
              type="button">
              <div className="form-check">
                <input
                  checked={this.state.activeBtn === 'TRAY'}
                  className="form-check-input"
                  id="resource-type-tray"
                  name="resource-type"
                  readOnly
                  type="radio"
                />
                <label className="form-check-label" htmlFor="resource-type-tray">
                  TRAY
                </label>
              </div>
            </button>
          </div>
          <div className="col my-2">
            <button
              className="btn btn-rounded btn-success"
              disabled={this.state.activeBtn === 'STATION'}
              onClick={this.setActiveBtn.bind(this, 'STATION')}
              type="button">
              <div className="form-check">
                <input
                  checked={this.state.activeBtn === 'STATION'}
                  className="form-check-input"
                  id="resource-type-station"
                  name="resource-type"
                  readOnly
                  type="radio"
                />
                <label className="form-check-label" htmlFor="resource-type-station">
                  STATION
                </label>
              </div>
            </button>
          </div>
          <div className="col my-2">
            <button
              className="btn btn-rounded btn-warning"
              disabled={this.state.activeBtn === 'CROP'}
              onClick={this.setActiveBtn.bind(this, 'CROP')}
              type="button">
              <div className="form-check">
                <input
                  checked={this.state.activeBtn === 'CROP'}
                  className="form-check-input"
                  id="resource-type-crop"
                  name="resource-type"
                  readOnly
                  type="radio"
                />
                <label className="form-check-label" htmlFor="resource-type-crop">
                  CROP
                </label>
              </div>
            </button>
          </div>
        </div>
        <div className="mt-4 mx-auto" style={{ width: '240px' }}>
          <div className="row">
            <div className="col">
              <button
                className="btn btn-dark btn-round btn-lg"
                onClick={this.handleNumpadClick.bind(this, 1)}>
                1
              </button>
            </div>
            <div className="col">
              <button
                className="btn btn-dark btn-round btn-lg"
                onClick={this.handleNumpadClick.bind(this, 2)}>
                2
              </button>
            </div>
            <div className="col">
              <button
                className="btn btn-dark btn-round btn-lg"
                onClick={this.handleNumpadClick.bind(this, 3)}>
                3
              </button>
            </div>
          </div>
          <div className="row mt-3">
            <div className="col">
              <button
                className="btn btn-dark btn-round btn-lg"
                onClick={this.handleNumpadClick.bind(this, 4)}>
                4
              </button>
            </div>
            <div className="col">
              <button
                className="btn btn-dark btn-round btn-lg"
                onClick={this.handleNumpadClick.bind(this, 5)}>
                5
              </button>
            </div>
            <div className="col">
              <button
                className="btn btn-dark btn-round btn-lg"
                onClick={this.handleNumpadClick.bind(this, 6)}>
                6
              </button>
            </div>
          </div>
          <div className="row mt-3">
            <div className="col">
              <button
                className="btn btn-dark btn-round btn-lg"
                onClick={this.handleNumpadClick.bind(this, 7)}>
                7
              </button>
            </div>
            <div className="col">
              <button
                className="btn btn-dark btn-round btn-lg"
                onClick={this.handleNumpadClick.bind(this, 8)}>
                8
              </button>
            </div>
            <div className="col">
              <button
                className="btn btn-dark btn-round btn-lg"
                onClick={this.handleNumpadClick.bind(this, 9)}>
                9
              </button>
            </div>
          </div>
          <div className="row mt-3">
            <div className="col" />
            <div className="col">
              <button
                className="btn btn-dark btn-round btn-lg"
                onClick={this.handleNumpadClick.bind(this, 0)}>
                0
              </button>
            </div>
            <div className="col">
              <button
                className="btn btn-dark btn-round btn-lg"
                disabled={this.state.activeNumber === ''}
                onClick={this.handleDeleteClick}
                style={{ textIndent: '-3px' }}>
                ⌫
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
