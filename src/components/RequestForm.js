'use client';
import { useState } from "react";

import Header from "@/components/Header";

export default function RequestForm({type}) {
    const [selectedFile, setSelectedFile] = useState(null);

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
    
    const handleSubmit = (e) => {
        e.preventDefault();
        if (validateForm()) {
          alert("Request submitted successfully!");
          // API call
        }
    };

    return (
    <>
    <Header name='Irushi'/>
    <div className="pt-20 px-20">
        <h2 className="text-xl font-semibold mb-4">{type} Request</h2>
        <form className="space-y-4" onSubmit={handleSubmit}>
        {/* Name */}
        <div>
            <label className="block text-sm font-medium text-gray-700">Name</label>
            <input
              type="text"
              className="mt-1 block w-full p-2 border border-stone-300 rounded-md focus:ring-stone-600 focus:border-stone-500"
              placeholder="Your Name"
              name="name"
              value={formData.name}
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
              value={formData.email}
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
                    value={formData.type}>
                <option defaultValue>Select an Option..</option>
                <option value="option1">Birthday Greeting Video</option>
                <option value="option2">Product Marketing</option>
                <option value="option3">Event Appearance</option>
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
              value={formData.description}
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
  