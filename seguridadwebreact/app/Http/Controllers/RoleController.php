<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Requests\RoleStoreRequest;
use App\Http\Requests\RoleUpdaterequest;
use Spatie\Permission\Models\Role;
use Inertia\Inertia;

class RoleController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Inertia::render('roles/index',[
            'roles' => Role::all()
        ]);
    }
 
    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
      return Inertia::render('roles/create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(RoleStoreRequest $request)
    {
        Role::create($request->validated());
        return redirect()->route('roles.index');
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        return Inertia::render('roles/edit',[
            'role' => Role::findOrFail($id)
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(RoleUpdaterequest $request, string $id)
    {
        $role = Role::findOrFail($id);
        $role->update($request->validated());
        return redirect()->route('roles.index');    
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $role = Role::findOrFail($id);
        $role->delete();
        return redirect()->route('roles.index');    
    }
}
