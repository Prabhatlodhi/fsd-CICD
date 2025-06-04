import { useState, useEffect } from "react";
import axios from "axios";
import UserCard from "./components/UserCard";
import UserForm from "./components/UserForm";
import LoadingSpinner from "./components/LoadingSpinner";
import ErrorMessage from "./components/ErrorMessage";
import "./App.css";

const API_URL = "/api";

function App() {
	const [users, setUsers] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	useEffect(() => {
		fetchUsers();
	}, []);

	const fetchUsers = async () => {
		try {
			setLoading(true);
			setError(null);
			const response = await axios.get(`${API_URL}/users`);

			if (response.data.success) {
				setUsers(response.data.data);
			} else {
				setError("Failed to fetch users");
			}
		} catch (err) {
			setError(err.response?.data?.message || "Error connecting to server");
			console.error("Error fetching users:", err);
		} finally {
			setLoading(false);
		}
	};

	const addUser = async (userData) => {
		try {
			const response = await axios.post(`${API_URL}/users`, userData);

			if (response.data.success) {
				// Add new user to the list
				setUsers((prevUsers) => [response.data.data, ...prevUsers]);
				return response.data;
			} else {
				throw new Error(response.data.message);
			}
		} catch (error) {
			const errorMessage = error.response?.data?.message || "Error adding user";
			setError(errorMessage);
			throw error;
		}
	};

	const refreshUsers = () => {
		fetchUsers();
	};

	if (loading) {
		return (
			<div className="app">
				<LoadingSpinner message="Loading users..." />
			</div>
		);
	}

	return (
		<div className="app" data-testid="app">
			<header className="app-header">
				<h1 data-testid="app-title">🚀 My Full-Stack Application Pract</h1>
				<p>React + Node.js + MongoDB</p>
			</header>

			<main className="main-content">
				{error && (
					<div className="error-banner" data-testid="error-banner">
						{error}
						<button onClick={() => setError(null)} data-testid="close-error">
							✕
						</button>
					</div>
				)}

				<UserForm onUserAdded={addUser} />

				<div className="users-section">
					<div className="section-header">
						<h2 data-testid="users-count">👥 Users ({users.length})</h2>
						<button onClick={refreshUsers} className="refresh-btn" data-testid="refresh-button">
							🔄 Refresh
						</button>
					</div>

					{users.length === 0 ? (
						<div className="no-users" data-testid="no-users">
							<p>No users found. Add some users using the form above!</p>
						</div>
					) : (
						<div className="users-grid" data-testid="users-grid">
							{users.map((user) => (
								<UserCard key={user._id} user={user} />
							))}
						</div>
					)}
				</div>
			</main>

			<footer className="app-footer">
				<p>✅ Backend connected | 🗄️ MongoDB Atlas | ⚡ Vite + React</p>
			</footer>
		</div>
	);
}

export default App;