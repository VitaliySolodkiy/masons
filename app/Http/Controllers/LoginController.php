<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

class LoginController extends Controller
{
    public function authentificate(Request $request)
    {
        $data = $request->validate([ //validate - возвращает массив введенных данных
            'email' => 'required|email',
            'password' => 'required'
        ]);
        if (Auth::attempt($data)) { //Auth - фасад
            //attempt - проверяет есть ли такой пользователь и подходит ли пароль. Возвращает true/false
            $request->session()->regenerate(); //regenerate() - обновляет данные сессии
            return response()->json(Auth::user()); //Auth::user() - возвращает данные авторизированного пользователя
        }
        return response()->json([
            'errors' => 'User not found'
        ]);
    }

    public function logout(Request $request)
    {
        $request->session()->invalidate(); //invalidate() - завершает текущую сессию (удаляет ее)
        $request->session()->regenerateToken(); //заново создается токен из сессии
        return response()->json('Logout success');
    }

    public function registration(Request $request)
    {

        $rules = [
            'name' => 'required',
            'email' => 'required|unique:users',
            'password' => 'required'
        ];

        $input = $request->only('name', 'email', 'password');
        $validator = Validator::make($input, $rules);

        if ($validator->fails()) {
            return response()->json(['success' => false, 'errors' => $validator->messages()]);
        }

        User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
        ]);

        return response()->json(['success' => true]);
    }
}
