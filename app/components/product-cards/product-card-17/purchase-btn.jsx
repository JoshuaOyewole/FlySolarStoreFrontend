import Link from "next/link";

function PurchaseBtn({ link }) {
  if (!link) {
    return null;
  }

  return (
    <Link
      href={link}
      className="bg-[#ea580c] h-9.5 text-white! px-8 w-[90px]  py-2 rounded-full lg:mt-2 flex justify-center items-center  hover:bg-[#c2410c] transition-colors"
    >
      Buy now
    </Link>
  );
}

export default PurchaseBtn;
