<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Department;
use App\Models\Position;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

class UserController extends Controller
{
    public function index(Request $request)
    {
        $user_role_id = Auth::user()->role_id;
        if ($user_role_id === 1) {
            $search_query = $request->search ?? null;
            $department_id = $request->department ?? null;
            if ($department_id != 0) {
                $departments_users_ids = Position::query()
                    ->where('department_id', $department_id)
                    ->select('user_id')
                    ->get();

                $users = User::with('role')
                    ->with('position')
                    ->whereIn('id', $departments_users_ids)

                    ->where('last_name', 'like', "%" . $search_query . "%")
                    ->orderBy('last_name')
                    ->get();
            } else {
                $users = User::with('role')
                    ->with('position')
                    ->where('last_name', 'like', "%" . $search_query . "%")
                    ->orderBy('last_name')
                    ->get();
            }
            return $users;
        } else {
            return ['message', '404 not authorized'];
        }
    }

    public function store(Request $request)
    {
        $emailRequested = strtolower($request->first_name) . "." . strtolower($request->last_name) . "@hiroapp.com";
        $users = User::query()->where("email", $emailRequested)->get();
        $users_length = count($users);
        //email creation algorithm
        $emailFinal = "";
        if ($users_length == 0) {
            $emailFinal = $emailRequested;
        } else {
            $emailFinal = strtolower($request->first_name) . "." . strtolower($request->last_name) . ($users_length) . "@hiroapp.com";
        };

        $user = new User();
        $user->first_name = $request->first_name;
        $user->last_name = $request->last_name;
        $user->email = $emailFinal;
        $user->password = Hash::make('password');
        $user->role_id = $request->role_id;
        $user->save();

        $user_id = $user->id;
        $position = Position::findOrFail($request->input('position_id'));
        $position->user_id = $user_id;
        $position->save();

        return [
            'message' => 'success',
            'id' => $user->id,
        ];
    }

    public function show(string $id)
    {
        if (Auth::user()->role_id !== 2) {
            $user = User::findOrfail($id);
            $notifications = $user->notifications;
            $position = Position::where('user_id', $user->id)->first();
            $department = Department::findOrFail($position->department_id);
            return ['user' => $user, 'notifications' => $notifications, 'position_name' => $position->name, 'department_name' => $department->name];
        } else {
            return ['message', '404 not authorized'];
        }
    }

    public function destroy(string $id)
    {
        if (Auth::user()->role_id === 1) {
            $user = User::findOrfail($id);
            $user->delete();

            return ['message' => 'User has been deleted'];
        } else {
            return ['message', '404 not authorized'];
        }
    }
}
