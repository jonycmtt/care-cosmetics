
const Category = ({category}) => {
    const {photo} = category;
  return (
    <div className="border rounded-md">
      <img className="h-52" src={photo} alt="category" />
    </div>
  )
}

export default Category
