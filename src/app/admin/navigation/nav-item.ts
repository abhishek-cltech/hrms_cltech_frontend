export interface NavItem {
  text: string,
  icon: string,
  routerLink?: string;
  children: MenuItem[]
  }

export interface MenuItem {
    text: string,
    icon: string,
    routerLink: string;
}