import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http';
import { SpinnerComponent } from './components/spinner/spinner.component';
import { SelectComponent } from './components/select/select.component';
import { ProductComponent } from '../products/components/product/product.component';
import { FormsModule } from '@angular/forms';
import { ProductsService } from '../products/services/products.service';
import { CartsComponent } from '../carts/component/carts/carts.component';
import { ProductsModule } from '../products/products.module';
import { CartsModule } from '../carts/carts.module';



@NgModule({
  declarations: [
    HeaderComponent,
    SpinnerComponent,
    SelectComponent,
    
  ],
  imports: [
    CommonModule,
    RouterModule,
    BrowserModule,
    HttpClientModule,
    FormsModule,
   
    
  ],
  exports: [
    HeaderComponent,
    SpinnerComponent,
    SelectComponent,
    FormsModule,
    
  ]
})
export class SharedModule { }
