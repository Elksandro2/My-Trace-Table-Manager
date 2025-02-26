import { useEffect, useState } from "react"
import "../traceTable.css";
import { useNavigate } from "react-router-dom";
import { BsQuestionCircleFill } from "react-icons/bs";
import PopUp from "../../../components/PopUp";

export default function ExpectedTable() {
    const [expectedTableData, setExpectedTableData] = useState([]);
    const [tableInfo, setTableInfo] = useState(null);
    const [isValid, setIsValid] = useState(false)
    const [openPopUpCancel, setOpenPopUpCancel] = useState(false);
    const [openPopUpEdit, setOpenPopUpEdit] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const savedTables = JSON.parse(localStorage.getItem('traceTables')) || [];
        if (savedTables.length > 0) {
            const lastTable = savedTables[savedTables.length - 1];
            setExpectedTableData(lastTable.shownTable);
            setTableInfo(lastTable);
        }
    }, []);

    useEffect(() => {
        const allFilled = expectedTableData.every(row => row.every(cell => cell.trim() !== '' && cell !== '?'));
        setIsValid(allFilled)
    }, [expectedTableData])

    const handleInputChange = (row, col, value) => {
        setExpectedTableData(prevData => {
            const newTableData = prevData.map((r, i) =>
                i === row ? r.map((c, j) => (j === col ? value : c)) : r
            );
            return newTableData;
        });

        console.log('Matriz expected:', expectedTableData);
    };

    const saveExpectedTable = () => {
        if (tableInfo) {
            const savedTables = JSON.parse(localStorage.getItem('traceTables')) || [];

            const updatedTables = savedTables.map(t =>
                t.id === tableInfo.id ? { ...t, expectedTable: expectedTableData } : t
            );

            localStorage.setItem("traceTables", JSON.stringify(updatedTables));

            console.log("Tabelas após salvar:", updatedTables);
            navigate("/");
        }
    }

    const shownPopUpCancel = () => {
        setOpenPopUpCancel(true);
    }

    const shownPopUpEdit = () => {
        setOpenPopUpEdit(true);
    }

    const cancelOperation = () => {
        if (tableInfo) {
            const savedTables = JSON.parse(localStorage.getItem('traceTables')) || [];

            const updatedTables = savedTables.filter(t => t.id !== tableInfo.id);

            localStorage.setItem("traceTables", JSON.stringify(updatedTables));
            console.log("Tabelas após cancelar:", updatedTables);

            navigate("/");
        }
    }

    return (
        <div className="background">
            <h3>Preencha as respostas esperadas para essa Trace Table</h3>
            {tableInfo && (
                <>
                    <table border={1}>
                        <thead>
                            <tr>
                                {tableInfo.header.map((variable, variableIndex) => (
                                    <th key={variableIndex}>{variable}</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {expectedTableData.map((row, i) => (
                                <tr key={i}>
                                    <td>{i + 1}º</td>
                                    {row.map((cell, j) => (
                                        <td key={j} className={cell === "#" ? "disabled-cell" : ""}>
                                            {cell !== "#" ? (
                                                <input
                                                    type="text"
                                                    value={cell === "?" ? "" : cell}
                                                    maxLength={10}
                                                    onChange={(e) => handleInputChange(i, j, e.target.value)}
                                                />
                                            ) : ""}
                                        </td>
                                    ))}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <div className="btn-container">
                        <button onClick={saveExpectedTable} disabled={!isValid} className="btn-next">Salvar</button>
                        <button onClick={shownPopUpEdit} className="btn-edit">Editar</button>
                        <button onClick={shownPopUpCancel} className="btn-cancel">Cancelar</button>
                    </div>
                </>
            )}
            <BsQuestionCircleFill className="icon-question" />
            {openPopUpCancel ? (
                <PopUp
                    text="Tem certeza que deseja cancelar a operação? Seus dados não serão salvos!"
                    confirmAction={cancelOperation}
                    cancelAction={() => setOpenPopUpCancel(false)}
                />
            ) : null}
            {openPopUpEdit ? (
                <PopUp
                    text="Tem certeza que deseja voltar para a tela anterior? Seus dados da tela atual não serão salvos!"
                    confirmAction={() => navigate("/showntable")}
                    cancelAction={() => setOpenPopUpEdit(false)}
                />
            ) : null}
        </div>
    )
}