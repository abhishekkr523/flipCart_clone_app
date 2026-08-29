import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { SellersAuthComponent } from './sellers-auth/sellers-auth.component';
import { SellerHomeComponent } from './seller-home/seller-home.component';
import { AuthGuard } from './auth.guard';
import { UserAuthGuard } from './user-auth.guard';
import { SellerAddProductComponent } from './seller-add-product/seller-add-product.component';
import { SellerUpdateProductComponent } from './seller-update-product/seller-update-product.component';
import { SearchComponent } from './search/search.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { UserAuthComponent } from './user-auth/user-auth.component';
import { CartPageComponent } from './cart-page/cart-page.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { MyOrdersComponent } from './my-orders/my-orders.component';
import { ProfileComponent } from './profile/profile.component';
import { InfoPageComponent } from './info-page/info-page.component';

const routes: Routes = [
  {
    path:'',component:HomeComponent
  },
  {
    path:'seller', component:SellersAuthComponent
  },
  {
    path:'seller-home', component:SellerHomeComponent,canActivate:[AuthGuard]
  },
  {path:'sellerAddProduct', component:SellerAddProductComponent,canActivate:[AuthGuard]},
  {
    path:'seller-update-product/:id', component:SellerUpdateProductComponent, canActivate:[AuthGuard]
  },
  {
    path:'search/:query', component:SearchComponent
  },
  {
    path:'product-details/:productId', component:ProductDetailsComponent
  },
  {
    path:'user-auth', component:UserAuthComponent
  },
  {
    path:'cart-page', component:CartPageComponent, canActivate:[UserAuthGuard]
  },
  {
    path:'checkout', component:CheckoutComponent, canActivate:[UserAuthGuard]
  },
  {
    path:'my-orders', component:MyOrdersComponent, canActivate:[UserAuthGuard]
  },
  {
    path:'profile', component:ProfileComponent, canActivate:[UserAuthGuard]
  },
  {
    path:'contact-us', component:InfoPageComponent, data:{
      title: 'Contact Us',
      paragraphs: [
        'We would love to hear from you. For any questions, feedback, or support requests, reach out to us using the details below.',
        'Email: support@flipcartclone.example',
        'Phone: +91 98765 43210 (Mon–Sat, 10 AM – 6 PM)',
        'Address: FlipCart Clone HQ, MG Road, Bengaluru, Karnataka, India'
      ]
    }
  },
  {
    path:'about-us', component:InfoPageComponent, data:{
      title: 'About Us',
      paragraphs: [
        'FlipCart Clone is a demo e-commerce project built to showcase a full shopping experience — browsing products, managing a cart, checking out, and tracking orders.',
        'It also supports sellers, who can sign up, list products, and manage their inventory.',
        'This site is a learning and portfolio project and is not affiliated with any real retailer.'
      ]
    }
  },
  {
    path:'careers', component:InfoPageComponent, data:{
      title: 'Careers',
      paragraphs: [
        'We are not actively hiring at the moment, but we are always excited to hear from passionate people.',
        'Check back here for future openings, or reach out via our Contact Us page to introduce yourself.'
      ]
    }
  },
  {
    path:'press', component:InfoPageComponent, data:{
      title: 'Press',
      paragraphs: [
        'For press and media inquiries, please get in touch through our Contact Us page.',
        'Media kits and brand assets will be made available here in the future.'
      ]
    }
  },
  {
    path:'returns', component:InfoPageComponent, data:{
      title: 'Returns',
      paragraphs: [
        'Most items can be returned within 7 days of delivery for a full refund, provided they are unused and in their original packaging.',
        'To start a return, go to My Orders, select the order, and choose the Cancel Order option before it ships. For items already delivered, contact support through the Contact Us page.',
        'Refunds are processed within 5–7 business days after the returned item is received and inspected.'
      ]
    }
  },
  {
    path:'faq', component:InfoPageComponent, data:{
      title: 'Frequently Asked Questions',
      paragraphs: [
        'Q: How do I track my order? A: Go to My Orders from the profile menu to see the live status of every order you have placed.',
        'Q: Can I shop without creating an account? A: Yes, you can add items to your cart as a guest. Your cart will automatically transfer over once you sign up or log in.',
        'Q: How do I cancel an order? A: Open My Orders and click Cancel Order next to any order that has not yet been delivered.',
        'Q: How do I become a seller? A: Click Seller in the navigation bar and complete the seller sign-up form.',
        'Q: What payment methods are supported? A: This demo currently supports Pay on Delivery only.'
      ]
    }
  },
  {
    path:'terms', component:InfoPageComponent, data:{
      title: 'Terms & Conditions',
      paragraphs: [
        'By using this site, you agree to shop responsibly and provide accurate information when creating an account or placing an order.',
        'All product listings are provided by third-party sellers. We do our best to ensure accuracy but cannot guarantee that all details are error-free.',
        'This is a demo application; these terms are provided for illustrative purposes only and do not constitute a binding legal agreement.'
      ]
    }
  },
  {
    path:'privacy-policy', component:InfoPageComponent, data:{
      title: 'Privacy Policy',
      paragraphs: [
        'We store the information you provide (such as name, email, and shipping address) only to operate your account, cart, and orders.',
        'We do not sell your personal information to third parties.',
        'This is a demo application; data is stored locally for demonstration purposes only.'
      ]
    }
  },
  {
    path:'seller-help', component:InfoPageComponent, data:{
      title: 'Seller Help',
      paragraphs: [
        'Q: How do I list a new product? A: After signing up as a seller, use Add Product from the navigation bar to create a new listing with price, MRP, stock, and an image.',
        'Q: How do I edit or remove a listing? A: Go to My Products from the seller menu, then use the edit or delete icons next to any product.',
        'Q: How are orders for my products handled? A: Buyers place orders directly; keep your stock quantity updated so listings stay accurate.'
      ]
    }
  },
  {
    path:'sitemap', component:InfoPageComponent, data:{
      title: 'Sitemap',
      links: [
        { label: 'Home', routerLink: '/' },
        { label: 'Become a Seller', routerLink: '/seller' },
        { label: 'My Cart', routerLink: '/cart-page' },
        { label: 'My Orders', routerLink: '/my-orders' },
        { label: 'My Profile', routerLink: '/profile' },
        { label: 'User Login / Sign Up', routerLink: '/user-auth' },
        { label: 'About Us', routerLink: '/about-us' },
        { label: 'Contact Us', routerLink: '/contact-us' },
        { label: 'Careers', routerLink: '/careers' },
        { label: 'Press', routerLink: '/press' },
        { label: 'Returns', routerLink: '/returns' },
        { label: 'FAQ', routerLink: '/faq' },
        { label: 'Terms & Conditions', routerLink: '/terms' },
        { label: 'Privacy Policy', routerLink: '/privacy-policy' },
        { label: 'Seller Help', routerLink: '/seller-help' }
      ]
    }
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
