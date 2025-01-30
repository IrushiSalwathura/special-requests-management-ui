'use client';
import React, { useEffect, useState } from "react";
import axios from "axios";

import Header from "@/components/Header";

const requestType =[
    {type: "EVENT_APPEARANCE", value:"Event Appearance"},
    {type: "BIRTHDAY_GREETING", value:"Birthday Greeting"},
    {type: "PRODUCT_MARKETING", value:"Product Marketing"}
]

export default function RequestForm({mode,id}) {
    const [selectedFile, setSelectedFile] = useState(null);
    const [request, setRequest] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if(mode === "Edit")
            console.log("test")
            axios.get(`http://localhost:3000/request/${id}`)
            .then((response) => {
                console.log(response)
                setRequest(response.data);
                setLoading(false);
            })
            .catch((error) => {
                console.error("Error fetching requests:", error);
                setError("Failed to load requests");
                setLoading(false);
            })

    },[])

    const handleFileChange = (event) => {
        setSelectedFile(event.target.files[0]);
    };

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        type: "",
        description: "",
        date: "",
        time: "",
    });
    
    const [errors, setErrors] = useState({
        name: "",
        email: "",
        type: "",
        description: "",
        date: "",
        time: "",
    });
    
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
          ...formData,
          [name]: value,
        });
    };
    
    const validateForm = () => {
        let formIsValid = true;
        let errorMessages = { name: "", email: "", type: "",
            description: "",
            date: "",
            time: "" };
    
        // Name validation
        if (!formData.name) {
          formIsValid = false;
          errorMessages.name = "Name is required";
        }
    
        // Email validation
        const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
        if (!formData.email) {
          formIsValid = false;
          errorMessages.email = "Email is required";
        } else if (!emailPattern.test(formData.email)) {
          formIsValid = false;
          errorMessages.email = "Invalid email format";
        }
    
        // RequestType validation
        if (!formData.type) {
            formIsValid = false;
            errorMessages.type = "Please select a Request Type";
        }  

        // Description validation
        if (!formData.description) {
            formIsValid = false;
            errorMessages.description = "Description is required";
        }

        // Date validation 
        if (!formData.date) {
            formIsValid = false;
            errorMessages.date = "Date is required";
        } else {
            const today = new Date();
            const selectedDate = new Date(formData.date);
    
            // date must be in the future
            if (selectedDate < today.setHours(0, 0, 0, 0)) {
                formIsValid = false;
                errorMessages.date = "Date must be in the future";
            }
        }

        // Time validation
        if (!formData.time) {
            formIsValid = false;
            errorMessages.time = "Time is required";
        } else if (formData.date) {
            const today = new Date();
            const selectedDate = new Date(formData.date);
            const selectedTime = formData.time.split(":");
            const selectedHour = parseInt(selectedTime[0]);
            const selectedMinute = parseInt(selectedTime[1]);
    
            if (selectedDate.toDateString() === today.toDateString()) {
            const now = new Date();
            const currentHour = now.getHours();
            const currentMinute = now.getMinutes();
    
            if (
                selectedHour < currentHour ||
                (selectedHour === currentHour && selectedMinute < currentMinute)
            ) {
                formIsValid = false;
                errorMessages.time = "Time must be in the future";
            }
            }
        }

    setErrors(errorMessages);
        return formIsValid;
    };
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (validateForm()) {
          alert("Request submitted successfully!");
          
          try {
            console.log(formData);
            
            // Make the POST request to the backend
            const response = await axios.post("http://localhost:3000/request", formData, {
              withCredentials: true,
            });
      
            // setMessage(response.data.message); 

          } catch (error) {
            console.error("Error submitting form:", error);
            setMessage("Error submitting form.");
          }
        }
    };

    if (loading) return <p>Loading...</p>;

    return (
    <>
    <Header name='Irushi'/>
    <div className="pt-20 px-20">
        <h2 className="text-xl font-semibold mb-4">{mode} Request</h2>
        <form className="space-y-4" onSubmit={handleSubmit}>
        {/* Name */}
        <div>
            <label className="block text-sm font-medium text-gray-700">Name</label>
            <input
              type="text"
              className="mt-1 block w-full p-2 border border-stone-300 rounded-md focus:ring-stone-600 focus:border-stone-500"
              placeholder="Your Name"
              name="name"
              value={mode==="Create" ? formData.name : "name"}
              onChange={handleInputChange}
            />
            {errors.name && <p style={{ color: "red" }}>{errors.name}</p>}
        </div>
        {/* Email */}
        <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              className="mt-1 block w-full p-2 border border-stone-300 rounded-md focus:ring-stone-600 focus:border-stone-500"
              placeholder="Your Email"
              name="email"
              value={mode==="Create" ? formData.email : "email"}
              onChange={handleInputChange}
            />
            {errors.email && <p style={{ color: "red" }}>{errors.email}</p>}
        </div>
        {/* Request Type */}
        <div>
            <label className="block text-sm font-medium text-gray-700">Request Type</label>
            <select className="mt-1 block w-full border border-stone-300 p-2 rounded-md focus:border-stone-500 focus:ring-2 focus:ring-stone-500"
                    onChange={handleInputChange}
                    name="type"
                    value={mode==="Create" ? formData.type : "type"}>
                <option defaultValue>Select an Option..</option>
                {requestType.map(type => 
                    <option key={requestType.indexOf(type)} value={type.type}>{type.value}</option>
                )}
                {/* <option value={requestType[0].id}>{requestType[0].value}</option>
                <option value={requestType[1].id}>{requestType[1].value}</option>
                <option value={requestType[2].id}>{requestType[2].value}</option> */}
            </select>  
            {errors.type && <p style={{ color: "red" }}>{errors.type}</p>}
        </div>
        {/* Description */}
        <div>
            <label className="block text-sm font-medium text-gray-700">Description</label>
            <textarea
              className="mt-1 block w-full p-2 border border-stone-300 rounded-md focus:ring-stone-500 focus:border-stone-500"
              rows="4"
              placeholder="Brief Description"
              name="description"
              value={mode==="Create" ? formData.description : request.description}
              onChange={handleInputChange}
            ></textarea>
            {errors.description && <p style={{ color: "red" }}>{errors.description}</p>}
        </div>
        {/* Preferred Date/Time */}
        <div>
            <label className="block text-sm font-medium text-gray-700">Preferred Date/Time</label>
            <input
              type="date"
              className="mt-2 block w-full p-2 border border-stone-300 rounded-md focus:ring-stone-600 focus:border-stone-500"
              name="date"
              value={formData.date}
              onChange={handleInputChange}
            />
            {errors.date && <p style={{ color: "red" }}>{errors.date}</p>}
            <input
                type="time"
                className="mt-2 block w-full p-2 border border-stone-300 rounded-md focus:ring-2 focus:ring-stone-500 focus:border-stone-500"
                name="time"
                value={formData.time}
                onChange={handleInputChange}
            />
            {errors.time && <p style={{ color: "red" }}>{errors.time}</p>}
        </div>
        {/* Attachments */}
        <div>
            <label>Attachments</label>
            <input type="file" 
                    className="mt-2 w-full p-2 border border-stone-300 rounded-md focus:ring-2 focus:ring-stone-500 focus:border-stone-500" 
                    onChange={handleFileChange} 
                    id="fileInput" />
        </div>
        {/* Submit */}
        <button
            type="submit"
            className="w-full bg-stone-500 text-white py-2 px-4 rounded-md hover:bg-stone-300"
          >
            Submit
        </button>
        </form>
      </div>
      </>
    );
  }
  