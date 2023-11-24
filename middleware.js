// This function can be marked `async` if using `await` inside
export function middleware(request) {
	// const token = request.cookies.get("token")?.value
	// request.headers.append(
	// 	"Authorization",
	// 	"Bearer " + token
	// )
}

// See "Matching Paths" below to learn more
export const config = {
	matcher: "/",
}
