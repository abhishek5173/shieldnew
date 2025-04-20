export default function AboutTeam() {
    return (
        <section id="about-team" className="space-y-8 px-4 py-8 bg-gray-50">
            <h2 className="text-3xl font-bold text-center text-gray-800 border-b-2 pb-4">
                About Supervisors and Team Members
            </h2>
            <p className="text-gray-600 text-center max-w-2xl mx-auto">
                The SHIELD project is guided by experienced mentors and developed by a passionate team of student developers with diverse skill sets.
                Our collaborative approach ensures innovation, technical precision, and user-centric design.
            </p>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-8">
                <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
                    <div className=" flex justify-between items-center"><div><h3 className="text-xl font-semibold text-gray-800">Dr. Pawan Kumar Chaurasia</h3>
                    <p className="text-sm text-gray-500">Project Supervisor</p></div>
                    <img src="/pc.png" className="w-16 h-16 rounded-full mt-2" alt="Pawan Chaurasia"/>
                    </div>
                    <p className="mt-4 text-gray-600">
                    Supervision, Project administration,
                    Resources, Validation, Writing – review & editing.
                    </p>
                </div>

                <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
                    <div className="flex justify-between items-center">
                        <div><h3 className="text-xl font-semibold text-gray-800">Abhishek Kumar</h3>
                        <p className="text-sm text-gray-500">Group Leader</p></div>
                        <img src="/ak.png" alt="Abhishek Kumar" className="w-16 h-16 rounded-full mt-2" />
                    </div>
                    <p className="mt-4 text-gray-600">
                    Data curation, Website Development, Visualization, Writing –
                    review & editing.
                    </p>
                </div>

                <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
                    <div className="flex justify-between items-center">
                        <div>
                        <h3 className="text-xl font-semibold text-gray-800">Ishan Dwivedi</h3>
                        <p className="text-sm text-gray-500">Team Member</p>
                        </div>
                        <img src="/id.png" alt="Ishan Dwivedi" className="w-16 h-16 rounded-full mt-2" />
                    </div>
                    <p className="mt-4 text-gray-600">
                    Conceptualization, Methodology, Software,
                    Investigation, Data curation, Formal analysis, Visualization.
                    </p>
                </div>

                <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
                   <div className="flex justify-between items-center">
                    <div> <h3 className="text-xl font-semibold text-gray-800">Shubham Yadav</h3>
                    <p className="text-sm text-gray-500">Team Member</p></div>
                    <img src="/sy.png" alt="Shubham Yadav" className="w-16 h-16 rounded-full mt-2"/>
                   </div>
                    <p className="mt-4 text-gray-600">
                    Software, Investigation, Data curation,
                    Writing – original draft, Writing – review & editing.
                    </p>
                </div>

                <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
                    <div className="flex justify-between items-center">
                        <div><h3 className="text-xl font-semibold text-gray-800">Ankit Baghel</h3>
                        <p className="text-sm text-gray-500">Team Member</p></div>
                        <img src="/ab.png" alt="Ankit Baghel" className="w-16 h-16 rounded-full mt-2" />
                    </div>
                    <p className="mt-4 text-gray-600">
                    Software, Validation, Writing – review &
                    editing.
                    </p>
                </div>
            </div>
        </section>
    );
}
