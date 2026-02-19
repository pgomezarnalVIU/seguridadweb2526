import { Head,Link } from '@inertiajs/react';
import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
import AppLayout from '@/layouts/app-layout';
import type { BreadcrumbItem, Role } from '@/types';
import { dashboard } from '@/routes';
import {
  Table, 
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { edit, destroy } from '@/actions/App/Http/Controllers/RoleController';
import { index, create } from '@/routes/roles';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Roles',
        href: index().url,
    },
];

export default function RoleIndex({ roles }: { roles: Role[] }) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Roles" />
            <div className="flex justify-end">
                <Link href={create().url}
                    className="mb-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                >
                    Create Role
                </Link>
            </div>
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <Table>
                    <TableCaption>A list of all roles</TableCaption>
                    <TableHeader>
                        <TableRow>
                        <TableHead className="w-[100px]">Name</TableHead>
                        <TableHead>Guard Name</TableHead>
                        <TableHead>Permission</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {roles.map((role) => (
                            <TableRow key={role.id}>
                                <TableCell className="font-medium">{role.name}</TableCell>
                                <TableCell>{role.guard_name}</TableCell>
                                <TableCell>{role.permissions?.map(permission => permission.name).join(', ') || '-'}</TableCell>
                                <TableCell className="text-right">
                                    <Link href={edit(role.id).url}
                                        className="mr-2 bg-green-500 text-white px-2 py-1 rounded hover:bg-green-600"
                                    >
                                        Edit
                                    </Link>
                                    <Link href={destroy(role.id).url}
                                        className="mr-2 bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
                                    >
                                        Delete
                                    </Link>
                                </TableCell>
                        </TableRow>
                        ))}
                    </TableBody>
                </Table>
                <div className="relative min-h-[100vh] flex-1 overflow-hidden rounded-xl border border-sidebar-border/70 md:min-h-min dark:border-sidebar-border">
                    <PlaceholderPattern className="absolute inset-0 size-full stroke-neutral-900/20 dark:stroke-neutral-100/20" />
                </div>
            </div>
        </AppLayout>
    );
}
