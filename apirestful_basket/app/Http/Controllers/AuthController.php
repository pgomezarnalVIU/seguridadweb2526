<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use App\Models\User;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Auth;
use Laravel\Sanctum\HasApiTokens;

class AuthController extends Controller
{
    public function register(Request $request)
    {
        // Validación
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|unique:users',
            'password' => 'required|string|min:6|confirmed',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        // Crear usuario
        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
            'role' => 'player'
        ]);

        // Crear token personal
        //$token = $user->createToken('BasketClub client')->accessToken;
        $token = $user->createToken('BasketClub Client', ['user:read'])->accessToken;

        // Responder con el token
        return response()->json([
            'user' => $user,
            'access_token' => $token,
            'token_type' => 'Bearer'
        ], 201);
    }

    
    /**
     * User login
     */
    public function login(Request $request)
    {
        // Validar datos de entrada
        $credentials = $request->validate([
            'email' => 'required|email',
            'password' => 'required'
        ]);

        // Verificar credenciales
        if (!Auth::attempt($credentials)) {
            return response()->json([
                'message' => 'Incorrect credentials'
            ], 401);
        }

        // Obtener usuario autenticado
        $user = Auth::user();

        // Crear token personal con Sanctum
        // Crear token personal con Passport
        if($user->role=='admin')
            $token = $user->createToken('BasketClub Client', ['user:all'])->accessToken;
        else
            $token = $user->createToken('BasketClub Client', ['user:read'])->accessToken;
        //$token = $user->createToken('BasketClub client')->accessToken;

        // Retornar respuesta con token
        return response()->json([
            'user' => $user,
            'access_token' => $token,
            'token_type' => 'Bearer'
        ]);
    }
}
