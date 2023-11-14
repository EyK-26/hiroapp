<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Position;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class PositionController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $user_role_id = Auth::user()->role_id;
        if ($user_role_id == 1 || $user_role_id == 3) {
            $user_id = Auth::user()->id;
            $user_position = Position::where("user_id", $user_id)->get();
            $department_id = $user_position[0]->department_id;
            $positions = Position::query()->where('department_id', $department_id)->where('hiring', 1)->with('applications')->get();
            return $positions;
        } else if ($user_role_id == 2) {
            $positions = Position::query()
                ->with('applications')
                ->where('hiring', 1)
                ->get();

            return $positions;
        }
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $position = Position::query()->where('id', $id)->with(['department', 'grade'])->get();
        return $position[0];
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
