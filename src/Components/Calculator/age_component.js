import React from "react"


import "./style.css"
import Icon_svg from "./icon-arrow.svg"


export default function AgeCalculator(){

    const[date, setDateData] = React.useState({
        day: "",
        day_error:false,
        month: "",
        month_error:false,
        year:"",
        year_error:false
    })
    
    function handleChange(e){
        const{name, value} = e.target
        
        setDateData( prevDate => {
            return {
                        ...prevDate,
                        [name]:value
            }
        })
    }

    React.useEffect(() =>{
        if(  Number(date.day) > 31 || Number(date.day) <= 0){
            
            setDateData( prevDate => {
                return {
                            ...prevDate,
                            day_error:true
                }
            })
        }
        else{
            setDateData( prevDate => {
                return {
                            ...prevDate,
                            day_error:false
                }
            })
        }

    /**-------------------------Month---------------- */

        if(  Number(date.month) > 12 || Number(date.month) <= 0 ){
            
            setDateData( prevDate => {
                return {
                            ...prevDate,
                            month_error:true
                }
            })
        }
        else{
            setDateData( prevDate => {
                return {
                            ...prevDate,
                            month_error:false
                }
            })
        }

    /**-------------------------Year------------------------- */

        if(  Number(date.year) < 1500 || (Number(date.year) > Number(new Date().getFullYear()) )){
           
            setDateData( prevDate => {
                return {
                            ...prevDate,
                            year_error:true
                }
            })
        }
        else{
            setDateData( prevDate => {
                return {
                            ...prevDate,
                            year_error:false
                }
            })
        }

    },[date.day,date.month,date.year])


    /*-----------------------Calculate-Age--------------------------------------- */
    const[age , setAge] = React.useState({
        year: "",
        month: "",
        days: ""
    })

    function calculateAge(){

        const inputDate = `${date.year}-${date.month}-${date.day}`;
       
        const date1 = new Date(inputDate);
        const date2 = new Date();

        let yearDiff = date2.getFullYear() - date1.getFullYear();
        let monthDiff = date2.getMonth() - date1.getMonth();
        let dayDiff = date2.getDate() - date1.getDate();

        if (dayDiff < 0) {
        const tempDate = new Date(date1.getFullYear(), date1.getMonth() + 1, 0);
        dayDiff += tempDate.getDate();
        monthDiff--;
        }

        if (monthDiff < 0) {
        yearDiff--;
        monthDiff += 12;
        }

        setAge({
            year: yearDiff,
            month: monthDiff,
            days: dayDiff 
        })

       // console.log(yearDiff + ' years, ' + monthDiff + ' months, and ' + monthDiff + ' days');
        // Output: 24 years, 1 months, and 26 days


    }

    return(
        <div className="Calculator-card">
            <div className="Card-data">
                <form>
                    <div>
                        <label className="head">DAY</label><br/>
                        <input 
                            type="text"
                            placeholder="DD"
                            name="day"
                            value={date.day}
                            onChange= {handleChange}
                            
                        /><br/>
                        {  
                            (date.day_error && date.day) ? 
                            <label className= "error error-text">Must be a valid date</label> : 
                            <label></label>
                        }    
                    </div>

                    <div>
                        <label>MONTH</label><br/>
                        <input 
                            type="text"
                            placeholder="MM"
                            name="month"
                            value={date.month}
                            onChange= {handleChange}
                           
                        /><br/>
                        {  
                            (date.month_error && date.month) ? 
                            <label className= "error error-text">Must be a valid Month</label> : 
                            <label></label>
                        }   
                    </div>

                    <div>
                        <label>YEAR</label><br/>
                        <input 
                            type="text"
                            placeholder="YYYY"
                            name="year"
                            value={date.year}
                            onChange= {handleChange}   
                        /><br/>
                        {  
                           ( date.year_error && date.year )? 
                            <label className= "error error-text">Must be a valid Year</label> : 
                            <label></label>
                        }   
                    </div>
                    
                </form>

             <div className="Icon">
                <hr /> 
                <img src={Icon_svg} onClick={calculateAge}/>
             </div>

             <div className="Calculated-age">   
                <div><span>{age.year ? age.year : "- -" }</span> years</div>
                <div><span>{age.month ? age.month : "- -"}</span> months</div>
                <div><span>{age.days ? age.month: "- -"}</span> days</div>
             </div>
                
            </div>
        </div>
    )
}
