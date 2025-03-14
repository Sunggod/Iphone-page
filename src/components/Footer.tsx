import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { motion } from "framer-motion"
import { Apple, BadgePoundSterlingIcon, BaggageClaim, ChevronRight, Home, Package, PoundSterling } from "lucide-react"



const Footer = () => {
    return (
        <footer className="sticky bottom-0 left-0 w-full bg-black text-white flex flex-col justify-between items-center py-3 px-4 shadow-sm overflow-hidden">
            <div className="flex gap-5 items-center justify-center relative pt-10 pb-10 container">
                <div className="w-64 h-auto flex flex-col items-center gap-36">
                    <img src="footerPhone1.png" alt="phone1" />
                    <ChevronRight className="h-3 w-3 text-blue-300" />
                </div>
                <div className="pb-40 flex px-10">
                    <span className="text-xl text-slate-300 hover:text-white  transition-al px-8">
                        IPhone 7
                    </span>
                    <div className="pt-10">
                        <ChevronRight className="h-3 w-3 text-blue-400" />
                    </div>
                </div>
                <div className="w-52 h-auto flex flex-col items-center gap-36">
                    <img src="footerPhone2.png" alt="phone2" />
                    <ChevronRight className="h-3 w-3 text-blue-300" />

                </div>

            </div>
            <span className="border h-0.5 w-[980px]  opacity-10 border-white" />

            <div className="flex relative pt-10">
                <div className="flex flex-col items-center text-gray-400 hover:text-white pt-10 cursor-pointer">
                    <Package className="w-8 h-8" />
                    <div className="ml-16">
                        <ChevronRight className="h-3 w-3 mx-12 my-20 text-blue-300" />
                    </div>
                </div>
                <div className="flex flex-col items-center text-gray-400 hover:text-white pt-10 cursor-pointer">
                    <Apple className="w-8 h-8" />
                    <div className="ml-16">
                        <ChevronRight className="h-3 w-3 mx-12  my-12 text-blue-300" />
                    </div>
                </div>
                <div className="flex flex-col items-center text-gray-400 hover:text-white pt-10 cursor-pointer">
                    <BadgePoundSterlingIcon className="w-8 h-8" />

                    <div className="ml-16">
                        <ChevronRight className="h-3 w-3 mx-12 my-12 text-blue-300" />
                    </div>
                </div>
                <div className="flex flex-col items-center text-gray-400 hover:text-white pt-10 cursor-pointer">
                    <BaggageClaim className="w-8 h-8" />

                    <div className="ml-16">
                        <ChevronRight className="h-3 w-3 mx-12 my-20 text-blue-300" />
                    </div>
                </div>

            </div>
            <span className=" h-0.5 w-[980px]  opacity-10 bg-white" />
            <div className="relative h-10 w-[980px] pb-40">
                <div>
                    <span className=" h-0.5 w-[980px] mt-52 opacity-10 bg-white" />
                </div>
                <div className="flex mt-2 gap-10 ml-10 pt-6">
                    <ChevronRight className="h-8 w-8 text-gray-500"/>
                    <ChevronRight className="h-8 w-8 text-gray-500"/>

                </div>
            </div>
            <div className="flex flex-col pb-10">
            <span className=" h-0.5 w-[980px] mt-52 opacity-10 bg-white" />

            <div className="ml-[900px]  justify-items-end items-end pt-5 ">
                <img className="h-5 w-5" src="pais.png" alt="" />
            </div>
            </div>
        </footer>
    )
}   
export default Footer