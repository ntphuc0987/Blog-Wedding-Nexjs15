import { buttonVariants } from "@/components/ui/button"
import Link from "next/link"
import { RegisterLink, LoginLink } from "@kinde-oss/kinde-auth-nextjs/components";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

const Navbar = async () => {

    const { getUser } = getKindeServerSession();
    const user = await getUser();

    return (
        <nav className='py-5 flex items-center justify-between'>
            <div className="flex items-center gap-6">
                <Link href="/">
                    <h1 className="text-3xl font-semibold">
                        BLog<span className="text-blue-500">Marshal</span>
                    </h1>
                </Link>

                <div className="hidden sm:flex items-center gap-6">
                    <Link href={"/"} className="text-sm font-medium hover:text-blue-500 transition-colors duration-200">
                        Home
                    </Link>
                    <Link href={"/dashboard"} className="text-sm font-medium hover:text-blue-500 transition-colors duration-200">
                        Dashboard
                    </Link>
                </div>
            </div>

            {user ? (
                <div>
                    <p>{user.given_name}</p>
                </div>
            ) : (
                <div className="flex items-center gap-4">
                    <LoginLink className={buttonVariants()} postLoginRedirectURL="/dashboard">
                        Login
                    </LoginLink>
                    <RegisterLink className={buttonVariants({ variant: "outline" })} postLoginRedirectURL="/welcome">
                        Sign up
                    </RegisterLink>
                </div>
            )}

        </nav>
    )
}

export default Navbar