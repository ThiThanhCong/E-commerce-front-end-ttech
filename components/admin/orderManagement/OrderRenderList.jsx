const OrderRenderList = ({ orderList, setOrderList }) => {
	return (
		<div className='flex'>
			<div>OrderId</div>
			<div>Customer name</div>
			<div>Email</div>
			<div>Phone</div>
			<div>address</div>
			<div>State</div>
			<div>Total</div>
			<div>note</div>
			<div>discount</div>
			<div>deliveryFee</div>
		</div>
	)
}

export default OrderRenderList
