import useFetch from "../../hooks/useFetch"
import "./featured.css"

const Featured= ()=>{
    const { data, loading, error, reFetch }= useFetch('/hotels/countByCityName?cities=Kolkata,Pune')
    console.log(data);
    return(
        <div className="featured">
            {loading ? ("Loading Please Wait"):
               ( <>
                <div className="featuredItem">
                    <img
                    src="https://images.pexels.com/photos/19109585/pexels-photo-19109585/free-photo-of-victoria-memorial-museum-in-kolkata-seen-from-street.jpeg?auto=compress&cs=tinysrgb&w=600"
                    alt=""
                    className="featuredImg"
                    />
                    <div className="featuredTitles">
                        <h1>Kolkata</h1>
                        <h2>{data[0]} properties</h2>
                    </div>
                </div>
                <div className="featuredItem">
                    <img
                    src="https://images.pexels.com/photos/14374972/pexels-photo-14374972.jpeg?auto=compress&cs=tinysrgb&w=600"
                    alt=""
                    className="featuredImg"
                    />
                    <div className="featuredTitles">
                        <h1>Pune</h1>
                        <h2>{data[1]} properties</h2>
                    </div>
                </div>
                <div className="featuredItem">
                    <img
                    src="https://cf.bstatic.com/xdata/images/city/max500/689422.webp?k=2595c93e7e067b9ba95f90713f80ba6e5fa88a66e6e55600bd27a5128808fdf2&o="
                    alt=""
                    className="featuredImg"
                    />
                    <div className="featuredTitles">
                        <h1>Austin</h1>
                        <h2>532 properties</h2>
                    </div>
                </div>
            </>)
            }
            
        </div>
    )
}
export default Featured

