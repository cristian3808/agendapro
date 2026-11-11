<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Models\Servicio;
use App\Models\Cita;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::get('/servicios', function () {
    return Servicio::all(); 
});

Route::get('/citas', function () {
    return Cita::with('servicio')
        ->orderBy('fecha')
        ->orderBy('hora')
        ->get();
});

Route::get('/estadisticas', function () {
    return [
        'total_citas' => Cita::count(),
        'pendientes' => Cita::where('estado', 'pendiente')->count(),
        'confirmadas' => Cita::where('estado', 'confirmada')->count(),
        'servicios_registrados' => Servicio::count(),
    ];
});

Route::patch('/citas/{cita}', function (Request $request, Cita $cita) {
    $datos = $request->validate([
        'estado' => ['required', 'in:pendiente,confirmada,cancelada'],
    ]);

    $cita->estado = $datos['estado'];
    $cita->save();

    return response()->json($cita);
});

Route::post('/citas', function (Request $request) {
    $datos = $request->validate([
        'servicio_id' => ['required', 'exists:servicios,id'],
        'nombre_cliente' => ['required', 'string', 'max:255'],
        'telefono' => ['required', 'string', 'max:30'],
        'correo' => ['required', 'email', 'max:255'],
        'fecha' => ['required', 'date', 'after_or_equal:today'],
        'hora' => ['required', 'date_format:H:i'],
    ]);

    $cita = Cita::create($datos);

    return response()->json($cita, 201);
});