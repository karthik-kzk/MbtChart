import React, { useState, useEffect } from "react";
import { mbtData } from "./mbtData";
import "./Table.css";

type IinitialSelected = {
  [k: string]: boolean;
};

const initialSelected: IinitialSelected = {
  u17: false,
  u16: false,
  u15: false,
  u14: false,
  u13: false,
  u12: false,
  u11: false,
  u21: false,
  u22: false,
  u23: false,
  u24: false,
  u25: false,
  u26: false,
  u27: false,
};

type IinitialValue = {
  [k: string]: string;
};

const initialValue: IinitialValue = {
  u17: "0",
  u16: "0",
  u15: "0",
  u14: "0",
  u13: "0",
  u12: "0",
  u11: "0",
  u21: "0",
  u22: "0",
  u23: "0",
  u24: "0",
  u25: "0",
  u26: "0",
  u27: "0",
};

function Table() {
  const [checkBox, setCheckBox] = useState(false);
  const [selected, setSelected] = useState(initialSelected);
  const [value, setValue] = useState(initialValue);
  const [data, setData] = useState([...mbtData]);

  const upperJawHeader = (
    <>
      {mbtData.map((data: any, i: number) => {
        return (
          <>
            <th>{data.name}</th>
          </>
        );
      })}
    </>
  );

  function handleChange(evt: any) {
    let value1 = evt.target.value;
    let name = evt.target.name;
    setValue({ ...value, [name]: value1 });
  }

  function handleSubmit() {
    let array = [...data];
    for (let i in selected) {
      if (checkBox) {
        if (selected[i]) {
          let average = (parseFloat(value[i]) + 1) / 2;
          const elementIndex = array.findIndex((e: any) => e.name === i);
          array[elementIndex] = {
            ...array[elementIndex],
            value: average,
          };
        }
      } else {
        if (selected[i]) {
          let average = parseFloat(value[i]) / 2;
          const elementIndex = array.findIndex((e: any) => e.name === i);
          array[elementIndex] = {
            ...array[elementIndex],
            value: average,
          };
        }
      }
    }
    console.log(value, "82");
    setData(array);
    setValue(initialValue);
    setSelected(initialSelected);
  }

  useEffect(() => {
    console.log(value["u21"]);
    console.log(selected);
  }, [value, selected]);

  return (
    <div>
      <h1>MBT CHART</h1>
      <table className="table table-hover table-bordered">
        <thead>
          <tr>
          <th></th>{upperJawHeader}</tr>
        </thead>
        <tbody>
          <tr>
            <td>Heigth in MM</td>
            {data.map((data: any, i: number) => {
              return (
                <>
                  {selected[data.name] ? (
                    <td
                      // onClick={() => setSelected({...selected,[data.name]:false})}
                      id={data.id}
                    >
                      <input
                        onChange={handleChange}
                        type="number"
                        // value={data.value}
                        id={data.id}
                        name={data.name}
                        style={{width:"50px"}}
                      />
                    </td>
                  ) : (
                    <td
                      onClick={() =>
                        setSelected({ ...selected, [data.name]: true })
                      }
                      id={data.id}
                    >
                      {data.value}
                    </td>
                  )}
                </>
              );
            })}
          </tr>
        </tbody>
      </table>
      <div>
        <input type="checkbox" onClick={() => setCheckBox(!checkBox)}></input>
        Open Bite
      </div>

      <button onClick={handleSubmit}>Generate Chart</button>
      <table className="table table-hover table-bordered">
        <thead>
          <tr>{upperJawHeader}</tr>
        </thead>
        <tbody>
          <tr>
            {data.map((data: any, i: number) => {
              return <TableDataView data={data.value} />;
            })}
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default Table;

function TableData(props?: any) {
  const [inputToggle, setInputToggle] = useState(false);

  function handleOnChange(evt: any) {
    let value = evt.target.value;
    let id = evt.target.id;
  }
  return (
    <>
      {inputToggle ? (
        <td onClick={() => setInputToggle(true)} id={props.id}>
          <input onChange={handleOnChange} />
        </td>
      ) : (
        <td onClick={() => setInputToggle(true)} id={props.id}>
          {props.data}
        </td>
      )}
    </>
  );
}

function TableDataView(props?: any) {
  return (
    <>
      <td>{props.data}</td>
    </>
  );
}
