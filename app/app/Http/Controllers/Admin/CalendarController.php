<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Repositories\CalendarRepository;
use Illuminate\Http\Request;

class CalendarController extends Controller
{
    protected $calendar_repository;
    public function __construct(
        CalendarRepository $calendar_repository,
    )
    {
        $this->calendar_repository = $calendar_repository;
    }
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $label_map = [0 => 'Business',1 => 'Holidays',2 => 'Events',3 => 'Personal',];
        $labels = $this->calendar_repository->get_label();
        return view('admin.calendars.index',[
            'labels' => $labels,
            'label_map' => $label_map
        ]);
    }

    public function get_list_data()
    {
        $calendars = $this->calendar_repository->get_all();
        return response()->json([
            'calendars' => $calendars,
        ], 200); 
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
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
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
