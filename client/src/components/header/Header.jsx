import "./header.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBed, faCalendarDays, faCar, faPerson, faPlane, faTaxi } from "@fortawesome/free-solid-svg-icons"
import  { DateRange } from "react-date-range"
import {useState} from 'react'
import 'react-date-range/dist/styles.css'; // main css file
import 'react-date-range/dist/theme/default.css'; // theme css file
import {format} from 'date-fns'
import { useNavigate } from "react-router-dom"

const Header = ({type}) => {
  const [OpenDate, setOpenDate]= useState(false)
  const [destination, setDestination]= useState("")
  const [date, setDate]= useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: 'selection'
    }   
  ])

  const [OpenOption, setOpenOption]= useState(false)
  const [Options, setOptions]= useState({
      adult: 2,
      children: 0,
      room: 1
})
const navigate= useNavigate()
const handleOption = (name, operation) =>{
  setOptions((prev) =>{return{
    ...prev, 
    [name]: operation ==="i" ? Options[name] +1 : Options[name] -1,
  }})
}
const handleSearch=  ()=>{
  // dispatch({ type: "NEW_SEARCH", payload: { destination, dates, options } });
      navigate("/hotels", {state: {destination,date, Options}})
}

  
  return (
    <div className="header">
      <div className={type=== "list" ? "headerContainer listMode" : "headerContainer"} >
      <div className="headerList">
        <div className="headerListItems active">
          <FontAwesomeIcon icon={faBed} />
          <span>Stays</span>
        </div>
        <div className="headerListItems">
          <FontAwesomeIcon icon={faPlane} />
          <span>Flights</span>
        </div>
        <div className="headerListItems">
          <FontAwesomeIcon icon={faCar} />
          <span>Car Rentals</span>
        </div>
        <div className="headerListItems">
          <FontAwesomeIcon icon={faBed} />
          <span>Attractions</span>
        </div>
        <div className="headerListItems">
          <FontAwesomeIcon icon={faTaxi} />
          <span>Airport taxi</span>
        </div>
      </div>

      { type !== "list" &&
        <>
        <h1 className="headerTitle">Find your next stay</h1>
        <p className="headerDesc">Search deals on hotels, homes, and much more...</p>
        <button className="headerBtn">Sign in / Register</button>


        <div className="headerSearch">
          <div className="headerSearchItem">
            <FontAwesomeIcon icon={faBed}  className="headerIcon"/>
            <input type="text" id="message" placeholder="Where are you Going?" className="headerSearchInput" 
             onChange={(e) => setDestination(e.target.value)}/>
          </div>

          <div className="headerSearchItem">
            <FontAwesomeIcon icon={faCalendarDays}  className="headerIcon"/>
            <span className="headerSearchText" onClick={()=>setOpenDate(!OpenDate)}>{`${format(date[0].startDate, "dd/MM/yyyy")} to ${format(date[0].endDate, "dd/MM/yyyy")}`}</span>
            { OpenDate && (<DateRange
              editableDateInputs={true}
              onChange={item => setDate([item.selection])}
              moveRangeOnFirstSelection={false}
              ranges={date}
              className="date"
              minDate={new Date()}
            />)}
          </div>

          <div className="headerSearchItem">
            <FontAwesomeIcon icon={faPerson}  className="headerIcon"/>
            <span onClick={()=>setOpenOption(!OpenOption)} className="headerSearchText">{`${Options.adult}  Adults ${Options.children}  Children ${Options.room} Room`}</span>
            { OpenOption && <div className="options">
              <div className="optionItem">
                <span className="optionText">Adult</span>
                <div className="optionCounter">
                  <button disabled={Options.adult <=1} className="optionCounterButton" onClick={()=>handleOption("adult","d")}>-</button>
                  <span className="optionCounterNumber">{Options.adult}</span>
                  <button className="optionCounterButton" onClick={()=>handleOption("adult","i")}>+</button>
                </div>
              </div>

              <div className="optionItem">
                <span className="optionText">Children</span>
                <div className="optionCounter">
                  <button disabled={Options.children <=0} className="optionCounterButton" onClick={()=>handleOption("children","d")}>-</button>
                  <span className="optionCounterNumber">{Options.children}</span>
                  <button className="optionCounterButton" onClick={()=>handleOption("children","i")}>+</button>
                </div>
              </div>

              <div className="optionItem">
                <span className="optionText">Room</span>
                <div className="optionCounter">
                  <button disabled={Options.room <=1} className="optionCounterButton" onClick={()=>handleOption("room","d")}>-</button>
                  <span className="optionCounterNumber">{Options.room}</span>
                  <button className="optionCounterButton" onClick={()=>handleOption("room","i")}>+</button>
                </div>
              </div>
            </div>}
          </div>
          <div className="headerSearchItem">
           <button className="headerBtn" onClick={handleSearch}>Search</button>
          </div>
        </div>
        </>}
      </div>
    </div>
  )
}

export default Header
