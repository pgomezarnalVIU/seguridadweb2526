import { Head, Form, Link} from '@inertiajs/react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import InputError from '@/components/input-error';
import { Spinner } from '@/components/ui/spinner';
import { Button } from '@/components/ui/button';
import AppLayout from '@/layouts/app-layout';
import type { BreadcrumbItem, Role } from '@/types';
import roles from '@/routes/roles';
import RoleController, { edit, destroy } from '@/actions/App/Http/Controllers/RoleController';


const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Roles',
        href: roles.index().url,
    },
    {
        title: 'Create',
        href: roles.create().url,
    }
];

export default function RoleCreate() {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Roles" />
            <div className='flex justify-center w-full'>
                <Form
                    method="post"
                    action={RoleController.store().url}
                    resetOnSuccess={['password', 'password_confirmation']}
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
                                    />
                                    <InputError
                                        message={errors.name}
                                        className="mt-2"
                                    />
                                </div>

                                <div className="grid gap-2">
                                    <Label htmlFor="guard_name">Guard Name</Label>
                                    <Input
                                        id="guard_name"
                                        type="text"
                                        required
                                        tabIndex={2}
                                        autoComplete="guard_name"
                                        name="guard_name"
                                        placeholder="Guard name"
                                    />
                                    <InputError message={errors.guard_name} />
                                </div>


                                <Button
                                    type="submit"
                                    className="mt-2 w-full"
                                    tabIndex={3}
                                    data-test="create-role-button"
                                >
                                    {processing && <Spinner />}
                                    Create Role
                                </Button>
                            </div>
                        </>
                    )}
                </Form>
            </div>
        </AppLayout>
    );
}
