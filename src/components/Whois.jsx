import { useState, useEffect } from "react";
import axios from "axios";

export default function Whois(){
    const [whoisData, setWhoisData] = useState(null);
    const [lookupValue, setLookupValue] = useState('');

    const options = {
        method: 'GET',
        url: `http://api.whoapi.com/?domain=${lookupValue}&r=whois&apikey=79b0d7a3967aef98f11eab1d41cc99d6`,
    }

    const getData = async () => {
        try {
            const response = await axios.request(options);
            console.log(response.data);
            setWhoisData(response.data);
          } catch (error) {
            console.error(error);
        }
    }

    function changeWebsite(value){
        setLookupValue(value);
    }

    function handleLookup(e) {
        e.preventDefault();
        if(lookupValue !== ""){
            getData();
        }else{
            alert("Please enter a valid website");
        }
    }

    return (
        <>
            <div className="whois-main">
                <h1>Whois Lookup</h1>
                <form className="lookup-form" onSubmit={handleLookup}> {/* Attach onSubmit event to the form */}
                    <input type="text" value={lookupValue} onChange={(e) => changeWebsite(e.target.value)}></input>
                    <button type="submit">Lookup</button> {/* Remove onClick event from the button */}
                </form>
                {whoisData &&
                    <div className="data">
                        <div className="name"><strong>Name:</strong> {whoisData.domain_name}</div>
                        <div className="registrar"><strong>Registrar:</strong> {whoisData.contacts[1].url}</div>
                        <div className="nameservers"><strong>Name Servers:</strong>
                            {whoisData.nameservers.map((ns, i) => (
                               <span key={i}>{ns}</span> 
                            ))}
                        </div>
                    </div>
                }
                
            </div>
        </>
    );
}