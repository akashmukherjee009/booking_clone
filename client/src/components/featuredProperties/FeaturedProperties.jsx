import useFetch from "../../hooks/useFetch";
import "./featuredProperties.css"


const FeaturedProperties = () => {
    const { data, loading, error, reFetch }= useFetch('/hotels?featured=true')
    console.log({featured:data});
  return (
    <div className="fp">
        {loading ? ('Loading Wait!!!'):(
        <>    
        {data.map((item)=>
            <div className="fpItem">
                <img src={item.photos[0]} 
                alt="" 
                className="fpImg" />
                <span className="fpName">{item.name}</span>
                <span className="fpCity">{item.city}</span>
                <span className="fpPrice">Starting from ${item.cheapestprice}</span>
                {item.rating && <div className="fpRating">
                    <button>{item.rating}</button>
                    <span>Excellent</span>
                </div>}
            </div>)}
        </>
        )}
    </div>
  )
}

export default FeaturedProperties
