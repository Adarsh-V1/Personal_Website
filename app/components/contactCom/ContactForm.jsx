import React, { useState } from "react";
import emailjs from "emailjs-com";

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [status, setStatus] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setStatus("Sending...");

    // EmailJS configuration
    emailjs
      .send(
        "service_c6a9tzi", // Replace with your EmailJS service ID
        "template_tu91qap", // Replace with your EmailJS template ID
        formData,
        "Yt7duJ8PkQlj2j1w7" // Replace with your EmailJS public key
      )
      .then(
        (response) => {
          console.log("SUCCESS!", response.status, response.text);
          setStatus("Message sent successfully!");
          setFormData({ name: "", email: "", message: "" }); // Reset form
        },
        (error) => {
          console.error("FAILED...", error);
          setStatus("Failed to send the message. Please try again.");
        }
      );
  };

  return (
    <div className=" bg-transparent lg:w-fit w-full mt-20  lg:h-full flex h-full  lg:pt-20 pt-52  justify-center dark:text-cyan-300    theme-text ">
        <div className="lg:w-100 md:w-3/5 w-4/5 ring-1 ring-cyan-700   h-1/3 md:p-12 p-8 lg:m-4 lg:px-16 lg:py-24 rounded-md  hover:brightness-125 transition-transform duration-300 ease-out hue-rotate-30 bg-linear-to-tl ">
        <h1 className="text-xl lg:text-4xl md:text-2xl  font-bold dark:text-cyan-300 mb-10 lg:-mt-10 text-center">
          Contact Me
        </h1>
        <form onSubmit={handleSubmit} className="space-y-6 invert hue-rotate-180 ">
          <div>
            
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Your Name..."
              className="w-full p-3 theme-btn dark:bg-black  ring-1 ring-cyan-700  focus:outline-none  focus:ring-cyan-500 bg-linear-to-br from-black via-black  shadow-md  to-cyan-950 rounded-lg hover:shadow-lg  trasistion duration-200 ease-linear placeholder:text-cyan-600 placeholder:italic hover:hue-rotate-15 text-cyan-400 dark:invert dark:hue-rotate-180  "
              required
            />
          </div>
          <div>
         
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Your Email..."
              className="w-full p-3 dark:invert dark:hue-rotate-180 dark:bg-black  ring-1 ring-cyan-700  focus:outline-none  focus:ring-cyan-500 bg-linear-to-br from-black via-black  shadow-md  to-cyan-950 rounded-lg hover:shadow-lg  trasistion duration-200 ease-linear placeholder:text-cyan-600 placeholder:italic hover:hue-rotate-15 text-cyan-400 "
              required
            />
          </div>
          <div>
            
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="Your Message / Feedback ..."
               className="w-full p-3 bg-black  ring-1 ring-cyan-700  focus:outline-none  focus:ring-cyan-500 bg-linear-to-br from-black via-black  shadow-md  to-cyan-950 rounded-lg hover:shadow-lg  trasistion duration-200 ease-linear placeholder:text-cyan-600 placeholder:italic hover:hue-rotate-15 text-cyan-400 dark:invert dark:hue-rotate-180 "
              rows="5"
              required
            />
          </div>
          <button
            type="submit"
          className="w-full p-3 bg-black  ring-1 ring-cyan-700  focus:outline-none  focus:ring-cyan-500 bg-linear-to-br from-black via-black  shadow-md  to-cyan-950 rounded-lg hover:shadow-lg  trasistion duration-200 ease-linear placeholder:text-cyan-600 placeholder:italic text-cyan-400 hover:cursor-pointer hover:hue-rotate-30 dark:invert dark:hue-rotate-180 " 
           >
            Send Message
          </button>
        </form>
        {status && (
          <p className="text-center mt-4 text-cyan-300 dark:invert dark:hue-rotate-180  font-medium">{status}</p>
        )}
      </div>
    </div>
  );
};

export default ContactForm;