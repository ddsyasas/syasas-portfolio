"use client";

import React from 'react';

const Qualifications = () => {
  const education = [
    {
      title: "BSc in Engineering Physics",
      institution: "University of Colombo - Faculty of Science",
      year: "2022",
      description: "Focused on advanced physics concepts and engineering principles",
      status: "completed"
    },
    {
      title: "MSc in Physics",
      institution: "University of Bologna - Department of Physics and Astronomy",
      year: "In Progress",
      description: "Specializing in Material Physics and Nanosciences",
      status: "ongoing"
    }
  ];

  const certifications = [
    {
      title: "Google Analytics Certification",
      institution: "Google",
      year: "2023"
    },
    {
      title: "SEO Certification",
      institution: "HubSpot Academy",
      year: "2023"
    },
    {
      title: "Digital Marketing Specialization",
      institution: "Coursera",
      year: "2022"
    }
  ];

  return (
    <section id="qualifications" className="py-20 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Qualifications
          </h2>
          <div className="w-16 h-1 bg-blue-600 mx-auto"></div>
        </div>
        
        <div className="grid lg:grid-cols-2 gap-12">
          <div>
            <h3 className="text-2xl font-bold text-foreground mb-8">Education</h3>
            <div className="space-y-6">
              {education.map((edu, index) => (
                <div 
                  key={index}
                  className="bg-card p-6 rounded-lg border border-border/50 shadow-lg hover:scale-105 hover:shadow-xl cursor-pointer transition-all duration-300"
                >
                  <div className="flex justify-between items-start mb-4">
                    <h4 className="text-xl font-semibold text-foreground">{edu.title}</h4>
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                      edu.status === 'ongoing' 
                        ? 'bg-blue-600 text-white' 
                        : 'bg-blue-600 text-white'
                    }`}>
                      {edu.year}
                    </span>
                  </div>
                  <p className="text-blue-300 mb-3">{edu.institution}</p>
                  <p className="text-muted-foreground">{edu.description}</p>
                </div>
              ))}
            </div>
          </div>
          
          <div>
            <h3 className="text-2xl font-bold text-foreground mb-8">Other Qualification</h3>
            <div className="space-y-6">
              <div className="bg-card p-6 rounded-lg border border-border/50 shadow-lg hover:scale-105 hover:shadow-xl cursor-pointer transition-all duration-300">
                <div className="flex justify-between items-start mb-2">
                  <h4 className="text-xl font-semibold text-foreground">CBI.ATTRACT, Design Thinking and Tech-Driven Innovation</h4>
                  <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                    2024
                  </span>
                </div>
                <p className="text-blue-300 mb-1">University of Bologna in Italy</p>
                <p className="text-blue-300 mb-1">CERN IdeaSquare in Meyrin, Switzerland</p>
                <p className="text-muted-foreground mb-1">Grade: 30 and lode</p>
                <p className="text-muted-foreground">
                  The interdisciplinary CBI.ATTRACT innovation program focused on translating cutting-edge imaging technologies into societal solutions. Collaborated in a Design Thinking team to co-develop a radiographic diagnostic solution for early detection of Xylella in olive trees. Collaborated with CERN researchers, agronomists, and partner institutions (Geneva University Hospitals, FBK) through a human-centered innovation journey, culminating in a public final report and prototype presentation.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Qualifications; 