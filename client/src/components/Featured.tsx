//@to-do
//needs state for button, needs state for slider

const Featured = () => {
	return (
		<div className='featured-slider'>
			<div className='featured-slider-items'>
				<a className='featured-slider-item' href='#'>
					<img
						className='featured-slider-item-img'
						src='https://images.unsplash.com/photo-1635205411883-ae35d1169f60?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTUxfHx2aWRlbyUyMGdhbWV8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60'
						alt='asdf'
					/>
					<div className='featured-slider-item-info-wrapper'>
						<div className='featured-slider-item-info'>
							<h2 className='title'>PleaceHolder Name</h2>
							<h3 className='price highlight'>$holder price</h3>
						</div>
					</div>
				</a>
			</div>
			<div className='featured-slider-navigator'>
				<button
					className='featured-slider-navigator-bar'
					type='button'
					data-index='0'
				></button>
				<button
					className='featured-slider-navigator-bar'
					type='button'
					data-index='1'
				></button>
				<button
					className='featured-slider-navigator-bar'
					type='button'
					data-index='2'
				></button>
				<button
					className='featured-slider-navigator-bar'
					type='button'
					data-index='3'
				></button>
			</div>
		</div>
	);
};
export default Featured;
