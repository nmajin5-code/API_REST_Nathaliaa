
import {
  BadRequestException,
  Inject,
  Injectable,
} from '@nestjs/common';
import type { Pool, ResultSetHeader, RowDataPacket } from 'mysql2/promise';
import { DATABASE_POOL } from '../database/database.provider';
import { CrearAsignaturaDto } from './dto/crear-asignatura.dto';

interface DocenteRow extends RowDataPacket {
  id_docente: number;
}

@Injectable()
export class AsignaturasService {
  constructor(@Inject(DATABASE_POOL) private readonly db: Pool) {}

  async obtenerTodas() {
    const [rows] = await this.db.query(`
      SELECT a.id_asignatura, a.nombre, a.descripcion, a.creditos,
             a.id_docente, d.nombre AS nombre_docente,
             d.apellido AS apellido_docente
      FROM asignaturas a
      INNER JOIN docentes d ON a.id_docente = d.id_docente
      ORDER BY a.id_asignatura
    `);
    return rows;
  }

  async crear(datos: CrearAsignaturaDto) {
    const [docentes] = await this.db.execute<DocenteRow[]>(
      'SELECT id_docente FROM docentes WHERE id_docente = ?',
      [datos.id_docente],
    );

    if (docentes.length === 0) {
      throw new BadRequestException('El docente indicado no existe.');
    }

    const [resultado] = await this.db.execute<ResultSetHeader>(
      'INSERT INTO asignaturas (nombre, descripcion, creditos, id_docente) VALUES (?, ?, ?, ?)',
      [
        datos.nombre,
        datos.descripcion ?? null,
        datos.creditos,
        datos.id_docente,
      ],
    );

    return {
      mensaje: 'Asignatura registrada correctamente',
      id_asignatura: resultado.insertId,
      ...datos,
    };
  }
}
