import React, { useState } from "react";
import { styled } from "styled-components";
import { isLeapYears } from "./utils/functions";

export default function App() {
  const [Day, setDay] = useState();
  const [Month, setMonth] = useState();
  const [Year, setYear] = useState();
  const [AgeDay, setAgeDay] = useState();
  const [AgeMonth, setAgeMonth] = useState();
  const [AgeYear, setAgeYear] = useState();
  const [DayError, setDayError] = useState();
  const [MonthError, setMonthError] = useState();
  const [YearError, setYearError] = useState();
  const [AllError, setAllError] = useState(false);

  const handleSubmit = () => {
    if (!Month && !Day && !Year) {
      setAllError(true);
    } else if (!Month || !Day || !Year) {
      setAllError(false);
      if (!Month) {
        setMonthError({ stat: true, message: "This field is required." });
      } else {
        setMonthError();
      }
      if (!Day) {
        setDayError({ stat: true, message: "This field is required." });
      } else {
        setDayError();
      }
      if (!Year) {
        setYearError({ stat: true, message: "This field is required." });
      } else {
        setYearError();
      }
    } else {
      setAllError(false);
      setDayError();
      setMonthError();
      setYearError();
      let evOK = false;
      if (Number(Month) === 2) {
        if (isLeapYears(Year)) {
          if (Day <= 29) {
            evOK = true;
            setDayError();
          } else {
            evOK = false;
            setDayError({ stat: true, message: "Day is invalid." });
          }
        } else {
          if (Day <= 28) {
            evOK = true;
            setDayError();
          } else {
            evOK = false;
            setDayError({ stat: true, message: "Day is invalid." });
          }
        }
      } else if (
        Number(Month) === 1 ||
        Number(Month) === 3 ||
        Number(Month) === 5 ||
        Number(Month) === 7 ||
        Number(Month) === 8 ||
        Number(Month) === 10 ||
        Number(Month) === 12
      ) {
        if (Day <= 31) {
          evOK = true;
          setDayError();
        } else {
          evOK = false;
          setDayError({ stat: true, message: "Day is invalid." });
        }
      } else {
        if (Day <= 30) {
          evOK = true;
          setDayError();
        } else {
          evOK = false;
          setDayError({ stat: true, message: "Day is invalid." });
        }
      }
      if (evOK) {
        const nDate = new Date().getDate();
        const nMonth = new Date().getMonth() + 1;
        const nYear = new Date().getFullYear();
        let totalDayNow;
        let a = Number(nDate) + Number(nMonth) * 30 + Number(nYear) * 365;
        let b = Number(Day) + Number(Month) * 30 + Number(Year) * 365;
        totalDayNow = a - b;
        let ay = Math.floor(totalDayNow / 365);
        let am = Math.floor((totalDayNow - ay * 365) / 30);
        let ad = totalDayNow - (ay * 365 + am * 30);
        setAgeYear(ay > 0 ? ay : "0");
        setAgeMonth(am > 0 ? am : "0");
        setAgeDay(ad > 0 ? ad : "0");
      }
    }
  };
  return (
    <Container>
      <div className="card">
        <section className="form">
          <div className="input_field">
            <label
              className={AllError || DayError?.stat ? "error" : ""}
              htmlFor="Day"
            >
              Day
            </label>
            <input
              className={AllError || DayError?.stat ? "error" : ""}
              type="number"
              onChange={(e) =>
                e.target.value > 0 &&
                e.target.value <= 31 &&
                setDay(e.target.value)
              }
              value={Day}
              placeholder="DD"
              name="Day"
            />
            {AllError && <span>This field is required.</span>}
            {DayError?.stat && <span>{DayError.message}</span>}
          </div>
          <div className="input_field">
            <label
              className={AllError || MonthError?.stat ? "error" : ""}
              htmlFor="Month"
            >
              Month
            </label>
            <input
              className={AllError || MonthError?.stat ? "error" : ""}
              type="number"
              onChange={(e) =>
                e.target.value > 0 &&
                (Year && Number(Year) === new Date().getFullYear()
                  ? e.target.value <= new Date().getMonth() + 1
                  : e.target.value <= 12) &&
                setMonth(e.target.value)
              }
              value={Month}
              placeholder="MM"
              name="Month"
            />
            {AllError && <span>This field is required.</span>}
            {MonthError?.stat && <span>{MonthError.message}</span>}
          </div>
          <div className="input_field">
            <label
              className={AllError || YearError?.stat ? "error" : ""}
              htmlFor="Year"
            >
              Year
            </label>
            <input
              className={AllError || YearError?.stat ? "error" : ""}
              type="number"
              onChange={(e) =>
                e.target.value > 0 &&
                e.target.value <= new Date().getFullYear() &&
                setYear(e.target.value)
              }
              value={Year}
              placeholder="YYYY"
              name="Year"
            />
            {AllError && <span>This field is required.</span>}
            {YearError?.stat && <span>{YearError.message}</span>}
          </div>
        </section>
        <section className="submit">
          <button onClick={handleSubmit}>
            <img src="/images/icon-arrow.svg" alt="" />
          </button>
        </section>
        <section className="result">
          <h1>
            <span>
              {Year && AgeYear
                ? AgeYear <= 9
                  ? `0${AgeYear}`
                  : AgeYear
                : "--"}
            </span>
            Years
          </h1>
          <h1>
            <span>
              {Month && AgeMonth
                ? AgeMonth <= 9
                  ? `0${AgeMonth}`
                  : AgeMonth
                : "--"}
            </span>
            Months
          </h1>
          <h1>
            <span>
              {Day && AgeDay ? (AgeDay <= 9 ? `0${AgeDay}` : AgeDay) : "--"}
            </span>
            days
          </h1>
        </section>
      </div>
    </Container>
  );
}

