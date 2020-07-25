import React, { useState } from "react";
import NumPad from "react-numpad";
import { Input, Button } from "antd";
import TicketCard from "./components/TicketCard";
import wheelImg from "./images/spin.png";
import "./App.css";

function App() {
  //managing State data
  const intialText = "Please enter 6 Digits or use random Generator";
  const [tickets, setTickets] = useState([]);
  const [userticket, setUserTicket] = useState(0);
  const [count, setCount] = useState(0);
  const [errorText, setErrorText] = useState(intialText);
  const findDuplicates = (ticketnum) => {
    const duplicateTickets = tickets.filter(
      (item) => item.ticketno === ticketnum
    );
    if (duplicateTickets.length == 0) {
      setErrorText("");
      return true;
    } else {
      setErrorText("Ticket Already Exists");
      return false;
    }
  };
  //function to validate the input from user
  const checkValidation = (tester) => {
    if (/^[1-9]\d{5}$/.test(tester)) {
      setErrorText("");
      return true;
    } else {
      setErrorText("Please enter Number between 100000 - 999999");
      return false;
    }
  };

  //function to check the Limit of Tickets
  const checkTicketsLimit = () => {
    if (tickets.length < 5) {
      setErrorText("");
      return true;
    } else {
      setErrorText("Tickets Limit is Over");
      return false;
    }
  };

  //function to add Tickets from Input
  const addTicket = (e) => {
    if (
      checkTicketsLimit() &&
      checkValidation(userticket) &&
      findDuplicates(userticket)
    ) {
      console.log();
      setTickets([...tickets, { ticketid: count + 1, ticketno: userticket }]);
      setCount((prevCount) => prevCount + 1);
      setUserTicket(0);
      setErrorText(intialText);
    }
  };

  //function to add Tickets from random Generator
  const generateTicket = () => {
    let randomTicket = Math.floor(Math.random() * 1000000) + 1;
    if (
      checkTicketsLimit() &&
      checkValidation(randomTicket) &&
      findDuplicates(userticket)
    ) {
      setTickets([
        ...tickets,
        {
          ticketid: count + 1,
          ticketno: randomTicket,
        },
      ]);
      setCount((prevCount) => prevCount + 1);
      setUserTicket(0);
      setErrorText(intialText);
    }
  };

  //function to delete Ticket
  const deleteTicket = (id) => {
    const newtickets = tickets.filter((item) => item.ticketid !== id);
    setTickets(newtickets);
  };
  return (
    <div className="nvestTaskMainHolder">
      <div className="ticketGeneratorsHolder">
        <div className="ticketGeneratorInput">
          {/* <Input
            value={userticket}
            type="number"
            placeholder="Please Enter 6 Digits"
            onChange={(e) => setUserTicket(e.target.value)}
          /> */}
          <div className="userInputHold">
            <NumPad.Number
              position="startBottomLeft"
              value={userticket}
              onChange={(value) => {
                setUserTicket(parseInt(value));
              }}
              placeholder={"Enter 6 Digits Number"}
              decimal="6"
            />
            <Button onClick={addTicket} type="primary">
              Add Ticket
            </Button>
          </div>
          <article
            className={
              errorText === intialText
                ? "errorDisplayText"
                : "errorDisplayText colorRed"
            }
          >
            {errorText}
          </article>
        </div>
        <div className="ticketGeneratorRandom">
          <div className="randomGeneratorElements">
            <article className="generatorHeadingText">
              Click the Wheel to Generate Random Tickets
            </article>
            <img
              onClick={() => generateTicket()}
              className="wheelImage"
              width="60%"
              src={wheelImg}
              alt="wheel"
            />

            <article className="ticketRangeText">
              Ticket Number Range 100000 - 999999
            </article>
          </div>
        </div>
      </div>
      <div className="ticketsOutputSection">
        <article className="ticketsSectionHeading">
          Your Selected Tickets:
        </article>
        <div className="ticketCardsHolder">
          {tickets.map((ticket) => (
            <TicketCard
              key={ticket.ticketid}
              ticketno={ticket.ticketno}
              ticketid={ticket.ticketid}
              deleteTicket={() => deleteTicket(ticket.ticketid)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
