import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { TraceTableContext } from "../../../contexts/TraceTableContext";
import styles from "./styles.module.css";
import { BsQuestionCircleFill} from "react-icons/bs";
import PopUp from "../../../components/PopUp";

export default function NewExercice() {
    const { setTraceData } = useContext(TraceTableContext);
    const [file, setFile] = useState(null)
    const [qtdVariables, setVariables] = useState(1)
    const [qtdSteps, setSteps] = useState(1)
    const [selectedThemes, setSelectedThemes] = useState([]);
    const [isValid, setIsValid] = useState(false)
    
    const [openPopUp, setOpenPopUp] = useState(false);

    const navigate = useNavigate()

    const [lastTable, setLastTable] = useState(null);
    const [themes, setThemes] = useState([]);

    useEffect(() => {
        const tables = JSON.parse(localStorage.getItem("traceTables")) || [];
        if (tables.length > 0) {
            setLastTable(tables[tables.length - 1]);
        }

        const savedThemes = JSON.parse(localStorage.getItem('themes')) || []
        if (savedThemes.length > 0) {
            setThemes(savedThemes);
            setIsValid(true)
        }
    }, []);

    function handleFileChange(event) {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onloadend = () => {
                setFile(reader.result);
            }
        }
    }

    function handleThemeChange(event) {
        const { value, checked } = event.target;
        if (checked) {
            setSelectedThemes([...selectedThemes, value]);
        } else {
            setSelectedThemes(selectedThemes.filter((theme) => theme !== value));
        }
    }

    function handleSubmit(event) {
        event.preventDefault();
        const newId = lastTable ? lastTable.id + 1 : 1;
        setTraceData({
            id: newId,
            file: file,
            qtdVariables,
            qtdSteps,
            themes: selectedThemes
        });
        navigate("/showntable");
    }

    const shownPopUp = () => {
        setOpenPopUp(true);
    }

    return (
        <div className="background">
            <div className="form-bg">
                <h2>Cadastrar nova Trace-Table</h2>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="img-tracetable">Forneça a
                            imagem do código</label>
                        <input
                            className="form-input"
                            type="file"
                            name="img-tracetable"
                            id="img-tracetable"
                            required
                            onChange={handleFileChange}
                        />
                    </div>
                    <div>
                        <label htmlFor="quant-variables">Quantidade de
                            variáveis do código</label>
                        <input
                            className="form-input"
                            type="number"
                            name="quant-variables"
                            id="quant-variables"
                            min="1"
                            max="4"
                            required
                            value={qtdVariables}
                            onChange={(e) =>
                                setVariables(parseInt(e.target.value))}
                        />
                    </div>
                    <div>
                        <label htmlFor="quant-steps">Quantidade de
                            passos que a trace table vai ter</label>
                        <input
                            className="form-input"
                            type="number"
                            name="quant-steps"
                            id="quant-steps"
                            min="1"
                            max="10"
                            required
                            value={qtdSteps}
                            onChange={(e) => setSteps(parseInt(e.target.value))}
                        />
                    </div>
                    <div className={styles.selectionThemes}>
                        <label>Escolha os temas</label>
                        <div className={styles.optionsTheme}>
                            {themes.length > 0 ? (
                                themes.map((theme, index) => (
                                    <div key={index} className={styles.itensTheme}>
                                        <input
                                            type="checkbox"
                                            name={theme.name}
                                            id={theme.name}
                                            value={theme.name}
                                            onChange={handleThemeChange}
                                            required
                                        />
                                        <label htmlFor={theme.name}>{theme.name}</label>
                                    </div>
                                ))
                            ) : (
                                <span className={styles.spanTheme}>Você ainda não possui temas cadastrados! Por favor, cadastre um antes de prosseguir.</span>
                            )}
                            <div className={styles.btnNewThemeContainer}>
                                <button type="button" onClick={() => navigate("/new-theme")} className={styles.btnNewTheme}>Cadastrar novo tema</button>
                            </div>
                        </div>
                    </div>
                    <div className="btn-container">
                        <button type="submit" className="btn-next" disabled={!isValid}>Prosseguir</button>
                        <button type="button" onClick={shownPopUp} className="btn-cancel">Cancelar</button>
                    </div>
                </form>
            </div>
            <BsQuestionCircleFill className="icon-question"/>
            {openPopUp ? (
                <PopUp
                    text="Tem certeza que deseja cancelar a operação? Seus dados não serão salvos!"
                    confirmAction={() => navigate("/")}
                    cancelAction={() => setOpenPopUp(false)}
                />
            ) : null}
        </div>
    )
}