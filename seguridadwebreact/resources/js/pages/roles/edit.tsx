import { Head, Form, Link} from '@inertiajs/react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import InputError from '@/components/input-error';
import { Spinner } from '@/components/ui/spinner';
import { Button } from '@/components/ui/button';
import AppLayout from '@/layouts/app-layout';
import type { BreadcrumbItem, Role,} from '@/types';
import roles from '@/routes/roles';
import RoleController, { edit, destroy } from '@/actions/App/Http/Controllers/RoleController';


export default function RoleEdit({role}:{role: Role}) {
    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: 'Roles',
            href: roles.index().url,
        },
        {
            title: 'Edit',
            href: roles.edit(role.id).url,
        }
    ];
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`Edit Role ${role.id}`} />
                <div className='flex justify-center w-full'>
                <Form
                    method="put"
                    action={RoleController.update(role.id).url}
                    disableWhileProcessing
                    className="flex flex-col gap-6"
                >
                    {({ processing, errors }) => (
                        <>
                            <div className="grid gap-6">
                                <div className="grid gap-2">
                                    <Label htmlFor="name">Name</Label>
                                    <Input
                                        id="name"
                                        type="text"
                                        required
                                        autoFocus
                                        tabIndex={1}
                                        autoComplete="name"
                                        name="name"
                                        placeholder="Full name"
                                        defaultValue={role.name}
                                    />
                                    <InputError
                                        message={errors.name}
                                        className="mt-2"
                                    />
                                </div>

                                <div className="grid gap-2">
                                    <Label htmlFor="email">Guarn Name</Label>
                                    <Input
                                        id="email"
                                        type="email"
                                        required
                                        tabIndex={2}
                                        autoComplete="email"
                                        name="guard_name"
                                        placeholder="Guard Name"
                                        defaultValue={role.guard_name}
                                    />
                                    <InputError message={errors.guard_name} />
                                </div>

                                <div className="grid gap-2">
                                    <Label htmlFor="permission">Permission</Label>
                                    <Input
                                        id="permission"
                                        type="text"
                                        required
                                        tabIndex={3}
                                        autoComplete="new-password"
                                        name="permission"
                                        placeholder="Permission"
                                    />
                                    <InputError message={errors.permission} />
                                </div>


                                <Button
                                    type="submit"
                                    className="mt-2 w-full"
                                    tabIndex={4}
                                    data-test="register-user-button"
                                >
                                    {processing && <Spinner />}
                                    Update User
                                </Button>
                            </div>
                        </>
                    )}
                </Form>
                </div>
        </AppLayout>
    );
}
