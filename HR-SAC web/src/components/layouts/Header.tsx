import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Menu } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const navItems = [
  { name: 'Home', path: '/' },
  { name: 'About', path: '/about' },
  { name: 'Capabilities', path: '/capabilities' },
  { name: 'Case Studies', path: '/case-studies' },
  { name: 'Insights', path: '/insights' },
  { name: 'Contact', path: '/contact' },
];

export function Header() {
  const location = useLocation();
  const { user, profile, signOut } = useAuth();

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <header className="sticky top-0 z-50 w-full glass-header">
      <div className="container flex h-16 items-center justify-between">
        <Link to="/" className="flex items-center space-x-2">
          <div className="flex items-center space-x-3">
            <img 
              src="/images/logo/HR-SAC-logo.png" 
              alt="HR-SAC Logo" 
              className="w-10 h-10 rounded-lg object-cover"
            />
            <span className="text-2xl font-bold text-white">HR-SAC</span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`text-sm font-medium transition-colors hover:text-white ${
                isActive(item.path) ? 'text-white' : 'text-gray-300'
              }`}
            >
              {item.name}
            </Link>
          ))}
        </nav>

        {/* Desktop Auth */}
        <div className="hidden md:flex items-center space-x-4">
          {user ? (
            <>
              {profile?.role === 'admin' && (
                <Link to="/admin">
                  <Button size="sm" className="border-2 border-white bg-white/10 hover:bg-white text-white hover:text-black transition-all" asChild>
                    <span>Admin</span>
                  </Button>
                </Link>
              )}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button size="sm" className="border-2 border-white bg-white/10 hover:bg-white text-white hover:text-black transition-all">
                    User Panel
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-80 p-4">
                  <div className="space-y-4">
                    <div className="border-b border-border pb-3">
                      <h3 className="font-bold text-lg mb-1">Welcome to HR-SAC! 👋</h3>
                      <p className="text-sm text-muted-foreground">{profile?.email}</p>
                    </div>
                    <div className="space-y-2">
                      <p className="text-sm">
                        Thank you for joining HR-SAC Software Company! We're excited to help transform your digital vision into reality.
                      </p>
                      <p className="text-sm font-semibold text-primary">
                        Ready to start your project with us?
                      </p>
                    </div>
                    <div className="flex flex-col gap-2 pt-2 border-t border-border">
                      <Link to="/contact" className="w-full">
                        <Button size="sm" className="w-full bg-primary hover:bg-primary/90 text-black" asChild>
                          <span>Start a Project</span>
                        </Button>
                      </Link>
                      <Button 
                        size="sm" 
                        variant="outline" 
                        className="w-full"
                        onClick={() => signOut()}
                      >
                        Sign Out
                      </Button>
                    </div>
                  </div>
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          ) : (
            <Link to="/login">
              <Button size="sm" className="bg-white text-black hover:bg-gray-200" asChild>
                <span>Sign In</span>
              </Button>
            </Link>
          )}
        </div>

        {/* Mobile Navigation */}
        <Sheet>
          <SheetTrigger asChild className="md:hidden">
            <Button variant="ghost" size="icon" className="text-white hover:bg-white/10">
              <Menu className="h-6 w-6" />
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-[300px]">
            <div className="flex flex-col space-y-4 mt-8">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`text-lg font-medium transition-colors hover:text-primary ${
                    isActive(item.path) ? 'text-primary' : 'text-foreground/60'
                  }`}
                >
                  {item.name}
                </Link>
              ))}
              <div className="pt-4 border-t border-border">
                {user ? (
                  <div className="space-y-4">
                    <div className="bg-accent/10 p-4 rounded-lg space-y-3">
                      <div className="border-b border-border pb-2">
                        <h3 className="font-bold text-base mb-1">Welcome to HR-SAC! 👋</h3>
                        <p className="text-xs text-muted-foreground">{profile?.email}</p>
                      </div>
                      <div className="space-y-2">
                        <p className="text-xs">
                          Thank you for joining HR-SAC Software Company! We're excited to help transform your digital vision into reality.
                        </p>
                        <p className="text-xs font-semibold text-primary">
                          Ready to start your project with us?
                        </p>
                      </div>
                    </div>
                    {profile?.role === 'admin' && (
                      <Link to="/admin" className="block">
                        <Button variant="outline" className="w-full" asChild>
                          <span>Admin Panel</span>
                        </Button>
                      </Link>
                    )}
                    <Link to="/contact" className="block">
                      <Button className="w-full bg-primary hover:bg-primary/90 text-black" asChild>
                        <span>Start a Project</span>
                      </Button>
                    </Link>
                    <Button
                      variant="outline"
                      className="w-full"
                      onClick={() => signOut()}
                    >
                      Sign Out
                    </Button>
                  </div>
                ) : (
                  <Link to="/login">
                    <Button className="w-full bg-primary hover:bg-primary/90" asChild>
                      <span>Sign In</span>
                    </Button>
                  </Link>
                )}
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
