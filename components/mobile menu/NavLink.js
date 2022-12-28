import { motion } from "framer-motion";
import Link from "next/link";
import { menuItem } from "./Variants";

export default function NavLink({ item, onClick, order }) {
  return (
    <motion.div
      variants={menuItem}
      custom={order}
      initial="hidden"
      exit="hidden"
      animate="visible"
      className="w-full py-[0.625rem] text-2xl italic font-bold text-left uppercase"
    >
      <Link href={item.item.link} onClick={onClick}>
        {item.item.text}
      </Link>
    </motion.div>
  );
}
