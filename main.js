const toggleMeetingButton = document.getElementById('toggleMeeting')
const attendeesInput = document.getElementById('attendees')
const averageSalaryInput = document.getElementById('averageSalary')
const averageSalaryDisplay = document.getElementById('averageSalaryDisplay')

let timer
let total = 0
let increment = 0

displayAverageSalary()

averageSalaryInput.addEventListener('input', () => {
	displayAverageSalary()
})

const calculateIncrement = () => {
	const attendees = attendeesInput.valueAsNumber
	const averageSalary = averageSalaryInput.valueAsNumber
	const workingDays = 233 // 365 days - 104 days (weekends) - 28 days (holiday)
	const workingHours = workingDays * 8
	const workingSeconds = workingHours * 60 * 60
	const salaryPerSecond = averageSalary / workingSeconds

	return salaryPerSecond * attendees
}

[attendeesInput, averageSalaryInput].forEach(input => {
	input.addEventListener('input', () => {
		increment = calculateIncrement()
	})
})

toggleMeetingButton.addEventListener('click', () => {
	if (timer) {
		timer = clearInterval(timer)
		toggleMeetingButton.classList.add('start')
		toggleMeetingButton.classList.remove('pause')
		toggleMeetingButton.innerText = 'Start'
	} else {
		toggleMeetingButton.classList.add('pause')
		toggleMeetingButton.classList.remove('start')
		toggleMeetingButton.innerText = 'Pause'

		increment = increment || calculateIncrement()

		console.log(`This meeting will cost £${(increment * 60 * 60).toFixed(2)} if it lasts an hour`)

		timer = setInterval(() => {
			total = total + increment
			const totalCost = document.getElementById('total')
			const totalCostString = total.toLocaleString('en-EN', { style: 'currency', currency: 'GBP' })
			totalCost.innerText = totalCostString
			document.title = `${totalCostString} – Meeting Cost Live`
		}, 1000);
	}
})

function displayAverageSalary() {
	const averageSalary = averageSalaryInput.valueAsNumber
	averageSalaryDisplay.innerText = averageSalary.toLocaleString('en-EN', {
		style: 'currency',
		currency: 'GBP',
		minimumFractionDigits: 0,
		maximumFractionDigits: 0,
	})
}
