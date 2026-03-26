import { useEffect, useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Navigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { getAllProfiles, updateProfile, getContactSubmissions } from '@/db/api';
import type { Profile, ContactSubmission } from '@/types';
import { toast } from 'sonner';
import { Users, Mail, Shield } from 'lucide-react';

export default function AdminPage() {
  const { profile } = useAuth();
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [submissions, setSubmissions] = useState<ContactSubmission[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [profilesData, submissionsData] = await Promise.all([
          getAllProfiles(),
          getContactSubmissions(),
        ]);
        setProfiles(profilesData);
        setSubmissions(submissionsData);
      } catch (error) {
        console.error('Error fetching admin data:', error);
        toast.error('Failed to load admin data');
      } finally {
        setIsLoading(false);
      }
    };

    if (profile?.role === 'admin') {
      fetchData();
    }
  }, [profile]);

  const handleRoleChange = async (userId: string, newRole: 'user' | 'admin') => {
    try {
      await updateProfile(userId, { role: newRole });
      setProfiles(profiles.map(p => p.id === userId ? { ...p, role: newRole } : p));
      toast.success('User role updated successfully');
    } catch (error) {
      console.error('Error updating role:', error);
      toast.error('Failed to update user role');
    }
  };

  if (!profile) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (profile.role !== 'admin') {
    return <Navigate to="/" replace />;
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="container py-12">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2">
          Admin <span className="gradient-text">Dashboard</span>
        </h1>
        <p className="text-muted-foreground">Manage users and view contact submissions</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card className="glass-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Users</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{profiles.length}</div>
          </CardContent>
        </Card>

        <Card className="glass-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Contact Submissions</CardTitle>
            <Mail className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{submissions.length}</div>
          </CardContent>
        </Card>

        <Card className="glass-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Admins</CardTitle>
            <Shield className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {profiles.filter(p => p.role === 'admin').length}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* User Management */}
      <Card className="glass-card mb-8">
        <CardHeader>
          <CardTitle>User Management</CardTitle>
          <CardDescription>Manage user roles and permissions</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Email</TableHead>
                <TableHead>Phone</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Created At</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {profiles.map((user: Profile) => (
                <TableRow key={user.id}>
                  <TableCell>{user.email || 'N/A'}</TableCell>
                  <TableCell>{user.phone || 'N/A'}</TableCell>
                  <TableCell>
                    <Badge variant={user.role === 'admin' ? 'default' : 'secondary'}>
                      {user.role}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    {new Date(user.created_at).toLocaleDateString()}
                  </TableCell>
                  <TableCell>
                    {user.id !== profile.id && (
                      <Select
                        value={user.role}
                        onValueChange={(value: 'user' | 'admin') =>
                          handleRoleChange(user.id, value)
                        }
                      >
                        <SelectTrigger className="w-[120px]">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="user">User</SelectItem>
                          <SelectItem value="admin">Admin</SelectItem>
                        </SelectContent>
                      </Select>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Contact Submissions */}
      <Card className="glass-card">
        <CardHeader>
          <CardTitle>Contact Submissions</CardTitle>
          <CardDescription>Recent contact form submissions</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Company</TableHead>
                <TableHead>Service Interest</TableHead>
                <TableHead>Message</TableHead>
                <TableHead>Date</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {submissions.map((submission: ContactSubmission) => (
                <TableRow key={submission.id}>
                  <TableCell>{submission.name}</TableCell>
                  <TableCell>{submission.email}</TableCell>
                  <TableCell>{submission.company || 'N/A'}</TableCell>
                  <TableCell>{submission.service_interest || 'N/A'}</TableCell>
                  <TableCell className="max-w-xs truncate">
                    {submission.message}
                  </TableCell>
                  <TableCell>
                    {submission.created_at
                      ? new Date(submission.created_at).toLocaleDateString()
                      : 'N/A'}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
