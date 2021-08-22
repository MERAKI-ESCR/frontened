import React, { useState } from "react";
import emailjs from "emailjs-com";
import phone from "./phone-call.png";
import mail from "./email.png";
import location from "./location.png";
import "./ContactUS.css";

const Result = () => {
  return (
    <div className="contactResult">
      <p>
        Your Message was sent successfully! we will contact you as soon as
        possible{" "}
      </p>
    </div>
  );
};

const ContactUs = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [result, setResult] = useState(false);

  const service_id = "service_yzxydev";
  const template_id = "template_icbmlrq";
  const user_id = "user_bvpcIKvVjLS2DSFcKKLRH";
  const contactDetails = {
    name: name,
    email: email,
    message: message,
  };
  const sendEmail = (e) => {
    e.preventDefault();
    emailjs.send(service_id, template_id, contactDetails, user_id).then(
      (result) => {
        console.log(result.text);
        setResult(true);
      },
      (error) => {
        console.log(error.text);
      }
    );
  };

  setTimeout(() => {
    setResult(false);
  }, 5000);

  return (
    <div id="contactUs" className="container" >
      <div className="contact-section">
        <div className="contact-details">
          <h1>Contact Details</h1>
          <p>
            Here you can find all the needed information for you to contact with
            us , be comfortable to notify us with your suggestions and
            objections.
          </p>
          <table>
            <tbody>
              <tr>
                <td>
                  <img className="icon" src={location} alt="location" />
                </td>
                <td>
                  <span className="head">Location</span>
                  <br />
                  <span className="tbody">
                    245 King Street, Amman 8520 Jordan
                  </span>
                </td>
              </tr>
              <tr>
                <td>
                  <img className="icon" src={phone} alt="phone" />
                </td>
                <td>
                  <span className="head">Phone</span>
                  <br />
                  <span className="tbody">(00962)-7959595</span>
                </td>
              </tr>
              <tr>
                <td>
                  <img className="icon" src={mail} alt="mail" />
                </td>
                <td>
                  <span className="head">Email</span>
                  <br />
                  <span className="tbody">BillTeam@gmail.com</span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="vl"></div>
        <div className="contact-form">
          <h1>Contact Form</h1>
          <table>
            <tbody>
              <tr>
                <td>
                  <label> Name:</label>
                </td>
              </tr>
              <tr>
                <td>
                  <input
                    type="text"
                    name="name"
                    placeholder=" Name"
                    required
                    onChange={(e) => setName(e.target.value)}
                  />
                </td>
                <textarea
                    name="message"
                    placeholder="message"
                    required
                    onChange={(e) => setMessage(e.target.value)}
                  />
              </tr>
              <tr>
                <td>
                  <label>Email:</label>
                </td>
                {/* <td>
                  <label>Subject:</label>
                </td> */}
              </tr>
              <tr>
                <td>
                  <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    required
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </td>
                <td>
                <input
                    className="btn"
                    type="submit"
                    value="Send"
                    onClick={sendEmail}
                  />
                </td>
              </tr>
            </tbody>
          </table>
          <div>{result ? <Result /> : null}</div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
