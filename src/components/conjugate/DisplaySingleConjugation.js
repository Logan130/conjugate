export function SixGridTable({words}) {
    console.log(words)
    let isMobile = window.innerWidth < 500;

    let border_style = isMobile ? { border: '1px solid grey', padding: '4px', fontSize: '14px', wordWrap: 'break-word' } : { border: '1px solid grey', padding: '5px' };

    return (
        <>
            <div className={isMobile ? "grid grid-cols-2 gap-1" : "grid grid-cols-4 gap-2"}>
                {words.map((verb, id) => (
                    <div className="card w-auto bg-transparent text-neutral-content">
                        <div className="card-body items-center text-center">
                            <h3 className="font-bold">{verb.name}</h3>

                            <table style={{ borderCollapse: 'collapse' }}>
                                <tbody>
                                    <tr>
                                        <td style={border_style}>{verb.je}</td>
                                        <td style={border_style}>{verb.nous}</td>
                                    </tr>
                                    <tr>
                                        <td style={border_style}>{verb.tu}</td>
                                        <td style={border_style}>{verb.vous}</td>
                                    </tr>
                                    <tr>
                                        <td style={border_style}>{verb.il}</td>
                                        <td style={border_style}>{verb.ils}</td>
                                    </tr>
                                    <tr>
                                        <td style={border_style}>{verb.passé}</td>
                                        <td style={border_style}>{verb.futur}</td>
                                    </tr>
                                </tbody>
                            </table>

                        </div>
                    </div>
                ))}

            </div>
        </>
    )
}