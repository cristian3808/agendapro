<?php

namespace Database\Seeders;

use App\Models\Servicio;
use Illuminate\Database\Seeder;

class ServicioSeeder extends Seeder
{
    public function run(): void
    {
        Servicio::create([
            'nombre' => 'Corte de cabello',
            'precio' => 25000,
            'duracion' => 30,
        ]);

        Servicio::create([
            'nombre' => 'Barba',
            'precio' => 15000,
            'duracion' => 20,
        ]);

        Servicio::create([
            'nombre' => 'Corte + Barba',
            'precio' => 35000,
            'duracion' => 50,
        ]);
    }
}