import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AlertController, ToastController, LoadingController } from '@ionic/angular';
import { RouterLink } from '@angular/router';
import { ProductosService, Producto } from 'src/app/inventario-miski/productos.services';

@Component({
  selector: 'app-inventario-miski',
  templateUrl: './inventario-miski.page.html',
  styleUrls: ['./inventario-miski.page.scss'],
  standalone: true,
  imports: [IonicModule, FormsModule, CommonModule, RouterLink],
})
export class InventarioMiskiPage implements OnInit {
  selectedCategory = 'limpieza';
  searchTerm = '';
  currentPage = 1;
  totalPages = 1;
  itemsPerPage = 10;

  productos: Producto[] = [];
  filteredProducts: Producto[] = [];
  paginatedProducts: Producto[] = [];
  visiblePages: (number | string)[] = [];

  constructor(
    private alertController: AlertController,
    private toastController: ToastController,
    private loadingController: LoadingController,
    private productosService: ProductosService
  ) {}

  ngOnInit() {
    this.cargarProductos();
  }

  async cargarProductos() {
    const loading = await this.loadingController.create({
      message: 'Cargando productos...',
      spinner: 'crescent'
    });
    await loading.present();

    this.productosService.obtenerProductos().subscribe({
      next: (productos) => {
        this.productos = productos;
        this.filterProducts();
        loading.dismiss();
      },
      error: (error) => {
        console.error('Error al cargar productos:', error);
        loading.dismiss();
        this.mostrarToast('Error al cargar productos', 'danger');
      }
    });
  }

  filterProducts() {
    this.filteredProducts = this.productos.filter(producto => {
      const matchesCategory = producto.category === this.selectedCategory;
      const matchesSearch = producto.name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
                           producto.code.toLowerCase().includes(this.searchTerm.toLowerCase());
      return matchesCategory && matchesSearch;
    });

    this.totalPages = Math.ceil(this.filteredProducts.length / this.itemsPerPage);
    this.currentPage = 1;
    this.updatePaginatedProducts();
    this.updateVisiblePages();
  }

  updatePaginatedProducts() {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.paginatedProducts = this.filteredProducts.slice(startIndex, endIndex);
  }

  handleSearch(event: any) {
    this.searchTerm = event.target.value;
    this.filterProducts();
  }

