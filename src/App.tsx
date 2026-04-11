import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import AdminPortal from "./components/AdminPortal";
import { ProjectDetailsPage } from "./components/admin-portal/ProjectDetailsPage";
import AuthPage from "./components/Authpage";
import ClientPortal from "./components/Clientportal";

const queryClient = new QueryClient();

// Protected Route Component
const ProtectedRoute = ({ children, requiredRole }: { children: JSX.Element; requiredRole?: 'admin' | 'client' }) => {
    const authUser = localStorage.getItem("authUser");
    
    if (!authUser) {
        return <Navigate to="/auth-page" replace />;
    }
    
    const user = JSON.parse(authUser);
    
    if (requiredRole && user.role !== requiredRole) {
        return <Navigate to={user.role === 'admin' ? "/admin-portal" : "/client-portal"} replace />;
    }
    
    return children;
};

const App = () => (
    <QueryClientProvider client={queryClient}>
        <TooltipProvider>
            <Toaster />
            <Sonner />
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Index />} />
                    <Route path="/auth-page" element={<AuthPage />} />
                    <Route 
                        path="/client-portal/*" 
                        element={
                            <ProtectedRoute requiredRole="client">
                                <ClientPortal />
                            </ProtectedRoute>
                        } 
                    />
                    <Route 
                        path="/admin-portal" 
                        element={
                            <ProtectedRoute requiredRole="admin">
                                <AdminPortal />
                            </ProtectedRoute>
                        } 
                    />
                    <Route 
                        path="/admin-portal/project/:id" 
                        element={
                            <ProtectedRoute requiredRole="admin">
                                <ProjectDetailsPage />
                            </ProtectedRoute>
                        } 
                    />
                    <Route path="*" element={<NotFound />} />
                </Routes>
            </BrowserRouter>
        </TooltipProvider>
    </QueryClientProvider>
);

export default App;