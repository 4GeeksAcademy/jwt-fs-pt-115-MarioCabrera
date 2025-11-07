import { Link } from "react-router-dom";

export const DetailedCharacterInfo = (props) => {
    return (
        <div className="container my-4">
            <div className="row bg-white bg-opacity-75 rounded p-3 g-3">

                {/* Imagen */}
                <div className="col-12 col-lg-6 text-center">
                    <img
                        src={props.img}
                        alt={props.name}
                        className="img-fluid rounded"
                        style={{ maxHeight: "450px", objectFit: "cover" }}
                    />

                    {/* Info rápida (Name, Age, Gender) */}
                    <div className="d-flex flex-wrap justify-content-center mt-3">
                        <div className="mx-2">
                            <h5 className="text-center">Name</h5>
                            <p className="text-center fs-6">{props.name}</p>
                        </div>
                        <div className="mx-2">
                            <h5 className="text-center">Age</h5>
                            <p className="text-center fs-6">{props.age}</p>
                        </div>
                        <div className="mx-2">
                            <h5 className="text-center">Gender</h5>
                            <p className="text-center fs-6">{props.gender}</p>
                        </div>
                    </div>
                </div>

                {/* Descripción y Estilos */}
                <div className="col-12 col-lg-6">
                    <h5 className="my-2">Description</h5>
                    <p className="fs-6">{props.description}</p>

                    <h5 className="my-2">Quote</h5>
                    <p className="fs-6 fst-italic">"{props.quote}"</p>

                    <h5 className="my-2">
                        {props.race === "Human" ? "Breathing styles" : "Blood technique"}
                    </h5>
                    <div className="row overflow-x-auto flex-nowrap d-flex">
                    {props.styles.map((element) => (
                        <Link to={`/detailedstyle/${element.id}`} key={element.id} style={{width:"200px", padding: 0}}>
                            <div className="text-center d-inline-block mx-2 my-2">
                                <img src={element.img} alt="" width={"100%"} height={"250px"}  />
                                <figcaption>{element.name}</figcaption>
                            </div>
                        </Link>
                    ))}
                    </div>
                </div>
            </div>
        </div>
    );
};