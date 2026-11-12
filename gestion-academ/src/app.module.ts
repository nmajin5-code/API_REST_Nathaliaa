
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './database/database.module';
import { DocentesModule } from './docentes/docentes.module';
import { AsignaturasModule } from './asignaturas/asignaturas.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    DatabaseModule,
    DocentesModule,
    AsignaturasModule,
  ],
})
export class AppModule {}
