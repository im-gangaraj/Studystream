import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { useAuth } from "@/hooks/useAuth";
import { GraduationCap, LogOut, User, BookOpen, Shield, UserCheck } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";

export function Navbar() {
  const { user, isAuthenticated, logout, switchRole } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const handleRoleSwitch = (newRole: 'admin' | 'student') => {
    switchRole(newRole);
    toast.success(`Switched to ${newRole} mode`);
    navigate(newRole === 'admin' ? '/admin' : '/dashboard');
  };

  return (
    <nav className="sticky top-0 z-50 w-full glass border-b">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <Link to="/" className="flex items-center space-x-2">
            <GraduationCap className="h-8 w-8 text-primary" />
            <span className="text-xl font-bold gradient-text">EduLearn</span>
          </Link>

          <div className="flex items-center space-x-6">
            <Link to="/courses" className="text-foreground/80 hover:text-foreground transition-colors">
              Courses
            </Link>
            {isAuthenticated && (
              <Link 
                to={user?.role === 'admin' ? '/admin' : '/dashboard'} 
                className="text-foreground/80 hover:text-foreground transition-colors"
              >
                Dashboard
              </Link>
            )}
            
            <div className="flex items-center space-x-4">
              <ThemeToggle />
              
              {isAuthenticated ? (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="rounded-full">
                      <User className="h-5 w-5" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-56 glass">
                    <DropdownMenuLabel>
                      <div className="space-y-1">
                        <p className="font-medium">{user?.name}</p>
                        <p className="text-xs text-muted-foreground">{user?.email}</p>
                        <Badge variant={user?.role === 'admin' ? 'default' : 'secondary'} className="mt-1">
                          {user?.role === 'admin' ? (
                            <>
                              <Shield className="mr-1 h-3 w-3" />
                              Admin
                            </>
                          ) : (
                            <>
                              <UserCheck className="mr-1 h-3 w-3" />
                              Student
                            </>
                          )}
                        </Badge>
                      </div>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    
                    {/* Role Switcher */}
                    <DropdownMenuLabel className="text-xs text-muted-foreground">Switch Role</DropdownMenuLabel>
                    <DropdownMenuItem 
                      onClick={() => handleRoleSwitch('admin')}
                      disabled={user?.role === 'admin'}
                    >
                      <Shield className="mr-2 h-4 w-4" />
                      Admin Mode
                      {user?.role === 'admin' && <span className="ml-auto text-xs">✓</span>}
                    </DropdownMenuItem>
                    <DropdownMenuItem 
                      onClick={() => handleRoleSwitch('student')}
                      disabled={user?.role === 'student'}
                    >
                      <UserCheck className="mr-2 h-4 w-4" />
                      Student Mode
                      {user?.role === 'student' && <span className="ml-auto text-xs">✓</span>}
                    </DropdownMenuItem>
                    
                    <DropdownMenuSeparator />
                    
                    {/* Role-based options */}
                    {user?.role === 'admin' ? (
                      <>
                        <DropdownMenuItem onClick={() => navigate('/admin')}>
                          <Shield className="mr-2 h-4 w-4" />
                          Admin Dashboard
                        </DropdownMenuItem>
                      </>
                    ) : (
                      <>
                        <DropdownMenuItem onClick={() => navigate('/dashboard')}>
                          <BookOpen className="mr-2 h-4 w-4" />
                          My Dashboard
                        </DropdownMenuItem>
                      </>
                    )}
                    
                    <DropdownMenuItem onClick={() => navigate('/profile')}>
                      <User className="mr-2 h-4 w-4" />
                      Profile
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={handleLogout}>
                      <LogOut className="mr-2 h-4 w-4" />
                      Logout
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <div className="flex items-center space-x-2">
                  <Button variant="ghost" onClick={() => navigate('/login')}>
                    Login
                  </Button>
                  <Button onClick={() => navigate('/register')} className="bg-gradient-to-r from-primary to-secondary hover:opacity-90">
                    Sign Up
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}