/* eslint-disable react/prop-types */
import React from "react";
import CardDetail from "./cardDetail";
import "./styles/CardList.css";

const CardList = ({ list,type="horizontal" }) => {

  return (
    <div id="card-list" style={{flexDirection:type=="horizontal" ? "row" : "column"}}>
      {list.map((item,index) => (
        <><CardDetail nftUri={item.data.uri} name={item.data.name} key={index} /></>
      ))}
    </div>
  );
};

export default CardList;
