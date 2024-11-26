import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { PaginatorModule } from 'primeng/paginator';
@Component({
  selector: 'app-tabla-solicitudes',
  standalone: true,
  imports: [CommonModule, TableModule, ButtonModule, InputTextModule,PaginatorModule
  ],
  templateUrl: './tabla-solicitudes.component.html',
  styleUrls: ['./tabla-solicitudes.component.scss'],
})
export class TablaSolicitudesComponent implements OnInit {
  solicitudes: any[] = [];
  cols: any[] = [];
  loading: boolean = false;

  constructor() {}

  ngOnInit(): void {
    // Definición de columnas con tipos de filtros
    this.cols = [
      { field: 'cliente', header: 'Cliente', filterType: 'text' },
      { field: 'correo', header: 'Correo', filterType: 'text' },
      { field: 'nrc', header: 'NRC Emisor', filterType: 'text' },
      { field: 'encargado', header: 'Encargado', filterType: 'text' },
      { field: 'telefono', header: 'Teléfono', filterType: 'text' },
      { field: 'monto', header: 'Monto', filterType: 'text' },
      { field: 'interes', header: 'Interés', filterType: 'text' },
    ];
    // Registros quemados
    this.solicitudes = [
      { cliente: 'Juan Pérez Garcia Hernandez', correo: 'juan.perez@example.com', nrc: '06142302770010', encargado: 'DTE-03-S0010000-000000000005512', telefono: '7634-2378', monto: 25764, interes: '20249E66AACAD15643738F88221397424DA2BJYT' },
      { cliente: 'María López', correo: 'maria.lopez@example.com', nrc: '06142302770010', encargado: 'DTE-03-S0010000-000000000005513', telefono: '5678-1234', monto: 2000, interes: '3A9E8D5C6A27F443B2CE9900BB3421AA3EE4XTHY' },
      { cliente: 'Carlos Hernández', correo: 'carlos.hernandez@example.com', nrc: '06142302770010', encargado: 'DTE-03-S0010000-000000000005514', telefono: '9876-5432', monto: 3000, interes: 'C99E45F3D8B24A7E6BB338A72110E3249CDEFJQR' },
      { cliente: 'Ana González', correo: 'ana.gonzalez@example.com', nrc: '06142302770010', encargado: 'DTE-03-S0010000-000000000005515', telefono: '3456-7890', monto: 4000, interes: 'AA872B43CE44AAE4E9DD321F567ACD3849QSDCXE' },
      { cliente: 'Luis Martínez', correo: 'luis.martinez@example.com', nrc: '06142302770010', encargado: 'DTE-03-S0010000-000000000005516', telefono: '4321-0987', monto: 5000, interes: 'ADDF3249E6AA8D223C4789B2A1CD4A523EDEFGAH' },
      { cliente: 'Pedro Gutiérrez', correo: 'pedro.gutierrez@example.com', nrc: '06142302770010', encargado: 'DTE-03-S0010000-000000000005517', telefono: '7654-3210', monto: 6000, interes: 'BB228F99D567ACE44C78A99932DEFABCA34XCDYW' },
      { cliente: 'Laura Torres', correo: 'laura.torres@example.com', nrc: '06142302770010', encargado: 'DTE-03-S0010000-000000000005518', telefono: '8765-4321', monto: 7000, interes: 'CDF223ADEFAAE99D234B88BC999F55CDA98EGSDF' },
      { cliente: 'Raúl Ramírez', correo: 'raul.ramirez@example.com', nrc: '06142302770010', encargado: 'DTE-03-S0010000-000000000005519', telefono: '6543-2109', monto: 8000, interes: '3CCAD678E44DEF98AC99923CD8BEFFAA9F9QWERT' },
      { cliente: 'Sofía Castro', correo: 'sofia.castro@example.com', nrc: '06142302770010', encargado: 'DTE-03-S0010000-000000000005520', telefono: '5432-1098', monto: 9000, interes: 'AB998CDEEF44AA67EAB67899A345EBCDEF123TYU' },
      { cliente: 'María León', correo: 'maria.leon@example.com', nrc: '06142302770010', encargado: 'DTE-03-S0010000-000000000005521', telefono: '2109-8765', monto: 10000, interes: '4EDEF995E44AA33867BAD22CE44AAD99988CDTYW' },
      { cliente: 'Ricardo Álvarez', correo: 'ricardo.alvarez@example.com', nrc: '06142302770010', encargado: 'DTE-03-S0010000-000000000005522', telefono: '5678-2345', monto: 11000, interes: 'ADD223FAE99B88CC667AA88BCE33AA9DB999RHTF' },
      { cliente: 'Ana Morales', correo: 'ana.morales@example.com', nrc: '06142302770010', encargado: 'DTE-03-S0010000-000000000005523', telefono: '8765-1234', monto: 12000, interes: 'AEDD344ABF999D678AAC88F2345EDCAB88XWSDF' },
      { cliente: 'Luis Torres', correo: 'luis.torres@example.com', nrc: '06142302770010', encargado: 'DTE-03-S0010000-000000000005524', telefono: '5432-6789', monto: 13000, interes: '5AADFA44E667BBCD788AB5679ABBCFA444QRTYU' },
      { cliente: 'Carmen Gutiérrez', correo: 'carmen.gutierrez@example.com', nrc: '06142302770010', encargado: 'DTE-03-S0010000-000000000005525', telefono: '2109-5432', monto: 14000, interes: '9ACDD44B67AB999FE234BC234F9ABCCDF567QETY' },
      { cliente: 'Juan Pérez', correo: 'juan.perez@example.com', nrc: '06142302770010', encargado: 'DTE-03-S0010000-000000000005526', telefono: '1234-5678', monto: 1000, interes: '20249E66AACAD15643738F88221397424DA2BJYT' },
      { cliente: 'María López', correo: 'maria.lopez@example.com', nrc: '06142302770010', encargado: 'DTE-03-S0010000-000000000005527', telefono: '5678-1234', monto: 2000, interes: '3CDEF44AB89BBCCD578AACDEF234789TYWECDSQ' },
      { cliente: 'Carlos Hernández', correo: 'carlos.hernandez@example.com', nrc: '06142302770010', encargado: 'DTE-03-S0010000-000000000005528', telefono: '9876-5432', monto: 3000, interes: '4AD99DD44AA9B66788ABBA667CBB234CDDEFTYQ' },
      { cliente: 'Ana González', correo: 'ana.gonzalez@example.com', nrc: '06142302770010', encargado: 'DTE-03-S0010000-000000000005529', telefono: '3456-7890', monto: 4000, interes: '9CCADF22367CC999BBFEBC66789ABCDEEDD33TRE' },
      { cliente: 'Luis Martínez', correo: 'luis.martinez@example.com', nrc: '06142302770010', encargado: 'DTE-03-S0010000-000000000005530', telefono: '4321-0987', monto: 5000, interes: '999BBCCDE7788ABBCE678999AB44CCDEF345YUFD' },
      { cliente: 'Pedro Gutiérrez', correo: 'pedro.gutierrez@example.com', nrc: '06142302770010', encargado: 'DTE-03-S0010000-000000000005531', telefono: '7654-3210', monto: 6000, interes: '567CC44AA9EE234BBC667BCABB234CCDE678TREW' },
      { cliente: 'Juan Pérez Garcia Hernandez', correo: 'juan.perez@example.com', nrc: '06142302770010', encargado: 'DTE-03-S0010000-000000000005512', telefono: '7634-2378', monto: 25764, interes: '20249E66AACAD15643738F88221397424DA2BJYT' },
      { cliente: 'María López', correo: 'maria.lopez@example.com', nrc: '06142302770010', encargado: 'DTE-03-S0010000-000000000005513', telefono: '5678-1234', monto: 2000, interes: '3A9E8D5C6A27F443B2CE9900BB3421AA3EE4XTHY' },
      { cliente: 'Carlos Hernández', correo: 'carlos.hernandez@example.com', nrc: '06142302770010', encargado: 'DTE-03-S0010000-000000000005514', telefono: '9876-5432', monto: 3000, interes: 'C99E45F3D8B24A7E6BB338A72110E3249CDEFJQR' },
      { cliente: 'Ana González', correo: 'ana.gonzalez@example.com', nrc: '06142302770010', encargado: 'DTE-03-S0010000-000000000005515', telefono: '3456-7890', monto: 4000, interes: 'AA872B43CE44AAE4E9DD321F567ACD3849QSDCXE' },
      { cliente: 'Luis Martínez', correo: 'luis.martinez@example.com', nrc: '06142302770010', encargado: 'DTE-03-S0010000-000000000005516', telefono: '4321-0987', monto: 5000, interes: 'ADDF3249E6AA8D223C4789B2A1CD4A523EDEFGAH' },
      { cliente: 'Pedro Gutiérrez', correo: 'pedro.gutierrez@example.com', nrc: '06142302770010', encargado: 'DTE-03-S0010000-000000000005517', telefono: '7654-3210', monto: 6000, interes: 'BB228F99D567ACE44C78A99932DEFABCA34XCDYW' },
      { cliente: 'Laura Torres', correo: 'laura.torres@example.com', nrc: '06142302770010', encargado: 'DTE-03-S0010000-000000000005518', telefono: '8765-4321', monto: 7000, interes: 'CDF223ADEFAAE99D234B88BC999F55CDA98EGSDF' },
      { cliente: 'Raúl Ramírez', correo: 'raul.ramirez@example.com', nrc: '06142302770010', encargado: 'DTE-03-S0010000-000000000005519', telefono: '6543-2109', monto: 8000, interes: '3CCAD678E44DEF98AC99923CD8BEFFAA9F9QWERT' },
      { cliente: 'Sofía Castro', correo: 'sofia.castro@example.com', nrc: '06142302770010', encargado: 'DTE-03-S0010000-000000000005520', telefono: '5432-1098', monto: 9000, interes: 'AB998CDEEF44AA67EAB67899A345EBCDEF123TYU' },
      { cliente: 'María León', correo: 'maria.leon@example.com', nrc: '06142302770010', encargado: 'DTE-03-S0010000-000000000005521', telefono: '2109-8765', monto: 10000, interes: '4EDEF995E44AA33867BAD22CE44AAD99988CDTYW' },
      { cliente: 'Ricardo Álvarez', correo: 'ricardo.alvarez@example.com', nrc: '06142302770010', encargado: 'DTE-03-S0010000-000000000005522', telefono: '5678-2345', monto: 11000, interes: 'ADD223FAE99B88CC667AA88BCE33AA9DB999RHTF' },
      { cliente: 'Ana Morales', correo: 'ana.morales@example.com', nrc: '06142302770010', encargado: 'DTE-03-S0010000-000000000005523', telefono: '8765-1234', monto: 12000, interes: 'AEDD344ABF999D678AAC88F2345EDCAB88XWSDF' },
      { cliente: 'Luis Torres', correo: 'luis.torres@example.com', nrc: '06142302770010', encargado: 'DTE-03-S0010000-000000000005524', telefono: '5432-6789', monto: 13000, interes: '5AADFA44E667BBCD788AB5679ABBCFA444QRTYU' },
      { cliente: 'Carmen Gutiérrez', correo: 'carmen.gutierrez@example.com', nrc: '06142302770010', encargado: 'DTE-03-S0010000-000000000005525', telefono: '2109-5432', monto: 14000, interes: '9ACDD44B67AB999FE234BC234F9ABCCDF567QETY' },
      { cliente: 'Juan Pérez', correo: 'juan.perez@example.com', nrc: '06142302770010', encargado: 'DTE-03-S0010000-000000000005526', telefono: '1234-5678', monto: 1000, interes: '20249E66AACAD15643738F88221397424DA2BJYT' },
      { cliente: 'María López', correo: 'maria.lopez@example.com', nrc: '06142302770010', encargado: 'DTE-03-S0010000-000000000005527', telefono: '5678-1234', monto: 2000, interes: '3CDEF44AB89BBCCD578AACDEF234789TYWECDSQ' },
      { cliente: 'Carlos Hernández', correo: 'carlos.hernandez@example.com', nrc: '06142302770010', encargado: 'DTE-03-S0010000-000000000005528', telefono: '9876-5432', monto: 3000, interes: '4AD99DD44AA9B66788ABBA667CBB234CDDEFTYQ' },
      { cliente: 'Ana González', correo: 'ana.gonzalez@example.com', nrc: '06142302770010', encargado: 'DTE-03-S0010000-000000000005529', telefono: '3456-7890', monto: 4000, interes: '9CCADF22367CC999BBFEBC66789ABCDEEDD33TRE' },
      { cliente: 'Luis Martínez', correo: 'luis.martinez@example.com', nrc: '06142302770010', encargado: 'DTE-03-S0010000-000000000005530', telefono: '4321-0987', monto: 5000, interes: '999BBCCDE7788ABBCE678999AB44CCDEF345YUFD' },
      { cliente: 'Pedro Gutiérrez', correo: 'pedro.gutierrez@example.com', nrc: '06142302770010', encargado: 'DTE-03-S0010000-000000000005531', telefono: '7654-3210', monto: 6000, interes: '567CC44AA9EE234BBC667BCABB234CCDE678TREW' },
      { cliente: 'Juan Pérez Garcia Hernandez', correo: 'juan.perez@example.com', nrc: '06142302770010', encargado: 'DTE-03-S0010000-000000000005512', telefono: '7634-2378', monto: 25764, interes: '20249E66AACAD15643738F88221397424DA2BJYT' },
      { cliente: 'María López', correo: 'maria.lopez@example.com', nrc: '06142302770010', encargado: 'DTE-03-S0010000-000000000005513', telefono: '5678-1234', monto: 2000, interes: '3A9E8D5C6A27F443B2CE9900BB3421AA3EE4XTHY' },
      { cliente: 'Carlos Hernández', correo: 'carlos.hernandez@example.com', nrc: '06142302770010', encargado: 'DTE-03-S0010000-000000000005514', telefono: '9876-5432', monto: 3000, interes: 'C99E45F3D8B24A7E6BB338A72110E3249CDEFJQR' },
      { cliente: 'Ana González', correo: 'ana.gonzalez@example.com', nrc: '06142302770010', encargado: 'DTE-03-S0010000-000000000005515', telefono: '3456-7890', monto: 4000, interes: 'AA872B43CE44AAE4E9DD321F567ACD3849QSDCXE' },
      { cliente: 'Luis Martínez', correo: 'luis.martinez@example.com', nrc: '06142302770010', encargado: 'DTE-03-S0010000-000000000005516', telefono: '4321-0987', monto: 5000, interes: 'ADDF3249E6AA8D223C4789B2A1CD4A523EDEFGAH' },
      { cliente: 'Pedro Gutiérrez', correo: 'pedro.gutierrez@example.com', nrc: '06142302770010', encargado: 'DTE-03-S0010000-000000000005517', telefono: '7654-3210', monto: 6000, interes: 'BB228F99D567ACE44C78A99932DEFABCA34XCDYW' },
      { cliente: 'Laura Torres', correo: 'laura.torres@example.com', nrc: '06142302770010', encargado: 'DTE-03-S0010000-000000000005518', telefono: '8765-4321', monto: 7000, interes: 'CDF223ADEFAAE99D234B88BC999F55CDA98EGSDF' },
      { cliente: 'Raúl Ramírez', correo: 'raul.ramirez@example.com', nrc: '06142302770010', encargado: 'DTE-03-S0010000-000000000005519', telefono: '6543-2109', monto: 8000, interes: '3CCAD678E44DEF98AC99923CD8BEFFAA9F9QWERT' },
      { cliente: 'Sofía Castro', correo: 'sofia.castro@example.com', nrc: '06142302770010', encargado: 'DTE-03-S0010000-000000000005520', telefono: '5432-1098', monto: 9000, interes: 'AB998CDEEF44AA67EAB67899A345EBCDEF123TYU' },
      { cliente: 'María León', correo: 'maria.leon@example.com', nrc: '06142302770010', encargado: 'DTE-03-S0010000-000000000005521', telefono: '2109-8765', monto: 10000, interes: '4EDEF995E44AA33867BAD22CE44AAD99988CDTYW' },
      { cliente: 'Ricardo Álvarez', correo: 'ricardo.alvarez@example.com', nrc: '06142302770010', encargado: 'DTE-03-S0010000-000000000005522', telefono: '5678-2345', monto: 11000, interes: 'ADD223FAE99B88CC667AA88BCE33AA9DB999RHTF' },
      { cliente: 'Ana Morales', correo: 'ana.morales@example.com', nrc: '06142302770010', encargado: 'DTE-03-S0010000-000000000005523', telefono: '8765-1234', monto: 12000, interes: 'AEDD344ABF999D678AAC88F2345EDCAB88XWSDF' },
      { cliente: 'Luis Torres', correo: 'luis.torres@example.com', nrc: '06142302770010', encargado: 'DTE-03-S0010000-000000000005524', telefono: '5432-6789', monto: 13000, interes: '5AADFA44E667BBCD788AB5679ABBCFA444QRTYU' },
      { cliente: 'Carmen Gutiérrez', correo: 'carmen.gutierrez@example.com', nrc: '06142302770010', encargado: 'DTE-03-S0010000-000000000005525', telefono: '2109-5432', monto: 14000, interes: '9ACDD44B67AB999FE234BC234F9ABCCDF567QETY' },
      { cliente: 'Juan Pérez', correo: 'juan.perez@example.com', nrc: '06142302770010', encargado: 'DTE-03-S0010000-000000000005526', telefono: '1234-5678', monto: 1000, interes: '20249E66AACAD15643738F88221397424DA2BJYT' },
      { cliente: 'María López', correo: 'maria.lopez@example.com', nrc: '06142302770010', encargado: 'DTE-03-S0010000-000000000005527', telefono: '5678-1234', monto: 2000, interes: '3CDEF44AB89BBCCD578AACDEF234789TYWECDSQ' },
      { cliente: 'Carlos Hernández', correo: 'carlos.hernandez@example.com', nrc: '06142302770010', encargado: 'DTE-03-S0010000-000000000005528', telefono: '9876-5432', monto: 3000, interes: '4AD99DD44AA9B66788ABBA667CBB234CDDEFTYQ' },
      { cliente: 'Ana González', correo: 'ana.gonzalez@example.com', nrc: '06142302770010', encargado: 'DTE-03-S0010000-000000000005529', telefono: '3456-7890', monto: 4000, interes: '9CCADF22367CC999BBFEBC66789ABCDEEDD33TRE' },
      { cliente: 'Luis Martínez', correo: 'luis.martinez@example.com', nrc: '06142302770010', encargado: 'DTE-03-S0010000-000000000005530', telefono: '4321-0987', monto: 5000, interes: '999BBCCDE7788ABBCE678999AB44CCDEF345YUFD' },
      { cliente: 'Pedro Gutiérrez', correo: 'pedro.gutierrez@example.com', nrc: '06142302770010', encargado: 'DTE-03-S0010000-000000000005531', telefono: '7654-3210', monto: 6000, interes: '567CC44AA9EE234BBC667BCABB234CCDE678TREW' },
    ];
  }

  onPageChange(event: any): void {
    console.log('Cambio de página:', event);
  }

  verSolicitud(solicitud: any): void {
    console.log('Detalle de solicitud:', solicitud);
  }
}
