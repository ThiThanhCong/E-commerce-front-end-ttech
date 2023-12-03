import { convertDate } from "@/components/UserOrder"

const UserRenderList = ({ userList, setUserList }) => {
	return (
		<table className='w-full border-spacing-1 border-separate mt-10 table-auto text-xl bg-white relative'>
			<thead class=' text-black uppercase sticky top-2'>
				<tr>
					<th className='px-4 py-2 border border-b-4 rounded-md bg-white border-blue-500 flex-1 shrink-0 text-center'>
						Mã khách hàng
					</th>
					<th className='px-4 py-2 border border-b-4 rounded-md bg-white border-blue-500 flex-1 shrink-0 text-center'>
						Tên khách hàng
					</th>
					<th className='px-4 py-2 border border-b-4 rounded-md bg-white border-blue-500 flex-1 shrink-0 text-center'>
						Email
					</th>
					<th className='px-4 py-2 border border-b-4 rounded-md bg-white border-blue-500 flex-1 shrink-0 text-center'>
						Số điện thoại
					</th>
					<th className='px-4 py-2 border border-b-4 rounded-md bg-white border-blue-500 flex-1 shrink-0 text-center'>
						Thời gian tạo
					</th>
				</tr>
			</thead>
			<tbody>
				{userList?.map((x, i) => (
					<tr key={i}>
						<th className='px-4 py-2 flex-1 font-[400] shrink-0 text-center'>
							{x.user_id}
						</th>
						<th className='px-4 py-2 flex-1 font-[400] shrink-0 text-center'>
							{x.name}
						</th>
						<th className='px-4 py-2 flex-1 font-[400] shrink-0 text-center'>
							{x.email}
						</th>
						<th className='px-4 py-2 flex-1 font-[400] shrink-0 text-center'>
							{x.phone}
						</th>
						<th className='px-4 py-2 flex-1 font-[400] shrink-0 text-center'>
							{convertDate(x.create_at)}
						</th>
					</tr>
				))}
			</tbody>
		</table>
	)
}

export default UserRenderList
