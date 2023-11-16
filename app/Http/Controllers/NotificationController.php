<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use App\Notifications\ContactUser;
use Illuminate\Support\Facades\Notification;


class NotificationController extends Controller
{
    public function send(Request $request)
    {
        $user = User::where('email', $request->input('to'))->first();
        $to = $request->input('to');
        $from = $request->input('from');
        $subject = $request->input('subject');
        $text = $request->input('text');
        Notification::send($user, new ContactUser($from, $to, $text, $subject));
    }
}
