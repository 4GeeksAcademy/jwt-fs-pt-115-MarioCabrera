import { Link, useNavigate } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";
import Logo from "../assets/img/Logo.jpg";
import { useEffect } from "react";

export const Navbar = () => {
	const { store, dispatch } = useGlobalReducer();
	const navigate = useNavigate();

	const removeFavorite = (data) => {
		dispatch({ type: "remove_favorite", payload: data });
	};
	useEffect(() => {
		console.log(store.favorites);
	}, [store.favorites]);

	return (
		<nav className="navbar navbar-dark bg-black px-3">
			<div className="container-fluid d-flex justify-content-between align-items-center">

				<Link to="/" className="navbar-brand d-flex align-items-center">
					<img
						src={Logo}
						alt="Logo"
						style={{ width: "60px", height: "40px", objectFit: "cover" }}
						className="me-2 me-2 d-none d-md-block"
					/>
					<span className="fs-6">Kimetsu no Yaiba: Demon Slayers</span>
				</Link>

				<div className="dropdown ">
					{!localStorage.getItem("token") ? (
						<Link to="/login" className="btn btn-secondary">
							Login
						</Link>
					) : (
						<>
							<button className="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" data-bs-auto-close="false" aria-expanded="false">
								Favorites <span className="badge bg-info text-dark">{store.favorites.length}</span>
							</button>
							<ul
								className="dropdown-menu dropdown-menu-end"
								aria-labelledby="dropdownMenuButton1"
								data-bs-auto-close="false"
							>
								{store.favorites.length === 0 ? (
									<li className="dropdown-item text-center">No favorites added</li>
								) : (
									store.favorites.map((item, index) => (
										<li
											key={index}
											className="d-flex justify-content-between align-items-center dropdown-item"
										>
											<span className="me-2">{item}</span>
											<button
												className="btn btn-sm btn-danger"
												onClick={() => removeFavorite(item)}
											>
												&times;
											</button>
										</li>
									))
								)}

								<li className="dropdown-item d-flex justify-content-end">
									<button className="btn btn-sm btn-outline-secondary" onClick={() => { localStorage.removeItem("token"); navigate('/'); }}>Logout</button>
								</li>
							</ul>
						</>
					)}

				</div>
			</div>
		</nav>
	);
};