  updateVisiblePages() {
    const pages: (number | string)[] = [];
    
    if (this.totalPages <= 7) {
      for (let i = 1; i <= this.totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (this.currentPage <= 3) {
        pages.push(1, 2, 3, 4, '...', this.totalPages);
      } else if (this.currentPage >= this.totalPages - 2) {
        pages.push(1, '...', this.totalPages - 3, this.totalPages - 2, this.totalPages - 1, this.totalPages);
      } else {
        pages.push(1, '...', this.currentPage - 1, this.currentPage, this.currentPage + 1, '...', this.totalPages);
      }
    }
    
    this.visiblePages = pages;
  }

  goToPage(page: number | string) {
    if (typeof page === 'number' && page !== this.currentPage) {
      this.currentPage = page;
      this.updatePaginatedProducts();
      this.updateVisiblePages();
    }
  }

  previousPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updatePaginatedProducts();
      this.updateVisiblePages();
    }
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.updatePaginatedProducts();
      this.updateVisiblePages();
    }
  }

  async verDetalleProducto(producto: Producto) {
  const alert = await this.alertController.create({
    header: producto.name,
    subHeader: `Código: ${producto.code}`,
    message: `
      Categoría: ${producto.category}
      
      Stock: ${producto.stock || 0} unidades
      
      Descripción:
      ${producto.description || 'Sin descripción'}
      
      Teléfono: ${producto.telefono_de_contacto || 'No especificado'}
    `,
    cssClass: 'producto-detalle-alert',
    buttons: ['Cerrar']
  });
  await alert.present();
}

  async agregarProducto() {
    const alert = await this.alertController.create({
      header: 'Nuevo Producto',
      inputs: [
        {
          name: 'code',
          type: 'text',
          placeholder: 'Código del producto',
          attributes: { required: true }
        },
        {
          name: 'name',
          type: 'text',
          placeholder: 'Nombre del producto',
          attributes: { required: true }
        },
        {
          name: 'category',
          type: 'text',
          placeholder: 'Categoría (limpieza, absorbentes, dispensadores)',
          value: this.selectedCategory
        },
        {
          name: 'telefono_de_contacto',
          type: 'tel',
          placeholder: 'Teléfono de contacto'
        },
        {
          name: 'description',
          type: 'textarea',
          placeholder: 'Descripción (opcional)'
        },
        {
          name: 'imageUrl',
          type: 'url',
          placeholder: 'Enlace (URL) de la imagen (opcional)',
        },
        {
          name: 'stock',
          type: 'number',
          placeholder: 'Stock inicial',
          value: 0
        }
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel'
        },
        {
          text: 'Agregar',
          handler: async (data) => {
            if (!data.code || !data.name) {
              this.mostrarToast('Código y nombre son obligatorios', 'warning');
              return false;
            }

            const loading = await this.loadingController.create({
              message: 'Agregando producto...'
            });
            await loading.present();

            const nuevoProducto: Producto = {
              code: data.code,
              name: data.name,
              category: data.category || this.selectedCategory,
              telefono_de_contacto: data.telefono_de_contacto || '',
              specific_features: {},
              description: data.description || '',
              stock: parseInt(data.stock) || 0,
              image: data.imageUrl || 'assets/icon/Legia.svg'

            };

            this.productosService.agregarProducto(nuevoProducto).subscribe({
              next: (id) => {
                loading.dismiss();
                this.mostrarToast('✅ Producto agregado exitosamente', 'success');
                this.cargarProductos();
              },
              error: (error) => {
                loading.dismiss();
                console.error('Error al agregar producto:', error);
                this.mostrarToast('Error al agregar producto', 'danger');
              }
            });

            return true;
          }
        }
      ]
    });
    await alert.present();
  }

  async editarProducto(producto: Producto) {
    const alert = await this.alertController.create({
      header: 'Editar Producto',
      inputs: [
        {
          name: 'code',
          type: 'text',
          placeholder: 'Código',
          value: producto.code
        },
        {
          name: 'name',
          type: 'text',
          placeholder: 'Nombre',
          value: producto.name
        },
        {
          name: 'category',
          type: 'text',
          placeholder: 'Categoría',
          value: producto.category
        },
        {
          name: 'telefono_de_contacto',
          type: 'tel',
          placeholder: 'Teléfono',
          value: producto.telefono_de_contacto
        },
        {
          name: 'description',
          type: 'textarea',
          placeholder: 'Descripción',
          value: producto.description
        },
        {
          name: 'stock',
          type: 'number',
          placeholder: 'Stock',
          value: producto.stock?.toString()
        }
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel'
        },
        {
          text: 'Guardar',
          handler: async (data) => {
            if (!data.code || !data.name) {
              this.mostrarToast('Código y nombre son obligatorios', 'warning');
              return false;
            }

            const loading = await this.loadingController.create({
              message: 'Actualizando producto...'
            });
            await loading.present();

            const productoActualizado: Partial<Producto> = {
              code: data.code,
              name: data.name,
              category: data.category,
              telefono_de_contacto: data.telefono_de_contacto,
              description: data.description,
              stock: parseInt(data.stock) || 0
            };

            this.productosService.actualizarProducto(producto.id!, productoActualizado).subscribe({
              next: () => {
                loading.dismiss();
                this.mostrarToast('✏️ Producto actualizado', 'primary');
                this.cargarProductos();
              },
              error: (error) => {
                loading.dismiss();
                console.error('Error al actualizar:', error);
                this.mostrarToast('Error al actualizar producto', 'danger');
              }
            });

            return true;
          }
        }
      ]
    });
    await alert.present();
  }

  async eliminarProducto(producto: Producto) {
    const alert = await this.alertController.create({
      header: '¿Eliminar producto?',
      message: `¿Estás seguro de eliminar "${producto.name}"? Esta acción no se puede deshacer.`,
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel'
        },
        {
          text: 'Eliminar',
          cssClass: 'danger',
          handler: async () => {
            const loading = await this.loadingController.create({
              message: 'Eliminando producto...'
            });
            await loading.present();

            this.productosService.eliminarProducto(producto.id!, producto).subscribe({
              next: () => {
                loading.dismiss();
                this.mostrarToast(`🗑️ ${producto.name} eliminado`, 'danger');
                this.cargarProductos();
              },
              error: (error) => {
                loading.dismiss();
                console.error('Error al eliminar:', error);
                this.mostrarToast('Error al eliminar producto', 'danger');
              }
            });
          }
        }
      ]
    });
    await alert.present();

  }

  async vaciarInventario() {
    const alert = await this.alertController.create({
      header: '⚠️ PELIGRO: Borrar Todo',
      message: 'Estás a punto de eliminar TODOS los productos del inventario. Esta acción no se puede deshacer. ¿Continuar?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel'
        },
        {
          text: 'SÍ, BORRAR TODO',
          cssClass: 'danger-button', // Para que se vea rojo si tienes el estilo
          handler: async () => {
            const loading = await this.loadingController.create({
              message: 'Vaciando inventario...'
            });
            await loading.present();

            try {
              await this.productosService.borrarTodoElInventario();
              this.cargarProductos(); // Recargamos la lista (quedará vacía)
              this.mostrarToast('🗑️ Inventario vaciado correctamente', 'warning');
            } catch (error) {
              console.error(error);
              this.mostrarToast('Error al vaciar inventario', 'danger');
            } finally {
              loading.dismiss();
            }
          }
        }
      ]
    });

    await alert.present();
  }

  async mostrarToast(mensaje: string, color: string) {
    const toast = await this.toastController.create({
      message: mensaje,
      duration: 2000,
      position: 'bottom',
      color: color
    });
    await toast.present();
  }

  onCategoryChange() {
    this.filterProducts();
  }
}