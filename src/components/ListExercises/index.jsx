import { useNavigate } from "react-router-dom";
import styles from "./styles.module.css";
import { BsTrash } from "react-icons/bs";

export default function ListExercises({ exercises, removeExercise }) {

    const navigate = useNavigate();

    return (
        <div className={styles.content}>
            <div className={styles.listContainer}>
                <h2>Lista de Exercícios</h2>
                <div className={styles.cards}>
                    {exercises.map((exercise) => (
                        <div key={exercise.id} className={styles.card}>
                            <div className={styles.titleAndTrash}>
                                <h3 className="table-title">Exercício: {exercise.id}</h3>
                                <BsTrash
                                    className="icon-trash"
                                    onClick={() => removeExercise(exercise.id)}
                                />
                            </div>
                            <span className="table-subtitle"><strong>Temas:</strong> {exercise.themes.join(", ")}</span>
                            <div className={styles.btnContainer}>
                                <button
                                    className="btn"
                                    onClick={() => navigate(`/exercicio/${exercise.id}`)}
                                >Ver</button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <button className="btn" onClick={() => navigate("/")}>
                Voltar
            </button>
        </div>
    );

}
