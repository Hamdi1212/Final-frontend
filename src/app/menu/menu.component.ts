import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Menu } from './menu';
import { StoreService } from '../services/store.service';

interface MenuItem {
  id: string;
  titre: string;
  icon: string;
  url?: string;
  isExpanded?: boolean;
  sousMenu?: {
    id: string;
    titre: string;
    icon: string;
    url: string;
  }[];
}

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  public role: string = "";
  public menuProperties: MenuItem[] = [];
  public activeSubMenu: string | null = null;

  constructor(private store: StoreService, private router: Router) {}

  ngOnInit(): void {
    this.store.getRoleFromStore().subscribe(data => {
      this.role = data || 'Teck';
      this.menuRole(this.role);
      this.setInitialActiveMenu();
    });
  }

  navigate(url: string): void {
    this.activeSubMenu = url;
    this.router.navigate([url]);
  }

  menuRole(role: string = 'Teck'): void {
    switch(role) {
      case "ADMIN":
        this.menuProperties = [
          {
            id: '1',
            titre: 'Tableau de bord',
            icon: 'bi bi-bar-chart-line-fill',
            isExpanded: false,
            sousMenu: [
              {
                id: '11',
                titre: 'Vue d\'ensemble',
                icon: 'bi bi-pie-chart-fill',
                url: 'dashboard'
              },
              {
                id: '12',
                titre: 'Statistique',
                icon: 'bi bi-clipboard-data-fill',
                url: 'statistiques'
              }
            ]
          },
          {
            id: '3',
            titre: 'R.H',
            icon: 'bi bi-people',
            isExpanded: false,
            sousMenu: [{
              id: '31',
              titre: 'Listes des Employées',
              icon: 'bi bi-person-lines-fill',
              url: 'Employees'
            }]
          }
        ];
        break;
      case 'Teck':
        this.menuProperties = [
          {
            id: '2',
            titre: 'Stock',
            icon: 'bi bi-boxes',
            isExpanded: false,
            sousMenu: [
              {
                id: '21',
                titre: 'Equipement',
                icon: 'bi bi-gear',
                url: 'equipement'
              },
              {
                id: '22',
                titre: 'Mouvement Stock',
                icon: 'bi bi-stack-overflow',
                url: 'mouvement-stock'
              },
              {
                id: '23',
                titre: 'Categorie',
                icon: 'bi bi-tags',
                url: 'Categories'
              }
            ]
          }
        ];
        break;
      default:
        this.menuProperties = [
          {
            id: '3',
            titre: 'R.H',
            icon: 'bi bi-people',
            isExpanded: false,
            sousMenu: [
              {
                id: '31',
                titre: 'Listes des Employées',
                icon: 'bi bi-person-lines-fill',
                url: 'Employees'
              },
              {
                id: '32',
                titre: 'Creation des postes',
                icon: 'bi bi-briefcase',
                url: 'Post'
              }
            ]
          },
          {
            id: '4',
            titre: 'Paramétrage',
            icon: 'bi bi-gear',
            isExpanded: false,
            sousMenu: [{
              id: '41',
              titre: 'Utilisateurs',
              icon: 'bi bi-person-gear',
              url: 'Setting'
            }]
          }
        ];
    }
  }

  toggleMenu(menu: MenuItem): void {
    if (menu.sousMenu && menu.sousMenu.length > 0) {
      menu.isExpanded = !menu.isExpanded;
    } else if (menu.url) {
      this.navigate(menu.url);
    }
  }

  isActive(url: string): boolean {
    return this.activeSubMenu === url;
  }

  private setInitialActiveMenu(): void {
    const currentUrl = this.router.url.substring(1);
    this.menuProperties.forEach(menu => {
      if (menu.sousMenu) {
        const activeSub = menu.sousMenu.find(sub => sub.url === currentUrl);
        if (activeSub) {
          menu.isExpanded = true;
          this.activeSubMenu = activeSub.url;
        }
      }
    });
  }
}