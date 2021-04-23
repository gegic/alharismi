declare interface MenuItem {
  title: string;
  action: (d: any) => void;
  disabled: boolean;
  className: string;
  children: MenuItem[];
}

declare interface Position {
  top: number;
  left: number;
}

declare interface Config {
  onOpen?: () => void;
  onClose?: () => void;
  position?: Position | ((d: any) => Position);
}

declare function contextMenu(menuItems: MenuItem[], onOpen?: () => void): void;
declare function contextMenu(menuItems: MenuItem[], config: Config): void;

export { MenuItem, Position, Config };
export default contextMenu;
