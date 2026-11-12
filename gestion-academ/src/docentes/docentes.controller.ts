
import { Body, Controller, Get, Post } from '@nestjs/common';
import { DocentesService } from './docentes.service';
import { CrearDocenteDto } from './dto/crear-docente.dto';

@Controller('docentes')
export class DocentesController {
  constructor(private readonly docentesService: DocentesService) {}

  @Get()
  obtenerTodos() {
    return this.docentesService.obtenerTodos();
  }

  @Post()
  crear(@Body() datos: CrearDocenteDto) {
    return this.docentesService.crear(datos);
  }
}
