export const openNewWindow = (link) => {
	window.open(link, "_blank")
}

export const smoothScrollHorizotal = (
	element,
	currentScroll,
	targetScroll,
	duration
) => {
	const startTime = performance.now()

	const animateScroll = (currentTime) => {
		const elapsedTime = currentTime - startTime
		const easeInOutCubic = easeInOutCubicFunction(
			elapsedTime,
			currentScroll,
			targetScroll - currentScroll,
			duration
		)
		element.scrollLeft = easeInOutCubic

		if (elapsedTime < duration) {
			requestAnimationFrame(animateScroll)
		} else {
			element.scrollLeft = targetScroll
		}
	}

	requestAnimationFrame(animateScroll)
}

export const smoothScrollVertical = (
	element,
	currentScroll,
	targetScroll,
	duration
) => {
	const startTime = performance.now()

	const animateScroll = (currentTime) => {
		const elapsedTime = currentTime - startTime
		const easeInOutCubic = easeInOutCubicFunction(
			elapsedTime,
			currentScroll,
			targetScroll - currentScroll,
			duration
		)
		element.scrollTop = easeInOutCubic // Sử dụng scrollTop thay vì scrollLeft

		if (elapsedTime < duration) {
			requestAnimationFrame(animateScroll)
		} else {
			element.scrollTop = targetScroll
		}
	}

	requestAnimationFrame(animateScroll)
}

const easeInOutCubicFunction = (t, b, c, d) => {
	t /= d / 2
	if (t < 1) return (c / 2) * t * t * t + b
	t -= 2
	return (c / 2) * (t * t * t + 2) + b
}

export const convert_vi_to_en = (str) => {
	str = str.replace(
		/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g,
		"a"
	)
	str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e")
	str = str.replace(/ì|í|ị|ỉ|ĩ/g, "i")
	str = str.replace(
		/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g,
		"o"
	)
	str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u")
	str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y")
	str = str.replace(/đ/g, "d")
	str = str.replace(
		/À|Á|Ạ|Ả|Ã|Â|Ầ|Ấ|Ậ|Ẩ|Ẫ|Ă|Ằ|Ắ|Ặ|Ẳ|Ẵ/g,
		"A"
	)
	str = str.replace(/È|É|Ẹ|Ẻ|Ẽ|Ê|Ề|Ế|Ệ|Ể|Ễ/g, "E")
	str = str.replace(/Ì|Í|Ị|Ỉ|Ĩ/g, "I")
	str = str.replace(
		/Ò|Ó|Ọ|Ỏ|Õ|Ô|Ồ|Ố|Ộ|Ổ|Ỗ|Ơ|Ờ|Ớ|Ợ|Ở|Ỡ/g,
		"O"
	)
	str = str.replace(/Ù|Ú|Ụ|Ủ|Ũ|Ư|Ừ|Ứ|Ự|Ử|Ữ/g, "U")
	str = str.replace(/Ỳ|Ý|Ỵ|Ỷ|Ỹ/g, "Y")
	str = str.replace(/Đ/g, "D")
	str = str.replace(
		/!|@|%|\^|\*|\(|\)|\+|\=|\<|\>|\?|\/|,|\.|\:|\;|\'|\"|\&|\#|\[|\]|~|\$|_|`|-|{|}|\||\\/g,
		" "
	)
	str = str.replace(/  +/g, " ")
	return str
}

export const isValidEmail = (email) => {
	const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
	return emailRegex.test(email)
}

export function isValidPhoneNumber(phoneNumber) {
	const phoneRegex = /^\d{10,11}$/
	return phoneRegex.test(phoneNumber)
}

export const convertToVND = (money) => {
	return money?.toLocaleString("it-IT", {
		style: "currency",
		currency: "VND",
	})
}

export function getCurrentDate(separator = "") {
	let daysOfWeek = [
		"Chủ Nhật",
		"Thứ Hai",
		"Thứ Ba",
		"Thứ Tư",
		"Thứ Năm",
		"Thứ Sáu",
		"Thứ Bảy",
	]

	let newDate = new Date()
	let dayOfWeek = daysOfWeek[newDate.getDay()]
	let date = newDate.getDate()
	let month = newDate.getMonth() + 1
	let year = newDate.getFullYear()

	return `${dayOfWeek} ${date}${separator}${month < 10 ? `0${month}` : `${month}`
		}${separator}${year}`
}

export function getCurrentMonth() {
	// Tạo một đối tượng Date
	var ngayHienTai = new Date()

	// Lấy tháng từ đối tượng Date (lưu ý tháng bắt đầu từ 0)
	var thang = ngayHienTai.getMonth() + 1 // Cộng thêm 1 để hiển thị tháng từ 1 đến 12

	return thang
}

export function getPreCurrentMonth() {
	// Tạo một đối tượng Date
	var ngayHienTai = new Date()

	// Lấy tháng từ đối tượng Date (lưu ý tháng bắt đầu từ 0)
	var thang = ngayHienTai.getMonth() // Lấy tháng hiện tại

	// Nếu là tháng 1, trả về tháng 12, ngược lại trả về tháng trước đó
	if (thang === 0) {
		thang = 12
	} else {
		thang = thang
	}

	return thang
}

export const saveUserToLocalStogare = (user) => {
	localStorage.setItem(
		"user",
		JSON.stringify(user)
	)
}
