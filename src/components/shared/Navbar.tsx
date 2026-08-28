
import { Button } from "@/components/ui/button";
import Logo from "./Logo";
import NavLink from "./NavLink";
import MobileNav from "./MobileNav";

const NAV_ITEMS = [
  { label: "Home", href: "/" },
  { label: "Explore", href: "/explore" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
];

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center px-4">
        
        {/* Desktop View */}
        <div className="hidden md:flex items-center justify-between w-full">
          <Logo/>

          <nav className="flex items-center space-x-6">
            {NAV_ITEMS.map((item) => (
              <NavLink key={item.href} href={item.href}>
                {item.label}
              </NavLink>
            ))}
          </nav>

          <div className="flex items-center space-x-3">
            <Button variant="ghost" asChild>
              <NavLink href="/login" className="text-foreground hover:text-primary">
                Login
              </NavLink>
            </Button>
            <Button asChild>
              <NavLink href="/register" className="text-primary-foreground hover:text-primary-foreground">
                Register
              </NavLink>
            </Button>
          </div>
        </div>

        {/* Mobile View */}
        <MobileNav items={NAV_ITEMS} />

      </div>
    </header>
  );
}