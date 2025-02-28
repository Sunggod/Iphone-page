import { motion } from "framer-motion";
interface AnimatedMobileMenuProps {
    isOpen: boolean;
    links: { name: string; href: string }[];
  }
  
const AnimatedMobileMenu: React.FC<AnimatedMobileMenuProps> = ({ isOpen, links }) => {
    return (
      <motion.div
        className="absolute top-full left-0 w-full bg-black bg-opacity-90 backdrop-blur-md md:hidden overflow-hidden"
        initial={{ height: 0 }}
        animate={{ height: isOpen ? 'auto' : 0 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
      >
        <motion.div
          className="py-4 px-6 flex flex-col space-y-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: isOpen ? 1 : 0 }}
          transition={{ duration: 0.2, delay: isOpen ? 0.2 : 0 }}
        >
          {links.map((link, i) => (
            <motion.a
              key={i}
              href={link.href}
              className="text-white py-2 border-b border-gray-800"
              whileHover={{ x: 5 }}
              whileTap={{ scale: 0.98 }}
            >
              {link.name}
            </motion.a>
          ))}
        </motion.div>
      </motion.div>
    );
  };
  export default AnimatedMobileMenu