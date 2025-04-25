export default function AboutUPCST() {
    return (
        <section
            id="about-upcst"
            className="relative bg-white shadow-md rounded-lg p-4 sm:p-6 overflow-hidden"
        >
            {/* Background Image */}
            <img
                src="/upcst.png"
                alt="Background UPCST"
                 className="absolute top-1/2 left-1/2 w-auto h-100 transform -translate-x-1/2 -translate-y-1/2 object-contain opacity-30 z-0"
            />

            {/* Content on top of image */}
            <div className="relative z-10 space-y-4 sm:space-y-6">
                <h2 className="text-2xl sm:text-3xl font-bold border-b-2 pb-2 sm:pb-3">
                    About UPCST
                </h2>

                <p className="text-gray-800 text-sm sm:text-base leading-relaxed">
                    The Government of Uttar Pradesh in October , 1972 constituted a Working group on the Role and Development of Science and Technology in relation to the Fifth Five Year Plan of the State. This Working Group was charged with the task of examining inputs and infrastructure available and required for growth of Science and Technology and its application to the process of development for identifying problems and programs for research and development, and for preparing an integrated plan for action for development and application of Science and Technology in the State during the Fifth Plan period.

                    The Concept of Research and Development as projected in the "Approach to the Science and Technology Plan" prepared by the National Committee on Science and Technology was found to be very wide ranging. To cover it, one of the main recommendation of the Working group was the need for establishing a State Council of Science and Technology with a Department of Science and Technology for Administrative support, which was bound to take up the recommendations of this Working Group to push forward all the schemes and activities which were included in the Fifth Plan.

                    This recommendation of the Working Group provided the case for establishing the "Council of Science and Technology,U.P." and it was established on 1st May' 1975 by the Government of Uttar Pradesh with the Department of Science and Environment for administrative support. The Council of Science and Technology,U.P. (CST,U.P.) was given an autonomous status as a registered body under Societies Registration Act, 1860.
                </p>

                <div className="flex justify-center items-center mt-4">
                    <img
                        src="/about.png"
                        alt="UPCST"
                        className="w-full sm:w-2/3 h-auto mt-2 rounded-md"
                    />
                </div>
            </div>
        </section>
    );
}
