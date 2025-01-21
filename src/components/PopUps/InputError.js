"use client"
import React, {useState, useEffect} from "react";
import styles from "./InputError.module.css";
import { useSelector, useDispatch } from "react-redux";
import { resetError } from "@/app/redux/slice";
const InputError = (props) => {
  const dispatch = useDispatch();
  const message = useSelector((state) => state.languages.errorMessage);
  const sign = useSelector((state) => state.languages.errorSign);
  let active = message !== "";
 
  //After 3 seconds reset the settings and drop the message box from under
  if (active) {
    setTimeout(() => {
      dispatch(resetError());
    }, 3000)
  }

  return (
    <div className={`${styles["parent-div"]} ${active? styles.active: ""}`}>
      <div className={styles["logo"]}>
        {sign == "negative" && <span className={`material-symbols-outlined`} style={{ fontSize: '40px', color: "#F70000" }}>close</span>}
        {sign == "positive" && <span class="material-symbols-outlined" style={{ fontSize: '40px', color: "#007C02" }}>check</span>}
        
      </div>
      <div className={styles.message}>{message}</div>
    </div>
  );
};

export default InputError;
