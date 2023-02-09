import {useEffect, useState} from "react";

const dataArray = ['nr1', 'nr2'];
const initialState = dataArray.reduce((o, key) => ({ ...o, [key]: false}), {})

export default function TestChekbox() {
    const [checkedAll, setCheckedAll] = useState(false);
    const [checked, setChecked] = useState(initialState);

    const toggleCheck = (inputName) => {
        setChecked((prevState) => {
            const newState = { ...prevState };
            newState[inputName] = !prevState[inputName];
            return newState;
        });
    };
    const selectAll = (value) => {
        setCheckedAll(value);
        setChecked((prevState) => {
            const newState = { ...prevState };
            for (const inputName in newState) {
                newState[inputName] = value;
            }
            return newState;
        });
    };

    useEffect(() => {
        let allChecked = true;
        for (const inputName in checked) {
            if (checked[inputName] === false) {
                allChecked = false;
            }
        }
        if (allChecked) {
            setCheckedAll(true);
        } else {
            setCheckedAll(false);
        }
    }, [checked]);

    return (
        <div className="App">
            <div>
                <label>All</label>
                <input
                    type="checkbox"
                    onChange={(event) => selectAll(event.target.checked)}
                    checked={checkedAll}
                />
            </div>
            {dataArray.map(data => (
                <div>
                    <label>{data}</label>
                    <input
                        type="checkbox"
                        name={data}
                        onChange={() => toggleCheck(data)}
                        checked={checked[data]}
                    />
                </div>
            ))}
        </div>
    );
};