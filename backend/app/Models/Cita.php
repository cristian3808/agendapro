<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Model;

class Cita extends Model
{
    protected $fillable = [
    'servicio_id',
    'nombre_cliente',
    'telefono',
    'correo',
    'fecha',
    'hora',
];

    public function servicio(): BelongsTo
    {
        return $this->belongsTo(Servicio::class);
    }
}
