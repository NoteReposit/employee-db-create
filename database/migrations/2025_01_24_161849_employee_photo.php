<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('photo_emp', function (Blueprint $table) {
            $table->id();
            $table->Integer('emp_no'); // เชื่อมกับ employees.emp_no
            $table->string('photo_path'); // เก็บ path ของรูปภาพ

            // สร้าง Foreign Key เชื่อมความสัมพันธ์
            $table->foreign('emp_no')->references('emp_no')->on('employees')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('photo_emp');
    }
};
