import React from "react";
import "./index.css";

const TicketCard = ({ ticketno, ticketid, deleteTicket }) => {
  return (
    <div className="ticketCardsHolder">
      <div className="ticketCard">
        <span onClick={deleteTicket} className="ticketDeleteBtn">
          <i className="fa fa-trash" aria-hidden="true"></i>
        </span>
        <article className="ticketName">Ticket #{ticketid}</article>
        <article className="ticketNumber">{ticketno}</article>
      </div>
    </div>
  );
};

export default TicketCard;
