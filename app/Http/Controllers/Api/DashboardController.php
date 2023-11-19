<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Application;
use App\Models\Position;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class DashboardController extends Controller
{
    public function getTotalNumberOfApplications(Request $request): int
    {
        if (Auth::user()->role_id === 3) {
            $department_id = $request->input('department_id');
            $position_ids = Position::where('department_id', $department_id)->select('id')->get();
            return Application::whereIn('position_id', $position_ids)->count();
        }
    }

    public function getTotalApplicantsDetail(Request $request): Collection
    {
        if (Auth::user()->role_id === 3) {
            $department_id = $request->input('department_id');
            $position_ids = Position::where('department_id', $department_id)->select('id')->get();
            $applications = Application::whereIn('position_id', $position_ids)->get();
            return $applications->load(['user', 'position', 'status']);
        }
    }
}
