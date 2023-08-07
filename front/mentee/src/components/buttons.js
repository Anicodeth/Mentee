import { Link } from "react-router-dom";

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

module.export = { PrimaryButton };
