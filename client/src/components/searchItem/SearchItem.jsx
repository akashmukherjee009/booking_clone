import { Link } from "react-router-dom";
import "./searchItem.css";

const SearchItem = (item) => {
  console.log(item.item.name);
  return (
    <div className="searchItem">
      <img src={item.item.photos[0]} alt="" className="siImg" />
      <div className="siDesc">
        <h1 className="siTitle">{item.item.name}</h1>
        <span className="siDistance">{item.item.distance} from center</span>
        <span className="siTaxiOp">Free airport taxi</span>
        <span className="siSubtitle">
          Studio Apartment with Air conditioning
        </span>
        <span className="siFeatures">
          {item.item.desc}
        </span>
        <span className="siCancelOp">Free cancellation </span>
        <span className="siCancelOpSubtitle">
          You can cancel later, so lock in this great price today!
        </span>
      </div>
      <div className="siDetails">
        {item.item.rating && 
        <div className="siRating">
          <span>Excellent</span>
          <button>{item.item.rating}</button>
        </div>}
        <div className="siDetailTexts">
          <span className="siPrice">${item.cheapestprice}</span>
          <span className="siTaxOp">Includes taxes and fees</span>
          <Link to={`/hotels/${item.item._id}`}>
          <button className="siCheckButton"><a href="hotels/1" className="linkbtn">See availability</a></button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SearchItem;