import '../CSS/categorycard.css'
function CategoryCard({category}){
    return(
        <div className="category-card">
            <img src={category.img}></img>
            <h2 className="overlay-text">{category.name}</h2>
        </div>
    );
}
export default CategoryCard;