import { Link } from "react-router-dom";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faSpinner} from "@fortawesome/free-solid-svg-icons";
import React from "react";

export function PrimaryButton(props) {
  const text = props.text;
  const onPress = props.onPress;

  return (
    <button
      onClick={onPress}
      className="flex border border-gray-400 px-4 py-2 rounded hover:bg-gray-700 hover:text-gray-100 transition delay-40"
    >
      {text}
    </button>
  );
}

export function SecondaryButton(props){
  return <button
      onClick={props.onPress}
      className={`w-28 ${props.isLoading?"bg-blue-500":"bg-blue-600"} text-white px-4 py-2 rounded font-medium focus:outline-none`}
  >
    {props.isLoading ? <FontAwesomeIcon icon={ faSpinner}/> : props.text}
  </button>;
}

