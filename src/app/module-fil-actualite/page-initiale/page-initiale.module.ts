import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HeaderComponent } from 'src/app/module-layouts/header/header.component';
import { IonicModule } from '@ionic/angular';
import { FooterModule } from 'src/app/module-layouts/footer/Footer.module';
import { PageInitialePageRoutingModule } from './page-initiale-routing.module';
import { PageInitialePage } from './page-initiale.page';
import { HighlightHashtagsPipe } from 'src/app/highlight-hashtags.pipe';
import { PostModule } from '../componets/post/post.module';
import { HeaderPostModule } from '../componets/post/header-post/header-post.module';
@NgModule({
  imports: [
 
    CommonModule,
    FormsModule,
    IonicModule,
    PageInitialePageRoutingModule,FooterModule,PostModule,HeaderPostModule
  ],
  declarations: [PageInitialePage,   HeaderComponent]
})
export class PageInitialePageModule {}
