import Link from "next/link";
import Container from "../Container";
import { Bebas_Neue } from "next/font/google";
import CartCount from "./CartCount";
import UserMenu from "./UserMenu";
import { getCurrentUser } from "@/actions/getCurrentUser";

const bebasNeue = Bebas_Neue({subsets: ['latin'], weight:['400']});

const Navbar = async () => {

    const currentUser = await getCurrentUser();

    return (
    <div className="
    sticky
    top-0 
    w-full 
    bg-slate-200 
    z-30 
    shadow-sm
    ">
        <div className="py-4 border-b-[1px]">
            <Container>
                <div className="
                flex
                items-center
                justify-between
                gap-3
                md:gap-0
                ">
                    <Link href="/" className={`${bebasNeue.className} font-bold text-2xl`}>
                        JTC-STORE
                    </Link>
                    <div className="hidden md:block">search</div>
                    <div className="
                    flex
                    items-center
                    gap-8
                    md:gap-12
                    ">
                        <CartCount/>
                        <UserMenu currentUser={currentUser} />
                    </div>
                </div>
            </Container>
        </div>
    </div>
    );
}
 
export default Navbar;