const Container = styled.main`
  width: min(1440px, 100%);
  min-height: 915px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: var(--off-white);
  & > .card {
    background-color: var(--white);
    width: min(840px, 100%);
    height: max-content;
    /* height: min(652px, 100%); */
    padding: 56px;
    padding-bottom: 61px;
    border-radius: 25px 25px 200px;
    text-transform: uppercase;
    display: flex;
    flex-direction: column;
    gap: 47px;
    & > .form {
      display: flex;
      gap: 32px;
      & > .input_field {
        display: flex;
        flex-direction: column;
        max-width: 160px;
        & > label {
          letter-spacing: 2.2px;
          font-size: 16px;
          color: var(--smokey-grey);
          padding-bottom: 7px;
          &.error {
            color: var(--red);
          }
        }
        & > input {
          outline: none;
          padding: 11px 24px;
          border: 1px solid var(--light-grey);
          color: var(--black);
          border-radius: 9px;
          font-size: 31.5px;
          -moz-appearance: textfield;
          &::-webkit-outer-spin-button,
          &::-webkit-inner-spin-button {
            -webkit-appearance: none;
            margin: 0;
          }
          &:focus {
            border-color: var(--purple);
          }
          &.error {
            border-color: var(--red);
          }
        }
        & > span {
          font-size: 14px;
          text-transform: none;
          font-weight: 400;
          font-style: italic;
          padding-top: 9px;
          color: var(--red);
        }
      }
    }
    & > .submit {
      display: flex;
      position: relative;
      border: 1px solid var(--off-white);
      & > button {
        position: absolute;
        border: none;
        outline: none;
        border-radius: 50%;
        top: 100%;
        right: 0;
        transform: translateY(-50%);
        background-color: var(--purple);
        padding: 25px 24.5px 21px;
        cursor: pointer;
        &:hover {
          background-color: var(--black);
        }
      }
    }
    & > .result {
      display: flex;
      flex-direction: column;
      text-transform: lowercase;
      padding-top: 4px;
      gap: 7.5px;
      & > h1 {
        font-size: 106px;
        font-weight: 800 !important;
        font-style: italic;
        line-height: 100%;
        letter-spacing: -3.2px;
        color: var(--black);
        & > span {
          color: var(--purple);
          margin-right: 16px;
          &.null {
            letter-spacing: 15.4px;
            margin-right: -8px;
          }
        }
      }
    }
  }
`;
