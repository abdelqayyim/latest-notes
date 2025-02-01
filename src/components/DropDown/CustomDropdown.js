import React, { useState, useRef, useEffect } from "react";
import styles from './CustomDropdown.module.css'
const CustomDropdown = ({options}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState("Select an option");
  const dropdownRef = useRef(null);

//   const options = ["Ten", "Twenty", "Thirty"];

  const toggleDropdown = () => setIsOpen((prev) => !prev);

  const handleSelect = (option) => {
    setSelectedValue(option);
    setIsOpen(false);
  };
  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className={styles["dropdown-container"]} ref={dropdownRef}>
      <div className={styles["dropdown-header"]} onClick={toggleDropdown}>
        {selectedValue}
        <span className={styles["arrow"]}>{isOpen ? "▲" : "▼"}</span>
      </div>
      {isOpen && (
        <ul className={styles["dropdown-menu"]}>
          {options.map((option, index) => (
              <li key={index}
                  onClick={() => { setSelectedValue(option.displayName); option.onSelect(); setIsOpen(false); }}
              >
              {option.displayName}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CustomDropdown;
