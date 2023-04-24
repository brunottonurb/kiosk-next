import { useCallback, useEffect, useState } from "react";

export default function Time() {
	const [time, setTime] = useState<string>('');
	const [date, setDate] = useState<string>('');

	const getTimeString = useCallback(() => {
		return new Date().toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit', hour12: false });
	}, []);

	const getDateString = useCallback(() => {
		return new Date().toLocaleDateString('en-GB', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });
	}, []);

	useEffect(() => {
		const interval = setInterval(() => {
			setTime(getTimeString());
			setDate(getDateString());
		}, 1000);
		return () => clearInterval(interval);
	}, [getTimeString, getDateString]);

	return (
		<div className="flex flex-col items-center justify-center space-y-2">
			<span className="text-4xl">{time}</span>
			<span className="text-xs">{date}</span>
		</div>
	);
}