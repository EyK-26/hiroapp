<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Application;
use App\Models\Position;
use App\Models\Status;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class ApplicationController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $user_id = Auth::id();
        $applications = Application::query()->with(['position', 'status'])->where('user_id', $user_id)->get();

        return $applications;
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $application = new Application();
        $application->user_id = Auth::id();
        $application->position_id = $request->input('position_id');
        $application->status_id = 1;
        $application->attachment_text = $request->input('attachment_text') ?? null;
        $application->attachment_file = $request->input('position_id') ?? null;
        $application->save();

        return [
            'message' => 'succes'
        ];
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $authenticated_user_id = Auth::user()->id;
        $application = Application::findOrFail($id);
        $user = User::findOrFail($application->user_id);
        $position = Position::findOrFail($application->position_id);
        $status = Status::findOrFail($application->status_id);
        $all_statuses = Status::all();
        return $authenticated_user_id === $user->id ? [
            'application' => $application, 'user' => $user, 'position' => $position, 'status' => $status,
            'all_statuses' => $all_statuses,
        ] : ['message' => '404 not authorized'];
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
    public function update(string $id)
    {
        $application = Application::findOrFail($id);
        if ($application->status_id !== 6) {
            $application->status_id = 6;
            $application->save();
        } else {
            return ['message' => '404 not authorized'];
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
