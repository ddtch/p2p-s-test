import './App.scss';
import {Box, Container, styled} from "@mui/material";
import logo from './assets/logo.jpeg';
import OrdersList from './components/OrdersList';
import {useEffect, useState} from "react";

const MainContainer = styled(Box)({
	padding: '10px 0 0 0',
	display: 'flex',
	flexDirection: 'row nowrap',
	background: '#e4e8ff',
	height: '100%',
});

const Sidebar = styled(Box)({
	width: '100%',
	maxWidth: 220,
	height: '100%',
	padding: '0 0 0 20px',
	display: 'flex',
	flexFlow: 'column nowrap',
});

const Content = styled(Box)({});

function App() {
	const navItems = [
		{
			link: '',
			title: 'Orders',
			active: true
		},
		{
			link: '',
			title: 'Warehouses',
			active: false
		},
	]
	const [orders, setOrders] = useState([]);

	useEffect(() => {
		fetch('data/response.json')
			.then(resp => resp.json())
			.then(data => setOrders(data.orders));

	}, []);

	return (
		<MainContainer>
			<Sidebar>
				<img src={logo} className="main-logo" alt="p2p seller logo"/>
				<ul className="main-nav">
					{
						navItems.map((el, i) =>
							<li key={i} className={(el.active ? 'active' : '')}>
								{el.title}
							</li>)
					}
				</ul>
			</Sidebar>
			<Container>
				<Content>
					<OrdersList orders={orders}/>
				</Content>
			</Container>
		</MainContainer>
	);
}

export default App;
