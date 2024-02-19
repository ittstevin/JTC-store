import Container from "../Container";
import FooterList from "./FooterList";
import Link from "next/link";
import { MdFacebook } from "react-icons/md";
import { AiFillTwitterCircle, AiFillInstagram, AiFillYoutube } from "react-icons/ai";

const Footer = () => {
    return ( 
    <footer className="bg-slate-700 text-slate-200 text-sm mt-16">
        <Container>
            <div className="flex flex-col md:flex-row justify-between pt-16 pb-8">
                <FooterList>
                    <h3 className="text-base font-bold mb-2">Shop Categories</h3>
                    <Link href="#">Phones</Link>
                    <Link href="#">Laptops</Link>
                    <Link href="#">Desktops</Link>
                    <Link href="#">Watches</Link>
                    <Link href="#">TVs</Link>
                    <Link href="#">Accessories</Link>
                </FooterList>

                <FooterList>
                    <h3 className="text-base font-bold mb-2">Customer Service</h3>

                    <a href="tel:+254790817497">phone</a>
                    <a href="https://wa.me/254790817497">WhatsApp</a>
                    <a href="mailto:tevingichoya@gmail.com">email</a>
                </FooterList>

                <FooterList>
                    <h3 className="text-base font-bold mb-2">Connect With Us</h3>
                    <div className="flex gap-2">
                        <Link href="#" target="_blank" rel="noopener noreferrer"><MdFacebook size={24}/></Link>
                        <Link href="#" target="_blank" rel="noopener noreferrer"><AiFillTwitterCircle size={24}/></Link>
                        <Link href="#" target="_blank" rel="noopener noreferrer"><AiFillInstagram size={24}/></Link>
                        <Link href="#" target="_blank" rel="noopener noreferrer"><AiFillYoutube size={24}/></Link>
                    </div>

                </FooterList>

                <div className="hidden md:block">
                    <iframe src="https://www.google.com/maps/place/Kiambu/@-1.1719997,36.8225275,15.25z/data=!4m6!3m5!1s0x182f3c6280decd87:0x1a1a1908e6fd13e9!8m2!3d-1.1748105!4d36.8304102!16zL20vMGM2eHdf?hl=en&entry=ttu" width="400" height="300" allowFullScreen="" aria-hidden="false" tabIndex="0"></iframe>
                </div>
            </div>
            <p>&copy; {new Date().getFullYear()} JTC. All Rights reserved</p>
        </Container>
    </footer> 
    );
}
 
export default Footer;
