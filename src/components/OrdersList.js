import React, {useState} from 'react';
import SearchIcon from '@mui/icons-material/Search';
import FilterListIcon from '@mui/icons-material/FilterList';
import {
	Chip,
	Typography,
	Box,
	Table,
	TableHead,
	TableBody,
	TableContainer,
	TableRow,
	TableCell,
	TablePagination,
	Paper,
	Modal,
	Toolbar,
	InputBase, Button,
} from "@mui/material";
import * as dayjs from 'dayjs';
import DatePicker from "./DatePicker";

const OrdersList = ({orders}) => {
	const [page, setPage] = useState(0);
	const [selectedOrder, setSelectedOrder] = useState(null);
	const [rowsPerPage, setRowsPerPage] = useState(10);
	const [modalIsOpen, setModalIsOpen] = useState(false);

	const handleCloseModal = () => setModalIsOpen(false);

	const handleChangePage = (event, newPage) => {
		setPage(newPage);
	};

	const handleChangeRowsPerPage = (event) => {
		setRowsPerPage(parseInt(event.target.value, 10));
		setPage(0);
	};

	const getDateFormat = (dataString) => {
		return dayjs(dataString).format('M/D/YYYY');
	}

	const getColorByStatus = (status) => {
		switch (status) {
			case 'CANCELED':
				return 'error';
			case 'DELIVERED':
				return 'success';
			case 'SHIPPED':
				return 'info';
			case 'WAITING':
				return 'warning';
			default:
				return 'default'
		}
	}

	const showFullOrderDetails = (rowId) => {
		const selection = window.getSelection();
		if(selection.toString().length !== 0) {
			return;
		}
		setSelectedOrder(orders.filter(el => el.id === rowId)[0]);
		setModalIsOpen(true);
	}

	const modalStyles = {
		position: 'absolute',
		top: '50%',
		left: '50%',
		transform: 'translate(-50%, -50%)',
		width: 400,
		bgcolor: 'background.paper',
		boxShadow: 24,
		p: 4,
	};

	const searchBoxStyles = {
		display: 'flex',
		alignItems: 'center',
		padding: '0 6px',
		background: '#ebebeb',
		borderRadius: '6px',
		width: '100%',
	}

	const toolbarStyles = {
		display: 'grid',
		gridTemplateColumns: '1fr 1fr 1fr',
		gridGap: '10px',
	}

	return (
		<Box sx={{width: '100%'}}>
			<Paper sx={{width: '100%', mb: 2}}>
				<Toolbar sx={toolbarStyles}>
					<Box sx={searchBoxStyles}>
						<InputBase
							placeholder="Search data"
						/>
						<SearchIcon sx={{opacity: .4}} />
					</Box>
					<DatePicker/>
					<Button variant="contained" endIcon={<FilterListIcon />}>
						filters
					</Button>
				</Toolbar>
				<TableContainer>
					<Table
						aria-labelledby="tableTitle"
						size={'small'}
					>
						<TableHead>
							<TableRow>
								<TableCell>Type</TableCell>
								<TableCell>Code</TableCell>
								<TableCell>Status</TableCell>
								<TableCell>Created</TableCell>
							</TableRow>
						</TableHead>
						<TableBody>
							{orders && orders
								.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
								.map((row) => (
									<TableRow
										hover
										key={row.id}
										sx={{'&:last-child td, &:last-child th': {border: 0}}}
										onMouseUp={() => showFullOrderDetails(row.id)}
									>
										<TableCell>{row.type}</TableCell>
										<TableCell>
											<Typography noWrap className="hidden-text" title={row.code}>
												{row.code}
											</Typography>
										</TableCell>
										<TableCell>
											<Chip label={row.status.toLowerCase()}
														color={getColorByStatus(row.status)}/>
										</TableCell>
										<TableCell>{getDateFormat(row.createdAt)}</TableCell>
									</TableRow>
								))}
						</TableBody>
					</Table>
				</TableContainer>
				{orders && <TablePagination
					rowsPerPageOptions={[5, 10, 25]}
					component="div"
					count={orders.length}
					rowsPerPage={rowsPerPage}
					page={page}
					onPageChange={handleChangePage}
					onRowsPerPageChange={handleChangeRowsPerPage}
				/>
				}
			</Paper>

			{selectedOrder &&
				<Modal
					open={modalIsOpen}
					onClose={handleCloseModal}
				>
					<Box sx={modalStyles}>
						<Typography variant="h6" component="h4">
							Order # {selectedOrder.id} details
						</Typography>
						<div className="order-content">
							<div className="block">
								<Typography variant="h6" gutterBottom component="div">Recipient address</Typography>
								<Typography variant="body2" gutterBottom>
									{selectedOrder.recipientAddress.city}<br/>
									{selectedOrder.recipientAddress.streetLine1}<br/>
									{selectedOrder.recipientAddress.state},
									{selectedOrder.recipientAddress.country},
									{selectedOrder.recipientAddress.postalCode}<br/>
								</Typography>
								<Typography variant="overline" display="block" gutterBottom>
									{
										selectedOrder.recipientAddress.isVerified ?
											<>Address is not verified <Button>Verify</Button></> :
											<>Address verified</>
									}
								</Typography>
							</div>
							<div className="block">
								<Typography variant="h6" gutterBottom component="div">Recipient contact</Typography>
								<Typography variant="body2" gutterBottom>
									<b>Name:</b> {selectedOrder.recipientAddress.name}<br/>
									<b>Company:</b> {selectedOrder.recipientAddress.company}<br/>
									<b>Email:</b>{selectedOrder.recipientAddress.email}<br/>
									<b>Phone:</b>{selectedOrder.recipientAddress.phone}
								</Typography>
							</div>
						</div>
					</Box>
				</Modal>
			}
		</Box>
	)
}

export default OrdersList;
