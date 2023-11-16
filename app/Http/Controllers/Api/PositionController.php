<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Application;
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
        $user_id = Auth::user()->id;
        $user_position = Position::where("user_id", $user_id)->get();

        $position = new Position();
        $position->user_id = null;
        $position->department_id = $user_position[0]->department_id;
        $position->grade_id = $request->pay_grade;
        $position->name = $request->name;
        $position->description = $request->description;
        $position->hiring = 1;
        $position->start_date = $request->start_date;
        $position->end_date = $request->end_date;
        $position->save();

        return
            [
                'message' => 'succes',
                'id' => $position->id,
            ];
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        if (Auth::user()->role_id === 2) {
            $position = Position::query()->where('id', $id)->with(['department', 'grade'])->get();
            return $position[0];
        } else if (Auth::user()->role_id === 3) {
            $position = Position::findOrfail($id);
            $application = Application::where('position_id', $position->id)->with(['user', 'status'])->get();
            return ['position' => $position->load(['grade', 'user']), 'applications' => $application];
        }
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

    public function getAllPositions()
    {
        $positions = Position::select('name')->distinct()->orderBy('name')->get();

        return $positions;
    }
    public function getPositionsByDepartment($department_id)
    {
        $positions = Position::select('name')->distinct()->orderBy('name')->where('department_id', $department_id)->get();
        return $positions;
    }
}
