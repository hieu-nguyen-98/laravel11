<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class CheckAdmin
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle($request, Closure $next)
    {
        if(!Auth::check()) {
            return redirect(route('login'));
        }
        if (Auth::check() && Auth::user()->hasRole('USER')) {
            abort(403, 'Access denied');
        }

        return $next($request);
    }
}
