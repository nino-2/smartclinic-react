"use client";
import React from 'react';



const PersonalInfoStep = ({ formik, onNext }) => {
  const genderOptions = [
    { value: '', label: 'Select Gender' },
    { value: 'male', label: 'Male' },
    { value: 'female', label: 'Female' },
    { value: 'other', label: 'Other' }
  ];
  const levelOptions = [
    { value: '', label: 'Select Level' },
    {value: 'ND I', label: 'ND I'},
    {value: 'ND II', label: 'ND II'},
    {value: 'HND I', label: 'HND I'},
    {value: 'HND II', label: 'HND II'}
  ]
  
  return (
    <div className="p-6">
      <h2 className="text-xl font-semibold text-[#1976D2] mb-6">
        Personal Information
      </h2>
      <div className="grid max-md:grid-cols-1 grid-cols-2 gap-6">
      {/*First Name*/}
       <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">First Name *</label>
          <input
            name="firstname"
            value={formik.values.firstname}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="w-full border py-3 pl-3 rounded-lg border-clinic-neutral-border focus:ring-2 focus:ring-clinic-blue focus:border-transparent outline-none transition-all duration-200"
          />
          {formik.touched.firstname && formik.errors.firstname && (
            <p className="text-red-500 text-sm">{formik.errors.firstname}</p>
          )}
        </div>

        {/*Last Name*/}
       <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Last Name</label>
          <input
            name="lastname"
            value={formik.values.lastname}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="w-full border py-3 pl-3 rounded-lg border-clinic-neutral-border focus:ring-2 focus:ring-clinic-blue focus:border-transparent outline-none transition-all duration-200"
          />
          {formik.touched.lastname && formik.errors.lastname && (
            <p className="text-red-500 text-sm">{formik.errors.lastname}</p>
          )}
        </div>

        {/*Matric No*/}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Matric No</label>
          <input
            name="matric"
            value={formik.values.matric}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="w-full border py-3 pl-3 rounded-lg border-clinic-neutral-border focus:ring-2 focus:ring-clinic-blue focus:border-transparent outline-none transition-all duration-200"
          />
          {formik.touched.matric && formik.errors.matric && (
            <p className="text-red-500 text-sm">{formik.errors.matric}</p>
          )}
        </div>
        
        {/*Department*/}
         <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Department</label>
          <input
            name="department"
            value={formik.values.department}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="w-full border py-3 pl-3 rounded-lg border-clinic-neutral-border focus:ring-2 focus:ring-clinic-blue focus:border-transparent outline-none transition-all duration-200"
          />
          {formik.touched.department && formik.errors.department && (
            <p className="text-red-500 text-sm">{formik.errors.department}</p>
          )}
        </div>
        
        {/*Level*/}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Level</label>
          <select
            name="level"
            value={formik.values.level}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="w-full border py-3 pl-3 rounded-lg border-clinic-neutral-border focus:ring-2 focus:ring-clinic-blue focus:border-transparent outline-none transition-all duration-200"
          >
            {levelOptions.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
          {formik.touched.level && formik.errors.level && (
            <p className="text-red-500 text-sm">{formik.errors.level}</p>
          )}
        </div>

        {/*Gender*/}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Gender</label>
          <select
            name="gender"
            value={formik.values.gender}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="w-full border py-3 pl-3 rounded-lg border-clinic-neutral-border focus:ring-2 focus:ring-clinic-blue focus:border-transparent outline-none transition-all duration-200"
          >
            {genderOptions.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
          {formik.touched.gender && formik.errors.gender && (
            <p className="text-red-500 text-sm">{formik.errors.gender}</p>
          )}
        </div>

        {/*Phone Number*/}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
          <input
            name="phonenumber"
            type="tel"
            value={formik.values.phonenumber}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="w-full border py-3 pl-3 rounded-lg border-clinic-neutral-border focus:ring-2 focus:ring-clinic-blue focus:border-transparent outline-none transition-all duration-200"
          />
          {formik.touched.phonenumber && formik.errors.phonenumber && (
            <p className="text-red-500 text-sm">{formik.errors.phonenumber}</p>
          )}
        </div>

       

      </div>
  
      <div className="flex justify-end mt-8">
        <button
          className="bg-[#1976D2] text-white px-8 py-3 rounded-lg font-medium transition-all duration-200 hover:bg-[#1565C0] disabled:bg-[#E0E0E0] disabled:text-[#999] cursor-pointer"
          onClick={onNext}
        >
          Next Step
        </button>
      </div>
    </div>
  );
}

export default PersonalInfoStep;


