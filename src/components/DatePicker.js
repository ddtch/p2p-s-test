import React, {useState} from 'react';
import {
	Box, InputBase,
} from '@mui/material';
import TodayIcon from '@mui/icons-material/Today'
import {
	LocalizationProvider,
	MobileDateRangePicker,
} from '@mui/lab';
import DateFnsUtils from "@date-io/date-fns";

const datesBoxStyles = {
	display: 'flex',
	alignItems: 'center',
	padding: '0 6px',
	background: '#ebebeb',
	borderRadius: '6px',
	width: '100%'
}

const DatePicker = () => {
	const [value, setValue] = useState([null, null]);

	return (
		<LocalizationProvider dateAdapter={DateFnsUtils}>
			<MobileDateRangePicker
				startText="From"
				value={value}
				onChange={(newValue) => {
					setValue(newValue);
				}}
				renderInput={(startProps, endProps) => (
					<Box sx={datesBoxStyles}>
						<InputBase {...startProps} />
						<TodayIcon sx={{opacity: .4}} />
					</Box>
				)}
			/>
		</LocalizationProvider>
	);
}

export default DatePicker;
