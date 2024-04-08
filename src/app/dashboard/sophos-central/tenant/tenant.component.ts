import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { Subscriber, Subscription } from 'rxjs';
import { TenantService } from 'src/app/services/tenant.service';

@Component({
  selector: 'app-tenant',
  templateUrl: './tenant.component.html',
  styleUrls: ['./tenant.component.scss'],
})
export class TenantComponent implements OnInit {
  tenants: any[] = [];
  formCreateTenant: FormGroup;
  selectenant = new FormControl('', Validators.required);
  tenantSeleccionado: any = null;
  cantidadDatosTenants = 0;
  cantidadDatosEmailTenants = 0;
  suscription: Subscription | undefined;
  formUpdateTenant: FormGroup;
  formEmailTenant: FormGroup;
  formTenatsEvent: FormGroup;
  tableemailstenant: boolean = false;
  nodataemailtenant: boolean = false;
  tenantsemail: any[] = [];
  tenantsEvents: any[] = [];
  pageSize: number = 10;
  totalLoaded: number = 10;
  selectedOption = new FormControl('option1');  
  selectedEvent = new FormControl('', Validators.required);
  fechaInicio = '2024-01-04';
  fechaFin = '2024-08-04';


  constructor(
    private allTenantService: TenantService,
    private fb: FormBuilder,
    private fbupdate: FormBuilder,
    private fbemails: FormBuilder,
    private router: Router,
    private fbreadtenantevents: FormBuilder
  ) {
    this.formCreateTenant = fb.group({
      nombre: ['', [Validators.required]],
      cliente_id: ['', [Validators.required, Validators.minLength(5)]],
      cliente_secret: ['', [Validators.required, Validators.minLength(5)]],
    });
    this.formUpdateTenant = fbupdate.group({
      nombre_update: ['', [Validators.required]],
      cliente_id_update: ['', [Validators.required, Validators.minLength(5)]],
      cliente_secret: ['', [Validators.required, Validators.minLength(5)]],
    });
    this.formEmailTenant = this.fbemails.group({
      fecha_ini: ['', Validators.required],
      fecha_fin: ['', Validators.required]
    });
    this.formTenatsEvent = this.fbreadtenantevents.group({
      type: ['', Validators. required],
      fecha_ini: ['', Validators.required],
      fecha_fin: ['', Validators.required]
    })

  }

  ngOnInit(): void {
    //cargo la funcion para leer la tabla a penas arranque la vista
    this.getAllTenants();
    this.selectenant.valueChanges.subscribe((r: any) => {
      if (r) {
        this.seleccionarTenant(r);
      }
    });
    this.selectedEvent.valueChanges.subscribe((r: any) => {
      if (r) {
        this.ReadTenantEvents();
      }
    });


    this.suscription = this.allTenantService.refresh$.subscribe(() => {
      this.getAllTenants();
    });
  }
  ngOnDestroy(): void {
    this.suscription?.unsubscribe;
  }

  dataCreateTenant = () => {
    return {
      nombre: this.formCreateTenant.controls['nombre'].value,
      cliente_id: this.formCreateTenant.controls['cliente_id'].value,
      cliente_secret: this.formCreateTenant.controls['cliente_secret'].value,
    };
  };


  onSaveTenantCreate() {
    if (this.formCreateTenant.invalid)
      return alert('Por favor, completa todos los campos.');
    const data = this.dataCreateTenant();

    this.allTenantService.postTenants(data).subscribe({
      next: (resp) => {
        console.log(resp);
      },
    });
  }
  limpiarSelectedEvent() {
    if (this.selectedOption.value === 'option1') {
      this.selectedEvent.setValue(''); // Establecer en vacío
    }
  }


  //---Read Tenant---
  getAllTenants() {
    this.allTenantService.getAllTenants().subscribe({
      next: (response) => {
        this.tenants = response.data;
        this.cantidadDatosTenants = this.tenants.length;
        this.formCreateTenant.reset();
        // console.log('next');
      },
      error: (err) => {
        console.log(err);
      },
      complete: () => {
        console.log('Consulta ALL tenant Finalizada');
      },
    });
  }
  //---Update Tenant---
  seleccionarTenant(id: string): void {
    console.log(id);
    try {
      const tenant = this.tenants.find((t) => t.id == id);
      console.log(tenant);
      console.log('si pasando');
      this.tenantSeleccionado = tenant;
      this.formCreateTenant.patchValue({
        nombre: tenant.nombre,
        cliente_id: tenant.cliente_id,
        cliente_secret: tenant.cliente_secret,
      });
    } catch (error) {
      console.error('Ocurrió un error:', error);
    }
  }
  actualizarTenant(): void {
    if (!this.tenantSeleccionado) {
      console.error('No seleccionó nadaaa');
      return;
    }
    const idTenant = this.tenantSeleccionado.id;
    const data = {
      ...this.dataCreateTenant(),
      id: idTenant,
    };
    this.allTenantService.updateTenants(data).subscribe({
      next: (response) => {
        console.log(response);
        console.log('Funcionó');
        this.getAllTenants();
      },
      error: (err) => {
        console.error('error al actualizarlooo:', err);
      },
      complete: () => {
        console.log('Actualización del inquilino finalizada');
      },
    });
  }
  //EMAIL TENAN Filtrar
  buscarEmails(): void {
    const fechaIni = this.formatearFecha(this.formEmailTenant.get('fecha_ini')?.value);
    const fechaFin = this.formatearFecha(this.formEmailTenant.get('fecha_fin')?.value);
  
    const data = {
      fecha_ini: fechaIni,
      fecha_fin: fechaFin
    };
  
    this.allTenantService.postTenantsEmails(data).subscribe({
      next: (response) => {
        if (response && response.data && response.data.length > 0) {
          this.tenantsemail = response.data;
          this.tableemailstenant = true;
          this.nodataemailtenant = true;
          this.cantidadDatosEmailTenants = this.tenantsemail.length;
          console.log(response);
        } else {
          console.error('No hay datos');
          this.tableemailstenant = false;
          this.nodataemailtenant = true;
          console.log(this.tenantsemail)
          console.log(data);
          
        }
      },
      error: (err) => {
        console.error('Error al buscar los emails:', err);
      },
      complete: () => {
        console.log('Búsqueda de emails finalizada');
      }
    });
  }
  
  
  formatearFecha(fecha: any): string {
    if (typeof fecha === 'string') {
      const [dia, mes, ano] = fecha.split('/');
      return `${ano}-${mes.padStart(2, '0')}-${dia.padStart(2, '0')}`;
    } else if (fecha instanceof Date) {
      const dia = fecha.getDate().toString().padStart(2, '0');
      const mes = (fecha.getMonth() + 1).toString().padStart(2, '0');
      const ano = fecha.getFullYear().toString();
      return `${ano}-${mes}-${dia}`;
    } else {
      return '';
    }
  }

  //EVENTS TENANTS:
  ReadTenantEvents(): void {
    if (this.selectedEvent.value !== null) {
      const data = {
        fecha_ini: this.fechaInicio,
        fecha_fin: this.fechaFin
      };
      this.allTenantService.postTenantsEvents(this.selectedEvent.value, data).subscribe({
        next: (response) => {
          this.tenantsEvents = response.data;
          console.log(response.data);
          console.log(data);
          
        },
        error: (err) => {
          console.error('Error al obtener los eventos de inquilinos:', err);
          console.log(this.allTenantService.postTenantsEvents);
        },
        complete: () => {
          console.log('Búsqueda de eventos de inquilinos finalizada');
        }
      });
    }
  }
  loadMore() {
    this.totalLoaded += 10; 
}
}


