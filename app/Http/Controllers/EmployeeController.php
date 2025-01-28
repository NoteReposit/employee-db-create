<?php

namespace App\Http\Controllers;

use App\Models\Employee;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

use Illuminate\Support\Facades\Log;

class EmployeeController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $query = $request->input('search');
        $sortColumn = $request->input('sort', 'emp_no');
        $sortDirection = $request->input('direction', 'asc');

        $employees = DB::table('employees')
            ->leftJoin('photo_emp', 'employees.emp_no', '=', 'photo_emp.emp_no')
            ->select('employees.*', 'photo_emp.photo_path')
            ->where('first_name', 'like', '%' . $query . '%')
            ->orWhere('last_name', 'like', '%' . $query . '%')
            ->orderBy($sortColumn, $sortDirection)
            ->paginate(20);

        return Inertia::render('Employee/Index', [
            'employees' => $employees,
            'query' => $query,
            'sortColumn' => $sortColumn,
            'sortDirection' => $sortDirection,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        // ดึงรายชื่อแผนกจากฐานข้อมูล เพือ่ ไปแสดงให้เลือกรายการในแบบฟอร,ม
        $departments = DB::table('departments')->select('dept_no', 'dept_name')->get();

        // ส่งข้อมูลไปยังหน้า Inertia
        return inertia('Employee/Create', ['departments' => $departments]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        try {
            // Validate the incoming data
            $validated = $request->validate([
                'first_name' => 'required|string|max:14',
                'last_name' => 'required|string|max:16',
                'gender' => 'required|in:M,F',
                'hire_date' => 'required|date',
                'birth_date' => 'required|date',
                'dept_no' => 'required|exists:departments,dept_no',
                'photo' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048'
            ]);

            DB::transaction(function () use ($validated, $request) {
                // Generate a new employee number
                $latestEmpNo = DB::table('employees')->max('emp_no') ?? 0;
                $newEmpNo = $latestEmpNo + 1;

                // Insert the new employee
                DB::table('employees')->insert([
                    'emp_no' => $newEmpNo,
                    'first_name' => $validated['first_name'],
                    'last_name' => $validated['last_name'],
                    'gender' => $validated['gender'],
                    'hire_date' => $validated['hire_date'],
                    'birth_date' => $validated['hire_date'],
                ]);

                // Link the employee to the department
                DB::table('dept_emp')->insert([
                    'emp_no' => $newEmpNo,
                    'dept_no' => $validated['dept_no'],
                    'from_date' => now(),
                    'to_date' => '9999-01-01',
                ]);

                // Save photo if provided
                if ($request->hasFile('photo')) {
                    $photoPath = $request->file('photo')->store('photos', 'public'); // เก็บใน storage/app/public/photos
                    DB::table('photo_emp')->insert([
                        'emp_no' => $newEmpNo,
                        'photo_path' => $photoPath,
                    ]);
                }
            });

            Log::info($request->all());
            return redirect()->route('employees.index')
                ->with('success', 'Employee created successfully.');

        } catch (\Exception $e) {
            Log::error($e->getMessage());
            return back()->with('error', 'Failed to create employee. Please try again.');
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(Employee $employee)
    {
        //

    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Employee $employee)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Employee $employee)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Employee $employee)
    {
        //
    }
}
