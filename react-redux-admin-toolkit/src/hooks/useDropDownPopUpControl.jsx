import { useEffect, useRef, useState } from "react";

const useDropDownPopUpControl = () => {
  const [isOpen, setIsOpen] = useState(false);

  const dropDownRef = useRef(null);

  // toggle menu

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  // click outside

  const handleClickOutSide = (e) => {
    if (dropDownRef.current && !dropDownRef.current.contains(e.target)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutSide);

    return () => {
      document.removeEventListener("click", handleClickOutSide);
    };
  }, []);

  return { isOpen, toggleMenu, dropDownRef };
};

export default useDropDownPopUpControl;
