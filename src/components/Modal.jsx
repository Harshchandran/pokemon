import './Modal.css';


const Modal = ({ open, closeModal, data }) => {
    const { type, name, image, weight, height, stats } = data;

    let baseStatsAndNames = (() => {
        return stats.map((dt) => ({
            base_stat: dt.base_stat,
            stat_name: dt.stat.name
        }));
    });


    if (!open) { return null };

    return (
        <div className='modal'>

            <div className={`container ${type}-card`}>

                <button onClick={closeModal} className='closeBtn'>X</button>

                <div className='rightBox'>
                    <img className='pokemonImgae' src={image} alt='' />
                    <div className='pokemonName'>{name}</div>
                </div>

                <div className={`leftBox ${type}-id`}>
                    <div>
                        <table className='statsTable'>
                            <tbody>
                                <tr>
                                    <th>Weight:</th>
                                    <td>{weight}</td>
                                </tr>
                                <tr>
                                    <th>Height:</th>
                                    <td>{height}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <div>
                        {baseStatsAndNames().map((stat, index) => (
                            <table className='statsTable'>
                                <tbody>
                                    <tr key={index}>
                                        <th>{`Stat${index + 1}:`} </th>
                                        <td> {`${stat.stat_name}`}</td>
                                    </tr>
                                </tbody>
                            </table>
                        ))}
                    </div>

                    <div>
                        {baseStatsAndNames().map((stat, index) => (

                            <table className='statsTable'>
                                <tr key={index}>
                                    <th>{`Bs${index + 1}:`} </th>
                                    <td> {`${stat.base_stat}`}</td>
                                </tr>
                            </table>


                        ))}
                    </div>

                </div>
            </div>

        </div>

    )
}

export default Modal

