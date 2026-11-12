
import { Body, Controller, Get, Post } from '@nestjs/common';
import { AsignaturasService } from './asignaturas.service';
import { CrearAsignaturaDto } from './dto/crear-asignatura.dto';

@Controller('asignaturas')
export class AsignaturasController {
  constructor(private readonly asignaturasService: AsignaturasService) {}

  @Get()
  obtenerTodas() {
    return this.asignaturasService.obtenerTodas();
  }

  @Post()
  crear(@Body() datos: CrearAsignaturaDto) {
    return this.asignaturasService.crear(datos);
  }
}
