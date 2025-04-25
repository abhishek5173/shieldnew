export default function Papers() {
    return (
        <section id="about-team" className="relative bg-gray-50 px-4 py-8 overflow-hidden">
            {/* Centered Faded Background Image */}
            <img
                src="/bbaulns.png" // Replace with your desired background image path
                alt="Background"
                className="absolute top-1/2 left-1/2 w-auto h-[400px] sm:h-[500px] transform -translate-x-1/2 -translate-y-1/2 object-contain opacity-20 z-0"
            />

            {/* Foreground Content */}
            <div className="relative z-10 space-y-8">
                <h2 className="text-3xl font-bold text-center text-gray-800 border-b-2 pb-4">
                   Communicated Papers 
                </h2>
                <p className="text-gray-600 text-center max-w-2xl mx-auto">
                    
                </p>

                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-8">
                    {/* Each card remains unchanged */}
                    {[
                        {
                            name: "Data-Driven Electricity Load Prediction for Households And Small Indsutries: SHIELD Model Approach",
                            duties: "Communicated to Sustainable Computing: Informatics and Systems, Elsevier, Manuscript ID: SUSCOM-D-25-00762, 2025.ISSN: 2210-5379, Impact Factor: 4.5"
                        },
                        {
                            name: "Predicting Energy Load and Demand: SHIELD Optimization Algorithm Approach",
                           
                            duties: "This paper has not been communicated to any journal or conference, as it contains novel methodologies with high patent potential. We, authors are currently exploring intellectual property protection prior to public disclosure"
                        },
                        {
                            name: "A Review Of AI-Based Load Forecasting and Optimization in Smart Energy Systems: With Case Insights from the SHIELD Framework",
                           
                            duties: "In Proc. 2025 Third Int. Conf. on Networks, Multimedia and Information Technology (NMITCON), Nitte Meenakshi Institute of Technology, 2025. To be published in the IEEE Xplore Digital Library"
                        },
                        {
                            name: "Machine Learning Driven Energy Forecasting and Optimization: A Comprehensive Study of the SHIELD framework",
                            
                            duties: "Communicated for inclusion in Artificial Intelligence for Formulation Development: Innovations and Future Directions, Bentham Science, Scopus-indexed, 2025"
                        }
            
                    ].map(({ name, duties }, i) => (
                        <div key={i} className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
                            <div className="flex justify-between items-center">
                                <div>
                                    <h3 className="text-xl font-semibold text-gray-800">{name}</h3>
                                   
                                </div>
                            </div>
                            <p className="mt-4 text-gray-600">{duties}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
