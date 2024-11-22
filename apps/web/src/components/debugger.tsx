import { useStateContext } from "./context";

export function Debugger() {
  const [state] = useStateContext();
  console.log("Rerender");

  return (
    <div>
      <JsonFormatter jsonData={state} />
    </div>
  );
}

const jsonToHtml = (json) => {
  return Object.entries(json).map(([key, value]) => {
    if (typeof value === "object" && value !== null) {
      return (
        <div className="ml-4" key={key}>
          <span className="font-bold text-blue-500">"{key}": </span>
          <div className="bg-gray-100 p-2 rounded shadow-md">
            {jsonToHtml(value)}
          </div>
        </div>
      );
    }
    return (
      <div key={key}>
        <span className="font-bold text-blue-500">"{key}": </span>
        <span className="text-green-600">"{String(value)}"</span>
      </div>
    );
  });
};

const JsonFormatter = ({ jsonData }) => {
  return (
    <div className="bg-gray-50 p-4 border border-gray-300 rounded-md shadow-sm">
      <pre className="whitespace-pre-wrap overflow-x-auto text-sm">
        {jsonToHtml(jsonData)}
      </pre>
    </div>
  );
};
