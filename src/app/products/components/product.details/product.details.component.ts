import { AfterViewInit, Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductsService } from '../../services/products.service';
import { product } from '../../models/product';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-product.details',
  templateUrl: './product.details.component.html',
  styleUrls: ['./product.details.component.css']
})
export class ProductDetailsComponent implements OnInit {
  id: any;
  name: any;
  image: any;
  data: any = {};
  loading: boolean = false;
  products: product ={
    id:0,
    name:'',
    price:'',
    categoryName:'',
    categoryId:0,
    description:'',
    imageUrl:'',
    quantity:0,
    amount:0
  };
  cartproducts: any[] = [];
  product:any;
  detail:any;
  details:any;

  @ViewChild('productCard',{static: false}) productCard!: ElementRef;
  @ViewChild('nxtBtn') nxtBtn!: ElementRef;
  @ViewChild('preBtn') preBtn!: ElementRef;
  constructor(private route:ActivatedRoute, private service:ProductsService, private http: HttpClient,private renderer: Renderer2,
    private router:Router) {
    this.id = this.route.snapshot.paramMap.get("id")
    console.log(this.id);

   }
  ngAfterViewInit(): void {

  }

  ngOnInit(): void {
    this.getProductCategory();
    this.getData();


  }

  slider() {
    const productContainers: HTMLElement[] = Array.from(this.productCard.nativeElement.querySelectorAll('.product-card'));
    const nxtBtns: HTMLElement[] = Array.from(this.nxtBtn.nativeElement.querySelectorAll('.nxt-btn'));
    const preBtns: HTMLElement[] = Array.from(this.preBtn.nativeElement.querySelectorAll('.pre-btn'));

    productContainers.forEach((item: HTMLElement, i: number) => {
      let containerDimensions = item.getBoundingClientRect();
      let containerWidth = containerDimensions.width;

      nxtBtns[i].addEventListener('click', () => {
        item.scrollLeft += containerWidth;
      })

      preBtns[i].addEventListener('click', () => {
        item.scrollLeft -= containerWidth;
      })
    });
  }

  getProductCategory() {
    this.http.get('https://localhost:44322/api/Products/category/7').subscribe((res:any) =>{
      this.cartproducts = res;
      this.slider();
    })

  }

  addToCart(event: any) {
    if ("cart" in localStorage) {
      this.cartproducts = JSON.parse(localStorage.getItem("cart")!)
      let exist = this.cartproducts.find(item => item.item.id == event.item.id)
      if (exist) {
        alert("product is already in your cart")
      } else {
        this.cartproducts.push(event)
        localStorage.setItem("cart", JSON.stringify(this.cartproducts))


      }

    } else {
      this.cartproducts.push(event)
      localStorage.setItem("cart", JSON.stringify(this.cartproducts))
    }
  };

  getData() {

    this.http.get('https://localhost:44322/api/Products/GetAllProducts').subscribe((details:any) =>{
      this.details = details;
      let index = details.findIndex(
        (detail: {id:number}) => detail.id == this.id);
        if(index > -1) {
          this.detail = this.details[index];
        }
    });
  };

  goToItem(id:number) {
    this.router.navigate(['/details',id]);

      };

}
