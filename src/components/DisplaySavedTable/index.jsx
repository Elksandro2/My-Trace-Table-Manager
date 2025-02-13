export default function DisplaySavedTable({ traceTable, typeTable }) {

    return (
        <div>
            {traceTable ? (
                <div>
                    <table border="1">
                        <thead>
                            <tr>
                                {traceTable.header.map((variable, variableIndex) => (
                                    <th key={variableIndex}>{variable || `Var ${variableIndex + 1}`}</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {typeTable.slice(1).map((row, rowIndex) => (
                                <tr key={rowIndex}>
                                    <td>{rowIndex + 1}</td>
                                    {row.map((cell, colIndex) => (
                                        <td key={colIndex}>{cell}</td>
                                    ))}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            ) : (
                <p>Nenhuma tabela salva.</p>
            )}
        </div>
    );
}
