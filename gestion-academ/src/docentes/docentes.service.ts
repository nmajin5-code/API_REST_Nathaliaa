
import { Inject, Injectable } from '@nestjs/common';
import type { Pool, ResultSetHeader } from 'mysql2/promise';
import { DATABASE_POOL } from '../database/database.provider';
import { CrearDocenteDto } from './dto/crear-docente.dto';

@Injectable()
export class DocentesService {
  constructor(@Inject(DATABASE_POOL) private readonly db: Pool) {}

  async obtenerTodos() {
    const [rows] = await this.db.query(
      'SELECT id_docente, nombre, apellido, correo, telefono FROM docentes ORDER BY id_docente'
    );
    return rows;
  }

  async crear(datos: CrearDocenteDto) {
    const [resultado] = await this.db.execute<ResultSetHeader>(
      'INSERT INTO docentes (nombre, apellido, correo, telefono) VALUES (?, ?, ?, ?)',
      [datos.nombre, datos.apellido, datos.correo, datos.telefono ?? null],
    );

    return {
      mensaje: 'Docente registrado correctamente',
      id_docente: resultado.insertId,
      ...datos,
    };
  }
}
