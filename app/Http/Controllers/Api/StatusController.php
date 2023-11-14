<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Status;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class StatusController extends Controller
{
    public function show(string $id)
    {
        if (Auth::user()->role_id === 3) {
            $status_name = Status::findOrfail($id)->name;
            return $status_name;
        }
    }
}
