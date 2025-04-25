export default function AboutTeam() {
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
                    About Supervisors and Team Members
                </h2>
                <p className="text-gray-600 text-center max-w-2xl mx-auto">
                    The SHIELD project is guided by experienced mentors and developed by a passionate team of student developers with diverse skill sets.
                    Our collaborative approach ensures innovation, technical precision, and user-centric design.
                </p>

                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-8">
                    {/* Each card remains unchanged */}
                    {[
                        {
                            name: "Dr. Pawan Kumar Chaurasia",
                            role: "Project Supervisor",
                            desc: "Department of Computer Science and Engineering, BBAU, Lucknow, India.",
                            img: "/pc.png",
                            duties: "Supervision, Project administration, Resources, Validation, Writing – review & editing."
                        },
                        {
                            name: "Abhishek Kumar",
                            role: "Group Leader",
                            desc: "B.tech(Computer Engineering) 4th Year BBAU Lucknow",
                            img: "/ak.png",
                            duties: "Data curation, Website Development, Visualization, Writing – review & editing."
                        },
                        {
                            name: "Ishan Dwivedi",
                            role: "Team Member",
                            desc: "B.tech(Computer Engineering) 3rd Year BBAU Lucknow",
                            img: "/id.png",
                            duties: "Conceptualization, Methodology, Software, Investigation, Data curation, Formal analysis, Visualization."
                        },
                        {
                            name: "Shubham Yadav",
                            role: "Team Member",
                            desc: "B.tech(Computer Engineering) 3rd Year BBAU Lucknow",
                            img: "/sy.png",
                            duties: "Software, Investigation, Data curation, Writing – original draft, Writing – review & editing."
                        },
                        {
                            name: "Ankit Baghel",
                            role: "Team Member",
                            desc: "B.tech(Computer Engineering) 3rd Year BBAU Lucknow",
                            img: "/ab.png",
                            duties: "Software, Validation, Writing – review & editing."
                        }
                    ].map(({ name, role, desc, img, duties }, i) => (
                        <div key={i} className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
                            <div className="flex justify-between items-center">
                                <div>
                                    <h3 className="text-xl font-semibold text-gray-800">{name}</h3>
                                    <p className="text-sm text-gray-500">{role}</p>
                                    <p className="text-sm text-gray-500">{desc}</p>
                                </div>
                                <img src={img} alt={name} className="w-16 h-16 rounded-full mt-2" />
                            </div>
                            <p className="mt-4 text-gray-600">{duties}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
