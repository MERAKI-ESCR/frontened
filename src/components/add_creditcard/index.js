import React, {useState} from "react";
import "./add_creditcard.css";
import {useParams,useHistory} from "react-router-dom"
import axios from "axios";
import jwt from "jsonwebtoken"
require(`dotenv`).config();


const CreditCardAdd = ({token})=>{
    const {id} = useParams();
    const history = useHistory();
    const [donation, setDonation] = useState(0);
    const [cardHolder, setCardHolder] = useState("");
    const [cardNumber, setCardNumber] = useState();
    const [cvv, setCvv] = useState();
    const [expiryDate, setExpiryDate] = useState();
    const [saveCheck, setSaveCheck] = useState(false);
    const add_donation = async ()=>{
        let userId = ""
        const token1= token.split(' ').pop();
        try{
        const tokenPayload = await jwt.decode(token1);
        console.log(tokenPayload)
        userId = tokenPayload.userId 
        } catch(err){
            console.log(err);
            throw err
        }
        if (saveCheck){
        axios.post("https://escr.herokuapp.com/card",{
            cardNumber,
            cardHolder,
            expiryDate,
        },{
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }).then((result)=>{
            console.log(result)
        }).catch((err)=>{
            console.log(err)
            throw err
        })
    }

        axios.post(`https://escr.herokuapp.com/donations/create`,{
            caseId:id,
            donorId:userId,
            donationAmount:donation
        },{
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }).then((result)=>{
            console.log(result)
            
        }).catch((err)=>{
            console.log(err)
            throw err
        })

        axios.put(`https://escr.herokuapp.com/cases/case/${id}`,{
            $inc: {'donatedAmount':donation},
        },{
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }).then((result)=>{
            history.push("/donation_confirmed")
            console.log(result)
        }).catch((err)=>{
            console.log(err)
            throw err
        })
    }
    return(<>
    <div className="makeDonation">
        <p className="text1">Make a Donation</p>
        <div className="donateAmount">
            <p className="text2">Your Donation</p>
            <br/>
            <input name="donAmount" placeholder="Enter Donation Amount" className="inputFields" onChange={(e)=>{
                        setDonation(e.target.value)
                    }} />
        </div>
        <div className="creditCard">
            <p className="text2">Enter Your Credit Card info</p>
            <br/>
            <div className="cardInfo">
                <div className="inputFields1">
                    <p className="text3">Card holder</p>
                    <br/>
                    <input name="cardHolder" className="inputFields" onChange={(e)=>{
                        setCardHolder(e.target.value)
                    }} />
                </div>
                <div className="inputFields2">
                    <p className="text3">Card Number</p>
                    <br/>
                    <input name="carNumber" type="text" className="inputFields" onChange={(e)=>{
                        setCardNumber(e.target.value)
                    }} />
                </div>
                <div className="inputFields1">
                    <p className="text3">CVV</p>
                    <br/>
                    <input name="CVV" type="Number" className="inputFields" onChange={(e)=>{
                        setCvv(e.target.value)
                    }} />
                </div>
                <div className="inputFields2">
                    <p className="text3">Expiry Date</p>
                    <br/>
                    <input name="expiryDate" className="inputFields" onChange={(e)=>{
                        setExpiryDate(e.target.value)
                    }} />
                </div>
            </div>
            <br/>
            <input type="checkbox" defaultsaveCheck={saveCheck} onChange={()=>setSaveCheck(!saveCheck)} id="saveCreditCard"/>
            <label for="saveCreditCard" className="text3">Save credit card info</label>
        </div>
        <button className="donateButton" onClick={()=>{add_donation()}}>Donate</button>
    </div>
    </>)
}

export default CreditCardAdd