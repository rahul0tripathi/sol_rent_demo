/* eslint-disable no-undef */
/* eslint-disable react/prop-types */
import React, { useState } from "react";
import CardDetail from "./cardDetail";
import Init from "../../components/init";
import "./styles/CardList.css";

const CardList = ({ list, type = "horizontal" }) => {

  const [openList, setOpenList] = useState(true);
  const [listItem, setListItem] = useState({});
  const openlist = (item) => {
    console.log(list)
    setOpenList(false)
    setListItem(item)
  }
  console.log(openList)
  return (
    <> {openList?
     (<div
      id="card-list"
      style={{ flexDirection: type == "horizontal" ? "row" : "column" }}
    >
      {list.map((item, index) => (
        <>
          <CardDetail
            nftUri={item.metadata.data.uri}
            name={item.metadata.data.name}
            status={item.listed ? "Listed" : "Owned"}
            buttonValue={item.listed ? null : "List"}
            price={item.metadata.data.sellerFeeBasisPoints}
            onClick={()=>openlist(item)}
            key={index}
          />
        </>
      ))}
    </div> ) :(<Init /> )
}
    </>
  );
};

export default CardList;
