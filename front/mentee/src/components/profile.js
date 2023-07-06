// here we are going to create a profile component

export default function Profiler(props) {
  return (
    <div className="h-44 w-fit my-8 bg-white flex items-center px-8 gap-8 justify-center m-auto rounded">
      <img src={props.image} className="w-28"></img>
      <div className="info flex flex-col flex">
        <div className="text-xl font-semibold">{props.name}</div>
        <div className="text-gray-600">{props.email}</div>
      </div>
    </div>
  );
}
