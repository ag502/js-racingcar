import { RANDOM_NUM_MIN_RANGE, RANDOM_NUM_MAX_RANGE, STANDARD_MOVE_VALUE } from "../util/constants.js";

class RacingInfoModel {
  constructor() {
    this.entires = [];
    this.moveCount = 0;
    this.movingDistPerCar = [];
    this.racingWinner = [];
  }

  _generateRandomNum() {
    return Math.floor(Math.random() * (RANDOM_NUM_MAX_RANGE - RANDOM_NUM_MIN_RANGE)) + RANDOM_NUM_MIN_RANGE;
  }

  _canMove() {
    return this._generateRandomNum() <= STANDARD_MOVE_VALUE ? false : true;
  }

  setEntries(entries) {
    this.entires = [];

    entries.forEach((entry) => {
      if (entry.length === 0) {
        throw new Error("자동차의 이름이 유효하지 않습니다");
      }
      this.entires.push(entry);
    });

    this.movingDistPerCar = Array.from({ length: entries.length }, () => 0);
  }

  setMoveCount(count) {
    this.moveCount = count;
  }

  moveCars() {
    Array.from({ length: this.moveCount }, () => {
      this.entires.forEach((_, idx) => {
        if (this._canMove()) {
          this.movingDistPerCar[idx] += 1;
        }
      });
    });
  }

  getRacingResult() {
    const maxDist = Math.max(...this.movingDistPerCar);
    this.racingWinner = this.entires.filter((_, idx) => this.movingDistPerCar[idx] === maxDist);
  }
}

export default new RacingInfoModel();
