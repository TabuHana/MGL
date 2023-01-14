//@to-do
//Attach to searchgame and map through
interface Props {
	img: string;
	title: string;
}

const SearchedGameItem: React.FC<Props> = ({ img, title }) => {
	return (
		<div className='browse-option'>
			<img className='browse-option-background' src={img} alt={title} />
			<span className='label'>{title}</span>
		</div>
	);
};
export default SearchedGameItem;
